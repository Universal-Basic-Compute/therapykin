'use client';

import React, { useState } from 'react';

interface Comment {
  id: string;
  name: string;
  date: string;
  content: string;
  replies?: Comment[];
}

// This is a mock implementation - in a real app, you would fetch and store comments in a database
const CommentSection = ({ postSlug }: { postSlug: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !name.trim() || !email.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        name: name,
        date: new Date().toLocaleDateString(),
        content: newComment
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="mt-12 mb-8">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
      
      {/* Comment Form */}
      <div className="bg-[var(--background-alt)]/50 p-6 rounded-lg mb-8">
        <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-foreground/20 rounded-md bg-background"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email * (will not be published)</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-foreground/20 rounded-md bg-background"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-1">Comment *</label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-foreground/20 rounded-md bg-background"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </button>
        </form>
      </div>
      
      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-foreground/10 pb-6">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold mr-3">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h5 className="font-medium">{comment.name}</h5>
                  <p className="text-sm text-foreground/60">{comment.date}</p>
                </div>
              </div>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-foreground/60 italic">Be the first to comment on this article!</p>
      )}
    </div>
  );
};

export default CommentSection;
