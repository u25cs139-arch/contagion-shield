import React, { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphView({ graphData, onNodeClick }) {
  const fgRef = useRef();
  const [loading, setLoading] = useState(true);

  // Simulate a brief loading state for smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [graphData]);

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full bg-slate-950/60 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mb-4"></div>
          <div className="text-sm font-medium text-slate-400 animate-pulse tracking-wide">
            Loading heterogeneous graph network...
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* Main Force Graph Renderer */}
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeLabel={(node) => `${node.id} (${node.type || 'Borrower'})`}
            nodeColor={(node) => node.color || '#6366f1'}
            nodeVal={(node) => node.val || 6}
            linkColor={() => '#334155'}
            linkWidth={1.5}
            onNodeClick={onNodeClick}
            backgroundColor="#020617"
          />
          
          {/* Floating Canvas Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl">
            <button 
              onClick={() => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400)} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition text-sm font-bold" 
              title="Zoom In"
            >
              ➕
            </button>
            <button 
              onClick={() => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400)} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition text-sm font-bold" 
              title="Zoom Out"
            >
              ➖
            </button>
            <button 
              onClick={() => fgRef.current?.centerAt(0, 0, 1000)} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition text-sm font-bold" 
              title="Recenter"
            >
              🎯
            </button>
          </div>
        </div>
      )}
    </div>
  );
}