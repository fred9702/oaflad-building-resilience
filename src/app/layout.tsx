import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceCode = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.resilience241.com"),
  title: "OAFLAD #BuildingResilience",
  description:
    "Conférence panafricaine des Premières Dames — 17 Avril 2026, Libreville, Gabon",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/common/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/common/apple-touch-icon.png",
  },
  openGraph: {
    title: "OAFLAD #BuildingResilience",
    description:
      "Conférence panafricaine des Premières Dames — 17 Avril 2026, Libreville, Gabon",
    type: "website",
    siteName: "OAFLAD #BuildingResilience",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${sourceSans.variable} ${sourceCode.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
