import React from 'react';

export default function AlertFeed({ alerts }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Field Officer PAR-0 Early Warning Feed
        </h2>
        <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2.5 py-0.5 rounded-full font-medium">
          {alerts.length} Active Alarms
        </span>
      </div>
      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
        {alerts.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No portfolio distress signals detected. All clusters healthy.</p>
        ) : (
          alerts.map((alert, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">{alert.id}</span>
                <span className="text-slate-400 ml-2">({alert.group})</span>
                <div className="text-slate-400 text-[11px] mt-0.5">Status: <span className="text-rose-400 font-medium">{alert.status}</span></div>
              </div>
              <div className="text-right">
                <span className="bg-slate-900 text-slate-300 border border-slate-800 px-2 py-1 rounded text-[11px] font-semibold">
                  Risk: {alert.risk_score}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}