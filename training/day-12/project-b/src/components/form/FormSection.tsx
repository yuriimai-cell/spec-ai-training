'use client';

import { SectionDef, FieldValues, ValidationError, FormAction, PhaseId, ActionItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FieldRenderer from './FieldRenderer';
import ActionItemsBlock from './ActionItemsBlock';

interface FormSectionProps {
  section: SectionDef;
  values: FieldValues;
  actionItems: ActionItem[];
  errors: ValidationError[];
  phase: PhaseId;
  dispatch: React.Dispatch<FormAction>;
  onChange: (fieldKey: string, value: string) => void;
}

export default function FormSection({
  section,
  values,
  actionItems,
  errors,
  phase,
  dispatch,
  onChange,
}: FormSectionProps) {
  const errorMap: Record<string, string> = {};
  for (const err of errors) {
    errorMap[err.fieldKey] = err.message;
  }

  const hasError = errors.some((e) => e.sectionId === section.id);

  return (
    <Card className={`mb-4 ${hasError ? 'border-red-300' : ''}`}>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          {section.title}
          {hasError && <span className="text-xs text-red-500 font-normal">※未入力の必須項目があります</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-4">
        {section.isActionItems ? (
          <ActionItemsBlock
            phase={phase}
            items={actionItems}
            errors={errorMap}
            dispatch={dispatch}
          />
        ) : (
          section.fields.map((field) => (
            <FieldRenderer
              key={field.key}
              field={field}
              value={values[field.key] ?? ''}
              error={errorMap[field.key]}
              onChange={(v) => onChange(field.key, v)}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
