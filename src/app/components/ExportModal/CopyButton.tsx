'use client';

import { useState } from 'react';

import { Button } from '@/app/components';

export function CopyButton({ text }: { text: string }) {
  const [isCopying, setIsCopying] = useState(false);

  function copy() {
    setIsCopying(true);
    navigator.clipboard.writeText(text);
    const timeout = setTimeout(() => {
      setIsCopying(false);
      clearTimeout(timeout);
    }, 1000);
  }
  return (
    <Button onClick={copy} disabled={isCopying} className="self-end">
      {isCopying ? 'Copied!' : 'Copy'}
    </Button>
  );
}
