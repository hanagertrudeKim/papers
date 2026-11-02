import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hana Kim — Software Engineer",
  description:
    "Software engineer and Gordon College CS student building offline healthcare tools, research software, and maintainable web products. Seeking SWE internships.",
  openGraph: {
    title: "Hana Kim — Software Engineer",
    description:
      "Selected work in offline healthcare, medical imaging, and shared front-end systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
