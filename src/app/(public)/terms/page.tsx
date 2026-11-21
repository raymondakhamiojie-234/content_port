import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Queenfineshii",
  description: "Terms of service and usage conditions for Queenfineshii official website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-accent-gold mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6 text-text-secondary leading-relaxed font-light">
          <p>
            Last Updated: November 2026
          </p>
          <p>
            Welcome to the official website of Ginika Godwin (Queenfineshii). By accessing ginikagodwin.com, you agree to comply with and be bound by these terms.
          </p>
          <h2 className="text-2xl font-display text-white mt-8 mb-4 uppercase">Intellectual Property</h2>
          <p>
            All content published on this website, including music, media, photography, branding, trademarks, and text, is the property of Ginika Godwin or licensed for use and is protected by copyright and intellectual property laws.
          </p>
          <h2 className="text-2xl font-display text-white mt-8 mb-4 uppercase">Bookings & Enquiries</h2>
          <p>
            Submitting a form through our website does not constitute a legally binding agreement for performances, appearances, or sponsorships until formal contracts are executed by authorized representatives.
          </p>
          <h2 className="text-2xl font-display text-white mt-8 mb-4 uppercase">Inquiries</h2>
          <p>
            For legal or management inquiries, contact us at{" "}
            <a href="mailto:hello@ginikagodwin.com" className="text-accent-gold underline">
              hello@ginikagodwin.com
            </a>.
          </p>
          <div className="pt-8">
            <Link href="/" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors uppercase tracking-wider text-xs font-semibold">
              ← Return Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
