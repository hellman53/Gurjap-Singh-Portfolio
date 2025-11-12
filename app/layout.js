import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gurjap Singh | Portfolio",
  description: "Welcome to the portfolio of Gurjap Singh — showcasing projects, skills, and creative work in web development and technology.",
  keywords: ["Gurjap Singh", "Portfolio", "Web Developer", "Frontend Developer", "React", "Next.js"],
  authors: [{ name: "Gurjap Singh" }],
  openGraph: {
    title: "Gurjap Singh | Portfolio",
    description: "Explore Gurjap Singh’s projects and achievements in web development and design.",
    siteName: "Gurjap Singh Portfolio",
    icons: {
      icon: "/image.png", // Your PNG icon
      shortcut: "/image.png",
      apple: "/image.png",
    },
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Gurjap Singh Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
