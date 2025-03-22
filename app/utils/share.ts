/**
 * Utility functions for social media sharing
 */

// Share on Twitter/X
export function shareOnTwitter(title: string, url: string) {
  const text = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
}

// Share on Facebook
export function shareOnFacebook(url: string) {
  const shareUrl = encodeURIComponent(url);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
}

// Share on LinkedIn
export function shareOnLinkedIn(title: string, url: string) {
  const text = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${text}`, '_blank');
}

// Share via Email
export function shareViaEmail(title: string, url: string, additionalText: string = '') {
  const subject = encodeURIComponent(title);
  const body = encodeURIComponent(`I thought you might be interested in this article: ${title}\n\n${url}${additionalText ? '\n\n' + additionalText : ''}`);
  window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
}

// Copy link to clipboard
export async function copyToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}

// Use Web Share API if available, otherwise fall back to other methods
export async function shareContent(title: string, url: string, text?: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: text || title,
        url
      });
      return true;
    } catch (err) {
      console.error('Error sharing:', err);
      return false;
    }
  }
  return false;
}
