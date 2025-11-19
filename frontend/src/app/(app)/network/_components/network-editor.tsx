'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CirclePlus, Link2, MousePointerClick, Redo2, Undo2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHistory } from '@/lib/hooks/use-history';
import type { RelationshipEdgeData, RelationshipNodeData, RelationshipRecord } from '@/lib/types/network';
import { cn } from '@/lib/utils';

import { NetworkEditorMode, NetworkEditorSelection } from './network-editor-types';
import { RelationshipGraph } from './relationship-graph';

const NODE_SHAPES: { label: string; value: RelationshipNodeData['shape'] }[] = [
  { label: '타원', value: 'ellipse' },
  { label: '사각형', value: 'box' },
  { label: '원', value: 'circle' },
];

const NODE_COLORS = ['#ffffcc', '#ffffff', '#ccff66', '#d9f99d', '#bae6fd', '#fef9c3', '#fee2e2', '#e9d5ff'];
const EDGE_COLORS = ['#777777', '#334155', '#0ea5e9', '#22c55e', '#f97316', '#b91c1c', '#a855f7', '#d946ef'];

type NetworkEditorProps = {
  record: RelationshipRecord;
};

export function NetworkEditor({ record }: NetworkEditorProps) {
  const {
    state: graphData,
    set: setGraphData,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory({
    nodes: record.nodes.map(normalizeNode),
    edges: record.edges.map(normalizeEdge),
  });
  const { nodes, edges } = graphData;

  const [mode, setMode] = useState<NetworkEditorMode>('select');
  const [selection, setSelection] = useState<NetworkEditorSelection>(null);
  const [edgeDraft, setEdgeDraft] = useState<{ from: string | null }>({ from: null });
  const [editorHeight, setEditorHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  const selectedNode = selection?.type === 'node' ? nodes.find((node) => node.id === selection.id) ?? null : null;
  const selectedEdge = selection?.type === 'edge' ? edges.find((edge) => edge.id === selection.id) ?? null : null;

  const sortedNodeOptions = useMemo(
    () => nodes.map((node) => ({ value: node.id, label: node.label || node.id })),
    [nodes]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 입력 필드에서는 단축키 무시
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
        return;
      }

      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z' && !event.shiftKey) {
          event.preventDefault();
          if (canUndo) undo();
        } else if ((event.key === 'z' && event.shiftKey) || event.key === 'y') {
          event.preventDefault();
          if (canRedo) redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  function logGraphState() {
    if (typeof window === 'undefined') {
      return;
    }
    console.log('[Graph]', {
      nodes,
      edges,
    });
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    logGraphState();
  }, [nodes, edges]);

  function handleCanvasClick(position: { x: number; y: number }) {
    if (mode === 'addNode') {
      const newNode: RelationshipNodeData = {
        id: createId('node'),
        label: '새 노드',
        shape: 'ellipse',
        color: NODE_COLORS[0],
        x: position.x,
        y: position.y,
      };
      setGraphData((prev) => ({
        ...prev,
        nodes: [...prev.nodes, newNode],
      }));
      setSelection({ type: 'node', id: newNode.id });
      return;
    }

    if (mode === 'addEdge') {
      setEdgeDraft({ from: null });
      return;
    }

    setSelection(null);
  }

  function handleNodeClick(nodeId: string) {
    if (mode === 'addEdge') {
      if (!edgeDraft.from) {
        setEdgeDraft({ from: nodeId });
        return;
      }
      if (edgeDraft.from === nodeId) {
        return;
      }
      const newEdge: RelationshipEdgeData = {
        id: createId('edge'),
        from: edgeDraft.from,
        to: nodeId,
        label: '',
        color: EDGE_COLORS[0],
        dashes: false,
      };
      setGraphData((prev) => ({
        ...prev,
        edges: [...prev.edges, newEdge],
      }));
      setSelection({ type: 'edge', id: newEdge.id });
      setEdgeDraft({ from: null });
      setMode('select');
      return;
    }

    setSelection({ type: 'node', id: nodeId });
  }

  function handleEdgeClick(edgeId: string) {
    setSelection({ type: 'edge', id: edgeId });
    setMode('select');
    setEdgeDraft({ from: null });
  }

  function handleNodeUpdate(nodeId: string, partial: Partial<RelationshipNodeData>) {
    setGraphData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => {
        if (node.id !== nodeId) {
          return node;
        }
        return { ...node, ...partial };
      }),
    }));
  }

  function handleEdgeUpdate(edgeId: string, partial: Partial<RelationshipEdgeData>) {
    setGraphData((prev) => ({
      ...prev,
      edges: prev.edges.map((edge) => {
        if (edge.id !== edgeId) {
          return edge;
        }
        return { ...edge, ...partial };
      }),
    }));
  }

  function handleDeleteNode(nodeId: string) {
    setGraphData((prev) => ({
      nodes: prev.nodes.filter((node) => node.id !== nodeId),
      edges: prev.edges.filter((edge) => edge.from !== nodeId && edge.to !== nodeId),
    }));
    setSelection(null);
  }

  function handleDeleteEdge(edgeId: string) {
    setGraphData((prev) => ({
      ...prev,
      edges: prev.edges.filter((edge) => edge.id !== edgeId),
    }));
    setSelection(null);
  }

  function handleNodePositionChange(updates: { id: string; x: number; y: number }[]) {
    setGraphData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => {
        const update = updates.find((item) => item.id === node.id);
        return update ? { ...node, x: update.x, y: update.y } : node;
      }),
    }));
  }

  function handleModeChange(nextMode: NetworkEditorMode) {
    setMode(nextMode);
    if (nextMode !== 'addEdge') {
      setEdgeDraft({ from: null });
    }
  }

  const edgeModeHint =
    mode === 'addEdge'
      ? edgeDraft.from
        ? '끝 노드를 선택하세요.'
        : '시작 노드를 선택하세요.'
      : null;

  useEffect(() => {
    function updateHeight() {
      if (!containerRef.current) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const available = window.innerHeight - rect.top - 70;
      setEditorHeight(Math.max(420, available));
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const panelStyle = editorHeight ? { height: editorHeight } : undefined;

  return (
    <div ref={containerRef} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mt-2 flex flex-col gap-4 lg:flex-row" style={panelStyle}>
        <div className="flex-1 min-h-[420px]" style={panelStyle}>
          <RelationshipGraph
            nodes={nodes}
            edges={edges}
            mode={mode}
            selection={selection}
            onCanvasClick={handleCanvasClick}
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
            onNodePositionChange={handleNodePositionChange}
            className="h-full w-full rounded-2xl border border-dashed border-border bg-muted/30"
          />
        </div>

        <aside className="w-full rounded-2xl border border-border bg-background/40 p-4 shadow-sm lg:w-80 lg:max-w-xs" style={panelStyle}>
          <div className="flex h-full flex-col gap-4">
            <div className="rounded-xl border border-border/70 bg-background/60 p-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <EditorModeButton
                  active={mode === 'select'}
                  icon={MousePointerClick}
                  label="선택 모드"
                  onClick={() => handleModeChange('select')}
                />
                <EditorModeButton
                  active={mode === 'addNode'}
                  icon={CirclePlus}
                  label="노드 추가 모드"
                  onClick={() => handleModeChange('addNode')}
                />
                <EditorModeButton
                  active={mode === 'addEdge'}
                  icon={Link2}
                  label="연결선 추가 모드"
                  onClick={() => handleModeChange('addEdge')}
                />

                <div className="mx-1 h-6 w-px bg-border" aria-hidden="true" />

                <EditorModeButton
                  active={false}
                  icon={Undo2}
                  label="실행 취소 (Ctrl+Z)"
                  onClick={undo}
                  disabled={!canUndo}
                />
                <EditorModeButton
                  active={false}
                  icon={Redo2}
                  label="다시 실행 (Ctrl+Y)"
                  onClick={redo}
                  disabled={!canRedo}
                />
              </div>
              {edgeModeHint ? <p className="mt-2 text-xs text-amber-500">{edgeModeHint}</p> : null}
            </div>

            <div className="flex-1 overflow-auto rounded-xl border border-border/70 bg-background/60 p-4">
              {selectedNode ? (
                <NodeEditorPanel
                  node={selectedNode}
                  onChange={(partial) => handleNodeUpdate(selectedNode.id, partial)}
                  onDelete={() => handleDeleteNode(selectedNode.id)}
                />
              ) : selectedEdge ? (
                <EdgeEditorPanel
                  edge={selectedEdge}
                  nodes={sortedNodeOptions}
                  onChange={(partial) => handleEdgeUpdate(selectedEdge.id, partial)}
                  onDelete={() => handleDeleteEdge(selectedEdge.id)}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                  <p>노드 또는 연결선을 선택하면 상세 편집이 가능합니다.</p>
                  <p>노드를 추가하려면 위의 편집 모드를 사용하세요.</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

type EditorModeButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

function EditorModeButton({ label, active, onClick, icon: Icon, disabled }: EditorModeButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? 'default' : 'outline'}
      size="icon"
      className={cn(
        'h-9 w-9 rounded-lg border border-border/60 bg-background/60 transition-colors',
        active ? 'bg-sky-500 text-white hover:bg-sky-600' : 'text-muted-foreground'
      )}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={label}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}

type NodeEditorPanelProps = {
  node: RelationshipNodeData;
  onChange: (partial: Partial<RelationshipNodeData>) => void;
  onDelete: () => void;
};

function NodeEditorPanel({ node, onChange, onDelete }: NodeEditorPanelProps) {
  const [label, setLabel] = useState(node.label);

  useEffect(() => {
    setLabel(node.label);
  }, [node.id, node.label]);

  function handleLabelBlur() {
    if (label !== node.label) {
      onChange({ label });
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="node-label">레이블</Label>
        <Input
          id="node-label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          onBlur={handleLabelBlur}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="mb-2 block text-sm font-medium text-muted-foreground">모양</Label>
        <div className="flex flex-wrap gap-2">
          {NODE_SHAPES.map((shape) => (
            <button
              key={shape.value}
              type="button"
              className={cn(
                'rounded-full border px-4 py-1 text-sm',
                node.shape === shape.value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
              )}
              onClick={() => onChange({ shape: shape.value })}
            >
              {shape.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 block text-sm font-medium text-muted-foreground">색상</Label>
        <div className="flex flex-wrap gap-2">
          {NODE_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                'h-8 w-8 rounded-full border-2',
                node.color === color ? 'border-primary' : 'border-border', // border-transparent -> border-border
              )}
              style={{ backgroundColor: color }}
              onClick={() => onChange({ color })}
            />
          ))}
        </div>
      </div>

      <Button type="button" variant="destructive" className="w-full" onClick={onDelete}>
        노드 삭제
      </Button>
    </div>
  );
}

type EdgeEditorPanelProps = {
  edge: RelationshipEdgeData;
  nodes: { value: string; label: string }[];
  onChange: (partial: Partial<RelationshipEdgeData>) => void;
  onDelete: () => void;
};

function EdgeEditorPanel({ edge, nodes, onChange, onDelete }: EdgeEditorPanelProps) {
  const [label, setLabel] = useState(edge.label ?? '');
  const fromValue = edge.from;
  const toValue = edge.to;
  const edgeColor = typeof edge.color === 'string' ? edge.color : edge.color?.color ?? EDGE_COLORS[0];

  useEffect(() => {
    setLabel(edge.label ?? '');
  }, [edge.id, edge.label]);

  function handleLabelBlur() {
    if (label !== (edge.label ?? '')) {
      onChange({ label });
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="edge-label">레이블</Label>
        <Input
          id="edge-label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          onBlur={handleLabelBlur}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="mb-1 block text-sm font-medium text-muted-foreground">시작 노드</Label>
        <Select value={fromValue} onValueChange={(value) => onChange({ from: value })}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="시작 노드" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map((node) => (
              <SelectItem key={node.value} value={node.value}>
                {node.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1 block text-sm font-medium text-muted-foreground">끝 노드</Label>
        <Select value={toValue} onValueChange={(value) => onChange({ to: value })}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="끝 노드" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map((node) => (
              <SelectItem key={node.value} value={node.value}>
                {node.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2 block text-sm font-medium text-muted-foreground">선 형태</Label>
        <div className="flex gap-2">
          <button
            type="button"
            className={cn(
              'flex-1 rounded-md border px-3 py-2 text-sm',
              edge.dashes ? 'border-border text-muted-foreground' : 'border-primary bg-primary/10 text-primary'
            )}
            onClick={() => onChange({ dashes: false })}
          >
            실선
          </button>
          <button
            type="button"
            className={cn(
              'flex-1 rounded-md border px-3 py-2 text-sm',
              edge.dashes ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
            )}
            onClick={() => onChange({ dashes: true })}
          >
            점선
          </button>
        </div>
      </div>

      <div>
        <Label className="mb-2 block text-sm font-medium text-muted-foreground">색상</Label>
        <div className="flex flex-wrap gap-2">
          {EDGE_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                'h-8 w-8 rounded-full border-2',
                edgeColor === color ? 'border-primary' : 'border-transparent'
              )}
              style={{ backgroundColor: color }}
              onClick={() => onChange({ color })}
            />
          ))}
        </div>
      </div>

      <Button type="button" variant="destructive" className="w-full" onClick={onDelete}>
        연결선 삭제
      </Button>
    </div>
  );
}

function normalizeNode(node: RelationshipNodeData): RelationshipNodeData {
  const color = typeof node.color === 'string' ? node.color : node.color?.background ?? NODE_COLORS[0];
  return { ...node, color };
}

function normalizeEdge(edge: RelationshipEdgeData): RelationshipEdgeData {
  const color = typeof edge.color === 'string' ? edge.color : edge.color?.color ?? EDGE_COLORS[0];
  return {
    ...edge,
    color,
    dashes: edge.dashes ?? false,
  };
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}

