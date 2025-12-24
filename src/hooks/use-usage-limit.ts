/**
 * @INPUT: [None]
 * @OUTPUT: [Hook: useUsageLimit - Manages daily generation limits]
 * @POS: [Custom Hook - LocalStorage-based usage tracking for free tier]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sprite_generator_usage';
const FREE_DAILY_LIMIT = 5;

interface UsageData {
    count: number;
    date: string;
    isPremium: boolean;
}

function getTodayString(): string {
    return new Date().toISOString().split('T')[0];
}

function getStoredUsage(): UsageData {
    if (typeof window === 'undefined') {
        return { count: 0, date: getTodayString(), isPremium: false };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return { count: 0, date: getTodayString(), isPremium: false };
        }

        const data: UsageData = JSON.parse(stored);

        // Reset count if it's a new day
        if (data.date !== getTodayString()) {
            return { count: 0, date: getTodayString(), isPremium: data.isPremium };
        }

        return data;
    } catch {
        return { count: 0, date: getTodayString(), isPremium: false };
    }
}

function saveUsage(data: UsageData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useUsageLimit() {
    const [usage, setUsage] = useState<UsageData>({ count: 0, date: getTodayString(), isPremium: false });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setUsage(getStoredUsage());
        setIsLoaded(true);
    }, []);

    const remainingGenerations = usage.isPremium
        ? Infinity
        : Math.max(0, FREE_DAILY_LIMIT - usage.count);

    const canGenerate = usage.isPremium || usage.count < FREE_DAILY_LIMIT;

    const incrementUsage = useCallback(() => {
        const newUsage = {
            ...usage,
            count: usage.count + 1,
            date: getTodayString(),
        };
        setUsage(newUsage);
        saveUsage(newUsage);
    }, [usage]);

    const setPremium = useCallback((isPremium: boolean) => {
        const newUsage = { ...usage, isPremium };
        setUsage(newUsage);
        saveUsage(newUsage);
    }, [usage]);

    return {
        usage,
        isLoaded,
        remainingGenerations,
        canGenerate,
        incrementUsage,
        setPremium,
        dailyLimit: FREE_DAILY_LIMIT,
    };
}
