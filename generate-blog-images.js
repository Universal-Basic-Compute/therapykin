const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const util = require('util');
require('dotenv').config();

// Configuration
const IDEOGRAM_API_KEY = process.env.IDEOGRAM_API_KEY;
if (!IDEOGRAM_API_KEY) {
  console.error('Error: IDEOGRAM_API_KEY not found in .env file');
  process.exit(1);
}

// Get blog posts data from the blog page file
const getBlogPosts = () => {
  const blogPagePath = path.join(process.cwd(), 'app', 'blog', 'page.tsx');
  const blogPageContent = fs.readFileSync(blogPagePath, 'utf8');
  
  // Extract the blogPosts array using regex
  const blogPostsMatch = blogPageContent.match(/const blogPosts = \[([\s\S]*?)\];/);
  if (!blogPostsMatch) {
    throw new Error('Could not find blogPosts array in blog page file');
  }
  
  // Evaluate the array to get the actual data
  // This is a simplified approach - in a real-world scenario, you might want to use a proper parser
  const blogPostsString = `[${blogPostsMatch[1]}]`;
  // Replace single quotes with double quotes for JSON parsing
  const jsonCompatible = blogPostsString
    .replace(/'/g, '"')
    .replace(/(\w+):/g, '"$1":')
    .replace(/\/\/.+/g, ''); // Remove comments
  
  try {
    return JSON.parse(jsonCompatible);
  } catch (error) {
    console.error('Error parsing blog posts:', error);
    // Fallback: return empty array
    return [];
  }
};

// Get blog post content from the slug page file
const getBlogPostContent = (slug) => {
  const slugPagePath = path.join(process.cwd(), 'app', 'blog', '[slug]', 'page.tsx');
  const slugPageContent = fs.readFileSync(slugPagePath, 'utf8');
  
  // Find the blog post with the matching slug
  const contentMatch = slugPageContent.match(new RegExp(`slug: ['"]${slug}['"]([\\s\\S]*?)content: \`([\\s\\S]*?)\``, 'i'));
  if (!contentMatch) {
    return null;
  }
  
  return contentMatch[2].trim();
};

// Ask Claude to generate a Midjourney prompt
const generatePromptWithClaude = async (title, content) => {
  try {
    // Use a temporary file to store Claude's response
    const tempFile = path.join(process.cwd(), 'temp_claude_response.txt');
    
    // Create a prompt for Claude
    const claudePrompt = `I need to create a visual for a blog article titled "${title}". 
Here's the content of the article:

${content}

Think about what would make a compelling, professional 4:3 aspect ratio image for this article. 
Please respond ONLY with a Midjourney prompt that would create an appropriate image. 
The prompt should be detailed and descriptive, focusing on creating a professional, editorial-style image 
that would work well for a mental health/therapy blog. Do not include any explanations or additional text.`;
    
    // Write the prompt to a file
    fs.writeFileSync('claude_prompt.txt', claudePrompt);
    
    // Call Claude CLI (assuming it's installed)
    const execPromise = util.promisify(exec);
    const { stdout } = await execPromise('claude-cli claude_prompt.txt -o temp_claude_response.txt');
    
    // Read Claude's response
    const response = fs.readFileSync(tempFile, 'utf8').trim();
    
    // Clean up temporary files
    fs.unlinkSync('claude_prompt.txt');
    fs.unlinkSync(tempFile);
    
    return response;
  } catch (error) {
    console.error('Error generating prompt with Claude:', error);
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
          aspect_ratio: "ASPECT_4_3", // 4:3 aspect ratio
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

// Update blog posts with new image paths
const updateBlogPosts = (updatedPosts) => {
  const blogPagePath = path.join(process.cwd(), 'app', 'blog', 'page.tsx');
  let blogPageContent = fs.readFileSync(blogPagePath, 'utf8');
  
  // Format the updated blog posts array as a string
  const updatedPostsString = JSON.stringify(updatedPosts, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Convert "key": to key:
    .replace(/"/g, "'"); // Convert double quotes to single quotes
  
  // Replace the existing blog posts array with the updated one
  blogPageContent = blogPageContent.replace(
    /const blogPosts = \[([\s\S]*?)\];/,
    `const blogPosts = ${updatedPostsString};`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(blogPagePath, blogPageContent);
  console.log('Blog page updated with new image paths');
};

// Main function
const main = async () => {
  try {
    // Get blog posts
    const blogPosts = getBlogPosts();
    let updatedPosts = false;
    
    // Process each blog post
    for (const post of blogPosts) {
      // Check if the post already has an image
      const imagePath = path.join(process.cwd(), 'public', post.imageUrl);
      
      if (!fs.existsSync(imagePath)) {
        console.log(`Generating image for post: ${post.title}`);
        
        // Get the blog post content
        const content = getBlogPostContent(post.slug);
        if (!content) {
          console.log(`Could not find content for post with slug: ${post.slug}`);
          continue;
        }
        
        // Generate a prompt with Claude
        const prompt = await generatePromptWithClaude(post.title, content);
        console.log(`Generated prompt: ${prompt}`);
        
        // Generate an image with Ideogram
        const newImageUrl = await generateImageWithIdeogram(prompt, post.slug);
        if (newImageUrl) {
          // Update the post's image URL
          post.imageUrl = newImageUrl;
          updatedPosts = true;
        }
      }
    }
    
    // Update the blog posts in the file if any changes were made
    if (updatedPosts) {
      updateBlogPosts(blogPosts);
    }
    
    console.log('Image generation complete');
  } catch (error) {
    console.error('Error in main function:', error);
  }
};

// Run the script
main();
