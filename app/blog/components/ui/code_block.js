import React from 'react';
import { cn } from '@/lib/utils'; // Utility function to combine class names

export const Code = ({ className, children, highlightedLines = [], ...props }) => {
  const codeLines = children.trim().split('\n');

  return (
    <pre
      className={cn(
        "relative mb-8 mt-6 mx-auto max-w-3xl px-6 p-4 shadow-lg rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700",
        "transition-transform duration-300 ease-in-out transform hover:-translate-y-2", // Floating effect
        className
      )}
      {...props}
      style={{
        padding: '1.5rem', // Add padding inside the code block
        marginLeft: '1.5rem', // Left margin for spacing
        marginRight: '1.5rem', // Right margin for spacing
      }}
    >
      <code className="relative block w-full">
        {codeLines.map((line, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full",
              highlightedLines.includes(index + 1) ? "bg-yellow-200 dark:bg-yellow-800" : ""
            )}
          >
            <span className="mr-4 select-none text-gray-400 dark:text-gray-600">
              {index + 1}
            </span>
            <span>{line}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};
