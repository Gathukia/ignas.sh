"use client"

import React from 'react';
import { Heart } from 'lucide-react';
import { useReactions } from '../../../hooks/useReactions'

const LikeButton = ({ slug, initialLikes = 0 }) => {
  const { onLikeClick, likes, liked, submitting } = useReactions(slug, initialLikes)

  return (
    <button
      onClick={onLikeClick}
      disabled={submitting}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ${
        liked
          ? 'bg-pink-500 text-white hover:bg-pink-600'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : 'stroke-current'}`} />
      <span className="font-medium">{likes}</span>
    </button>
  );
};

export default LikeButton;