import React, { useState, useEffect } from 'react';
import GraphView from './components/GraphView';
import SidePanel from './components/SidePanel';
import AlertFeed from './components/AlertFeed';
import ScenarioControls from './components/ScenarioControls';

export default function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [activeShockLabel, setActiveShockLabel] = useState('None');

  const fetchData = async () => {
    try {
      const resGraph = await fetch('http://localhost:8000/graph');
      const dataGraph = await resGraph.json();
      setGraphData(dataGraph);

      const resAlerts = await fetch('http://localhost:8000/alerts');
      const dataAlerts = await resAlerts.json();
      setAlerts(dataAlerts.alerts);
    } catch (err) {
      console.error('Failed to sync graph backend data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTriggerScenario = async (scenarioKey) => {
    try {
      const res = await fetch(`http://localhost:8000/simulate/${scenarioKey}`, { method: 'POST' });
      const data = await res.json();
      setActiveShockLabel(data.active_shock || scenarioKey);
      await fetchData();
    } catch (err) {
      console.error('Simulation trigger failed:', err);
    }
  };

  const handleSelectNode = async (nodeId) => {
    if (nodeId.startsWith('B_')) {
      try {
        const res = await fetch(`http://localhost:8000/borrower/${nodeId}`);
        const data = await res.json();
        setSelectedBorrower(data);
      } catch (err) {
        console.error('Failed to fetch borrower inspection details:', err);
      }
    } else {
      setSelectedBorrower(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Top App Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-white tracking-tight">CONTAGION SHIELD</h1>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Heterogeneous Graph Neural Engine (Mock-Sim)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Microfinance Joint-Liability Credit Risk Platform • Real-Time Contagion Isolation & Macro Shock Separation
          </p>
        </div>
        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg text-xs">
          <span className="text-slate-500">Active Market State: </span>
          <span className="font-bold text-amber-400">{activeShockLabel}</span>
        </div>
      </header>

      {/* Scenario Triggers */}
      <ScenarioControls onTrigger={handleTriggerScenario} />

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GraphView graphData={graphData} onSelectNode={handleSelectNode} />
          <AlertFeed alerts={alerts} />
        </div>
        <div className="lg:col-span-1">
          <SidePanel borrowerData={selectedBorrower} onClose={() => setSelectedBorrower(null)} />
        </div>
      </div>
    </div>
  );
}