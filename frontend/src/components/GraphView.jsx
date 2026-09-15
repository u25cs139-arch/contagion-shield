import React, { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphView({ graphData, onNodeClick }) {
  const fgRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
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
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const radius = node.val || 6;
              
              // Draw core node circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color || '#6366f1';
              ctx.fill();

              // Shock-wave pulse ring for high risk / quarantined nodes
              if (node.status === 'Quarantined' || node.riskScore > 70) {
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 2 / globalScale;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI, false);
                ctx.stroke();
              }

              // Node text label
              ctx.font = `${10 / globalScale}px sans-serif`;
              ctx.fillStyle = '#94a3b8';
              ctx.textAlign = 'center';
              ctx.fillText(node.id, node.x, node.y + radius + 10);
            }}
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