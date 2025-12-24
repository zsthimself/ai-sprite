/**
 * @INPUT: [Props: imageUrl, isLoading]
 * @OUTPUT: [Component: SpritePreview - Displays generated sprite sheet with checkerboard bg]
 * @POS: [UI Component - Visual feedback for generation result]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
'use client';

import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface SpritePreviewProps {
    imageUrl: string | null;
    isLoading: boolean;
}

const LOADING_MESSAGES = [
    'Sketching poses...',
    'Rendering pixels...',
    'Applying style...',
    'Final polish...',
];

export function SpritePreview({ imageUrl, isLoading }: SpritePreviewProps) {
    const [zoom, setZoom] = useState(1);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    // Rotate loading messages
    useEffect(() => {
        if (!isLoading) {
            setLoadingMessageIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [isLoading]);

    if (!imageUrl && !isLoading) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-3xl mx-auto mt-8"
        >
            <div className="console-container overflow-hidden">
                {/* Header with tools */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h3 className="text-lg font-semibold text-zinc-100">Result</h3>
                    {imageUrl && (
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                                title="Zoom Out"
                                className="h-8 w-8 hover:bg-white/5"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                                title="Zoom In"
                                className="h-8 w-8 hover:bg-white/5"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </Button>
                            <Button
                                asChild
                                className="btn-gradient-primary text-white h-8 px-4"
                            >
                                <a
                                    href={imageUrl}
                                    download="sprite-sheet.png"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PNG
                                </a>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Preview area with checkerboard */}
                <div className="relative w-full aspect-square checkerboard-bg flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-6 p-8"
                            >
                                {/* Animated loading indicator */}
                                <div className="relative w-24 h-24">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-blue-500"
                                    />
                                    <div className="absolute inset-2 rounded-full bg-[#161616] flex items-center justify-center">
                                        <motion.span
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="text-3xl"
                                        >
                                            ✨
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Rotating loading message */}
                                <div className="text-center">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={loadingMessageIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-zinc-400 text-sm"
                                        >
                                            {LOADING_MESSAGES[loadingMessageIndex]}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                {/* Progress bar */}
                                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 10, ease: 'linear' }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                    />
                                </div>
                            </motion.div>
                        ) : imageUrl ? (
                            <motion.div
                                key="image"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="overflow-hidden w-full h-full flex items-center justify-center p-4"
                            >
                                <img
                                    src={imageUrl}
                                    alt="Generated Sprite Sheet"
                                    style={{ transform: `scale(${zoom})` }}
                                    className="max-w-full max-h-full object-contain transition-transform duration-200"
                                />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
