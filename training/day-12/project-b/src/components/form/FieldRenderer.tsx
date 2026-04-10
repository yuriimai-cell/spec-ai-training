'use client';

import { FieldDef } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface FieldRendererProps {
  field: FieldDef;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function FieldRenderer({ field, value, error, onChange }: FieldRendererProps) {
  const inputClass = error
    ? 'border-red-400 focus-visible:ring-red-400'
    : '';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Label htmlFor={field.key} className="text-sm font-medium text-slate-700">
          {field.label}
        </Label>
        {field.required ? (
          <Badge variant="destructive" className="text-xs px-1.5 py-0 h-4">必須</Badge>
        ) : (
          <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">任意</Badge>
        )}
      </div>

      {field.type === 'textarea' ? (
        <Textarea
          id={field.key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`min-h-[80px] text-sm resize-y ${inputClass}`}
        />
      ) : (
        <Input
          id={field.key}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`text-sm ${inputClass}`}
        />
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
