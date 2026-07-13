import { submitOpportunity } from './actions'

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Submit an opportunity</h1>
        <p className="mt-2 text-sm text-gray-600">
          Share a funding opportunity for review. Submissions are saved as pending so you can verify them in Supabase before publishing.
        </p>
      </div>

      <form action={submitOpportunity} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="opportunity_name" className="mb-2 block text-sm font-medium text-gray-900">
              Opportunity name
            </label>
            <input
              id="opportunity_name"
              name="opportunity_name"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black"
              placeholder="e.g. NYDA Grant Programme"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="funder_name" className="mb-2 block text-sm font-medium text-gray-900">
              Funder name
            </label>
            <input
              id="funder_name"
              name="funder_name"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="e.g. National Youth Development Agency"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="Summarise what the opportunity offers, who it is for, and any important conditions."
            />
          </div>

          <div>
            <label htmlFor="amount_label" className="mb-2 block text-sm font-medium text-gray-900">
              Funding amount
            </label>
            <input
              id="amount_label"
              name="amount_label"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="e.g. Up to R250 000"
            />
          </div>

          <div>
            <label htmlFor="funding_type" className="mb-2 block text-sm font-medium text-gray-900">
              Funding type
            </label>
            <select
              id="funding_type"
              name="funding_type"
              required
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="grant">Grant</option>
              <option value="loan">Loan</option>
              <option value="equity">Equity</option>
              <option value="blended">Blended</option>
              <option value="revenue-based">Revenue-based</option>
              <option value="guarantee">Guarantee</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="apply_url" className="mb-2 block text-sm font-medium text-gray-900">
              Direct application URL
            </label>
            <input
              id="apply_url"
              name="apply_url"
              type="url"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="https://example.org/apply"
            />
          </div>

          <div>
            <label htmlFor="deadline" className="mb-2 block text-sm font-medium text-gray-900">
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label htmlFor="submitter_email" className="mb-2 block text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              id="submitter_email"
              name="submitter_email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="name@example.com"
            />
          </div>

          <fieldset className="sm:col-span-2">
            <legend className="mb-2 block text-sm font-medium text-gray-900">Sector tags</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'agriculture',
                'construction',
                'creative',
                'education',
                'energy',
                'fintech',
                'healthcare',
                'manufacturing',
                'retail',
                'technology',
                'tourism',
                'transport',
              ].map((sector) => (
                <label key={sector} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="sector_tags" value={sector} className="h-4 w-4" />
                  <span className="capitalize">{sector}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-900">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="Anything else your review team should know, such as source quality, eligibility concerns, or context."
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">All submissions are saved as pending for manual review.</p>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Submit opportunity
          </button>
        </div>
      </form>
    </main>
  )
}
