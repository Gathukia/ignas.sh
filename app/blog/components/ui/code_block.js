"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

const CodeBlock = ({ children, className, metastring, 'data-rehype-pretty-code-fragment': fragment, 'data-rehype-pretty-code-title': title }) => {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef(null);
  const language = className?.replace(/language-/, '');

  const copyToClipboard = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent;
      try {
        await navigator.clipboard.writeText(code || '');
        setIsCopied(true);
        toast.success('Code copied to clipboard!', {
          duration: 2000,
          position: 'bottom-right',
        });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        toast.error('Failed to copy code', {
          duration: 2000,
          position: 'bottom-right',
        });
      }
    }
  };

  useEffect(() => {
    if (preRef.current) {
      const words = metastring?.match(/\{([^}]+)\}/)?.[1].split(',').map(word => word.trim()) || [];
      words.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'g');
        preRef.current.innerHTML = preRef.current.innerHTML.replace(
          regex,
          '<span class="word-highlight">$1</span>'
        );
      });
    }
  }, [metastring]);

  return (
    <div className="relative group my-4">
      {title && (
        <div className="bg-card text-primary px-4 py-2 text-sm font-space-mono rounded-t-md">
          {title}
        </div>
      )}
      <pre
        ref={preRef}
        className={`${className} ${
          title ? 'rounded-b-md' : 'rounded-md'
        } p-4 overflow-x-auto text-sm font-space-mono bg-card text-primary`}
        style={{ marginTop: 0 }}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
        aria-label="Copy code"
      >
        {isCopied ? (
          <CheckIcon className="w-5 h-5 text-green-500" />
        ) : (
          <ClipboardIcon className="w-5 h-5 text-gray-300" />
        )}
      </button>
    </div>
  );
};

export default CodeBlock;
