import React from 'react';

export default function ScenarioControls({ activeTrigger, setActiveTrigger }) {
  const triggers = [
    { id: 'hardship', label: 'Isolated Hardship' },
    { id: 'contagion', label: 'Peer Contagion' },
    { id: 'outage', label: 'Gateway Outage' },
    { id: 'macro', label: 'Macro Shock' }
  ];

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3 rounded-2xl flex flex-wrap items-center gap-3 shadow-lg">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">
        Stress Triggers:
      </span>
      
      {triggers.map((trigger) => {
        const isActive = activeTrigger === trigger.id;
        return (
          <button
            key={trigger.id}
            onClick={() => setActiveTrigger(trigger.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
              isActive 
                ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 scale-105" 
                : "bg-slate-800/50 text-slate-400 border-white/10 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            {trigger.label}
          </button>
        );
      })}
    </div>
  );
}