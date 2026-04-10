'use client';

import { PhaseDef, PhaseFormState, ActionItem } from '@/lib/types';

interface PreviewPanelProps {
  phaseDef: PhaseDef;
  formState: PhaseFormState;
}

const PRIORITY_LABEL: Record<string, string> = { high: '高', medium: '中', low: '低' };

export default function PreviewPanel({ phaseDef, formState }: PreviewPanelProps) {
  const companyName = formState.sections['basicInfo']?.['companyName'] || '（会社名未入力）';
  const date = formState.sections['basicInfo']?.['date'] || '（日付未入力）';

  return (
    <div id="preview-panel" className="p-5 text-sm print:p-8">
      {/* Document Header */}
      <div className="mb-6 pb-4 border-b-2 border-blue-800">
        <h1 className="text-base font-bold text-blue-900">商談議事録</h1>
        <p className="text-xs text-slate-500 mt-1">{phaseDef.label} | {date} | {companyName}</p>
      </div>

      {/* Sections */}
      {phaseDef.sections.map((section) => {
        if (section.isActionItems) {
          const items = formState.actionItems;
          return (
            <div key={section.id} className="mb-5">
              <h2 className="text-xs font-bold text-white bg-blue-800 px-2 py-1 mb-2 print:bg-blue-800">
                {section.title}
              </h2>
              {items.length === 0 ? (
                <p className="text-xs text-slate-400 italic">（未入力）</p>
              ) : (
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 print:bg-slate-100">
                      <th className="border border-slate-300 px-2 py-1 text-left font-medium">内容</th>
                      <th className="border border-slate-300 px-2 py-1 text-left font-medium w-20">担当者</th>
                      <th className="border border-slate-300 px-2 py-1 text-left font-medium w-20">期限</th>
                      <th className="border border-slate-300 px-2 py-1 text-left font-medium w-12">優先度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: ActionItem) => (
                      <tr key={item.id}>
                        <td className="border border-slate-300 px-2 py-1">{item.content || '—'}</td>
                        <td className="border border-slate-300 px-2 py-1">{item.assignee || '—'}</td>
                        <td className="border border-slate-300 px-2 py-1">{item.deadline || '—'}</td>
                        <td className="border border-slate-300 px-2 py-1">
                          <span className={`font-medium ${
                            item.priority === 'high' ? 'text-red-600' :
                            item.priority === 'low' ? 'text-slate-400' : 'text-amber-600'
                          }`}>
                            {PRIORITY_LABEL[item.priority]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        }

        const sectionValues = formState.sections[section.id] ?? {};
        const hasContent = section.fields.some((f) => sectionValues[f.key]?.trim());

        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-xs font-bold text-white bg-blue-800 px-2 py-1 mb-2 print:bg-blue-800">
              {section.title}
            </h2>
            {!hasContent ? (
              <p className="text-xs text-slate-400 italic">（未入力）</p>
            ) : (
              <dl className="space-y-1.5">
                {section.fields.map((field) => {
                  const value = sectionValues[field.key]?.trim();
                  if (!value && !field.required) return null;
                  return (
                    <div key={field.key}>
                      <dt className="text-xs font-medium text-slate-500">{field.label}</dt>
                      <dd className="text-xs text-slate-800 whitespace-pre-wrap pl-2 border-l-2 border-slate-200 mt-0.5">
                        {value || <span className="text-slate-400 italic">（未入力）</span>}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>
        );
      })}
    </div>
  );
}
