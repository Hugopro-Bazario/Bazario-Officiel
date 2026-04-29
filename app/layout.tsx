import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bazario-official.com"),
  title: "Bazario | Marketplace dropshipping",
  description: "Catalogue de produits utiles en dropshipping mono-vendeur.",
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <AppProviders>
          <Header />
          <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
