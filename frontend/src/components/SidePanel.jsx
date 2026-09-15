import React from 'react';

export default function SidePanel({ selectedNode, setSelectedNode }) {
  // Default sample node populated automatically so the panel never looks empty
  const activeNode = selectedNode || {
    id: 'B-1049 (Default)',
    type: 'Borrower Node',
    group: 'SHG-Delta Cluster',
    riskScore: 'High (84%)',
    exposure: '₹45,000',
    status: 'Quarantined',
    propagationPath: ['B-1049', 'Guarantor: G-1', 'Gateway: PW-1'],
    zkProof: 'Verified (zk-SNARK)'
  };

  return (
    <div className="w-full h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Node Inspector Telemetry
          </h2>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {selectedNode ? 'Active Selection' : 'Auto-Sample View'}
          </span>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Node Identifier</span>
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-slate-100 text-sm font-mono">{activeNode.id}</span>
              <span className="text-[11px] text-indigo-400 font-medium">{activeNode.type}</span>
            </div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Cluster Group</span>
            <span className="font-medium text-slate-200">{activeNode.group}</span>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Calculated Risk Score</span>
            <span className="font-bold text-amber-400 font-mono">{activeNode.riskScore}</span>
          </div>

          {/* Cascading Path Trace */}
          <div className="p-3 bg-slate-950/60 border border-white/5 rounded-xl flex flex-col gap-2">
            <span className="text-[10px] uppercase font-semibold text-indigo-400 tracking-wider">
              Upstream Contagion Path
            </span>
            <div className="flex flex-col gap-1.5 font-mono text-[11px]">
              {(activeNode.propagationPath || ['B-101', 'Guarantor: G-1', 'Gateway: PW-1']).map((hop, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[9px] text-indigo-400">{idx+1}</span>
                  <span>{hop}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Zero-Knowledge Proof Status</span>
            <span className="font-mono text-emerald-400 font-semibold">{activeNode.zkProof || 'Verified (zk-SNARK)'}</span>
          </div>
        </div>
      </div>

      {selectedNode && (
        <button 
          onClick={() => setSelectedNode(null)}
          className="mt-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-xs font-medium transition"
        >
          Clear Selection & Reset Default
        </button>
      )}
    </div>
  );
}