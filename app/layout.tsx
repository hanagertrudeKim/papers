import type { Metadata } from "next";
import { DM_Serif_Display, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hana Kim — Global Problem Solving",
  description:
    "Software built around people and places. Explore Hana Kim’s projects across the Caribbean and South Korea.",
  openGraph: {
    title: "Hana Kim — Global Problem Solving",
    description:
      "A journey through mobile products, offline healthcare, and research tools across borders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSerif.variable} ${manrope.variable} ${jetbrains.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
