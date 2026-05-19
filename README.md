# Vula

**Vula** means *open* in Zulu and Xhosa. This platform opens the door to South African small business funding — for registered and informal businesses alike.

## Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Supabase (Postgres, Auth, RLS, Edge Functions)
- Vercel (deployment)

## Getting started

```bash
npm install
cp .env.example .env.local
# Add your Supabase keys to .env.local
npm run dev
```

## Structure

```
app/
  page.tsx              # Home — three entry paths
  find/page.tsx         # Qualifying quiz
  browse/page.tsx       # Browse by industry
  directory/page.tsx    # Full funding directory
  fund/[slug]/page.tsx  # Individual opportunity page
  register/page.tsx     # Get registered guide
  submit/page.tsx       # Community submission form
components/
  ui/                   # Reusable primitives
  FundingCard.tsx
  QuizStep.tsx
  IndustryGrid.tsx
lib/
  supabase/             # Client + server helpers
  types.ts
```
