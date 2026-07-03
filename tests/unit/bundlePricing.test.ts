import { describe, expect, it } from "vitest"
import {
  BUNDLES,
  computeCartBundleDiscount,
  findCompleteBundles,
  getBundleOriginalPrice,
  getBundleProducts,
  getBundleSavings,
} from "@/lib/bundles"
import { PRODUCTS } from "@/lib/data"

function baseLinesFor(bundleSlug: string) {
  const bundle = BUNDLES.find((b) => b.slug === bundleSlug)!
  return getBundleProducts(bundle).map((p) => ({ productId: p.id, qty: 1, price: p.price }))
}

describe("bundles catalog integrity", () => {
  it("every bundle references existing products", () => {
    for (const bundle of BUNDLES) {
      expect(getBundleProducts(bundle)).toHaveLength(bundle.productIds.length)
    }
  })

  it("every bundle price is strictly below the sum of its products", () => {
    for (const bundle of BUNDLES) {
      expect(bundle.price).toBeLessThan(getBundleOriginalPrice(bundle))
      expect(getBundleSavings(bundle)).toBeGreaterThan(0)
    }
  })
})

describe("computeCartBundleDiscount", () => {
  it("applies the saving when a bundle is complete at base prices", () => {
    const bundle = BUNDLES[0]
    const { discount, bundles } = computeCartBundleDiscount(baseLinesFor(bundle.slug))
    expect(bundles.map((b) => b.slug)).toContain(bundle.slug)
    expect(discount).toBe(getBundleSavings(bundle))
  })

  it("does not apply when a product of the bundle is missing", () => {
    const lines = baseLinesFor(BUNDLES[0].slug).slice(1)
    expect(computeCartBundleDiscount(lines).discount).toBe(0)
  })

  it("does not apply when a product is at a higher (non-base) variant price", () => {
    const lines = baseLinesFor(BUNDLES[0].slug)
    lines[0] = { ...lines[0], price: lines[0].price + 100 }
    expect(findCompleteBundles(lines)).toHaveLength(0)
  })

  it("cumulates savings across several complete bundles", () => {
    const lines = [...baseLinesFor(BUNDLES[0].slug), ...baseLinesFor(BUNDLES[1].slug)]
    const expected = getBundleSavings(BUNDLES[0]) + getBundleSavings(BUNDLES[1])
    expect(computeCartBundleDiscount(lines).discount).toBe(expected)
  })

  it("prorated cents allocation is exact for every bundle", () => {
    // Reproduit la répartition faite par l'API : la somme des unités remisées
    // doit valoir exactement le prix du pack, au centime près.
    for (const bundle of BUNDLES) {
      const items = getBundleProducts(bundle)
      const originalCents = items.reduce((s, p) => s + Math.round(p.price * 100), 0)
      const packCents = Math.round(bundle.price * 100)
      let allocated = 0
      items.forEach((p, i) => {
        const cents =
          i === items.length - 1
            ? packCents - allocated
            : Math.round((Math.round(p.price * 100) * packCents) / originalCents)
        allocated += cents
        expect(cents).toBeGreaterThan(0)
      })
      expect(allocated).toBe(packCents)
    }
  })

  it("bundle product ids stay disjoint (a product belongs to one pack only)", () => {
    const seen = new Set<string>()
    for (const bundle of BUNDLES) {
      for (const id of bundle.productIds) {
        expect(seen.has(id)).toBe(false)
        seen.add(id)
        expect(PRODUCTS.some((p) => p.id === id)).toBe(true)
      }
    }
  })
})
