'use client';

import { Button } from '@konopskidev/ui';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    setCopied(true);
    const resetTimer = setTimeout(() => setCopied(false), 1500);

    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Copied to clipboard'))
      .catch(() => {
        clearTimeout(resetTimer);
        setCopied(false);
        toast.error('Could not copy to clipboard');
      });
  }

  return (
    <Button type="button" onClick={copy} disabled={copied}>
      {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}
