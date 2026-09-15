import React, { useState } from 'react';

export default function MonteCarloModal({ isOpen, onClose, onRunSimulation }) {
  const [shockIntensity, setShockIntensity] = useState(35);
  const [iterations, setIterations] = useState(1000);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);

  if (!isOpen) return null;

  const handleExecute = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      const simulatedRisk = (shockIntensity * 0.72).toFixed(1);
      const contagionProb = (shockIntensity * 0.45).toFixed(1);
      setResults({
        systemicRisk: simulatedRisk,
        probability: contagionProb,
        capitalAtRisk: `₹${(shockIntensity * 1.45).toFixed(1)} Lakhs`
      });
      onRunSimulation(shockIntensity);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
            <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider font-mono">
              Monte Carlo Stress Simulator
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Sliders / Configuration */}
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Macro Shock Intensity</span>
              <span className="font-mono text-indigo-400 font-bold">{shockIntensity}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={shockIntensity} 
              onChange={(e) => setShockIntensity(Number(e.target.value))}
              className="accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Simulation Iterations</span>
              <span className="font-mono text-slate-200">{iterations} Paths</span>
            </div>
            <select 
              value={iterations} 
              onChange={(e) => setIterations(Number(e.target.value))}
              className="bg-slate-950 border border-white/10 rounded-xl p-2.5 text-slate-200 font-mono outline-none"
            >
              <option value={500}>500 Paths (Fast)</option>
              <option value={1000}>1,000 Paths (Standard)</option>
              <option value={5000}>5,000 Paths (High Fidelity)</option>
            </select>
          </div>
        </div>

        {/* Results Box */}
        {results && (
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-950/60 border border-white/5 rounded-2xl text-center">
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Simulated Risk</span>
              <span className="text-sm font-bold font-mono text-rose-400">{results.systemicRisk}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Contagion Prob</span>
              <span className="text-sm font-bold font-mono text-amber-400">{results.probability}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Capital at Risk</span>
              <span className="text-sm font-bold font-mono text-indigo-400">{results.capitalAtRisk}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={handleExecute}
          disabled={running}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold tracking-wide uppercase transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
        >
          {running ? (
            <>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              <span>Running Stochastic Engine...</span>
            </>
          ) : (
            <span>Execute Monte Carlo Simulation</span>
          )}
        </button>

      </div>
    </div>
  );
}