/**
 * @INPUT: [Request body: { prompt, style, isPremium }]
 * @OUTPUT: [Response: { imageUrl } or { error }]
 * @POS: [API Route - Generates sprite sheet, adds watermark for free users]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
import { NextResponse } from 'next/server';
import { evolinkClient } from '@/lib/api-client';
import { addWatermark } from '@/lib/watermark';

export async function POST(request: Request) {
    console.log('[API] Generate request received');
    try {
        const { prompt, style, isPremium = false } = await request.json();
        console.log(`[API] Prompt: "${prompt}", Style: "${style}", Premium: ${isPremium}`);

        if (!process.env.EVOLINK_API_KEY) {
            console.error('[API] Error: EVOLINK_API_KEY not configured');
            return NextResponse.json({ error: 'Server configuration error: API Key missing' }, { status: 500 });
        }

        // Enhance prompt for sprite sheet
        const enhancedPrompt = `Sprite sheet of ${prompt}, ${style || 'pixel art'} style, white background, grid layout, consistent character, game asset, high quality, detailed`;
        console.log(`[API] Enhanced Prompt: "${enhancedPrompt}"`);

        // Start generation
        console.log('[API] Starting generation task...');
        const task = await evolinkClient.generateImage({
            prompt: enhancedPrompt,
            size: '1:1',
        });

        if (!task.id) {
            console.error('[API] Error: No task ID returned from Evolink API');
            return NextResponse.json({ error: 'Failed to start generation task' }, { status: 500 });
        }

        console.log(`[API] Task started. ID: ${task.id}`);

        // Poll for results
        let attempts = 0;
        const maxAttempts = 30; // 60 seconds max

        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const status = await evolinkClient.getTaskStatus(task.id);
            console.log(`[API] Polling task ${task.id}: ${status.status} (Attempt ${attempts + 1}/${maxAttempts})`);

            if (status.status === 'completed' && status.results && status.results.length > 0) {
                const originalImageUrl = status.results[0];
                console.log(`[API] Task ${task.id} completed. Original URL: ${originalImageUrl}`);

                // For premium users, return original image directly
                if (isPremium) {
                    console.log('[API] Premium user - returning original image');
                    return NextResponse.json({ imageUrl: originalImageUrl });
                }

                // For free users, add watermark
                try {
                    console.log('[API] Free user - adding watermark');

                    // Download the original image
                    const imageResponse = await fetch(originalImageUrl);
                    if (!imageResponse.ok) {
                        throw new Error('Failed to fetch generated image');
                    }
                    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

                    // Add watermark
                    const watermarkedBuffer = await addWatermark(imageBuffer);

                    // Return watermarked image as base64 data URL
                    const base64Image = watermarkedBuffer.toString('base64');
                    const dataUrl = `data:image/png;base64,${base64Image}`;

                    console.log('[API] Watermark added successfully');
                    return NextResponse.json({ imageUrl: dataUrl, watermarked: true });
                } catch (watermarkError: any) {
                    console.error('[API] Watermark error:', watermarkError);
                    // Fallback to original image if watermarking fails
                    return NextResponse.json({ imageUrl: originalImageUrl, watermarked: false });
                }
            }

            if (status.status === 'failed') {
                console.error(`[API] Task ${task.id} failed. Error: ${status.error?.message}`);
                return NextResponse.json({ error: status.error?.message || 'Generation failed' }, { status: 500 });
            }

            attempts++;
        }

        console.error(`[API] Task ${task.id} timed out after ${maxAttempts} attempts`);
        return NextResponse.json({ error: 'Generation timed out. Please try again.' }, { status: 504 });

    } catch (error: any) {
        console.error('[API] Unhandled exception:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

