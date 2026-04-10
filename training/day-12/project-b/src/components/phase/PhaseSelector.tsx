'use client';

import { PhaseDef, PhaseId } from '@/lib/types';

interface PhaseSelectorProps {
  phases: PhaseDef[];
  activePhase: PhaseId;
  onSelect: (phase: PhaseId) => void;
}

export default function PhaseSelector({ phases, activePhase, onSelect }: PhaseSelectorProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {phases.map((phase) => {
        const isActive = phase.id === activePhase;
        return (
          <button
            key={phase.id}
            onClick={() => onSelect(phase.id)}
            className={`
              flex-none flex flex-col items-center gap-1 px-4 py-3 rounded-lg border-2 transition-all min-w-[130px] cursor-pointer
              ${isActive
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }
            `}
          >
            <span className="text-xl">{phase.icon}</span>
            <span className="text-sm font-semibold">{phase.label}</span>
            <span className={`text-xs ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
              {phase.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
