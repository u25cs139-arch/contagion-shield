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

  // Dynamic Trigger Handler to simulate live shocks
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
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Header */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
          <h1 className="text-base font-bold tracking-wide">Contagion Shield</h1>
          <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Microfinance Risk Platform</span>
        </div>

        {/* Export Report Button */}
        <button 
          onClick={handleExportReport}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
        >
          <span>📄 Export Audit Report</span>
        </button>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        
        {/* Left / Center Graph Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          
          {/* Quick-Stats & Health Split Bar */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex items-center justify-between shadow-lg">
              <span className="text-xs text-slate-400 font-medium">Total Borrowers</span>
              <span className="text-sm font-bold text-slate-200">1,248</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex items-center justify-between shadow-lg">
              <span className="text-xs text-slate-400 font-medium">Active Clusters</span>
              <span className="text-sm font-bold text-indigo-400">42</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex items-center justify-between shadow-lg">
              <span className="text-xs text-slate-400 font-medium">System Risk Score</span>
              <span className="text-sm font-bold text-emerald-400">Low (14.2%)</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex items-center justify-between shadow-lg">
              <span className="text-xs text-slate-400 font-medium">Node Health Split</span>
              <div className="flex items-center gap-1 text-xs font-bold">
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
          <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <GraphView graphData={graphData} onNodeClick={(node) => setSelectedNode(node)} />
          </div>
        </div>

        {/* Right Sidebar & Alert Feed */}
        <div className="w-80 flex flex-col gap-4 shrink-0 overflow-y-auto">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <AlertFeed alerts={alerts} />
          </div>
          <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <SidePanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
          </div>
        </div>

      </div>
    </div>
  );
}