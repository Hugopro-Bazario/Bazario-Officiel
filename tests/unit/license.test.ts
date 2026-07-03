import { describe, expect, it } from "vitest"
import { generateLicenseCode, verifyLicenseCode } from "@/lib/license"
import { PRODUCTS } from "@/lib/data"

describe("licences signées", () => {
  it("génère un code au format BZ-<PID>-<REF>-<SIG>", () => {
    const code = generateLicenseCode("p1", "cs_test_a1B2c3D4e5")
    expect(code).toMatch(/^BZ-P1-[A-Z0-9]{6}-[A-F0-9]{8}$/)
  })

  it("un code généré est vérifié authentique et retrouve le bon produit", () => {
    const product = PRODUCTS[4]
    const code = generateLicenseCode(product.id, "session_xyz_123456")
    const check = verifyLicenseCode(code)
    expect(check.valid).toBe(true)
    if (check.valid) expect(check.product.id).toBe(product.id)
  })

  it("est insensible à la casse et aux espaces", () => {
    const code = generateLicenseCode("p2", "ABCDEF")
    const check = verifyLicenseCode(`  ${code.toLowerCase()}  `)
    expect(check.valid).toBe(true)
  })

  it("rejette une signature falsifiée", () => {
    const code = generateLicenseCode("p1", "ABCDEF")
    const forged = code.slice(0, -8) + (code.endsWith("00000000") ? "11111111" : "00000000")
    expect(verifyLicenseCode(forged).valid).toBe(false)
  })

  it("rejette un code transplanté sur un autre produit", () => {
    const code = generateLicenseCode("p1", "ABCDEF")
    const swapped = code.replace("BZ-P1-", "BZ-P2-")
    expect(verifyLicenseCode(swapped).valid).toBe(false)
  })

  it("rejette les formats invalides et produits inconnus", () => {
    expect(verifyLicenseCode("n'importe quoi").valid).toBe(false)
    expect(verifyLicenseCode("BZ-P999-ABCDEF-DEADBEEF").valid).toBe(false)
  })

  it("deux références différentes donnent des codes différents", () => {
    expect(generateLicenseCode("p1", "AAAAAA")).not.toBe(generateLicenseCode("p1", "BBBBBB"))
  })
})
