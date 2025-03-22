const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const util = require('util');
require('dotenv').config();

// Configuration
const IDEOGRAM_API_KEY = process.env.IDEOGRAM_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!IDEOGRAM_API_KEY) {
  console.error('Error: IDEOGRAM_API_KEY not found in .env file');
  process.exit(1);
}

if (!ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY not found in .env file');
  process.exit(1);
}

// Get all blog post files
const getBlogPostFiles = () => {
  const blogPostsDir = path.join(process.cwd(), 'app', 'data', 'blog-posts');
  return fs.readdirSync(blogPostsDir)
    .filter(file => (file.endsWith('.tsx') || file.endsWith('.ts')) && file !== 'index.ts')
    .map(file => path.join(blogPostsDir, file));
};

// Extract blog post data from a file
const extractBlogPostData = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the post object
    const postMatch = content.match(/export const post = ({[\s\S]*?});/);
    if (!postMatch) return null;
    
    // Extract key properties we need
    const titleMatch = content.match(/title:\s*["'](.+?)["']/);
    const slugMatch = content.match(/slug:\s*["'](.+?)["']/);
    const imageUrlMatch = content.match(/imageUrl:\s*["'](.+?)["']/);
    const contentMatch = content.match(/content:\s*`([\s\S]*?)`\s*(?:};|}\);)/);
    
    if (!titleMatch || !slugMatch) return null;
    
    return {
      title: titleMatch[1],
      slug: slugMatch[1],
      imageUrl: imageUrlMatch ? imageUrlMatch[1] : null,
      content: contentMatch ? contentMatch[1] : null,
      filePath
    };
  } catch (error) {
    console.error(`Error extracting data from ${filePath}:`, error);
    return null;
  }
};

// Ask Claude to generate a Midjourney prompt using Anthropic API
const generatePromptWithClaude = async (title, content) => {
  try {
    // Extract a brief summary from the content (first 1000 characters)
    const summary = content.substring(0, 1000).replace(/<[^>]*>/g, '');
    
    // Create the prompt for Claude
    const prompt = `I need to create a visual for a blog article titled "${title}". 
Here's a summary of the article:

${summary}

Think about what would make a compelling, professional 3:2 aspect ratio image for this article. 
Please respond ONLY with a Midjourney prompt that would create an appropriate image. 
The prompt should be detailed and descriptive, focusing on creating a professional, editorial-style image 
that would work well for a mental health/therapy blog. Do not include any explanations or additional text.`;

    // Make the API call to Claude
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: "claude-3-5-haiku-latest",
        max_tokens: 300,
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );

    // Extract the generated prompt from Claude's response
    if (response.data && response.data.content && response.data.content.length > 0) {
      const generatedPrompt = response.data.content[0].text.trim();
      console.log('Claude generated prompt:', generatedPrompt);
      return generatedPrompt;
    } else {
      throw new Error('Unexpected response format from Claude API');
    }
  } catch (error) {
    console.error('Error generating prompt with Claude API:', error.message);
    // Fallback to a generic prompt based on the title
    return `Professional editorial image for a mental health article about ${title}, 4:3 aspect ratio, clean modern style, soft colors, therapeutic atmosphere`;
  }
};

// Generate image with Ideogram API
const generateImageWithIdeogram = async (prompt, slug) => {
  try {
    const response = await axios.post(
      'https://api.ideogram.ai/generate',
      {
        image_request: {
          prompt: prompt,
          aspect_ratio: "ASPECT_3_2", // 3:2 aspect ratio
          model: "V_2",
          magic_prompt_option: "AUTO"
        }
      },
      {
        headers: {
          'Api-Key': IDEOGRAM_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Get the image URL from the response
    const imageUrl = response.data.data[0].url;
    
    // Download the image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Create directory if it doesn't exist
    const imageDir = path.join(process.cwd(), 'public', 'blog');
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
    
    // Save the image
    const imagePath = path.join(imageDir, `${slug}.jpg`);
    fs.writeFileSync(imagePath, imageResponse.data);
    
    console.log(`Image saved to ${imagePath}`);
    return `/blog/${slug}.jpg`;
  } catch (error) {
    console.error('Error generating image with Ideogram:', error);
    return null;
  }
};

// Update the blog post file with the new image URL
const updateBlogPostFile = (filePath, newImageUrl) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if imageUrl already exists
    const imageUrlMatch = content.match(/imageUrl:\s*["'](.+?)["']/);
    
    if (imageUrlMatch) {
      // Replace existing imageUrl
      content = content.replace(
        /(imageUrl:\s*["'])(.+?)(["'])/,
        `$1${newImageUrl}$3`
      );
    } else {
      // Add imageUrl property after slug
      content = content.replace(
        /(slug:\s*["'].+?["'],)/,
        `$1\n  imageUrl: '${newImageUrl}',`
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated imageUrl in ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
};

// Main function
const main = async () => {
  try {
    // Get all blog post files
    const blogPostFiles = getBlogPostFiles();
    console.log(`Found ${blogPostFiles.length} blog post files`);
    
    // Process each blog post file
    for (const filePath of blogPostFiles) {
      const post = extractBlogPostData(filePath);
      
      if (!post) {
        console.log(`Could not extract data from ${filePath}, skipping`);
        continue;
      }
      
      console.log(`Processing post: ${post.title} (${post.slug})`);
      
      // Check if the post already has an image
      if (post.imageUrl) {
        const imagePath = path.join(process.cwd(), 'public', post.imageUrl);
        
        if (fs.existsSync(imagePath)) {
          console.log(`Image already exists at ${imagePath}, skipping`);
          continue;
        }
      }
      
      // If we don't have content, we can't generate a good prompt
      if (!post.content) {
        console.log(`No content found for post ${post.slug}, skipping`);
        continue;
      }
      
      // Generate a prompt with Claude
      const prompt = await generatePromptWithClaude(post.title, post.content);
      console.log(`Generated prompt: ${prompt}`);
      
      // Generate an image with Ideogram
      const newImageUrl = await generateImageWithIdeogram(prompt, post.slug);
      
      if (newImageUrl) {
        // Update the post file with the new image URL
        updateBlogPostFile(post.filePath, newImageUrl);
      }
    }
    
    console.log('Image generation complete');
  } catch (error) {
    console.error('Error in main function:', error);
  }
};

// Run the script
main();
