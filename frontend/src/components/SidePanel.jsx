import React from 'react';

export default function SidePanel({ borrowerData, onClose }) {
  if (!borrowerData) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl h-full flex items-center justify-center text-slate-500 text-sm">
        Select any Borrower node on the graph to inspect zero-knowledge explanations & risk vectors.
      </div>
    );
  }

  const { borrower_id, attributes, explanation } = borrowerData;

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Node Inspector</span>
          <h2 className="text-xl font-bold text-white">{borrower_id}</h2>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-sm bg-slate-800 px-2.5 py-1 rounded-lg">Close</button>
      </div>

      <div className="space-y-4 text-sm">
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
          <p className="text-slate-400 text-xs mb-1">Assigned Group Circle</p>
          <p className="font-semibold text-slate-200">{attributes.group} ({attributes.region})</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <p className="text-slate-400 text-xs mb-1">Risk Score</p>
            <p className="font-bold text-rose-400 text-lg">{attributes.risk_score}</p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <p className="text-slate-400 text-xs mb-1">Trust Score</p>
            <p className="font-bold text-emerald-400 text-lg">{attributes.trust_score}</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">Zero-Knowledge Explanation Layer</h3>
          <ul className="space-y-1.5 text-xs text-slate-300 mb-3">
            {explanation.risk_factors.map((rf, idx) => (
              <li key={idx} className="flex items-center gap-2">• {rf}</li>
            ))}
          </ul>
          <p className="text-[10px] text-slate-500 italic border-t border-slate-900 pt-2">{explanation.zero_knowledge_note}</p>
        </div>

        <div className="bg-amber-950/30 border border-amber-900/50 p-4 rounded-lg">
          <h3 className="text-xs font-semibold uppercase text-amber-400 mb-1">Hardship & Liquidity Assessment</h3>
          <p className="text-xs text-amber-200 mb-2">Score: {explanation.hardship_assessment.isolated_hardship_score}</p>
          <p className="text-xs text-slate-300 font-medium">{explanation.hardship_assessment.recommendation}</p>
        </div>
      </div>
    </div>
  );
}