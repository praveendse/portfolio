import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import VantaBackground from "@/components/VantaBackground";

export const metadata: Metadata = {
  title: "Praveen De Silva | Portfolio",
  description: "Portfolio of Praveen De Silva - Engineering Undergraduate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#000000] text-white font-sans flex flex-col">
        <VantaBackground />
        <Navigation />
        <main className="flex-grow">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}