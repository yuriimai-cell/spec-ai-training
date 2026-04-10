'use client';

import { ActionItem, FormAction, PhaseId, Priority } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ActionItemsBlockProps {
  phase: PhaseId;
  items: ActionItem[];
  errors: Record<string, string>;
  dispatch: React.Dispatch<FormAction>;
}

export default function ActionItemsBlock({ phase, items, errors, dispatch }: ActionItemsBlockProps) {
  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-4 border border-dashed rounded-md">
          アクションアイテムがありません
        </p>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border rounded-lg p-3 bg-slate-50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">#{index + 1}</span>
            <button
              onClick={() => dispatch({ type: 'DELETE_ACTION_ITEM', phase, id: item.id })}
              className="text-xs text-red-400 hover:text-red-600"
            >
              削除
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
              内容 <Badge variant="destructive" className="text-xs px-1.5 py-0 h-4">必須</Badge>
            </label>
            <Input
              value={item.content}
              onChange={(e) => dispatch({ type: 'UPDATE_ACTION_ITEM', phase, id: item.id, field: 'content', value: e.target.value })}
              placeholder="例：提案書を修正してメールで送付する"
              className={`text-sm ${errors[`actionItem_${item.id}_content`] ? 'border-red-400' : ''}`}
            />
            {errors[`actionItem_${item.id}_content`] && (
              <p className="text-xs text-red-500">{errors[`actionItem_${item.id}_content`]}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                担当者 <Badge variant="destructive" className="text-xs px-1.5 py-0 h-4">必須</Badge>
              </label>
              <Input
                value={item.assignee}
                onChange={(e) => dispatch({ type: 'UPDATE_ACTION_ITEM', phase, id: item.id, field: 'assignee', value: e.target.value })}
                placeholder="例：山田"
                className={`text-sm ${errors[`actionItem_${item.id}_assignee`] ? 'border-red-400' : ''}`}
              />
              {errors[`actionItem_${item.id}_assignee`] && (
                <p className="text-xs text-red-500">{errors[`actionItem_${item.id}_assignee`]}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                期限 <Badge variant="destructive" className="text-xs px-1.5 py-0 h-4">必須</Badge>
              </label>
              <Input
                type="date"
                value={item.deadline}
                onChange={(e) => dispatch({ type: 'UPDATE_ACTION_ITEM', phase, id: item.id, field: 'deadline', value: e.target.value })}
                className={`text-sm ${errors[`actionItem_${item.id}_deadline`] ? 'border-red-400' : ''}`}
              />
              {errors[`actionItem_${item.id}_deadline`] && (
                <p className="text-xs text-red-500">{errors[`actionItem_${item.id}_deadline`]}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">優先度</label>
              <Select
                value={item.priority}
                onValueChange={(v) => dispatch({ type: 'UPDATE_ACTION_ITEM', phase, id: item.id, field: 'priority', value: v as Priority })}
              >
                <SelectTrigger className="text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch({ type: 'ADD_ACTION_ITEM', phase })}
        className="w-full border-dashed"
      >
        + アクションを追加
      </Button>
    </div>
  );
}
