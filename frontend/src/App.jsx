import React, { useState } from 'react';
import GraphView from './components/GraphView';
import ScenarioControls from './components/ScenarioControls';
import SidePanel from './components/SidePanel';
import AlertFeed from './components/AlertFeed';

export default function App() {
  const [activeTrigger, setActiveTrigger] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // Sample mock graph data
  const mockGraphData = {
    nodes: [
      { id: 'B-101', type: 'Borrower', color: '#6366f1', val: 8 },
      { id: 'B-102', type: 'Borrower', color: '#6366f1', val: 6 },
      { id: 'G-1', type: 'Guarantor', color: '#f59e0b', val: 10 },
      { id: 'PW-1', type: 'Gateway', color: '#10b981', val: 12 }
    ],
    links: [
      { source: 'B-101', target: 'G-1' },
      { source: 'B-102', target: 'G-1' },
      { source: 'G-1', target: 'PW-1' }
    ]
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
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        
        {/* Left / Center Graph Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          
          {/* Quick-Stats Bar */}
          <div className="grid grid-cols-3 gap-4 shrink-0">
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
          </div>

          {/* Scenario Triggers Toolbar */}
          <div className="shrink-0">
            <ScenarioControls activeTrigger={activeTrigger} setActiveTrigger={setActiveTrigger} />
          </div>

          {/* Graph Canvas Container */}
          <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <GraphView graphData={mockGraphData} onNodeClick={(node) => setSelectedNode(node)} />
          </div>
        </div>

        {/* Right Sidebar & Alert Feed */}
        <div className="w-80 flex flex-col gap-4 shrink-0 overflow-y-auto">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <AlertFeed />
          </div>
          <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <SidePanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
          </div>
        </div>

      </div>
    </div>
  );
}