import { defineConfig } from "vitest/config"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

// Résout l'alias "@/" (identique à tsconfig) pour tester le code de l'app.
const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: { "@": root },
  },
})
