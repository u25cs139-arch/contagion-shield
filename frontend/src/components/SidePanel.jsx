import React from 'react';

export default function SidePanel({ selectedNode, setSelectedNode }) {
  // Sample node object for the quick demo button
  const sampleNode = {
    id: 'B-1049',
    type: 'Borrower',
    group: 'SHG-Delta',
    riskScore: 'High (84%)',
    exposure: '₹45,000',
    status: 'Quarantined'
  };

  return (
    <div className="w-80 h-full bg-slate-900/60 backdrop-blur-md border-l border-slate-800 p-4 flex flex-col shadow-2xl">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 border-b border-slate-800 pb-2">
        Node Inspector
      </h2>

      {!selectedNode ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-xl mb-3 shadow-inner">
            🔍
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Select any Borrower node to inspect details.
          </p>
          <button 
            onClick={() => setSelectedNode(sampleNode)} 
            className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 rounded-xl text-xs font-medium transition shadow-lg shadow-indigo-500/10"
          >
            Select Sample Node
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-sm">
          <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">Node ID & Type</span>
            <span className="font-bold text-slate-100 text-base">{selectedNode.id}</span>
            <span className="text-xs text-indigo-400 ml-2">({selectedNode.type || 'Borrower'})</span>
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">Group / Cluster</span>
            <span className="font-medium text-slate-200">{selectedNode.group || 'SHG-Alpha'}</span>
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">Risk Score</span>
            <span className="font-bold text-amber-400">{selectedNode.riskScore || 'Moderate (45%)'}</span>
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">Financial Exposure</span>
            <span className="font-medium text-slate-200">{selectedNode.exposure || '₹25,000'}</span>
          </div>

          <button 
            onClick={() => setSelectedNode(null)}
            className="mt-auto py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-medium transition"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}