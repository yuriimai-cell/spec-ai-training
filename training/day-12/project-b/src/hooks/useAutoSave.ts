import { useEffect, useRef } from 'react';
import { PhaseId, PhaseFormState, FormAction } from '@/lib/types';
import { saveDraft } from '@/lib/storage';

export function useAutoSave(
  activePhase: PhaseId,
  formState: PhaseFormState,
  dispatch: React.Dispatch<FormAction>
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveDraft(activePhase, formState);
      dispatch({ type: 'MARK_SAVED', phase: activePhase, timestamp: Date.now() });
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activePhase, formState, dispatch]);
}
