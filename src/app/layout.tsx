import type { Metadata } from "next";
import { Montserrat, Source_Sans_3, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
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
  title: "OAFLAD #BuildingResilience",
  description:
    "Conférence panafricaine des Premières Dames — 17-18 Avril 2026, Libreville, Gabon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${sourceSans.variable} ${sourceCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
