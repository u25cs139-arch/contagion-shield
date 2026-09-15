import React from 'react';

export default function SidePanel({ selectedNode, setSelectedNode }) {
  const sampleNode = {
    id: 'B-1049',
    type: 'Borrower',
    group: 'SHG-Delta',
    riskScore: 'High (84%)',
    exposure: '₹45,000',
    status: 'Quarantined'
  };

  return (
    <div className="w-full h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 p-5 flex flex-col">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Node Inspector
        </h2>
        <span className="text-[10px] font-mono text-slate-500">SEC-01</span>
      </div>

      {!selectedNode ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center px-2">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 mb-3.5 shadow-inner">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35"/></svg>
          </div>
          <p className="text-xs text-slate-400 font-medium mb-4 leading-relaxed">
            Select any node on the graph canvas to inspect risk telemetry.
          </p>
          <button 
            onClick={() => setSelectedNode(sampleNode)} 
            className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-xl text-xs font-semibold transition shadow-sm"
          >
            Load Sample Node
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5 text-xs">
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Node Identifier</span>
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-slate-100 text-sm font-mono">{selectedNode.id}</span>
              <span className="text-[11px] text-indigo-400 font-medium">{selectedNode.type || 'Borrower'}</span>
            </div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Cluster / Group</span>
            <span className="font-medium text-slate-200">{selectedNode.group || 'SHG-Alpha'}</span>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Calculated Risk Score</span>
            <span className="font-bold text-amber-400">{selectedNode.riskScore || 'Moderate (45%)'}</span>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Financial Exposure</span>
            <span className="font-mono font-semibold text-slate-200">{selectedNode.exposure || '₹25,000'}</span>
          </div>

          <button 
            onClick={() => setSelectedNode(null)}
            className="mt-auto py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-xs font-medium transition"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}