"use client"
import React from 'react';

export const LoadingDots = () => {
  return (
    <span className="inline-flex items-center">
      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-loadingDot1"></span>
      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-loadingDot2 mx-1"></span>
      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-loadingDot3"></span>
    </span>
  );
};
  