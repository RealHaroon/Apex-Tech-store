import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Apex Tech Store — Genuine Software, Real Skills, Trusted Setup",
  description:
    "Apex Tech Store: genuine software licenses, setup & activation, PC repair, skill mentorship, and tech accessories in Hyderabad, Sindh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased text-ink bg-white leading-relaxed">
        {children}
      </body>
    </html>
  );
}
