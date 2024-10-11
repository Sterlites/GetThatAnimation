import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  const { url } = await request.json();

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // ... (rest of the code remains the same)

    return NextResponse.json({});

  } catch (error) {
    console.error('Error scanning URL:', error);
    return NextResponse.json({ 
      error: 'Failed to scan URL', 
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
