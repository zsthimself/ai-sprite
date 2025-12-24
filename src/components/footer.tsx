/**
 * @INPUT: [None]
 * @OUTPUT: [Component: Footer - Site footer with legal links]
 * @POS: [UI Component - Global footer with modern styling and hover effects]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/5 py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gradient-primary">AI Sprite Generator</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <Link
                            href="/privacy"
                            className="text-zinc-500 hover:text-white transition-colors hover-lift"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-zinc-500 hover:text-white transition-colors hover-lift"
                        >
                            Terms
                        </Link>
                        <a
                            href="mailto:support@example.com"
                            className="text-zinc-500 hover:text-white transition-colors hover-lift"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all hover-lift"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all hover-lift"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-zinc-600">
                    © {new Date().getFullYear()} AI Sprite Sheet Generator. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
