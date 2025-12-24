/**
 * @INPUT: [Props: onGenerateStart, onGenerateSuccess, onGenerateError, disabled, isPremium]
 * @OUTPUT: [Component: GeneratorConsole - Main console interface with textarea and style cards]
 * @POS: [UI Component - Console-style generator interface for light mode]
 *
 * @SYNC: 一旦本文件逻辑发生变更,必须更新上述注释,并同步更新所属文件夹的 _META.md。
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Dice5, Check } from 'lucide-react';
import axios from 'axios';

interface GeneratorConsoleProps {
    onGenerateStart: () => boolean | void;
    onGenerateSuccess: (imageUrl: string) => void;
    onGenerateError: (error: string) => void;
    disabled?: boolean;
    isPremium?: boolean;
}

const STYLES = [
    { id: 'pixel-art', label: 'Pixel Art', preview: '👾', description: 'Classic 8-bit style' },
    { id: '16-bit', label: '16-Bit', preview: '🎮', description: 'Retro console era' },
    { id: 'vector', label: 'Vector', preview: '📐', description: 'Clean & scalable' },
    { id: 'anime', label: 'Anime', preview: '🌸', description: 'Japanese anime style' },
];

const EXAMPLE_PROMPTS = [
    'A brave knight wielding a glowing sword',
    'A cute slime monster bouncing happily',
    'A steampunk robot with brass gears',
    'A mystical forest wizard casting spells',
    'A fierce dragon breathing fire',
];

export function GeneratorConsole({
    onGenerateStart,
    onGenerateSuccess,
    onGenerateError,
    disabled = false,
    isPremium = false
}: GeneratorConsoleProps) {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState(STYLES[0].id);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleRandomPrompt = () => {
        const randomPrompt = EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)];
        setPrompt(randomPrompt);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading || disabled) return;

        const canProceed = onGenerateStart();
        if (canProceed === false) return;

        setIsLoading(true);

        try {
            const response = await axios.post('/api/generate', {
                prompt,
                style: STYLES.find(s => s.id === selectedStyle)?.label,
                isPremium,
            });

            if (response.data.imageUrl) {
                onGenerateSuccess(response.data.imageUrl);
            } else {
                throw new Error('No image URL returned from server');
            }
        } catch (error: any) {
            console.error('Generation error:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Failed to generate image';
            onGenerateError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-3xl mx-auto"
        >
            <form onSubmit={handleSubmit}>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Prompt Textarea */}
                    <div className="relative mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Describe your sprite
                        </label>
                        <div className={`relative rounded-xl transition-all duration-300 ${isFocused ? 'ring-2 ring-purple-500' : ''
                            }`}>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="e.g., A fire wizard casting a spell..."
                                disabled={isLoading}
                                className="w-full min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 resize-none transition-colors"
                            />
                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                <span className="text-xs text-gray-500">{prompt.length}/200</span>
                                <button
                                    type="button"
                                    onClick={handleRandomPrompt}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-purple-600 transition-all"
                                    title="Random prompt"
                                >
                                    <Dice5 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Style Visual Cards */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Choose style
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {STYLES.map((style) => {
                                const isSelected = selectedStyle === style.id;
                                return (
                                    <motion.button
                                        key={style.id}
                                        type="button"
                                        onClick={() => setSelectedStyle(style.id)}
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${isSelected
                                            ? 'bg-purple-50 border-purple-500 shadow-md'
                                            : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        {/* Selected checkmark */}
                                        <AnimatePresence>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    className="absolute top-2 right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center"
                                                >
                                                    <Check className="w-3 h-3 text-white" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <span className="text-3xl mb-2">{style.preview}</span>
                                        <span className={`text-sm font-medium ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                                            {style.label}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">{style.description}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading || !prompt.trim() || disabled}
                        whileHover={{ scale: disabled ? 1 : 1.01 }}
                        whileTap={{ scale: disabled ? 1 : 0.99 }}
                        className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${isLoading || !prompt.trim() || disabled
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating magic...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Generate Sprite Sheet
                            </span>
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
