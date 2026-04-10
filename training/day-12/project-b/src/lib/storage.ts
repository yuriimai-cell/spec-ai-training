import { DraftPayload, PhaseId, PhaseFormState } from './types';

const KEY_PREFIX = 'meeting_draft_';

function getKey(phase: PhaseId): string {
  return `${KEY_PREFIX}${phase}`;
}

export function saveDraft(phase: PhaseId, form: PhaseFormState): void {
  if (typeof window === 'undefined') return;
  const payload: DraftPayload = {
    version: 1,
    savedAt: Date.now(),
    form,
  };
  try {
    localStorage.setItem(getKey(phase), JSON.stringify(payload));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

export function loadDraft(phase: PhaseId): DraftPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(getKey(phase));
    if (!raw) return null;
    const payload = JSON.parse(raw) as DraftPayload;
    if (payload.version !== 1) return null;
    return payload;
  } catch {
    return null;
  }
}

export function clearDraft(phase: PhaseId): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(getKey(phase));
}

export function hasDraftData(form: PhaseFormState): boolean {
  const hasFieldValues = Object.values(form.sections).some((section) =>
    Object.values(section).some((v) => v.trim() !== '')
  );
  const hasActionItems = form.actionItems.length > 0;
  return hasFieldValues || hasActionItems;
}
