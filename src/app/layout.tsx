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
  title: "Queenfineshii | Official Portfolio",
  description: "The official portfolio of Ginika Godwin, known as Queenfineshii. Content creator, musical artist, and entertainer.",
  keywords: ["Queenfineshii", "Ginika Godwin", "Content Creator", "Musical Artist", "Entertainer", "TikTok", "Instagram"],
  openGraph: {
    title: "Queenfineshii | Official Portfolio",
    description: "Content creator, musical artist, and entertainer.",
    url: "https://queenfineshii.com",
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
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
