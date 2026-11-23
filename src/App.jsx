import { useMemo, useState } from 'react'
import { FOODS, CATEGORIES } from './data/foods.js'

const VERDICT_STYLE = {
  safe: {
    label: 'Safe',
    badge: 'bg-green-100 text-green-800 border-green-300',
    dot: 'bg-green-500',
    cardBorder: 'border-green-200',
  },
  caution: {
    label: 'Caution',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    dot: 'bg-amber-500',
    cardBorder: 'border-amber-200',
  },
  toxic: {
    label: 'Toxic',
    badge: 'bg-red-100 text-red-800 border-red-300',
    dot: 'bg-red-500',
    cardBorder: 'border-red-200',
  },
}

const POPULAR = ['Chocolate', 'Grapes', 'Peanut butter', 'Avocado', 'Onions', 'Xylitol', 'Bananas', 'Cheese']

const FAQS = [
  {
    q: 'What should I do if my dog ate chocolate?',
    a: 'Call your vet right away, or ASPCA Animal Poison Control at (888) 426-4435 in the US. Tell them what kind of chocolate your dog ate, how much, and when. Do not wait for symptoms, and do not try to make your dog vomit unless a vet tells you to. Dark and baking chocolate are the most dangerous; milk chocolate is less toxic but still a reason to call.',
  },
  {
    q: 'Are all grapes toxic to dogs?',
    a: 'Yes. Grapes, raisins, currants, and sultanas can all cause sudden kidney failure in dogs, and no amount has been proved safe. Even a few grapes can be dangerous, and the toxic dose varies from dog to dog, so any amount is a reason to call your vet immediately.',
  },
  {
    q: 'Can dogs eat peanut butter?',
    a: 'Yes, as long as it does not contain xylitol (also sold as birch sugar). Plain peanut butter with no added sweetener is safe in small amounts. Always check the label — some sugar-free peanut butters use xylitol, which is extremely toxic to dogs and can cause a dangerous drop in blood sugar and liver failure.',
  },
  {
    q: 'Can dogs eat avocado?',
    a: 'It is best to avoid avocado. The pit, skin, and leaves contain persin, a toxin that can cause vomiting and diarrhea in dogs, and the pit is also a choking and blockage hazard. The flesh is very high in fat, which can upset your dog’s stomach and, in larger amounts, trigger pancreatitis.',
  },
  {
    q: 'How much people food can my dog have?',
    a: 'Treats — including any safe people food — should make up no more than about 10% of your dog’s daily calories. The other 90% should come from a complete and balanced dog food. Even safe foods should be served plain, without seasoning, sauces, bones, or added salt and sugar.',
  },
  {
    q: 'Is this a substitute for vet advice?',
    a: 'No. CanDogsEat gives general guidance based on published veterinary advice from the ASPCA and the American Kennel Club. Every dog is different, and puppies, small dogs, and dogs with health conditions can react differently. If your dog eats something toxic or seems unwell, contact your vet immediately.',
  },
]

const OTHER_APPS = [
  {
    name: 'TimePawz',
    tagline: 'An online scrapbook for your pets — photos, timelines, and milestones.',
    url: 'https://timepawz.site',
  },
  {
    name: 'Merry Paws',
    tagline: 'Turn your pet’s photo into a holiday card in 30 seconds.',
    url: 'https://paul124592-art-merry-t8we.bolt.host',
  },
  {
    name: 'PawMatch',
    tagline: 'Answer 10 questions and find the dog breed that fits your life.',
    url: 'https://paul124592-art-pawma-ctqd.bolt.host',
  },
]

function VerdictBadge({ verdict, size = 'md' }) {
  const v = VERDICT_STYLE[verdict]
  const cls =
    size === 'lg'
      ? 'text-base px-4 py-1.5'
      : 'text-xs px-2.5 py-0.5'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold ${v.badge} ${cls}`}
    >
      <span className={`h-2 w-2 rounded-full ${v.dot}`} />
      {v.label}
    </span>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  const counts = useMemo(() => {
    const c = { All: FOODS.length }
    for (const cat of CATEGORIES) c[cat] = FOODS.filter((f) => f.category === cat).length
    return c
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FOODS.filter((f) => {
      if (category !== 'All' && f.category !== category) return false
      if (!q) return true
      const hay = [f.name, f.category, f.short, f.why, ...(f.aliases || [])]
        .join(' ')
        .toLowerCase()
      return q.split(/\s+/).every((word) => hay.includes(word))
    })
  }, [query, category])

  const toxicCount = FOODS.filter((f) => f.verdict === 'toxic').length
  const safeCount = FOODS.filter((f) => f.verdict === 'safe').length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-leaf-500 text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:py-14">
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            CanDogsEat
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-green-50">
            Check any food before you share it with your dog.
          </p>
          <p className="mt-4 text-sm font-semibold text-green-100">
            {FOODS.length} foods checked · {safeCount} safe · {toxicCount} toxic — based on ASPCA
            and AKC guidance
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        {/* Search */}
        <div className="relative -mt-6 rounded-2xl bg-white p-4 shadow-md sm:p-6">
          <label htmlFor="food-search" className="sr-only">
            Search a food
          </label>
          <input
            id="food-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a food — try chocolate, grapes, peanut butter…"
            className="w-full rounded-xl border-2 border-leaf-100 bg-stone-50 px-4 py-3 text-lg outline-none placeholder:text-stone-400 focus:border-leaf-500"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-stone-500">Popular:</span>
            {POPULAR.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setQuery(p)}
                className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-700 hover:bg-leaf-100 hover:text-leaf-700"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Category chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-bold ${
                  category === cat
                    ? 'bg-leaf-500 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-leaf-100'
                }`}
              >
                {cat} ({counts[cat]})
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="mt-6 text-sm font-semibold text-stone-500">
          {results.length} {results.length === 1 ? 'food' : 'foods'}
          {query ? ` matching “${query}”` : ''}
          {category !== 'All' ? ` in ${category}` : ''}
        </p>

        {results.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-bold text-stone-700">No foods match that search yet.</p>
            <p className="mt-2 text-stone-500">
              Try a different spelling, or browse a category above. When in doubt about a food,
              do not feed it — ask your vet first.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((food) => (
              <button
                key={food.id}
                type="button"
                onClick={() => setSelected(food)}
                className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${VERDICT_STYLE[food.verdict].cardBorder}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold leading-snug text-stone-800">
                    {food.name}
                  </h3>
                  <VerdictBadge verdict={food.verdict} />
                </div>
                <p className="mt-1 text-sm text-stone-500">{food.category}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{food.short}</p>
                <p className="mt-3 text-sm font-bold text-leaf-600">Tap for details →</p>
              </button>
            ))}
          </div>
        )}

        {/* More from the same maker */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-stone-800">
            More from the same maker
          </h2>
          <p className="mt-1 text-stone-500">
            More free pet apps from the maker of CanDogsEat.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {OTHER_APPS.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-display text-lg font-semibold text-leaf-700">{app.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{app.tagline}</p>
                <p className="mt-3 text-sm font-bold text-leaf-600">Open {app.name} →</p>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-stone-800">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="font-bold text-stone-800">{faq.q}</span>
                  <span className="shrink-0 text-xl font-bold text-leaf-600">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="border-t border-stone-100 px-5 py-4 text-sm leading-relaxed text-stone-600">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center">
          <p className="text-sm leading-relaxed text-stone-600">
            General guidance only — not a substitute for vet advice. If your dog eats something
            toxic, contact your vet immediately.
          </p>
          <p className="mt-2 text-sm font-bold text-stone-700">
            US poison help: ASPCA Animal Poison Control (888) 426-4435 — available 24/7.
          </p>
          <p className="mt-2 text-xs text-stone-400">
            CanDogsEat · Verdicts based on published guidance from the ASPCA and the American
            Kennel Club.
          </p>
        </div>
      </footer>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold text-stone-800">
                  {selected.name}
                </h2>
                <p className="mt-0.5 text-sm font-semibold text-stone-500">{selected.category}</p>
              </div>
              <VerdictBadge verdict={selected.verdict} size="lg" />
            </div>
            <p className="mt-4 text-base font-bold text-stone-800">{selected.short}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">{selected.why}</p>
            {selected.action && (
              <div
                className={`mt-4 rounded-xl border p-4 ${
                  selected.verdict === 'toxic'
                    ? 'border-red-200 bg-red-50'
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <p className="text-sm font-bold text-stone-800">
                  {selected.verdict === 'toxic' ? 'What to do' : 'Be careful'}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-stone-700">{selected.action}</p>
              </div>
            )}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-xl bg-leaf-500 px-4 py-3 font-bold text-white hover:bg-leaf-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
