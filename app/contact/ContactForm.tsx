'use client';

import { useActionState, useMemo } from 'react';
import { submitContact, type ContactActionResult } from './actions';

const SUBJECTS = [
  { value: 'Correction', label: 'Correction' },
  { value: 'Question', label: 'Question' },
  { value: 'Press/Outreach', label: 'Press / Outreach' },
  { value: 'Other', label: 'Other' },
] as const;

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactActionResult | null, FormData>(
    submitContact,
    null,
  );
  const timestamp = useMemo(() => Date.now(), []);

  if (state?.success) {
    return (
      <div
        role="status"
        className="rounded border border-good bg-good/10 p-4 text-ink-900"
      >
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="ts" value={timestamp} />
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-company">
          Leave this field empty
          <input
            id="contact-company"
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-ink-900">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 block w-full rounded border border-ink-300 bg-white px-3 py-2 text-ink-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-ink-900">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 block w-full rounded border border-ink-300 bg-white px-3 py-2 text-ink-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-ink-900">
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className="mt-1 block w-full rounded border border-ink-300 bg-white px-3 py-2 text-ink-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        >
          <option value="" disabled>
            Select a subject
          </option>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-ink-900">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={30}
          maxLength={2000}
          rows={7}
          className="mt-1 block w-full rounded border border-ink-300 bg-white px-3 py-2 text-ink-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <p className="mt-1 text-xs text-ink-500">30–2000 characters.</p>
      </div>

      {state && !state.success ? (
        <div
          role="alert"
          className="rounded border border-danger bg-danger/10 p-3 text-sm text-ink-900"
        >
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
