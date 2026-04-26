import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { SiteChrome } from "@/components/layout/site-chrome"
import { CartProvider } from "@/lib/cart-store"

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

export const metadata: Metadata = {
  title: {
    default: "Bazario — Tout, mieux, partout.",
    template: "%s · Bazario",
  },
  description:
    "Bazario est la marketplace mondiale qui connecte acheteurs et vendeurs de confiance : mode, tech, maison, beauté et bien plus, livrés partout.",
  keywords: ["marketplace", "e-commerce", "shopping", "Bazario", "vendeurs", "produits"],
  authors: [{ name: "Bazario" }],
  openGraph: {
    title: "Bazario — Tout, mieux, partout.",
    description:
      "La marketplace mondiale qui connecte acheteurs et vendeurs de confiance.",
    type: "website",
    locale: "fr_FR",
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
        <CartProvider>
          <Suspense fallback={null}>
            <SiteChrome>{children}</SiteChrome>
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
