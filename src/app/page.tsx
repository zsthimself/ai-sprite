/**
 * @INPUT: [None - Top level page]
 * @OUTPUT: [Component: Home - Main landing page]
 * @POS: [Route Entry - Orchestrates GeneratorConsole, SpritePreview, and UsageBanner]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GeneratorConsole } from '@/components/generator-console';
import { SpritePreview } from '@/components/sprite-preview';
import { UsageBanner } from '@/components/usage-banner';
import { useUsageLimit } from '@/hooks/use-usage-limit';
import { Sparkles, Zap, Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';
import { Footer } from '@/components/footer';

export default function Home() {
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { remainingGenerations, canGenerate, incrementUsage, dailyLimit, isLoaded } = useUsageLimit();

    const handleGenerateStart = () => {
        if (!canGenerate) {
            toast.error('Daily Limit Reached', {
                description: 'Upgrade to continue generating sprites!',
            });
            return false;
        }
        setIsLoading(true);
        setGeneratedImage(null);
        return true;
    };

    const handleGenerateSuccess = (imageUrl: string) => {
        setIsLoading(false);
        setGeneratedImage(imageUrl);
        incrementUsage();
        toast.success('Sprite sheet generated!', {
            description: 'Your magic has been woven into pixels.',
        });
    };

    const handleGenerateError = (errorMessage: string) => {
        setIsLoading(false);
        toast.error('Generation Failed', {
            description: errorMessage,
        });
    };

    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-purple-200">
            {/* Fixed Top Navigation Bar */}
            {isLoaded && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
                    <div className="container mx-auto px-4 py-3 flex justify-end items-center max-w-7xl">
                        <UsageBanner
                            remainingGenerations={remainingGenerations}
                            dailyLimit={dailyLimit}
                            canGenerate={canGenerate}
                        />
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.4]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-100 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-5xl" style={{ paddingTop: isLoaded ? '5rem' : '4rem' }}>
                    {/* Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-medium mb-6">
                            <Zap className="w-4 h-4" />
                            <span>Powered by AI Turbo Models</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            AI Sprite Sheet Generator
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                            Create professional game assets in seconds. Describe your character, choose a style, and let AI do the magic.
                        </p>
                    </motion.div>

                    {/* Generator Console */}
                    <GeneratorConsole
                        onGenerateStart={handleGenerateStart}
                        onGenerateSuccess={handleGenerateSuccess}
                        onGenerateError={handleGenerateError}
                        disabled={!canGenerate}
                        isPremium={remainingGenerations === Infinity}
                    />

                    {/* Result Preview */}
                    <SpritePreview imageUrl={generatedImage} isLoading={isLoading} />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-20 border-t border-gray-200">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: Zap, title: 'Lightning Fast', desc: 'Generate complete sprite sheets in seconds using the latest Turbo models.', color: 'blue' },
                            { icon: Gamepad2, title: 'Game Ready', desc: 'Optimized for game development with consistent styles and grid layouts.', color: 'purple' },
                            { icon: Sparkles, title: 'Multiple Styles', desc: 'From Pixel Art to Vector, choose the perfect style for your game.', color: 'pink' },
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all text-center"
                            >
                                <div className={`w-14 h-14 mx-auto bg-${feature.color}-50 rounded-xl flex items-center justify-center mb-4 text-${feature.color}-600`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
