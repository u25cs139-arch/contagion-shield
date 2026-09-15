import React, { useEffect, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

export default function GraphView({ onNodeSelect }) {
  const fgRef = useRef();

  const gData = {
    nodes: [
      { id: 'G-1', group: 'Guarantor', val: 25, color: '#f59e0b', risk: 45 },
      { id: 'B-101', group: 'Borrower', val: 15, color: '#8b5cf6', risk: 78 },
      { id: 'B-102', group: 'Borrower', val: 12, color: '#6366f1', risk: 12 },
      { id: 'NW-1', group: 'Gateway', val: 30, color: '#10b981', risk: 5 },
      { id: 'B-103', group: 'Borrower', val: 18, color: '#ef4444', risk: 89 },
    ],
    links: [
      { source: 'G-1', target: 'B-101' },
      { source: 'G-1', target: 'B-102' },
      { source: 'NW-1', target: 'G-1' },
      { source: 'B-101', target: 'B-103' }
    ]
  };

  useEffect(() => {
    if (fgRef.current) {
      const grid = new THREE.PolarGridHelper(120, 16, 8, 64, 0x1e3a8a, 0x0f172a);
      grid.position.y = -35;
      fgRef.current.scene().add(grid);

      fgRef.current.d3Force('charge').strength(-140);
      fgRef.current.d3Force('link').distance(70);

      fgRef.current.cameraPosition({ x: 0, y: 40, z: 180 }, { x: 0, y: 0, z: 0 }, 1000);
    }
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <ForceGraph3D
        ref={fgRef}
        graphData={gData}
        nodeId="id"
        nodeLabel="id"
        nodeColor="color"
        nodeVal="val"
        backgroundColor="#090d16"
        linkColor={() => 'rgba(59, 130, 246, 0.25)'}
        linkWidth={1.5}
        onNodeClick={(node) => onNodeSelect(node)}
      />
    </div>
  );
}