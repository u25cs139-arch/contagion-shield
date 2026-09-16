import React, { useState } from 'react';
import GraphView from './components/GraphView';

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTrigger, setActiveTrigger] = useState('Peer Contagion');
  const [isSimulating, setIsSimulating] = useState(false);
  const [systemRisk, setSystemRisk] = useState('14.2%');
  const [warningFeed, setWarningFeed] = useState([]);

  const triggers = ['Isolated Hardship', 'Peer Contagion', 'Gateway Outage', 'Macro Shock'];

  const runMonteCarloSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSystemRisk('28.6%');
      setWarningFeed([
        { id: 1, text: 'Monte Carlo run #4092 detected cascading node failure in Cluster 4.' },
        { id: 2, text: 'Warning: Gateway outage probability increased by 14% under stress.' }
      ]);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="w-screen min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-slate-800 bg-[#090d16] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <h1 className="font-bold tracking-wider text-sm text-slate-200">CONTAGION SHIELD <span className="text-xs text-blue-400 font-mono ml-1">v3.0</span></h1>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">MICROFINANCE RISK PLATFORM</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={runMonteCarloSimulation}
            disabled={isSimulating}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-xs font-semibold rounded text-white transition shadow-lg shadow-blue-950/40 flex items-center space-x-2"
          >
            {isSimulating ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>Simulating...</span>
              </>
            ) : (
              <span>Run Monte Carlo</span>
            )}
          </button>
          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded text-slate-200 border border-slate-700 transition">Export Audit Report</button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4">
        
        {/* Left Column (Canvas & Metrics Grid) */}
        <div className="col-span-9 flex flex-col gap-4">
          
          {/* Elite Metrics Grid */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-[10px] tracking-wider text-slate-400 uppercase">Total Borrowers</span>
              <span className="text-2xl font-bold text-slate-100 mt-1">1,248</span>
            </div>
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-[10px] tracking-wider text-slate-400 uppercase">Active Clusters</span>
              <span className="text-2xl font-bold text-slate-100 mt-1">42</span>
            </div>
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-[10px] tracking-wider text-slate-400 uppercase">System Risk Score</span>
              <span className="text-2xl font-bold text-amber-400 mt-1">{systemRisk}</span>
            </div>
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-[10px] tracking-wider text-slate-400 uppercase">Node Health Split</span>
              <span className="text-xs font-semibold text-emerald-400 mt-2">88% / 9% / 3%</span>
            </div>
          </div>

          {/* Stress Triggers */}
          <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl px-4 py-3 flex items-center space-x-4 shrink-0">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Stress Triggers:</span>
            <div className="flex items-center space-x-2">
              {triggers.map((trigger) => {
                const isActive = activeTrigger === trigger;
                return (
                  <button
                    key={trigger}
                    onClick={() => setActiveTrigger(trigger)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600/20 border border-blue-500 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {trigger}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Topology Canvas Area */}
          <div className="h-[520px] bg-[#0b101d] border border-slate-800/80 rounded-xl relative overflow-hidden flex flex-col">
            <div className="absolute top-3 left-4 z-10 pointer-events-none">
              <span className="text-[10px] font-mono tracking-wider text-blue-400/80 uppercase">3D Spatial Topology // Spider-Web Grid View</span>
            </div>
            <div className="flex-1 w-full h-full">
              <GraphView onNodeSelect={setSelectedNode} />
            </div>
          </div>

        </div>

        {/* Right Column (Alert Feed & Node Inspector) */}
        <div className="col-span-3 flex flex-col gap-4">
          
          {/* Warning Feed Box */}
          <div className="h-36 shrink-0 bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">Early Warning Feed</span>
              <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-amber-400 animate-ping' : 'bg-emerald-500 animate-pulse'}`}></span>
            </div>
            {warningFeed.length > 0 ? (
              <div className="space-y-1.5 mt-1 text-[11px] font-mono text-amber-300">
                {warningFeed.map((w) => (
                  <div key={w.id} className="p-1.5 bg-amber-950/20 border border-amber-800/40 rounded">
                    {w.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <p className="text-xs text-slate-500 italic">No cascading contagion risks detected in current epoch.</p>
              </div>
            )}
          </div>

          {/* Node Inspector Panel */}
          <div className="min-h-[520px] bg-[#0b101d] border border-slate-800/80 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">Node Inspector Telemetry</span>
              {selectedNode && <span className="text-[10px] text-emerald-400 font-mono">Active Selection</span>}
            </div>

            {selectedNode ? (
              <div className="space-y-3 mt-2 text-xs">
                <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Node Identifier</span>
                  <span className="font-mono font-bold text-slate-200 text-sm">{selectedNode.id}</span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Cluster Group</span>
                  <span className="font-medium text-slate-300">{selectedNode.group}</span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Calculated Risk Score</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{selectedNode.risk}%</span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase mb-1">Upstream Contagion Path</span>
                  <ul className="space-y-1 text-slate-400 font-mono text-[11px]">
                    <li>1. B-101 (Direct)</li>
                    <li>2. Guarantor: G-1</li>
                    <li>3. Gateway: NW-1</li>
                  </ul>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Zero-Knowledge Proof Status</span>
                  <span className="text-emerald-400 font-mono font-medium">VERIFIED (zk-SNARK)</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800/80 rounded-xl my-2">
                <p className="text-xs text-slate-400 mb-3">Select any node on the graph canvas to inspect risk telemetry.</p>
                <button
                  onClick={() => setSelectedNode({ id: 'G-1', group: 'Guarantor', risk: 45 })}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded text-slate-200 border border-slate-700 transition font-medium"
                >
                  Load Sample Node
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}