/**
 * @INPUT: [Props: children]
 * @OUTPUT: [Component: RootLayout - Global application shell]
 * @POS: [Root Layout - Defines global styles, fonts, and metadata]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Sprite Sheet Generator - Create Game Assets Instantly',
    description: 'Generate professional game sprite sheets in seconds using AI. Perfect for indie developers and artists.',
    keywords: ['ai sprite sheet generator', 'game assets', 'pixel art generator', 'sprite maker'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
