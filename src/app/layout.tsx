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

const portfolioTitle = "Anatolii Tupkalo | UX/UI & Product Designer";
const portfolioDescription = "Explore Anatolii Tupkalo's UX/UI and product design portfolio, featuring intuitive digital experiences for EdTech, FinTech, SaaS, and enterprise platforms.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tolidenver.com"),
  title: portfolioTitle,
  description: portfolioDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Anatolii Tupkalo Portfolio",
    title: portfolioTitle,
    description: portfolioDescription,
    images: [{
      url: "https://portfolio-fawn-beta-44.vercel.app/img/me.jpg",
      width: 1420,
      height: 1416,
      alt: "Anatolii Tupkalo, UX/UI and Product Designer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioTitle,
    description: portfolioDescription,
    images: [{ url: "https://portfolio-fawn-beta-44.vercel.app/img/me.jpg", alt: "Anatolii Tupkalo, UX/UI and Product Designer" }],
  },
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
