import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Teyro — AI-Powered Learning That Actually Works",
  description: "Join 23,543+ on the waitlist for Teyro. AI-powered learning that guides you from confused to confident. Build skills, earn money, built for Africa.",
};

const fontAwesomeLink = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';

import { CartProvider } from "../context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href={fontAwesomeLink} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="flex-1" style={{ overflow: 'visible' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
