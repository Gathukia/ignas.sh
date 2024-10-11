// CopyButton.js
'use client'

import React from 'react';
import { toast, Toaster } from 'sonner';
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from 'lucide-react';

const CopyButton = ({ code }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 p-1"
        onClick={handleCopy}
      >
        <ClipboardCopy className="h-4 w-4" />
      </Button>
      <Toaster />
    </>
  );
};

export default CopyButton;