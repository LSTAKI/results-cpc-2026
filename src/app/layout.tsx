import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#040711",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cpc-results-2026.vtu.ac.in"),
  title: "CPC Entrance Test Results 2026 | Competitive Programming Club",
  description:
    "Official CPC Entrance Test 2026 results portal of the Competitive Programming Club, Visvesvaraya Technological University, Belagavi.",
  keywords: [
    "CPC",
    "Competitive Programming Club",
    "VTU Belagavi",
    "Visvesvaraya Technological University",
    "Entrance Test 2026",
    "Results 2026",
    "CPC Results",
  ],
  authors: [
    {
      name: "Competitive Programming Club, VTU Belagavi",
    },
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/cpc-logo.png",
  },
  openGraph: {
    title: "CPC Entrance Test Results 2026",
    description:
      "Official CPC Entrance Test 2026 results portal of the Competitive Programming Club, Visvesvaraya Technological University, Belagavi.",
    siteName: "Competitive Programming Club, VTU Belagavi",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/cpc-logo.png",
        width: 500,
        height: 500,
        alt: "CPC Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "CPC Entrance Test Results 2026",
    description:
      "Official CPC Entrance Test 2026 results portal of the Competitive Programming Club, Visvesvaraya Technological University, Belagavi.",
    images: ["/cpc-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for official institutional portal
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Competitive Programming Club",
    alternateName: "CPC VTU",
    url: "https://cpc-results-2026.vtu.ac.in",
    logo: "https://cpc-results-2026.vtu.ac.in/cpc-logo.png",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Visvesvaraya Technological University, Belagavi",
    },
    event: {
      "@type": "Event",
      name: "CPC Entrance Test 2026",
      eventStatus: "https://schema.org/EventScheduled",
      organizer: {
        "@type": "Organization",
        name: "Competitive Programming Club",
      },
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#040711] bg-grid-pattern text-slate-100 antialiased min-h-screen selection:bg-sky-500/30 selection:text-sky-200`}
      >
        {children}
      </body>
    </html>
  );
}
