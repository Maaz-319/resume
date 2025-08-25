import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maaz Bin Asif",
  description: "Maaz Bin Asif Portfolio and Resume. I’m a passionate Software Developer and Computer Science student building modern web apps, AI tools, and mobile experiences using Next.js, Python, Kotlin, and more.",
  keywords: [
    'Maaz Bin Asif',
    'Software Developer',
    'Web Developer Portfolio',
    'AI Projects | RAG',
    'Next.js Developer',
    'Frontend Developer',
    'Mobile App Developer',
    'Python',
    'Kotlin',
    'React',
    'Portfolio Website',
  ],
  authors: [{ name: 'Maaz Bin Asif', url: 'https://maazai.tech' }],
  creator: 'Maaz Bin Asif',
  publisher: 'Maaz Bin Asif',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/jsm-logo.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
