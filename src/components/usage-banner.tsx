/**
 * @INPUT: [Props: remainingGenerations, dailyLimit, canGenerate]
 * @OUTPUT: [Component: UsageBanner - Shows remaining generations and upgrade CTA]
 * @POS: [UI Component - Displays usage limit info with modern styling]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
'use client';

import { motion } from 'framer-motion';
import { Zap, Crown, Sparkles } from 'lucide-react';

interface UsageBannerProps {
    remainingGenerations: number;
    dailyLimit: number;
    canGenerate: boolean;
}

export function UsageBanner({ remainingGenerations, dailyLimit, canGenerate }: UsageBannerProps) {
    if (remainingGenerations === Infinity) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20"
            >
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Premium Member</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 py-3 px-5 rounded-xl bg-gray-100 border border-gray-200"
        >
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${canGenerate ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-gray-700 text-sm">
                    {canGenerate ? (
                        <>
                            <span className="font-bold text-gray-900">{remainingGenerations}</span>
                            <span className="text-gray-500">/{dailyLimit}</span>
                            <span className="ml-1 hidden sm:inline">free generations left</span>
                            <span className="ml-1 sm:hidden">left</span>
                        </>
                    ) : (
                        <span className="text-red-600 font-medium">Daily limit reached</span>
                    )}
                </span>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('/pricing', '_self')}
                className="flex items-center gap-1.5 py-1.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-sm font-bold transition-all hover:shadow-lg"
            >
                <Crown className="w-3.5 h-3.5" />
                <span>Upgrade</span>
            </motion.button>
        </motion.div>
    );
}
