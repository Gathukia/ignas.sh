"use client"
import React, { useState} from "react";
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const CodeBlock = ({ className, children, title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {title && (
        <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-card text-gray-200 font-mono text-sm rounded-t-lg">
          {title}
        </div>
      )}
      <pre className={cn(
        "p-4 my-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-card overflow-x-auto",
        title && "pt-12",
        className
      )}>
        <code className="relative">
          {children}
        </code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-card text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default CodeBlock;
