"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function URLInput() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to scan URL');
      }

      // Send scanned data to the AnimationPreview component
      window.postMessage({ type: 'SCANNED_DATA', payload: data }, '*');

      toast({
        title: "URL Scanned Successfully",
        description: `Found ${data.animatedElements.length} animated elements`,
      });
    } catch (error) {
      console.error('Error scanning URL:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to scan URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter Next.js website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Scanning...' : 'Scan'}
        </Button>
      </div>
    </form>
  );
}