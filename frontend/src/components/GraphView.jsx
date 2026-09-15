import React, { useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

export default function GraphView({ graphData, onNodeClick }) {
  const fgRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Re-run whenever graphData or loading state changes to ensure grid & forces persist
  useEffect(() => {
    if (!loading && fgRef.current) {
      const fg = fgRef.current;
      const scene = fg.scene();

      // 1. Force configuration for wider node spread
      try {
        fg.d3Force('charge').strength(-220);
        fg.d3Force('link').distance(80);
      } catch (e) {
        console.warn("D3 Force initialization deferred", e);
      }

      // 2. Add Polar Grid (Spider Web) background safely
      if (scene && !scene.getObjectByName('spiderWebGrid')) {
        const group = new THREE.Group();
        group.name = 'spiderWebGrid';
        
        const polarGrid = new THREE.PolarGridHelper(200, 16, 8, 32, 0x6366f1, 0x818cf8);
        polarGrid.position.set(0, -30, -20);
        polarGrid.rotation.x = Math.PI / 2.2;
        
        polarGrid.traverse((child) => {
          if (child.material) {
            child.material.transparent = true;
            child.material.opacity = 0.4;
            child.material.depthWrite = false;
          }
        });

        group.add(polarGrid);
        scene.add(group);
      }

      // 3. Auto-fit camera position
      fg.cameraPosition({ x: 0, y: 0, z: 240 }, { x: 0, y: 0, z: 0 }, 800);
    }
  }, [loading, graphData]);

  const handleZoomIn = () => {
    if (!fgRef.current) return;
    const currentPos = fgRef.current.cameraPosition();
    fgRef.current.cameraPosition({ x: currentPos.x, y: currentPos.y, z: currentPos.z / 1.3 }, null, 400);
  };

  const handleZoomOut = () => {
    if (!fgRef.current) return;
    const currentPos = fgRef.current.cameraPosition();
    fgRef.current.cameraPosition({ x: currentPos.x, y: currentPos.y, z: currentPos.z * 1.3 }, null, 400);
  };

  const handleResetCamera = () => {
    if (!fgRef.current) return;
    fgRef.current.cameraPosition({ x: 0, y: 0, z: 240 }, { x: 0, y: 0, z: 0 }, 800);
  };

  return (
    <div className="relative w-full h-full bg-[#020617] overflow-hidden">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full bg-slate-950/70 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin mb-3"></div>
          <div className="text-xs font-medium text-slate-400 tracking-wider uppercase animate-pulse font-mono">
            Rendering 3D Spider-Web Matrix...
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <ForceGraph3D
            ref={fgRef}
            graphData={graphData}
            nodeVal="val"
            nodeColor={node => node.color || '#6366f1'}
            nodeOpacity={0.95}
            nodeResolution={32}
            linkWidth={1.5}
            linkColor={() => 'rgba(99, 102, 241, 0.35)'}
            linkOpacity={0.7}
            onNodeClick={onNodeClick}
            backgroundColor="#020617"
            showNavInfo={false}
          />

          {/* Camera Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-1.5 bg-slate-950/80 backdrop-blur-xl p-1.5 rounded-xl border border-white/10 shadow-2xl z-10">
            <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" title="Zoom In">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            </button>
            <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" title="Zoom Out">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
            </button>
            <button onClick={handleResetCamera} className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" title="Reset View">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}