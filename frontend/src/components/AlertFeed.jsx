import React from 'react';

export default function AlertFeed({ alerts = [] }) {
  const hasAlarms = alerts.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Status Indicator */}
      <div className={`flex items-center gap-2 px-3.5 py-2.5 border rounded-xl text-xs font-medium shadow-sm ${
        hasAlarms 
          ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
      }`}>
        <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${hasAlarms ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
        <span>{hasAlarms ? `${alerts.length} Active System Alarms Triggered` : '0 Active Alarms — Network Operating Normally'}</span>
      </div>

      {/* Warning Feed Box */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl shadow-lg">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Early Warning Feed
        </h3>
        
        {!hasAlarms ? (
          <div className="text-center py-6 text-slate-500 text-xs italic">
            No cascading contagion risks detected in current epoch.
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {alerts.map((alert, index) => (
              <div key={index} className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-200">
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}