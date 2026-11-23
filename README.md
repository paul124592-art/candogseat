# CanDogsEat

Free web app that answers "can my dog eat this?" for 100+ foods. Search any food, filter by
category, and tap a food for its verdict (Safe / Caution / Toxic), a plain-English explanation,
and what to do if your dog eats something toxic.

## Run / build

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

No Stripe, no Supabase, no accounts, no backend — the whole app is client-side.

## Updating the food database

All food data lives in `src/data/foods.js` — one entry per food:

```js
{
  id: 'chocolate',
  name: 'Chocolate',
  category: 'Sweets',
  verdict: 'toxic',           // 'safe' | 'caution' | 'toxic'
  short: 'One-line summary shown on the card.',
  why: 'Plain-English explanation.',
  action: 'What to do (toxic/caution foods). Null for safe foods.',
  aliases: ['choc', 'cocoa'], // extra search terms
}
```

Verdicts follow published veterinary guidance (ASPCA, American Kennel Club, vet sources).
Where a food is genuinely debated or dose-dependent it is marked Caution and the
explanation says why. Do not guess a verdict — if unsure, mark Caution and explain.

Categories: Fruits, Vegetables, Meat & Fish, Dairy, Grains, Sweets, Nuts & Seeds, Other.

## Related apps (same maker)

- TimePawz — https://timepawz.site
- Merry Paws — https://paul124592-art-merry-t8we.bolt.host
- PawMatch — https://paul124592-art-pawma-ctqd.bolt.host
