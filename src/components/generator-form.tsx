/**
 * @INPUT: [Props: onGenerateStart, onGenerateSuccess, onGenerateError]
 * @OUTPUT: [Component: GeneratorForm - Form interface for user input]
 * @POS: [UI Component - Handles user input and API interaction trigger]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

interface GeneratorFormProps {
    onGenerateStart: () => void;
    onGenerateSuccess: (imageUrl: string) => void;
    onGenerateError: (error: string) => void;
}

const STYLES = [
    { id: 'pixel-art', label: 'Pixel Art', icon: '👾' },
    { id: '16-bit', label: '16-Bit', icon: '🎮' },
    { id: 'vector', label: 'Vector', icon: '📐' },
    { id: 'anime', label: 'Anime', icon: '🌸' },
    { id: 'fantasy', label: 'Fantasy', icon: '🏰' },
];

export function GeneratorForm({ onGenerateStart, onGenerateSuccess, onGenerateError }: GeneratorFormProps) {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState(STYLES[0].id);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        onGenerateStart();

        try {
            const response = await axios.post('/api/generate', {
                prompt,
                style: STYLES.find(s => s.id === selectedStyle)?.label,
            });

            if (response.data.imageUrl) {
                onGenerateSuccess(response.data.imageUrl);
            } else {
                throw new Error('No image URL returned');
            }
        } catch (error: any) {
            console.error('Generation error:', error);
            onGenerateError(error.response?.data?.error || 'Failed to generate image');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Describe your sprite</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A fire wizard casting a spell..."
                            className="w-full px-4 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                            disabled={isLoading}
                        />
                        <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Choose Style</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {STYLES.map((style) => (
                            <button
                                key={style.id}
                                type="button"
                                onClick={() => setSelectedStyle(style.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedStyle === style.id
                                        ? 'bg-purple-500/10 border-purple-500 text-purple-400'
                                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                                    }`}
                                disabled={isLoading}
                            >
                                <span className="text-2xl mb-1">{style.icon}</span>
                                <span className="text-xs font-medium">{style.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Generate Sprite Sheet
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
