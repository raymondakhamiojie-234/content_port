import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Queenfineshii",
  description: "Privacy policy and data handling information for Queenfineshii official website.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-accent-gold mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-text-secondary leading-relaxed font-light">
          <p>
            Last Updated: November 2026
          </p>
          <p>
            Your privacy is important to us. This Privacy Policy explains how information is collected, used, and protected when you visit ginikagodwin.com or communicate with us through our contact channels.
          </p>
          <h2 className="text-2xl font-display text-white mt-8 mb-4 uppercase">Information We Collect</h2>
          <p>
            When you submit an enquiry through our contact form, we collect the details you provide: your name, company or organization, email address, phone number, opportunity type, and message content.
          </p>
          <h2 className="text-2xl font-display text-white mt-8 mb-4 uppercase">How We Use Information</h2>
          <p>
            We use the information provided solely to respond to business, collaboration, booking, or media enquiries. We do not sell, rent, or trade your personal data to third parties.
          </p>
          <h2 className="text-2xl font-display text-white mt-8 mb-4 uppercase">Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, please email us directly at{" "}
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
