'use client';

import Link from 'next/link';

export default function SamroSpotlightCard() {
  const deadline = new Date('2026-09-30');
  const now = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Spotlight: Creative & Media
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                SAMRO Music Creation Support Fund
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
                Grants of up to R25,000 for SAMRO Full and Associate Members to create new,
                royalty-generating musical works including albums, singles, compositions, music
                videos and scores. 120 grants available in this cycle.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900">Deadline:</span>
                  <span>30 September 2026</span>
                </div>
                <div className="hidden h-4 w-px bg-neutral-300 sm:block" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900">Days left:</span>
                  <span className="font-medium text-neutral-900">{daysLeft}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="https://www.samro.org.za/news/samro-opens-applications-for-the-music-creation-support-fund"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
                >
                  Apply on SAMRO
                </Link>
                <Link
                  href="/browse?industry=creative-media"
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
                >
                  Browse Creative & Media
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:w-56">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-neutral-500">Funding</div>
                <div className="text-lg font-bold text-neutral-900">Up to R25,000</div>
              </div>
              <div className="h-px w-full bg-neutral-200" />
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-neutral-500">Grants</div>
                <div className="text-lg font-bold text-neutral-900">120</div>
              </div>
              <div className="h-px w-full bg-neutral-200" />
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-neutral-500">For</div>
                <div className="text-sm font-semibold text-neutral-900">SAMRO Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
