export function WhyUsSection() {
  const points = [
    { title: "Livraison Europe", desc: "Expedition suivie sur l'ensemble de l'Europe avec delais annonces clairement." },
    { title: "30 jours satisfait ou rembourse", desc: "Retour possible sous 30 jours selon nos conditions de retour." },
    { title: "Paiement securise", desc: "Paiement traite de maniere securisee via Stripe." }
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Pourquoi nous</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {points.map((point) => (
          <article key={point.title} className="rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="font-semibold">{point.title}</h3>
            <p className="mt-2 text-sm text-zinc-700">{point.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
