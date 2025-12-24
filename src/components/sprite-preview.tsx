/**
 * @INPUT: [Props: imageUrl, isLoading]
 * @OUTPUT: [Component: SpritePreview - Displays generated sprite sheet]
 * @POS: [UI Component - Visual feedback for generation result]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
'use client';

import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface SpritePreviewProps {
    imageUrl: string | null;
    isLoading: boolean;
}

export function SpritePreview({ imageUrl, isLoading }: SpritePreviewProps) {
    const [zoom, setZoom] = useState(1);

    if (!imageUrl && !isLoading) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Result</h3>
                {imageUrl && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white transition-colors"
                            title="Zoom Out"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white transition-colors"
                            title="Zoom In"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                        <a
                            href={imageUrl}
                            download="sprite-sheet.png"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </a>
                    </div>
                )}
            </div>

            <div className="relative w-full aspect-square bg-[url('/grid-pattern.svg')] bg-gray-950 rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
                        </div>
                        <div className="text-purple-400 font-medium animate-pulse">Generating magic...</div>
                    </div>
                ) : imageUrl ? (
                    <div className="overflow-hidden w-full h-full flex items-center justify-center p-4">
                        <img
                            src={imageUrl}
                            alt="Generated Sprite Sheet"
                            style={{ transform: `scale(${zoom})` }}
                            className="max-w-full max-h-full object-contain transition-transform duration-200"
                        />
                    </div>
                ) : (
                    <div className="text-gray-600">No image generated yet</div>
                )}
            </div>
        </div>
    );
}
