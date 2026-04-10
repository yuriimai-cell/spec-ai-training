import { PhaseFormState, PhaseDef, ActionItem } from './types';

const PRIORITY_LABEL: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

function buildWordHtml(formState: PhaseFormState, phaseDef: PhaseDef): string {
  const companyName = formState.sections['basicInfo']?.['companyName'] ?? '';
  const date = formState.sections['basicInfo']?.['date'] ?? '';

  let body = `
    <h1 style="font-size:18pt;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:4pt;margin-bottom:12pt;">
      商談議事録 — ${phaseDef.label}
    </h1>
  `;

  for (const section of phaseDef.sections) {
    body += `<h2 style="font-size:13pt;color:#1e3a5f;border-bottom:1px solid #ccc;padding-bottom:2pt;margin-top:16pt;margin-bottom:8pt;">${section.title}</h2>`;

    if (section.isActionItems) {
      const items = formState.actionItems;
      if (items.length === 0) {
        body += `<p style="color:#999;">（アクションアイテムなし）</p>`;
      } else {
        body += `
          <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:10pt;">
            <tr style="background:#f0f4f8;">
              <th style="width:40%;text-align:left;">内容</th>
              <th style="width:20%;text-align:left;">担当者</th>
              <th style="width:20%;text-align:left;">期限</th>
              <th style="width:10%;text-align:left;">優先度</th>
            </tr>
            ${items
              .map(
                (item: ActionItem) => `
              <tr>
                <td>${item.content || '—'}</td>
                <td>${item.assignee || '—'}</td>
                <td>${item.deadline || '—'}</td>
                <td>${PRIORITY_LABEL[item.priority] ?? item.priority}</td>
              </tr>
            `
              )
              .join('')}
          </table>
        `;
      }
      continue;
    }

    for (const field of section.fields) {
      const value = formState.sections[section.id]?.[field.key] ?? '';
      if (!value.trim() && !field.required) continue;
      const displayValue = value.trim() || '（未記入）';
      const formattedValue = displayValue.replace(/\n/g, '<br>');
      body += `
        <p style="margin:4pt 0;">
          <strong style="color:#555;">${field.label}${field.required ? ' *' : ''}：</strong>
          ${formattedValue}
        </p>
      `;
    }
  }

  // Use companyName and date variables to avoid unused variable warnings
  void companyName;
  void date;

  return `
    <!DOCTYPE html>
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="UTF-8">
      <meta name="ProgId" content="Word.Document">
      <title>商談議事録_${phaseDef.label}</title>
      <style>
        body { font-family: 'メイリオ', Meiryo, 'MS ゴシック', sans-serif; font-size: 10.5pt; line-height: 1.6; margin: 2cm; }
        h1 { page-break-after: avoid; }
        h2 { page-break-after: avoid; }
        table { page-break-inside: avoid; }
        p { orphans: 2; widows: 2; }
      </style>
    </head>
    <body>
      ${body}
    </body>
    </html>
  `;
}

export function exportWord(formState: PhaseFormState, phaseDef: PhaseDef): void {
  const html = buildWordHtml(formState, phaseDef);
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });

  const dateStr = formState.sections['basicInfo']?.['date']
    ? formState.sections['basicInfo']['date']
    : new Date().toISOString().slice(0, 10);
  const companyName =
    formState.sections['basicInfo']?.['companyName']?.replace(/[\\/:*?"<>|]/g, '_') || '未設定';
  const filename = `${dateStr}_${companyName}_${phaseDef.label}.doc`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
