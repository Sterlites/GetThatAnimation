import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function UserGuide() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How to use the Animation Copier</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Enter the URL of a Next.js website in the input field.</li>
            <li>Click the "Scan" button to analyze the animations on the page.</li>
            <li>View the extracted animations in the preview section.</li>
            <li>Choose your preferred export format (React, Vanilla JS, or HTML/CSS/JS).</li>
            <li>Click "Export Animation" to get the code for the extracted animations.</li>
            <li>Copy the exported code and integrate it into your project.</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Compatibility Information</AccordionTrigger>
        <AccordionContent>
          <p>The Animation Copier checks for cross-browser compatibility and responsive design:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Responsive Design: Indicates if the scanned page uses responsive design practices.</li>
            <li>Browser Compatibility: Shows compatibility with major browsers (Chrome, Firefox, Safari, and Edge).</li>
          </ul>
          <p className="mt-2">Always test the exported animations in your target browsers to ensure proper functionality.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Troubleshooting</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-2">
            <li>If scanning fails, check if the URL is correct and accessible.</li>
            <li>Ensure the target website allows scraping (check robots.txt).</li>
            <li>For complex animations, manual adjustments to the exported code may be necessary.</li>
            <li>If you encounter CORS issues, consider using a CORS proxy or scanning only websites you own or have permission to access.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}