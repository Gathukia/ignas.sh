"use client"
import React from 'react';
import { BackgroundContainer } from '../Ui/Background';
import MediaGrid from './Dragable';

const MediaPage = () => {
  return (
    <BackgroundContainer contentType="pattern">
      <div className="max-w-7xl mx-auto">
        <article>
          <MediaGrid />
          <div className='h-20'></div>
        </article>
      </div>
    </BackgroundContainer>
  );
};

export default MediaPage;