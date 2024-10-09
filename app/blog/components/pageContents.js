'use client'

import React from 'react';

export const TableOfContents = ({ toc, activeId }) => {
  return (
    <nav className="toc">
      <h2 className="text-xl font-semibold mb-4 text-primary">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li 
            key={item.id} 
            className={`pl-${(item.level - 1) * 4} ${activeId === item.id ? 'font-bold' : ''}`}
          >
            <a 
              href={`#${item.id}`} 
              className="text-blue-500 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};