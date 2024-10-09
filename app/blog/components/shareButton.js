"use client"
import React from 'react';
import { Share2 } from 'lucide-react';

const ShareButton = () => {
  const handleShare = () => {
    // Implement share functionality here
    console.log('Share button clicked');
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
    >
      <Share2 className="w-5 h-5" />
      <span className="font-medium">Share</span>
    </button>
  );
};

export default ShareButton;