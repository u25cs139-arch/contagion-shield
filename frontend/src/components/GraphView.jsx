import React, { useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphView({ graphData, onSelectNode }) {
  const fgRef = useRef();

  const getNodeColor = (node) => {
    if (node.type === 'PaymentGateway') return '#38bdf8';
    if (node.type === 'Group') return '#94a3b8';
    switch (node.status) {
      case 'healthy': return '#22c55e';
      case 'hardship': return '#f59e0b';
      case 'contagion-risk': return '#ef4444';
      case 'quarantined': return '#a855f7';
      case 'macro-shock': return '#3b82f6';
      case 'collusion-flagged': return '#f97316';
      default: return '#22c55e';
    }
  };

  if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-[500px] flex items-center justify-center text-slate-500 text-sm shadow-xl">
        Loading heterogeneous graph network...
      </div>
    );
  }

  // Map backend 'edges' to react-force-graph's expected 'links' property format
  const formattedData = {
    nodes: graphData.nodes,
    links: graphData.edges || graphData.links || []
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-[500px] relative shadow-xl">
      <div className="absolute top-3 left-3 z-10 bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-xs flex gap-4 text-slate-300">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Healthy</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Hardship</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Contagion Risk</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Quarantined</span>
      </div>
      <ForceGraph2D
        ref={fgRef}
        graphData={formattedData}
        nodeLabel={(node) => `${node.id} (${node.type}) - Status: ${node.status || 'N/A'}`}
        nodeColor={getNodeColor}
        nodeVal={(node) => (node.type === 'Group' ? 12 : 5)}
        linkColor={() => '#334155'}
        onNodeClick={(node) => onSelectNode(node.id)}
        backgroundColor="#020617"
      />
    </div>
  );
}