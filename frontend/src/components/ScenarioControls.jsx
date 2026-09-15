import React from 'react';

export default function ScenarioControls({ activeTrigger, onTriggerChange }) {
  const triggers = [
    { id: 'contagion', label: 'Peer Contagion' },
    { id: 'outage', label: 'Gateway Outage' },
    { id: 'hardship', label: 'Isolated Hardship' },
    { id: 'macro', label: 'Macro Shock' }
  ];

  return (
    <div className="flex items-center gap-3 bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] p-3 rounded-2xl shadow-lg">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 font-mono">
        Stress Triggers:
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        {triggers.map((t) => {
          const isActive = activeTrigger === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTriggerChange(t.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                isActive 
                  ? 'bg-indigo-600/30 text-indigo-200 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}