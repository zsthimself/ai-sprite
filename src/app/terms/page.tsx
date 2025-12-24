/**
 * @INPUT: [None]
 * @OUTPUT: [Page: Terms of Service - Legal compliance page]
 * @POS: [Route Entry - /terms]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service - AI Sprite Sheet Generator',
    description: 'Terms of Service for AI Sprite Sheet Generator. Read our terms and conditions.',
};

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-black text-zinc-100">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
                >
                    ← Back to Home
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    Terms of Service
                </h1>

                <p className="text-zinc-400 mb-8">Last updated: December 24, 2024</p>

                <div className="prose prose-invert prose-zinc max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            By accessing and using AI Sprite Sheet Generator, you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">2. Service Description</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            AI Sprite Sheet Generator is an AI-powered tool that creates sprite sheets for game development.
                            We provide both free and paid tiers with different usage limits and features.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">3. Usage Rights</h2>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2">
                            <li>You own all rights to the sprite sheets you generate using our service.</li>
                            <li>You may use generated assets in personal and commercial projects.</li>
                            <li>You may not resell generated assets as-is without modification.</li>
                            <li>You may not use our service for illegal or harmful purposes.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">4. Free Tier Limitations</h2>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2">
                            <li>Limited to 5 generations per day.</li>
                            <li>Generated images include a watermark.</li>
                            <li>Background removal feature not available.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">5. Paid Plans</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Paid plans remove limitations and provide additional features.
                            All payments are processed securely through our payment partners.
                            Refunds are handled on a case-by-case basis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">6. Refund Policy</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Due to the digital nature of our service, refunds are generally not provided after credits have been used.
                            If you experience technical issues that prevent you from using the service,
                            please contact us within 7 days of purchase for a review.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">7. Disclaimer</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Our service is provided &quot;as is&quot; without warranties of any kind.
                            We do not guarantee that generated images will meet your specific requirements.
                            AI-generated content may occasionally produce unexpected results.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">8. Changes to Terms</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We reserve the right to modify these terms at any time.
                            Continued use of the service after changes constitutes acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">9. Contact</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            For any questions about these Terms of Service, please contact us at:
                            <br />
                            <a href="mailto:support@example.com" className="text-purple-400 hover:text-purple-300">
                                support@example.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
