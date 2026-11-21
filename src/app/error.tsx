"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl md:text-5xl font-display text-accent-gold mb-4 uppercase">
        Something went wrong
      </h2>
      <p className="text-text-secondary max-w-md mb-8">
        We encountered a temporary hiccup loading this page. Please try refreshing.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-accent-gold text-black font-semibold rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors uppercase tracking-wider text-sm"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
