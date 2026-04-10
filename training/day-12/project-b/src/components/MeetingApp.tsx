'use client';

import { useEffect, useState } from 'react';
import { useFormState } from '@/hooks/useFormState';
import { useAutoSave } from '@/hooks/useAutoSave';
import { PHASES, PHASE_MAP } from '@/lib/templates';
import { validateForm } from '@/lib/validation';
import { exportPdf } from '@/lib/exportPdf';
import { exportWord } from '@/lib/exportWord';
import { loadDraft, clearDraft, hasDraftData } from '@/lib/storage';
import { PhaseId, ValidationError, DraftPayload } from '@/lib/types';
import AppHeader from './layout/AppHeader';
import AppFooter from './layout/AppFooter';
import PhaseSelector from './phase/PhaseSelector';
import MeetingForm from './form/MeetingForm';
import PreviewPanel from './preview/PreviewPanel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function MeetingApp() {
  const { state, dispatch } = useFormState();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [restoreDialog, setRestoreDialog] = useState<{
    open: boolean;
    phase: PhaseId;
    draft: DraftPayload | null;
  }>({ open: false, phase: 'first_visit', draft: null });

  const activePhase = state.activePhase;
  const activePhaseDef = PHASE_MAP[activePhase];
  const activeFormState = state.forms[activePhase];

  // Auto-save
  useAutoSave(activePhase, activeFormState, dispatch);

  // Check for saved draft on mount
  useEffect(() => {
    const draft = loadDraft(activePhase);
    if (draft && hasDraftData(draft.form)) {
      setRestoreDialog({ open: true, phase: activePhase, draft });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for saved draft on phase switch
  function handlePhaseSelect(phase: PhaseId) {
    dispatch({ type: 'SET_PHASE', phase });
    setErrors([]);

    const draft = loadDraft(phase);
    if (draft && hasDraftData(draft.form)) {
      setRestoreDialog({ open: true, phase, draft });
    }
  }

  function handleRestoreConfirm() {
    if (restoreDialog.draft) {
      dispatch({ type: 'RESTORE_FORM', phase: restoreDialog.phase, form: restoreDialog.draft.form });
    }
    setRestoreDialog((prev) => ({ ...prev, open: false }));
  }

  function handleRestoreDiscard() {
    clearDraft(restoreDialog.phase);
    setRestoreDialog((prev) => ({ ...prev, open: false }));
  }

  function handleExportPdf() {
    const validationErrors = validateForm(activePhaseDef, activeFormState);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    exportPdf();
  }

  function handleExportWord() {
    const validationErrors = validateForm(activePhaseDef, activeFormState);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    exportWord(activeFormState, activePhaseDef);
  }

  function handleReset() {
    if (confirm('フォームをリセットしますか？入力内容と保存データがすべて削除されます。')) {
      dispatch({ type: 'RESET_FORM', phase: activePhase });
      clearDraft(activePhase);
      setErrors([]);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <AppHeader lastSavedAt={state.lastSavedAt[activePhase]} />

      {/* Phase selector */}
      <div className="flex-none px-4 py-3 border-b bg-white print:hidden">
        <PhaseSelector
          phases={PHASES}
          activePhase={activePhase}
          onSelect={handlePhaseSelect}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: form */}
        <div className="flex-1 overflow-y-auto p-4 print:hidden">
          <MeetingForm
            phaseDef={activePhaseDef}
            formState={activeFormState}
            errors={errors}
            dispatch={dispatch}
          />
        </div>

        {/* Right: preview */}
        <div className="flex-none w-[380px] border-l overflow-y-auto bg-white">
          <PreviewPanel phaseDef={activePhaseDef} formState={activeFormState} />
        </div>
      </div>

      <AppFooter
        onExportPdf={handleExportPdf}
        onExportWord={handleExportWord}
        onReset={handleReset}
        hasErrors={errors.length > 0}
      />

      {/* Restore dialog */}
      <Dialog open={restoreDialog.open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>保存データを復元しますか？</DialogTitle>
            <DialogDescription>
              前回の入力データが見つかりました。復元して続きから作業しますか？
              {restoreDialog.draft && (
                <span className="block mt-1 text-xs text-slate-400">
                  保存日時：{new Date(restoreDialog.draft.savedAt).toLocaleString('ja-JP')}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleRestoreDiscard}>
              破棄する
            </Button>
            <Button onClick={handleRestoreConfirm}>
              復元する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
