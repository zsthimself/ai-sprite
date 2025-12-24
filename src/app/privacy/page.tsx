/**
 * @INPUT: [None]
 * @OUTPUT: [Page: Privacy Policy - Legal compliance page]
 * @POS: [Route Entry - /privacy]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy - AI Sprite Sheet Generator',
    description: 'Privacy Policy for AI Sprite Sheet Generator. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
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
                    Privacy Policy
                </h1>

                <p className="text-zinc-400 mb-8">Last updated: December 24, 2024</p>

                <div className="prose prose-invert prose-zinc max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">1. Introduction</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            AI Sprite Sheet Generator (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">2. Information We Collect</h2>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2">
                            <li><strong>Prompts:</strong> Text descriptions you provide to generate sprite sheets.</li>
                            <li><strong>Usage Data:</strong> How you interact with our service (stored locally in your browser).</li>
                            <li><strong>Payment Information:</strong> Processed securely by our payment providers (Creem/LemonSqueezy).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">3. How We Use Your Information</h2>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2">
                            <li>To generate sprite sheets based on your prompts.</li>
                            <li>To process payments and provide customer support.</li>
                            <li>To improve our AI models and service quality.</li>
                            <li>To send important service updates (if you opt-in).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">4. Data Storage</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We use local storage in your browser to track daily usage limits.
                            Generated images are processed through third-party AI services and are not permanently stored by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">5. Third-Party Services</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We use the following third-party services:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 mt-2">
                            <li><strong>Evolink.ai:</strong> For AI image generation.</li>
                            <li><strong>Creem/LemonSqueezy:</strong> For payment processing.</li>
                            <li><strong>Vercel:</strong> For hosting and analytics.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">6. Your Rights</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            You have the right to access, correct, or delete your personal data.
                            Contact us at support@example.com for any privacy-related requests.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">7. Contact Us</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at:
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
