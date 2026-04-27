import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        checkout: resolve(__dirname, "checkout.html"),
        catalogue: resolve(__dirname, "catalogue.html"),
        panier: resolve(__dirname, "panier.html"),
        merci: resolve(__dirname, "merci.html")
      }
    }
  }
});
