import { PhaseDef, PhaseFormState, ValidationError } from './types';

export function validateForm(
  phaseDef: PhaseDef,
  formState: PhaseFormState
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const section of phaseDef.sections) {
    if (section.isActionItems) {
      // Validate action items: assignee and deadline must be filled
      for (const item of formState.actionItems) {
        if (!item.content.trim()) {
          errors.push({
            sectionId: section.id,
            fieldKey: `actionItem_${item.id}_content`,
            message: 'アクションアイテムの内容を入力してください',
          });
        }
        if (!item.assignee.trim()) {
          errors.push({
            sectionId: section.id,
            fieldKey: `actionItem_${item.id}_assignee`,
            message: '担当者を入力してください',
          });
        }
        if (!item.deadline.trim()) {
          errors.push({
            sectionId: section.id,
            fieldKey: `actionItem_${item.id}_deadline`,
            message: '期限を入力してください',
          });
        }
      }
      continue;
    }

    for (const field of section.fields) {
      if (field.required) {
        const value = formState.sections[section.id]?.[field.key] ?? '';
        if (value.trim() === '') {
          errors.push({
            sectionId: section.id,
            fieldKey: field.key,
            message: `${field.label}は必須項目です`,
          });
        }
      }
    }
  }

  return errors;
}
