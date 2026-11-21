import type { Metadata } from "next";
import { Inter, Playfair_Display, Alex_Brush } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const script = Alex_Brush({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ginikagodwin.com"),
  title: "Queenfineshii | Official Portfolio",
  description: "The official portfolio of Ginika Godwin, known as Queenfineshii. Content creator, musical artist, and entertainer.",
  keywords: ["Queenfineshii", "Ginika Godwin", "Content Creator", "Musical Artist", "Entertainer", "TikTok", "Instagram"],
  alternates: {
    canonical: "https://ginikagodwin.com",
    types: {
      "text/markdown": "/llms.txt",
    },
  },
  openGraph: {
    title: "Queenfineshii | Official Portfolio",
    description: "Content creator, musical artist, and entertainer.",
    url: "https://ginikagodwin.com",
    siteName: "Queenfineshii",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queenfineshii | Official Portfolio",
    description: "Content creator, musical artist, and entertainer.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ginikagodwin.com/#website",
      "url": "https://ginikagodwin.com",
      "name": "Queenfineshii",
      "description": "The official portfolio and entertainment hub of Ginika Godwin (Queenfineshii).",
      "publisher": {
        "@id": "https://ginikagodwin.com/#person",
      },
    },
    {
      "@type": ["Person", "MusicGroup"],
      "@id": "https://ginikagodwin.com/#person",
      "name": "Ginika Godwin",
      "alternateName": "Queenfineshii",
      "url": "https://ginikagodwin.com",
      "description": "Nigerian-born content creator, musical artist, and entertainer known for viral comedy, music, and performances.",
      "jobTitle": "Musical Artist & Content Creator",
      "email": "hello@ginikagodwin.com",
      "sameAs": [
        "https://tiktok.com/@queenfineshii",
        "https://www.instagram.com/iamginikagodwin",
        "https://x.com/queenfineshii",
        "https://youtube.com/@GinikaGodwin",
        "https://facebook.com/ginikagodwinn",
        "https://twitch.tv/ginikagodwinn",
        "https://snapchat.com/add/queenfineshii",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "management",
        "email": "hello@ginikagodwin.com",
        "availableLanguage": ["English"],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${script.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Agent Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
