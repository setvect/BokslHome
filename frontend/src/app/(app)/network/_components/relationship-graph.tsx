'use client';

import { useEffect, useRef } from 'react';
import { DataSet, Network, type Options } from 'vis-network/standalone';

import type { RelationshipEdgeData, RelationshipNodeData } from '@/lib/types/network';

import 'vis-network/styles/vis-network.css';

type RelationshipGraphProps = {
  nodes: RelationshipNodeData[];
  edges: RelationshipEdgeData[];
};

export function RelationshipGraph({ nodes, edges }: RelationshipGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const preparedNodes = nodes.map((node) => ({
      ...node,
      physics: false,
      fixed: {
        x: node.x !== undefined,
        y: node.y !== undefined,
      },
    }));

    const data = {
      nodes: new DataSet(preparedNodes),
      edges: new DataSet(edges.map((edge) => ({ ...edge }))),
    };

    const options: Options = {
      autoResize: true,
      physics: false,
      interaction: {
        hover: true,
        keyboard: false,
        zoomView: true,
        dragView: true,
      },
      nodes: {
        borderWidth: 2,
        color: {
          border: '#d4d4d8',
          background: '#fff',
          highlight: {
            border: '#fbbf24',
            background: '#fef3c7',
          },
        },
        font: {
          size: 16,
          color: '#4b5563',
        },
        shape: 'ellipse',
      },
      edges: {
        color: '#78716c',
        smooth: {
          type: 'continuous',
        },
        font: {
          size: 14,
          color: '#4b5563',
          strokeWidth: 0,
        },
      },
    };

    const network = new Network(containerRef.current, data, options);
    network.fit({ animation: false });

    return () => {
      network.destroy();
    };
  }, [nodes, edges]);

  return <div ref={containerRef} className="h-[520px] w-full rounded-2xl border border-border bg-muted/40" />;
}

