import React from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  imageUrl: string;
  url: string;
}

const ArticleSchema = ({ 
  title, 
  description, 
  datePublished, 
  author, 
  imageUrl, 
  url 
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl || "https://therapykin.ai/logo.png",
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "TherapyKin",
      "logo": {
        "@type": "ImageObject",
        "url": "https://therapykin.ai/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ArticleSchema;
