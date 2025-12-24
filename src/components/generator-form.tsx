/**
 * @INPUT: [Props: onGenerateStart, onGenerateSuccess, onGenerateError]
 * @OUTPUT: [Component: GeneratorForm - Form interface for user input]
 * @POS: [UI Component - Handles user input and API interaction trigger]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface GeneratorFormProps {
    onGenerateStart: () => boolean | void;
    onGenerateSuccess: (imageUrl: string) => void;
    onGenerateError: (error: string) => void;
    disabled?: boolean;
    isPremium?: boolean;
}

const STYLES = [
    { id: 'pixel-art', label: 'Pixel Art', icon: '👾' },
    { id: '16-bit', label: '16-Bit', icon: '🎮' },
    { id: 'vector', label: 'Vector', icon: '📐' },
    { id: 'anime', label: 'Anime', icon: '🌸' },
    { id: 'fantasy', label: 'Fantasy', icon: '🏰' },
];

export function GeneratorForm({ onGenerateStart, onGenerateSuccess, onGenerateError, disabled = false, isPremium = false }: GeneratorFormProps) {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState(STYLES[0].id);
    const [isLoading, setIsLoading] = useState(false);

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
        <Card className="w-full max-w-2xl mx-auto border-zinc-800 bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Create Your Sprite
                </CardTitle>
                <CardDescription className="text-center text-zinc-400">
                    Describe your character and choose a style to generate a unique sprite sheet.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <Label htmlFor="prompt" className="text-base font-medium text-zinc-200">
                            Description
                        </Label>
                        <div className="relative">
                            <Input
                                id="prompt"
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., A fire wizard casting a spell..."
                                className="h-14 pl-4 pr-12 bg-zinc-900/50 border-zinc-800 focus-visible:ring-purple-500 text-lg placeholder:text-zinc-600"
                                disabled={isLoading}
                            />
                            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-medium text-zinc-200">Style</Label>
                        <ToggleGroup
                            type="single"
                            value={selectedStyle}
                            onValueChange={(value) => value && setSelectedStyle(value)}
                            className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                        >
                            {STYLES.map((style) => (
                                <ToggleGroupItem
                                    key={style.id}
                                    value={style.id}
                                    aria-label={style.label}
                                    className="h-auto flex-col py-3 px-2 data-[state=on]:bg-purple-500/20 data-[state=on]:text-purple-300 data-[state=on]:border-purple-500/50 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200 transition-all"
                                    disabled={isLoading}
                                >
                                    <span className="text-2xl mb-2">{style.icon}</span>
                                    <span className="text-xs font-medium">{style.label}</span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/20 transition-all"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Generating Magic...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Generate Sprite Sheet
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
