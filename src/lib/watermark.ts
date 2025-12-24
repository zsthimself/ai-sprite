/**
 * @INPUT: [imageBuffer: Buffer, text: string]
 * @OUTPUT: [Buffer - Image with watermark]
 * @POS: [Utility Function - Adds watermark to images for free tier users]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
import sharp from 'sharp';

const WATERMARK_TEXT = 'AI Sprite Generator';
const WATERMARK_OPACITY = 0.4;

export async function addWatermark(imageBuffer: Buffer): Promise<Buffer> {
    // Get image metadata
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const width = metadata.width || 512;
    const height = metadata.height || 512;

    // Calculate font size based on image size
    const fontSize = Math.max(24, Math.floor(width / 16));

    // Create SVG watermark with diagonal text
    const svgWatermark = `
    <svg width="${width}" height="${height}">
      <defs>
        <pattern id="watermark" patternUnits="userSpaceOnUse" 
                 width="${fontSize * 12}" height="${fontSize * 6}" 
                 patternTransform="rotate(-30)">
          <text x="0" y="${fontSize}" 
                font-family="Arial, sans-serif" 
                font-size="${fontSize}px" 
                font-weight="bold"
                fill="rgba(255, 255, 255, ${WATERMARK_OPACITY})">
            ${WATERMARK_TEXT}
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark)"/>
    </svg>
  `;

    // Composite watermark onto image
    const watermarkedImage = await image
        .composite([
            {
                input: Buffer.from(svgWatermark),
                top: 0,
                left: 0,
            },
        ])
        .toBuffer();

    return watermarkedImage;
}
