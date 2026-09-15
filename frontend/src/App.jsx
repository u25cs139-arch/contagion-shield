import React, { useState } from 'react';
import GraphView from './components/GraphView';
import ScenarioControls from './components/ScenarioControls';
import SidePanel from './components/SidePanel';
import AlertFeed from './components/AlertFeed';

export default function App() {
  const [activeTrigger, setActiveTrigger] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Base graph data
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 'B-101', type: 'Borrower', color: '#6366f1', val: 8, riskScore: 20, status: 'Healthy' },
      { id: 'B-102', type: 'Borrower', color: '#6366f1', val: 6, riskScore: 15, status: 'Healthy' },
      { id: 'G-1', type: 'Guarantor', color: '#f59e0b', val: 10, riskScore: 45, status: 'Hardship' },
      { id: 'PW-1', type: 'Gateway', color: '#10b981', val: 12, riskScore: 10, status: 'Healthy' }
    ],
    links: [
      { source: 'B-101', target: 'G-1' },
      { source: 'B-102', target: 'G-1' },
      { source: 'G-1', target: 'PW-1' }
    ]
  });

  const handleTriggerChange = (triggerId) => {
    setActiveTrigger(triggerId);

    if (triggerId === 'contagion') {
      setAlerts(prev => [
        `[Contagion Event]: Cluster guarantor G-1 default triggered secondary ripple across connected borrowers.`,
        ...prev
      ]);
      setGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => n.id === 'G-1' ? { ...n, color: '#ef4444', riskScore: 88, status: 'Quarantined' } : n)
      }));
    } else if (triggerId === 'outage') {
      setAlerts(prev => [
        `[Gateway Outage]: UPI Rail integration latency spiked for Gateway PW-1; liquidity restricted.`,
        ...prev
      ]);
      setGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => n.id === 'PW-1' ? { ...n, color: '#f59e0b', riskScore: 75, status: 'Hardship' } : n)
      }));
    } else {
      setAlerts(prev => [`[Stress Trigger]: ${triggerId} simulation sequence injected successfully.`, ...prev]);
    }
  };

  const handleExportReport = () => {
    alert("Executive Risk Briefing Report successfully compiled and exported as PDF.");
  };

  return (
    <div className="relative flex flex-col h-screen w-screen bg-[#020617] text-slate-100 overflow-hidden font-sans select-none">
      
      {/* Ambient Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 h-16 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-3.5 h-3.5">
            <div className="absolute w-full h-full rounded-full bg-indigo-500 animate-ping opacity-75"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"></div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Contagion Shield
            </h1>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 tracking-wide uppercase">
              Enterprise Risk Engine
            </span>
          </div>
        </div>

        {/* Export Report Action */}
        <button 
          onClick={handleExportReport}
          className="group relative px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 border border-indigo-400/20 flex items-center gap-2 active:scale-95"
        >
          <span className="text-sm">📄</span>
          <span>Export Audit Report</span>
        </button>
      </header>

      {/* Main Workspace */}
      <div className="relative z-10 flex flex-1 overflow-hidden p-5 gap-5">
        
        {/* Left / Center Graph & Metrics Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          
          {/* Elite Metrics & Health Bar */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-xl shadow-black/40">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Borrowers</span>
              <span className="text-lg font-bold tracking-tight text-slate-100 mt-1">1,248</span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-xl shadow-black/40">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Active Clusters</span>
              <span className="text-lg font-bold tracking-tight text-indigo-400 mt-1">42</span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-xl shadow-black/40">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">System Risk Score</span>
              <span className="text-lg font-bold tracking-tight text-emerald-400 mt-1">14.2% <span className="text-xs font-normal text-slate-400">(Low)</span></span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-xl shadow-black/40">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Node Health Split</span>
              <div className="flex items-center gap-1.5 text-xs font-bold mt-1">
                <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20" title="Healthy">88%</span>
                <span className="text-slate-600">/</span>
                <span className="text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20" title="Hardship">9%</span>
                <span className="text-slate-600">/</span>
                <span className="text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20" title="Default">3%</span>
              </div>
            </div>
          </div>

          {/* Scenario Triggers Toolbar */}
          <div className="shrink-0">
            <ScenarioControls activeTrigger={activeTrigger} onTriggerChange={handleTriggerChange} />
          </div>

          {/* Graph Canvas Container with Premium Framing */}
          <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 relative backdrop-blur-xl">
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-slate-950/70 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase font-semibold tracking-wider text-slate-400 pointer-events-none">
              Live Network Topology Map
            </div>
            <GraphView graphData={graphData} onNodeClick={(node) => setSelectedNode(node)} />
          </div>
        </div>

        {/* Right Sidebar & Feed */}
        <div className="w-88 flex flex-col gap-4 shrink-0 overflow-y-auto">
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
            <AlertFeed alerts={alerts} />
          </div>
          <div className="flex-1 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
            <SidePanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
          </div>
        </div>

      </div>
    </div>
  );
}