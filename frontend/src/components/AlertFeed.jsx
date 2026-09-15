import React from 'react';

export default function AlertFeed({ alerts = [] }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Status Indicator */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>0 Active Alarms — Network Operating Normally</span>
      </div>

      {/* Warning Feed Box */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl shadow-lg">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Early Warning Feed
        </h3>
        
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs italic">
            No cascading contagion risks detected in current epoch.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {alerts.map((alert, index) => (
              <div key={index} className="p-2.5 bg-slate-800/40 border border-slate-800 rounded-xl text-xs text-slate-300">
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}