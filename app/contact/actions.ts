'use server';

export interface ContactActionResult {
  success: boolean;
  message: string;
}

const ALLOWED_SUBJECTS = ['Correction', 'Question', 'Press/Outreach', 'Other'] as const;

function isAllowedSubject(value: string): value is (typeof ALLOWED_SUBJECTS)[number] {
  return (ALLOWED_SUBJECTS as readonly string[]).includes(value);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactActionResult | null,
  formData: FormData,
): Promise<ContactActionResult> {
  const honeypot = String(formData.get('company') ?? '').trim();
  if (honeypot.length > 0) {
    return { success: false, message: 'Submission rejected.' };
  }

  const tsRaw = formData.get('ts');
  const ts = Number(tsRaw);
  const now = Date.now();
  if (!Number.isFinite(ts) || now - ts < 3000 || now - ts > 60 * 60 * 1000) {
    return { success: false, message: 'Form session expired. Please try again.' };
  }

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const subject = String(formData.get('subject') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !subject || !message) {
    return { success: false, message: 'All fields are required.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (message.length < 30 || message.length > 2000) {
    return { success: false, message: 'Message must be between 30 and 2000 characters.' };
  }
  if (!isAllowedSubject(subject)) {
    return { success: false, message: 'Please pick a subject from the list.' };
  }

  console.warn('[contact] received submission', {
    subject,
    nameLength: name.length,
    messageLength: message.length,
  });

  return {
    success: true,
    message:
      "Thanks. Your message has been received. We don't autorespond, but substantive corrections and questions are read.",
  };
}
