import { NextResponse } from 'next/server';
import { evolinkClient } from '@/lib/api-client';

export async function POST(request: Request) {
    try {
        const { prompt, style } = await request.json();

        if (!process.env.EVOLINK_API_KEY) {
            return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
        }

        // Enhance prompt for sprite sheet
        // We can make this more sophisticated later
        const enhancedPrompt = `Sprite sheet of ${prompt}, ${style || 'pixel art'} style, white background, grid layout, consistent character, game asset, high quality, detailed`;

        // Start generation
        const task = await evolinkClient.generateImage({
            prompt: enhancedPrompt,
            size: '1:1',
        });

        if (!task.id) {
            return NextResponse.json({ error: 'Failed to start generation' }, { status: 500 });
        }

        // Poll for results
        let attempts = 0;
        const maxAttempts = 30; // 60 seconds max

        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const status = await evolinkClient.getTaskStatus(task.id);

            if (status.status === 'completed' && status.results && status.results.length > 0) {
                return NextResponse.json({ imageUrl: status.results[0] });
            }

            if (status.status === 'failed') {
                return NextResponse.json({ error: status.error?.message || 'Generation failed' }, { status: 500 });
            }

            attempts++;
        }

        return NextResponse.json({ error: 'Generation timed out' }, { status: 504 });

    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
