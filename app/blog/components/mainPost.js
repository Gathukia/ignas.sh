import React from 'react';
import MainPostWrapper from './mainPostWrapper';
import MDX from './mdx';

export const MainPost = async ({ mdxSource, toc }) => {
  if (!mdxSource) {
    console.error("Content missing mdxSource");
    return <div>Invalid content</div>;
  }

  return (
    <MainPostWrapper toc={toc}>
      <MDX source={mdxSource} />
    </MainPostWrapper>
  );
};