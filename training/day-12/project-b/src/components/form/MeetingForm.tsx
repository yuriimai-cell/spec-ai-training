'use client';

import { PhaseDef, PhaseFormState, ValidationError, FormAction } from '@/lib/types';
import FormSection from './FormSection';

interface MeetingFormProps {
  phaseDef: PhaseDef;
  formState: PhaseFormState;
  errors: ValidationError[];
  dispatch: React.Dispatch<FormAction>;
}

export default function MeetingForm({ phaseDef, formState, errors, dispatch }: MeetingFormProps) {
  return (
    <div>
      {phaseDef.sections.map((section) => (
        <FormSection
          key={section.id}
          section={section}
          values={formState.sections[section.id] ?? {}}
          actionItems={formState.actionItems}
          errors={errors.filter((e) => e.sectionId === section.id)}
          phase={formState.phase}
          dispatch={dispatch}
          onChange={(fieldKey, value) =>
            dispatch({
              type: 'SET_FIELD',
              phase: formState.phase,
              sectionId: section.id,
              fieldKey,
              value,
            })
          }
        />
      ))}
    </div>
  );
}
