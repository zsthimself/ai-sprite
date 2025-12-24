/**
 * @INPUT: [None - Top level page]
 * @OUTPUT: [Component: Home - Main landing page]
 * @POS: [Route Entry - Orchestrates GeneratorForm and SpritePreview]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
'use client';

import { useState } from 'react';
import { GeneratorForm } from '@/components/generator-form';
import { SpritePreview } from '@/components/sprite-preview';
import { Sparkles, Zap, Gamepad2 } from 'lucide-react';

export default function Home() {
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateStart = () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
    };

    const handleGenerateSuccess = (imageUrl: string) => {
        setIsLoading(false);
        setGeneratedImage(imageUrl);
    };

    const handleGenerateError = (errorMessage: string) => {
        setIsLoading(false);
        setError(errorMessage);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none"></div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Zap className="w-4 h-4" />
                            <span>Powered by Z Image Turbo</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                            AI Sprite Sheet Generator
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                            Create professional game assets in seconds. Just describe your character, choose a style, and let AI do the magic.
                        </p>
                    </div>

                    {/* Generator Interface */}
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        <GeneratorForm
                            onGenerateStart={handleGenerateStart}
                            onGenerateSuccess={handleGenerateSuccess}
                            onGenerateError={handleGenerateError}
                        />

                        {error && (
                            <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                                {error}
                            </div>
                        )}

                        <SpritePreview imageUrl={generatedImage} isLoading={isLoading} />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-20 border-t border-gray-800">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                        <p className="text-gray-400">Generate complete sprite sheets in seconds using the latest Turbo models.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-400">
                            <Gamepad2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Game Ready</h3>
                        <p className="text-gray-400">Optimized for game development with consistent styles and grid layouts.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-pink-400">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Multiple Styles</h3>
                        <p className="text-gray-400">From Pixel Art to High-Res Vector, choose the perfect style for your game.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
