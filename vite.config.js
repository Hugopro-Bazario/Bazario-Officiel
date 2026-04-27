import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        checkout: resolve(__dirname, "checkout.html"),
        about: resolve(__dirname, "a-propos.html"),
        faq: resolve(__dirname, "faq.html"),
        returns: resolve(__dirname, "politique-de-retours.html"),
        delivery: resolve(__dirname, "delais-de-livraison.html"),
        contact: resolve(__dirname, "contact.html"),
        terms: resolve(__dirname, "cgv.html"),
        legal: resolve(__dirname, "mentions-legales.html"),
        privacy: resolve(__dirname, "politique-de-confidentialite.html")
      }
    }
  }
});
