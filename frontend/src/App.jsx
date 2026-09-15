import React, { useState } from 'react';
import GraphView from './components/GraphView';
import ScenarioControls from './components/ScenarioControls';
import SidePanel from './components/SidePanel';
import AlertFeed from './components/AlertFeed';
import MonteCarloModal from './components/MonteCarloModal';

export default function App() {
  const [activeTrigger, setActiveTrigger] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setAlerts(prev => [`[Contagion Event]: Cluster guarantor G-1 default triggered secondary ripple.`, ...prev]);
      setGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => n.id === 'G-1' ? { ...n, color: '#ef4444', riskScore: 88, status: 'Quarantined' } : n)
      }));
    } else if (triggerId === 'outage') {
      setAlerts(prev => [`[Gateway Outage]: UPI Rail integration latency spiked for Gateway PW-1.`, ...prev]);
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
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/[0.07] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/[0.05] rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 h-16 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-3 h-3">
            <div className="absolute w-full h-full rounded-full bg-emerald-500 animate-ping opacity-75"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold tracking-tight text-slate-100 font-mono">
              CONTAGION SHIELD <span className="text-slate-500 font-normal">v3.0</span>
            </h1>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/10 tracking-wide uppercase">
              Microfinance Risk Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-indigo-400 text-xs font-semibold rounded-xl transition-all border border-indigo-500/30 shadow-lg"
          >
            <span>📊 Run Monte Carlo</span>
          </button>
          <button 
            onClick={handleExportReport}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/20 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Export Audit Report</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="relative z-10 flex flex-1 overflow-hidden p-5 gap-5">
        
        {/* Left / Center Graph & Metrics Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          
          {/* Elite Uniform Metric Cards (Fixed Font Sizes & Padding) */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] p-4 rounded-2xl flex flex-col justify-between shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Borrowers</span>
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-100 mt-1">1,248</span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] p-4 rounded-2xl flex flex-col justify-between shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Active Clusters</span>
              <span className="text-2xl font-bold font-mono tracking-tight text-indigo-400 mt-1">42</span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] p-4 rounded-2xl flex flex-col justify-between shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">System Risk Score</span>
              <span className="text-2xl font-bold font-mono tracking-tight text-emerald-400 mt-1">14.2%</span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] p-4 rounded-2xl flex flex-col justify-between shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Node Health Split</span>
              <div className="flex items-center gap-1.5 text-sm font-mono font-bold mt-1">
                <span className="text-emerald-400" title="Healthy">88%</span>
                <span className="text-slate-600">/</span>
                <span className="text-amber-400" title="Hardship">9%</span>
                <span className="text-slate-600">/</span>
                <span className="text-rose-500" title="Default">3%</span>
              </div>
            </div>
          </div>

          {/* Scenario Triggers Toolbar */}
          <div className="shrink-0">
            <ScenarioControls activeTrigger={activeTrigger} onTriggerChange={handleTriggerChange} />
          </div>

          {/* Graph Canvas Container */}
          <div className="flex-1 bg-slate-900/20 border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl relative backdrop-blur-xl">
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase font-mono tracking-wider text-slate-400 pointer-events-none">
              3D Spatial Topology // Spider-Web Grid View
            </div>
            <GraphView graphData={graphData} onNodeClick={(node) => setSelectedNode(node)} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-88 flex flex-col gap-4 shrink-0 overflow-y-auto">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl">
            <AlertFeed alerts={alerts} />
          </div>
          <div className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl min-h-[380px]">
            <SidePanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
          </div>
        </div>

      </div>

      <MonteCarloModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRunSimulation={(intensity) => {
          setAlerts(prev => [`[Monte Carlo Engine]: Ran simulation at ${intensity}% shock intensity across 1,000 paths.`, ...prev]);
        }}
      />
    </div>
  );
}