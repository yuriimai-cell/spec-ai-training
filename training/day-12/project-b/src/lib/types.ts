export type FieldType = 'text' | 'textarea' | 'date';
export type PhaseId = 'first_visit' | 'proposal' | 'negotiation' | 'closing' | 'followup';
export type Priority = 'high' | 'medium' | 'low';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder: string;
}

export interface SectionDef {
  id: string;
  title: string;
  isActionItems?: boolean;
  fields: FieldDef[];
}

export interface PhaseDef {
  id: PhaseId;
  label: string;
  description: string;
  icon: string;
  sections: SectionDef[];
}

export type FieldValues = Record<string, string>;
export type SectionValues = Record<string, FieldValues>;

export interface ActionItem {
  id: string;
  content: string;
  assignee: string;
  deadline: string;
  priority: Priority;
}

export interface PhaseFormState {
  phase: PhaseId;
  sections: SectionValues;
  actionItems: ActionItem[];
}

export interface AppState {
  activePhase: PhaseId;
  forms: Record<PhaseId, PhaseFormState>;
  lastSavedAt: Record<PhaseId, number | null>;
}

export type FormAction =
  | { type: 'SET_PHASE'; phase: PhaseId }
  | { type: 'SET_FIELD'; phase: PhaseId; sectionId: string; fieldKey: string; value: string }
  | { type: 'ADD_ACTION_ITEM'; phase: PhaseId }
  | { type: 'UPDATE_ACTION_ITEM'; phase: PhaseId; id: string; field: keyof ActionItem; value: string }
  | { type: 'DELETE_ACTION_ITEM'; phase: PhaseId; id: string }
  | { type: 'RESTORE_FORM'; phase: PhaseId; form: PhaseFormState }
  | { type: 'RESET_FORM'; phase: PhaseId }
  | { type: 'MARK_SAVED'; phase: PhaseId; timestamp: number };

export interface ValidationError {
  sectionId: string;
  fieldKey: string;
  message: string;
}

export interface DraftPayload {
  version: 1;
  savedAt: number;
  form: PhaseFormState;
}
