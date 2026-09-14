import React from 'react';

export default function ScenarioControls({ onTrigger }) {
  const scenarios = [
    { key: 'isolated_hardship', label: 'Isolated Hardship', color: 'bg-amber-600 hover:bg-amber-500' },
    { key: 'peer_contagion', label: 'Peer Contagion Event', color: 'bg-rose-600 hover:bg-rose-500' },
    { key: 'gateway_outage', label: 'Payment Gateway Outage', color: 'bg-purple-600 hover:bg-purple-500' },
    { key: 'macro_shock', label: 'Macro Shock (Rumor)', color: 'bg-blue-600 hover:bg-blue-500' },
    { key: 'collusion_ring', label: 'Collusion Ring / Sybil', color: 'bg-orange-600 hover:bg-orange-500' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Live Stress & Scenario Injector Engine
      </h2>
      <div className="flex flex-wrap gap-3">
        {scenarios.map((s) => (
          <button
            key={s.key}
            onClick={() => onTrigger(s.key)}
            className={`px-4 py-2 rounded-lg text-xs font-medium text-white transition-all shadow-md ${s.color}`}
          >
            Trigger: {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}