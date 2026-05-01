// Texte genere, a faire valider par un juriste avant mise en production.
export default function PolitiqueCookiesPage() {
  return (
    <main className="prose prose-zinc max-w-4xl">
      <h1>Politique de cookies</h1>
      <p>
        Cette page explique les cookies utilises par Bazario, leur finalite, leur duree de conservation et la maniere
        de modifier votre consentement.
      </p>

      <h2>Tableau des cookies</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Finalite</th>
              <th className="p-2 text-left">Duree</th>
              <th className="p-2 text-left">Fournisseur</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200">
              <td className="p-2">bazario-consent</td>
              <td className="p-2">Memoriser vos preferences de consentement</td>
              <td className="p-2">13 mois maximum</td>
              <td className="p-2">Bazario</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="p-2">_fbp / _fbc</td>
              <td className="p-2">Mesure publicitaire Meta</td>
              <td className="p-2">Selon navigateur/pixel</td>
              <td className="p-2">Meta</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="p-2">_ttp</td>
              <td className="p-2">Mesure publicitaire TikTok</td>
              <td className="p-2">Selon navigateur/pixel</td>
              <td className="p-2">TikTok</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Modifier ou revoquer votre consentement</h2>
      <p>
        Vous pouvez modifier vos choix a tout moment via le bouton flottant <strong>Cookies</strong> present en bas a
        gauche du site.
      </p>
    </main>
  );
}
