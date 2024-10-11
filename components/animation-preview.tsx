"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle } from 'lucide-react';

type AnimatedElement = {
  tag: string;
  class: string;
  html: string;
};

type ScannedData = {
  animatedElements: AnimatedElement[];
  styles: string;
  scripts: { src?: string; content?: string }[];
  hasResponsiveDesign: boolean;
  browserCompatibility: {
    chrome: boolean;
    firefox: boolean;
    safari: boolean;
    edge: boolean;
  };
};

export function AnimationPreview() {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SCANNED_DATA') {
        setScannedData(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!scannedData) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Animation Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No animation preview available. Scan a URL to see the preview.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Animation Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
            <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="border p-4 rounded-md">
              <style dangerouslySetInnerHTML={{ __html: scannedData.styles }} />
              {scannedData.animatedElements.map((el, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: el.html }} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="html">
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {scannedData.animatedElements.map((el) => el.html).join('\n')}
            </pre>
          </TabsContent>
          <TabsContent value="css">
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {scannedData.styles}
            </pre>
          </TabsContent>
          <TabsContent value="js">
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {scannedData.scripts.map((script) => script.content || `// External script: ${script.src}`).join('\n\n')}
            </pre>
          </TabsContent>
          <TabsContent value="compatibility">
            <Alert>
              <AlertTitle>Responsive Design</AlertTitle>
              <AlertDescription>
                {scannedData.hasResponsiveDesign ? (
                  <span className="flex items-center"><CheckCircle className="mr-2 text-green-500" /> Responsive design detected</span>
                ) : (
                  <span className="flex items-center"><XCircle className="mr-2 text-red-500" /> No responsive design detected</span>
                )}
              </AlertDescription>
            </Alert>
            <Alert className="mt-4">
              <AlertTitle>Browser Compatibility</AlertTitle>
              <AlertDescription>
                <ul>
                  {Object.entries(scannedData.browserCompatibility).map(([browser, isCompatible]) => (
                    <li key={browser} className="flex items-center">
                      {isCompatible ? (
                        <CheckCircle className="mr-2 text-green-500" />
                      ) : (
                        <XCircle className="mr-2 text-red-500" />
                      )}
                      {browser.charAt(0).toUpperCase() + browser.slice(1)}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}