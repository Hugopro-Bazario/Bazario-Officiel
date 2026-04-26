import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { SiteChrome } from "@/components/layout/site-chrome"
import { CartProvider } from "@/lib/cart-store"
import { WishlistProvider } from "@/lib/wishlist-store"
import { RecentlyViewedProvider } from "@/lib/recently-viewed-store"
import { CookieConsent } from "@/components/legal/cookie-consent"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const siteUrl = "https://bazario.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bazario — Tout, mieux, partout.",
    template: "%s · Bazario",
  },
  description:
    "Bazario est la marketplace mondiale qui connecte acheteurs et vendeurs de confiance : mode, tech, maison, beauté et bien plus, livrés partout.",
  keywords: ["marketplace", "e-commerce", "shopping", "Bazario", "vendeurs vérifiés", "livraison gratuite"],
  authors: [{ name: "Bazario" }],
  creator: "Bazario",
  publisher: "Bazario",
  applicationName: "Bazario",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bazario — Tout, mieux, partout.",
    description: "La marketplace mondiale qui connecte acheteurs et vendeurs de confiance.",
    url: siteUrl,
    siteName: "Bazario",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/hero-summer.jpg",
        width: 1200,
        height: 630,
        alt: "Bazario — Marketplace mondiale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bazario — Tout, mieux, partout.",
    description: "La marketplace mondiale qui connecte acheteurs et vendeurs de confiance.",
    images: ["/hero-summer.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0E1A" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${display.variable} ${mono.variable} bg-background`}
    >
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-2 top-2 z-[100] rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Aller au contenu principal
        </a>
        <RecentlyViewedProvider>
          <WishlistProvider>
            <CartProvider>
              <Suspense fallback={null}>
                <SiteChrome>{children}</SiteChrome>
              </Suspense>
            </CartProvider>
          </WishlistProvider>
        </RecentlyViewedProvider>
        <CookieConsent />
      </body>
    </html>
  )
}
