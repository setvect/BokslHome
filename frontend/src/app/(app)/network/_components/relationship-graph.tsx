'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { DataSet, Network, type Options } from 'vis-network/standalone';

import type { RelationshipEdgeData, RelationshipNodeData } from '@/lib/types/network';

import { type NetworkEditorMode, type NetworkEditorSelection } from './network-editor-types';

import 'vis-network/styles/vis-network.css';

type GraphNode = RelationshipNodeData & {
  physics?: boolean;
  fixed?: {
    x?: boolean;
    y?: boolean;
  };
};

type GraphEdge = Omit<RelationshipEdgeData, 'label'> & { label?: string };
type NetworkPointer = { canvas: { x: number; y: number } };
type NetworkClickParams = { nodes: Array<string | number>; edges: Array<string | number>; pointer: NetworkPointer };
type NetworkDragEndParams = { nodes?: Array<string | number>; pointer: NetworkPointer };
type NetworkDoubleClickParams = NetworkClickParams;

type RelationshipGraphContextMenuParams = {
  clientX: number;
  clientY: number;
  pointer: { dom: { x: number; y: number }; canvas: { x: number; y: number } };
  nodeId: string | null;
  edgeId: string | null;
};

type RelationshipGraphProps = {
  nodes: RelationshipNodeData[];
  edges: RelationshipEdgeData[];
  mode: NetworkEditorMode;
  selection: NetworkEditorSelection;
  onCanvasClick?: (position: { x: number; y: number }) => void;
  onNodeClick?: (nodeId: string, position: { x: number; y: number }) => void;
  onEdgeClick?: (edgeId: string) => void;
  onContextMenu?: (params: RelationshipGraphContextMenuParams) => void;
  onDoubleClick?: (params: { nodeId: string | null; edgeId: string | null }) => void;
  onNodePositionChange?: (updates: { id: string; x: number; y: number }[]) => void;
  className?: string;
};

export function RelationshipGraph({
  nodes,
  edges,
  mode,
  selection,
  onCanvasClick,
  onNodeClick,
  onEdgeClick,
  onContextMenu,
  onDoubleClick,
  onNodePositionChange,
  className,
}: RelationshipGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesDataRef = useRef(new DataSet<GraphNode>());
  const edgesDataRef = useRef(new DataSet<GraphEdge>());
  const onCanvasClickRef = useRef(onCanvasClick);
  const onNodeClickRef = useRef(onNodeClick);
  const onEdgeClickRef = useRef(onEdgeClick);
  const onContextMenuRef = useRef(onContextMenu);
  const onDoubleClickRef = useRef(onDoubleClick);
  const onNodePositionChangeRef = useRef(onNodePositionChange);
  const { resolvedTheme } = useTheme();
  const [isNetworkReady, setIsNetworkReady] = useState(false);

  useEffect(() => {
    if (!networkRef.current || !isNetworkReady) {
      return;
    }

    // 연결선 텍스트: 다크 모드에서는 밝은 회색(#e5e7eb), 라이트 모드에서는 어두운 회색(#4b5563)
    const edgeTextColor = resolvedTheme === 'dark' ? '#e5e7eb' : '#4b5563';
    // 노드 텍스트: 노드 배경이 항상 밝은 파스텔 톤이므로 항상 어두운 색(#4b5563) 유지
    const nodeTextColor = '#4b5563';

    networkRef.current.setOptions({
      nodes: {
        font: {
          color: nodeTextColor,
        },
      },
      edges: {
        font: {
          color: edgeTextColor,
        },
      },
    });
  }, [resolvedTheme, isNetworkReady]);

  useEffect(() => {
    onCanvasClickRef.current = onCanvasClick;
  }, [onCanvasClick]);

  useEffect(() => {
    onNodeClickRef.current = onNodeClick;
  }, [onNodeClick]);

  useEffect(() => {
    onEdgeClickRef.current = onEdgeClick;
  }, [onEdgeClick]);

  useEffect(() => {
    onContextMenuRef.current = onContextMenu;
  }, [onContextMenu]);

  useEffect(() => {
    onDoubleClickRef.current = onDoubleClick;
  }, [onDoubleClick]);

  useEffect(() => {
    onNodePositionChangeRef.current = onNodePositionChange;
  }, [onNodePositionChange]);

  useEffect(() => {
    const nodesData = nodesDataRef.current;
    const enhancedNodes = nodes.map<GraphNode>((node) => ({
      ...node,
      physics: false,
      fixed: {
        x: false,
        y: false,
      },
    }));
    syncDataSet(nodesData, enhancedNodes);
  }, [nodes]);

  useEffect(() => {
    const edgesData = edgesDataRef.current;
    const enhancedEdges: GraphEdge[] = edges.map((edge) => ({
      ...edge,
      label: edge.label ?? undefined,
    }));
    syncDataSet(edgesData, enhancedEdges);
  }, [edges]);

  useEffect(() => {
    if (!containerRef.current || networkRef.current) {
      return;
    }

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
          enabled: true,
          type: 'continuous',
          roundness: 0.5,
        },
        font: {
          size: 14,
          color: '#4b5563',
          strokeWidth: 0,
        },
      },
    };

    const network = new Network(
      containerRef.current,
      {
        nodes: nodesDataRef.current,
        edges: edgesDataRef.current,
      },
      options
    );

    networkRef.current = network;
    setIsNetworkReady(true);
    network.fit({ animation: false });

    const handleClick = (params: NetworkClickParams) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0] as string;
        onNodeClickRef.current?.(nodeId, params.pointer.canvas);
        return;
      }
      if (params.edges.length > 0) {
        const edgeId = params.edges[0] as string;
        onEdgeClickRef.current?.(edgeId);
        return;
      }
      onCanvasClickRef.current?.(params.pointer.canvas);
    };

    const handleDragEnd = (params: NetworkDragEndParams) => {
      if (!params.nodes || params.nodes.length === 0) {
        return;
      }
      const updates = (params.nodes as string[]).map((nodeId) => {
        const { x, y } = network.getPosition(nodeId);
        return { id: nodeId, x, y };
      });
      if (updates.length > 0) {
        onNodePositionChangeRef.current?.(updates);
      }
    };

    const handleDoubleClick = (params: NetworkDoubleClickParams) => {
      const nodeId = params.nodes.length > 0 ? String(params.nodes[0]) : null;
      const edgeId = nodeId ? null : params.edges.length > 0 ? String(params.edges[0]) : null;
      onDoubleClickRef.current?.({ nodeId, edgeId });
    };

    network.on('click', handleClick);
    network.on('dragEnd', handleDragEnd);
    network.on('doubleClick', handleDoubleClick);

    const handleContextMenu = (event: MouseEvent) => {
      if (!networkRef.current || !containerRef.current) {
        return;
      }
      event.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const pointerDom = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const pointerCanvas = networkRef.current.DOMtoCanvas(pointerDom);
      const nodeAtPointer = networkRef.current.getNodeAt(pointerDom);
      const edgeAtPointer = networkRef.current.getEdgeAt(pointerDom);

      const nodeId = nodeAtPointer ? String(nodeAtPointer) : null;
      const edgeId = nodeId ? null : edgeAtPointer ? String(edgeAtPointer) : null;

      onContextMenuRef.current?.({
        clientX: event.clientX,
        clientY: event.clientY,
        pointer: { dom: pointerDom, canvas: pointerCanvas },
        nodeId,
        edgeId,
      });
    };

    containerRef.current.addEventListener('contextmenu', handleContextMenu);

    return () => {
      network.off('click', handleClick);
      network.off('dragEnd', handleDragEnd);
      network.off('doubleClick', handleDoubleClick);
      containerRef.current?.removeEventListener('contextmenu', handleContextMenu);
      network.destroy();
      networkRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!networkRef.current) {
      return;
    }
    if (!selection) {
      networkRef.current.unselectAll();
      return;
    }
    if (selection.type === 'node') {
      networkRef.current.selectNodes([selection.id], false);
    } else {
      networkRef.current.selectEdges([selection.id]);
    }
  }, [selection]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    if (mode === 'addNode') {
      containerRef.current.style.cursor = 'crosshair';
    } else if (mode === 'addEdge') {
      containerRef.current.style.cursor = 'copy';
    } else {
      containerRef.current.style.cursor = 'grab';
    }
  }, [mode]);

  useEffect(() => {
    if (!networkRef.current) {
      return;
    }
    networkRef.current.setOptions({
      interaction: {
        dragNodes: mode === 'select',
      },
    });
  }, [mode]);

  return <div ref={containerRef} className={className ?? 'h-[520px] w-full rounded-2xl border border-border bg-muted/40'} />;
}

function syncDataSet<T extends { id: string }>(dataSet: DataSet<T>, items: T[]) {
  // @ts-expect-error vis-data typings accept partial items, runtime is safe
  dataSet.update(items);
  const incomingIds = new Set(items.map((item: { id: string }) => String(item.id)));
  const currentIds = dataSet.getIds();
  currentIds.forEach((id) => {
    if (!incomingIds.has(String(id))) {
      dataSet.remove(id);
    }
  });
}
