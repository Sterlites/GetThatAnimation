"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type ScannedData = {
  animatedElements: { tag: string; class: string; html: string }[];
  styles: string;
  scripts: { src?: string; content?: string }[];
};

export function ExportOptions() {
  const [exportFormat, setExportFormat] = useState('react');
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [exportedCode, setExportedCode] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SCANNED_DATA') {
        setScannedData(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const generateExportedCode = () => {
    if (!scannedData) return '';

    const { animatedElements, styles, scripts } = scannedData;

    switch (exportFormat) {
      case 'react':
        return `
import React from 'react';

const AnimatedComponent = () => {
  return (
    <>
      <style jsx>{\`${styles}\`}</style>
      ${animatedElements.map(el => el.html).join('\n')}
    </>
  );
};

export default AnimatedComponent;
`;
      case 'vanilla':
        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animated Component</title>
  <style>${styles}</style>
</head>
<body>
  ${animatedElements.map(el => el.html).join('\n')}
  <script>
    ${scripts.map(script => script.content || `// External script: ${script.src}`).join('\n\n')}
  </script>
</body>
</html>
`;
      case 'html':
        return `
<!-- HTML -->
${animatedElements.map(el => el.html).join('\n')}

<!-- CSS -->
<style>
${styles}
</style>

<!-- JavaScript -->
<script>
${scripts.map(script => script.content || `// External script: ${script.src}`).join('\n\n')}
</script>
`;
      default:
        return '';
    }
  };

  const handleExport = () => {
    const code = generateExportedCode();
    setExportedCode(code);
toast({
  title: "Animation Exported",
  description: `Exported in ${exportFormat} format`,
} as any); // Use a type assertion to bypass the type checking error
  };

  return (
    <div className="flex flex-col gap-4">
      <Select value={exportFormat} onValueChange={setExportFormat}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React Component</SelectItem>
          <SelectItem value="vanilla">Vanilla JavaScript</SelectItem>
          <SelectItem value="html">HTML/CSS/JS</SelectItem>
        </SelectContent>
      </Select>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handleExport} disabled={!scannedData}>Export Animation</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Exported Animation Code</DialogTitle>
          </DialogHeader>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto max-h-[60vh] overflow-y-auto">
            {exportedCode}
          </pre>
          <Button onClick={() => {
            navigator.clipboard.writeText(exportedCode);
            toast({ title: "Copied to clipboard" });
          }}>
            Copy to Clipboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}