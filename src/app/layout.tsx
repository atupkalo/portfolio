import type { Metadata } from "next";
import Background from "@/components/Background/Background";
import { Geist, Geist_Mono, Titillium_Web, Lato, Roboto_Condensed } from "next/font/google";
import "./tailwind.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium-web",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "My work, experience, background, and skills in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${titilliumWeb.variable} ${lato.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Background />
        <div id="page">{children}</div>
      </body>
    </html>
  );
}
