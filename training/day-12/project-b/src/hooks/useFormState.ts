import { useReducer } from 'react';
import { AppState, FormAction, PhaseId, PhaseFormState } from '@/lib/types';
import { PHASES } from '@/lib/templates';

function createEmptyForm(phase: PhaseId): PhaseFormState {
  return {
    phase,
    sections: {},
    actionItems: [],
  };
}

function createInitialState(): AppState {
  const forms = {} as Record<PhaseId, PhaseFormState>;
  for (const p of PHASES) {
    forms[p.id] = createEmptyForm(p.id);
  }
  return {
    activePhase: 'first_visit',
    forms,
    lastSavedAt: {
      first_visit: null,
      proposal: null,
      negotiation: null,
      closing: null,
      followup: null,
    },
  };
}

function reducer(state: AppState, action: FormAction): AppState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, activePhase: action.phase };

    case 'SET_FIELD': {
      const form = state.forms[action.phase];
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.phase]: {
            ...form,
            sections: {
              ...form.sections,
              [action.sectionId]: {
                ...form.sections[action.sectionId],
                [action.fieldKey]: action.value,
              },
            },
          },
        },
      };
    }

    case 'ADD_ACTION_ITEM': {
      const form = state.forms[action.phase];
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.phase]: {
            ...form,
            actionItems: [
              ...form.actionItems,
              {
                id: crypto.randomUUID(),
                content: '',
                assignee: '',
                deadline: '',
                priority: 'medium',
              },
            ],
          },
        },
      };
    }

    case 'UPDATE_ACTION_ITEM': {
      const form = state.forms[action.phase];
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.phase]: {
            ...form,
            actionItems: form.actionItems.map((item) =>
              item.id === action.id ? { ...item, [action.field]: action.value } : item
            ),
          },
        },
      };
    }

    case 'DELETE_ACTION_ITEM': {
      const form = state.forms[action.phase];
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.phase]: {
            ...form,
            actionItems: form.actionItems.filter((item) => item.id !== action.id),
          },
        },
      };
    }

    case 'RESTORE_FORM':
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.phase]: action.form,
        },
      };

    case 'RESET_FORM':
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.phase]: createEmptyForm(action.phase),
        },
        lastSavedAt: {
          ...state.lastSavedAt,
          [action.phase]: null,
        },
      };

    case 'MARK_SAVED':
      return {
        ...state,
        lastSavedAt: {
          ...state.lastSavedAt,
          [action.phase]: action.timestamp,
        },
      };

    default:
      return state;
  }
}

export function useFormState() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  return { state, dispatch };
}
