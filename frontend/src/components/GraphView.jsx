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
    <div className="relative w-full h-full bg-[#020617] overflow-hidden">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full bg-slate-950/60 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin mb-3"></div>
          <div className="text-xs font-medium text-slate-400 tracking-wider uppercase animate-pulse">
            Initializing Network Topology...
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const radius = node.val || 6;
              
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color || '#6366f1';
              ctx.fill();

              if (node.status === 'Quarantined' || node.riskScore > 70) {
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1.5 / globalScale;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI, false);
                ctx.stroke();
              }

              ctx.font = `500 ${10 / globalScale}px Inter, sans-serif`;
              ctx.fillStyle = '#94a3b8';
              ctx.textAlign = 'center';
              ctx.fillText(node.id, node.x, node.y + radius + 10);
            }}
            linkColor={() => 'rgba(51, 65, 85, 0.4)'}
            linkWidth={1.5}
            onNodeClick={onNodeClick}
            backgroundColor="#020617"
          />
          
          {/* Professional Floating Canvas Controls (SVG Icons) */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-1.5 bg-slate-950/80 backdrop-blur-xl p-1.5 rounded-xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400)} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" 
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            </button>
            <button 
              onClick={() => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400)} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" 
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
            </button>
            <button 
              onClick={() => fgRef.current?.centerAt(0, 0, 1000)} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" 
              title="Recenter View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}