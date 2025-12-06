import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

export default function GraphVisualizer({ edges, vertices }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = [];
    for (let i = 0; i < vertices; i++) {
      nodes.push({ id: i, label: String(i) });
    }

    const data = {
      nodes: nodes,
      edges: edges.map(e => ({
        from: e.from,
        to: e.to,
        label: String(e.weight)
      }))
    };

    const options = {
      edges: {
        font: { align: "middle" },
        arrows: { to: false },
        color: "#00eaff",
      },
      nodes: {
        shape: "circle",
        color: {
          background: "#1f2937",
          border: "#00eaff",
        },
        font: { color: "white" },
        borderWidth: 2,
      },
      physics: {
        enabled: true,
        stabilizaion: true,
      },
      autoResize: true
    };

    new Network(containerRef.current, data, options);
  }, [edges, vertices]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] border border-gray-700 rounded-lg"
    ></div>
  );
}
