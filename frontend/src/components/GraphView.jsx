import React, { useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

export default function GraphView({ graphData, onNodeClick }) {
  const fgRef = useRef();
  const [loading, setLoading] = useState(true);

  // Function to generate a procedural 3D spider web / radar grid
  const createSpiderWebObject = () => {
    const group = new THREE.Group();
    const radiusSteps = [40, 80, 120, 160];
    const radialLines = 8;

    // Material for web rings & spokes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
      linewidth: 1
    });

    // 1. Create Concentric Rings (Web Polygons)
    radiusSteps.forEach((r) => {
      const points = [];
      for (let i = 0; i <= 32; i++) {
        const theta = (i / 32) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, -20));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const ring = new THREE.Line(geometry, lineMaterial);
      group.add(ring);
    });

    // 2. Create Radial Spokes (Web Struts)
    for (let i = 0; i < radialLines; i++) {
      const theta = (i / radialLines) * Math.PI * 2;
      const points = [
        new THREE.Vector3(0, 0, -20),
        new THREE.Vector3(Math.cos(theta) * 160, Math.sin(theta) * 160, -20)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const spoke = new THREE.Line(geometry, lineMaterial);
      group.add(spoke);
    }

    return group;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [graphData]);

  const handleEngineStop = () => {
    if (fgRef.current && fgRef.current.scene()) {
      const scene = fgRef.current.scene();
      // Prevent duplicate web injection on re-renders
      if (!scene.getObjectByName('spiderWebGrid')) {
        const webMesh = createSpiderWebObject();
        webMesh.name = 'spiderWebGrid';
        scene.add(webMesh);
      }
    }
  };

  useEffect(() => {
    if (fgRef.current && !loading) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 280 }, { x: 0, y: 0, z: 0 }, 1000);
    }
  }, [loading]);

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
    fgRef.current.cameraPosition({ x: 0, y: 0, z: 280 }, { x: 0, y: 0, z: 0 }, 1000);
  };

  return (
    <div className="relative w-full h-full bg-[#020617] overflow-hidden">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full bg-slate-950/70 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin mb-3"></div>
          <div className="text-xs font-medium text-slate-400 tracking-wider uppercase animate-pulse font-mono">
            Rendering Spider-Web Spatial Grid...
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
            linkColor={() => 'rgba(99, 102, 241, 0.25)'}
            linkOpacity={0.6}
            onEngineStop={handleEngineStop}
            onNodeClick={onNodeClick}
            backgroundColor="#020617"
            showNavInfo={false}
          />

          {/* Camera Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-1.5 bg-slate-950/80 backdrop-blur-xl p-1.5 rounded-xl border border-white/10 shadow-2xl z-10">
            <button 
              onClick={handleZoomIn} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" 
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            </button>
            <button 
              onClick={handleZoomOut} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" 
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
            </button>
            <button 
              onClick={handleResetCamera} 
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition flex items-center justify-center" 
              title="Reset 3D View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}