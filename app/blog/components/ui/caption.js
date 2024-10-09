import React from 'react';

const Caption = ({ children }) => {
  return (
    <figcaption className="mt-2 text-center text-sm text-gray-500">
      {children}
    </figcaption>
  );
};

export default Caption;