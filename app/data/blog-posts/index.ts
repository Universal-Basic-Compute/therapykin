import { post as briefSessionsPost } from './30-minute-mental-health-solution';
import { post as mentalAgilityPost } from './mental-agility-top-performers';
import { post as aiTherapyPost } from './ai-therapy-busy-leaders';
import { post as ruralAccessPost } from './rural-mental-health-access';
import { post as ruralPrivacyPost } from './rural-privacy-digital-therapy';
import { post as ruralSpecializedSupportPost } from './rural-stress-specialized-support';
import { post as betweenSessionSupportPost } from './between-session-therapy-support';
import { post as crisisManagementPost } from './crisis-management-between-therapy';
import { post as therapeuticTechniquePost } from './therapeutic-technique-practice';
import { post as leadershipResilienceGapPost } from './leadership-resilience-gap';
import { post as mentalGameBetweenGamesPost } from './mental-game-between-games';
import { post as mentalPerformancePitfallsPost } from './mental-performance-pitfalls';
import { post as therapyWaitlistsPost } from './navigating-therapy-waitlists';
import { post as alternativeMentalHealthResourcesPost } from './alternative-mental-health-resources';

// Export all posts in an array
export const blogPosts = [
  alternativeMentalHealthResourcesPost, // Add the new post at the top to feature it
  therapyWaitlistsPost,
  mentalPerformancePitfallsPost,
  mentalGameBetweenGamesPost,
  briefSessionsPost,
  mentalAgilityPost,
  aiTherapyPost,
  ruralAccessPost,
  ruralPrivacyPost,
  ruralSpecializedSupportPost,
  betweenSessionSupportPost,
  crisisManagementPost,
  therapeuticTechniquePost,
  leadershipResilienceGapPost,
  // Add more posts here as they are created
];

// Export individual posts for direct access
export {
  briefSessionsPost,
  mentalAgilityPost,
  aiTherapyPost,
  ruralAccessPost,
  ruralPrivacyPost,
  ruralSpecializedSupportPost,
  betweenSessionSupportPost,
  crisisManagementPost,
  therapeuticTechniquePost,
  leadershipResilienceGapPost,
  mentalGameBetweenGamesPost,
  mentalPerformancePitfallsPost,
  therapyWaitlistsPost,
  alternativeMentalHealthResourcesPost, // Add the export for the new post
};

// Helper function to get a post by slug
export function getPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get posts by persona
export function getPostsByPersona(persona: string) {
  return blogPosts.filter(post => post.persona === persona);
}

// Helper function to get featured posts
export function getFeaturedPosts(count: number = 3) {
  return blogPosts.slice(0, count);
}
