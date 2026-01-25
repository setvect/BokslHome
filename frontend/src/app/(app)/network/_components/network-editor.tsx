'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CirclePlus, Link2, MousePointerClick, Redo2, Undo2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHistory } from '@/lib/hooks/use-history';
import type { RelationshipEdgeData, RelationshipNodeData } from '@/lib/types/network';
import { cn } from '@/lib/utils';

import { NetworkEditorMode, NetworkEditorSelection } from './network-editor-types';
import { RelationshipGraph } from './relationship-graph';

const NODE_SHAPES: { label: string; value: RelationshipNodeData['shape'] }[] = [
  { label: '타원', value: 'ellipse' },
  { label: '사각형', value: 'box' },
  { label: '원', value: 'circle' },
];

const NODE_COLORS = [
  '#ffffcc',
  '#ffffff',
  '#ccff66',
  '#d9f99d',
  '#bae6fd',
  '#fef9c3',
  '#fee2e2',
  '#e9d5ff',
  '#f97316',
  '#facc15',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#0ea5e9',
  '#6366f1',
  '#a855f7',
  '#ec4899',
  '#ef4444',
];
const EDGE_COLORS = ['#777777', '#334155', '#0ea5e9', '#22c55e', '#f97316', '#b91c1c', '#a855f7', '#d946ef'];

type GraphContextMenuState = {
  open: boolean;
  clientX: number;
  clientY: number;
  canvasX: number;
  canvasY: number;
};

type NodeModalState =
  | {
      open: true;
      mode: 'add';
      position: { x: number; y: number };
      connectFromNodeId: string | null;
    }
  | {
      open: true;
      mode: 'edit';
      nodeId: string;
    }
  | {
      open: false;
    };

type EdgeModalState =
  | {
      open: true;
      edgeId: string;
    }
  | {
      open: false;
    };

type NetworkEditorProps = {
  initialNodes: RelationshipNodeData[];
  initialEdges: RelationshipEdgeData[];
  onSave: (graphData: { nodes: RelationshipNodeData[]; edges: RelationshipEdgeData[] }) => Promise<void>;
  isSaving: boolean;
};

export function NetworkEditor({ initialNodes, initialEdges, onSave, isSaving }: NetworkEditorProps) {
  const {
    state: graphData,
    set: setGraphData,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory({
    nodes: initialNodes.map(normalizeNode),
    edges: initialEdges.map(normalizeEdge),
  });
  const { nodes, edges } = graphData;

  const [mode, setMode] = useState<NetworkEditorMode>('select');
  const [selection, setSelection] = useState<NetworkEditorSelection>(null);
  const [edgeDraft, setEdgeDraft] = useState<{ from: string | null }>({ from: null });
  const [editorHeight, setEditorHeight] = useState<number | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [contextMenu, setContextMenu] = useState<GraphContextMenuState>({
    open: false,
    clientX: 0,
    clientY: 0,
    canvasX: 0,
    canvasY: 0,
  });
  const [nodeModal, setNodeModal] = useState<NodeModalState>({ open: false });
  const [edgeModal, setEdgeModal] = useState<EdgeModalState>({ open: false });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  const selectedNode = selection?.type === 'node' ? (nodes.find((node) => node.id === selection.id) ?? null) : null;
  const selectedEdge = selection?.type === 'edge' ? (edges.find((edge) => edge.id === selection.id) ?? null) : null;

  const sortedNodeOptions = useMemo(() => nodes.map((node) => ({ value: node.id, label: node.label || node.id })), [nodes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 입력 필드에서는 단축키 무시
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
        return;
      }

      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z' && !event.shiftKey) {
          event.preventDefault();
          if (canUndo) {
            undo();
          }
        } else if ((event.key === 'z' && event.shiftKey) || event.key === 'y') {
          event.preventDefault();
          if (canRedo) {
            redo();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  // Auto-save when graph data changes (with debounce)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Debounce auto-save to prevent excessive API calls
    const timeoutId = setTimeout(() => {
      console.log('[Graph] Auto-saving changes...');
      handleSave();
    }, 1000); // Wait 1 second after last change before saving

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleGraphContextMenu(params: {
    clientX: number;
    clientY: number;
    pointer: { dom: { x: number; y: number }; canvas: { x: number; y: number } };
    nodeId: string | null;
    edgeId: string | null;
  }) {
    if (params.nodeId) {
      setSelection({ type: 'node', id: params.nodeId });
    } else if (params.edgeId) {
      setSelection({ type: 'edge', id: params.edgeId });
    }

    setContextMenu({
      open: true,
      clientX: params.clientX,
      clientY: params.clientY,
      canvasX: params.pointer.canvas.x,
      canvasY: params.pointer.canvas.y,
    });
  }

  function handleGraphDoubleClick(params: { nodeId: string | null; edgeId: string | null }) {
    handleModeChange('select');
    closeContextMenu();

    if (params.nodeId) {
      setSelection({ type: 'node', id: params.nodeId });
      setNodeModal({ open: true, mode: 'edit', nodeId: params.nodeId });
      return;
    }

    if (params.edgeId) {
      setSelection({ type: 'edge', id: params.edgeId });
      setEdgeModal({ open: true, edgeId: params.edgeId });
    }
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

  function closeContextMenu() {
    setContextMenu((prev) => ({ ...prev, open: false }));
  }

  function openAddNodeModal() {
    handleModeChange('select');
    const connectFromNodeId = selection?.type === 'node' ? selection.id : null;
    setNodeModal({
      open: true,
      mode: 'add',
      position: { x: contextMenu.canvasX, y: contextMenu.canvasY },
      connectFromNodeId,
    });
  }

  function openEditModal() {
    handleModeChange('select');
    if (selection?.type === 'node') {
      setNodeModal({ open: true, mode: 'edit', nodeId: selection.id });
      return;
    }
    if (selection?.type === 'edge') {
      setEdgeModal({ open: true, edgeId: selection.id });
    }
  }

  function handleDeleteSelection() {
    if (selection?.type === 'node') {
      handleDeleteNode(selection.id);
      return;
    }
    if (selection?.type === 'edge') {
      handleDeleteEdge(selection.id);
    }
  }

  function startAddEdgeFromSelection() {
    const from = selection?.type === 'node' ? selection.id : null;
    setMode('addEdge');
    setEdgeDraft({ from });
  }

  function handleAddNodeFromModal(values: {
    label: string;
    shape: RelationshipNodeData['shape'];
    color: string;
    position: { x: number; y: number };
    connectFromNodeId: string | null;
    edgeLabel: string;
  }) {
    const newNode: RelationshipNodeData = {
      id: createId('node'),
      label: values.label.trim() ? values.label : '노드',
      shape: values.shape,
      color: values.color,
      x: values.position.x,
      y: values.position.y,
    };

    const connectFrom = values.connectFromNodeId;
    const newEdge: RelationshipEdgeData | null = connectFrom
      ? {
          id: createId('edge'),
          from: connectFrom,
          to: newNode.id,
          label: values.edgeLabel ?? '',
          color: EDGE_COLORS[0],
          dashes: false,
        }
      : null;

    setGraphData((prev) => ({
      nodes: [...prev.nodes, newNode],
      edges: newEdge ? [...prev.edges, newEdge] : prev.edges,
    }));

    setSelection({ type: 'node', id: newNode.id });
    setNodeModal({ open: false });
  }

  function handleUpdateNodeFromModal(nodeId: string, partial: Partial<RelationshipNodeData>) {
    handleNodeUpdate(nodeId, partial);
    setNodeModal({ open: false });
  }

  function handleUpdateEdgeFromModal(edgeId: string, partial: Partial<RelationshipEdgeData>) {
    handleEdgeUpdate(edgeId, partial);
    setEdgeModal({ open: false });
  }

  const edgeModeHint = mode === 'addEdge' ? (edgeDraft.from ? '끝 노드를 선택하세요.' : '시작 노드를 선택하세요.') : null;

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

  const handleSave = async () => {
    if (isSaving) {
      return;
    }
    await onSave(graphData);
  };

  return (
    <div ref={containerRef}>
      <div className="mt-2 flex flex-col gap-4 lg:flex-row" style={panelStyle}>
        <div className="flex-1 min-h-[420px]" style={panelStyle}>
          <DropdownMenu open={contextMenu.open} onOpenChange={(open) => setContextMenu((prev) => ({ ...prev, open }))}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
                style={{ left: contextMenu.clientX, top: contextMenu.clientY }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right" sideOffset={2} className="w-40">
              <DropdownMenuItem
                className="text-sky-600 data-[highlighted]:text-sky-700"
                onSelect={(event) => {
                  event.preventDefault();
                  closeContextMenu();
                  openAddNodeModal();
                }}
              >
                노드 추가
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-sky-600 data-[highlighted]:text-sky-700"
                onSelect={(event) => {
                  event.preventDefault();
                  closeContextMenu();
                  startAddEdgeFromSelection();
                }}
              >
                연결선 추가
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={!selection}
                className="text-sky-600 data-[highlighted]:text-sky-700"
                onSelect={(event) => {
                  event.preventDefault();
                  closeContextMenu();
                  openEditModal();
                }}
              >
                수정
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={!selection}
                variant="destructive"
                onSelect={(event) => {
                  event.preventDefault();
                  closeContextMenu();
                  handleDeleteSelection();
                }}
              >
                제거
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RelationshipGraph
            nodes={nodes}
            edges={edges}
            mode={mode}
            selection={selection}
            onCanvasClick={handleCanvasClick}
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
            onContextMenu={handleGraphContextMenu}
            onDoubleClick={handleGraphDoubleClick}
            onNodePositionChange={handleNodePositionChange}
            className="h-full w-full rounded-2xl border border-dashed border-border bg-muted/30"
          />
        </div>

        {isPanelVisible && (
          <aside
            className="relative w-full rounded-2xl border border-border bg-background/40 p-4 shadow-sm lg:w-80 lg:max-w-xs"
            style={panelStyle}
          >
            {/* Toggle button on left edge - hidden on mobile */}
            <button
              onClick={() => setIsPanelVisible(false)}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-16 w-6 rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-600 transition-colors items-center justify-center"
              aria-label="편집 패널 숨기기"
            >
              <ChevronRight className="size-4" />
            </button>

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

                  <EditorModeButton active={false} icon={Undo2} label="실행 취소 (Ctrl+Z)" onClick={undo} disabled={!canUndo} />
                  <EditorModeButton active={false} icon={Redo2} label="다시 실행 (Ctrl+Y)" onClick={redo} disabled={!canRedo} />
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
        )}

        {!isPanelVisible && (
          <div className="relative">
            {/* Toggle button on right edge when panel is hidden - hidden on mobile */}
            <button
              onClick={() => setIsPanelVisible(true)}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-16 w-6 rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-600 transition-colors items-center justify-center"
              aria-label="편집 패널 보이기"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
        )}
      </div>

      <NodeEditorDialog
        state={nodeModal}
        node={nodeModal.open && nodeModal.mode === 'edit' ? (nodes.find((node) => node.id === nodeModal.nodeId) ?? null) : null}
        onClose={() => setNodeModal({ open: false })}
        onAdd={handleAddNodeFromModal}
        onUpdate={handleUpdateNodeFromModal}
      />

      <EdgeEditorDialog
        state={edgeModal}
        edge={edgeModal.open ? (edges.find((edge) => edge.id === edgeModal.edgeId) ?? null) : null}
        nodes={sortedNodeOptions}
        onClose={() => setEdgeModal({ open: false })}
        onUpdate={handleUpdateEdgeFromModal}
      />
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
        <Input id="node-label" value={label} onChange={(event) => setLabel(event.target.value)} onBlur={handleLabelBlur} className="mt-1" />
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
                node.color === color ? 'border-primary' : 'border-border' // border-transparent -> border-border
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
  const edgeColor = typeof edge.color === 'string' ? edge.color : (edge.color?.color ?? EDGE_COLORS[0]);

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
        <Input id="edge-label" value={label} onChange={(event) => setLabel(event.target.value)} onBlur={handleLabelBlur} className="mt-1" />
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
              className={cn('h-8 w-8 rounded-full border-2', edgeColor === color ? 'border-primary' : 'border-transparent')}
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

type NodeEditorDialogProps = {
  state: NodeModalState;
  node: RelationshipNodeData | null;
  onClose: () => void;
  onAdd: (values: {
    label: string;
    shape: RelationshipNodeData['shape'];
    color: string;
    position: { x: number; y: number };
    connectFromNodeId: string | null;
    edgeLabel: string;
  }) => void;
  onUpdate: (nodeId: string, partial: Partial<RelationshipNodeData>) => void;
};

function NodeEditorDialog({ state, node, onClose, onAdd, onUpdate }: NodeEditorDialogProps) {
  const isOpen = state.open;
  const isAdd = isOpen && state.mode === 'add';
  const connectFromNodeId = isAdd ? state.connectFromNodeId : null;
  const [label, setLabel] = useState('');
  const [shape, setShape] = useState<RelationshipNodeData['shape']>('ellipse');
  const [color, setColor] = useState<string>(NODE_COLORS[0]);
  const [edgeLabel, setEdgeLabel] = useState('');
  const labelInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (isAdd) {
      setLabel('');
      setShape('ellipse');
      setColor(NODE_COLORS[0]);
      setEdgeLabel('');
    } else if (node) {
      setLabel(node.label ?? '');
      setShape(node.shape ?? 'ellipse');
      setColor(typeof node.color === 'string' ? node.color : (node.color?.background ?? NODE_COLORS[0]));
      setEdgeLabel('');
    }
  }, [isOpen, isAdd, node?.id]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const id = requestAnimationFrame(() => labelInputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  const title = isAdd ? '노드 추가' : '노드 수정';
  const showEdgeLabel = Boolean(connectFromNodeId);
  const canOk = isAdd || Boolean(node);

  function handleOk() {
    if (isAdd) {
      onAdd({
        label,
        shape,
        color,
        position: state.position,
        connectFromNodeId,
        edgeLabel,
      });
      return;
    }

    if (!node) {
      onClose();
      return;
    }

    onUpdate(node.id, {
      label: label.trim() ? label : '노드',
      shape,
      color,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key !== 'Enter') {
        return;
      }
      event.preventDefault();
      if (canOk) {
        handleOk();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, canOk, label, shape, color, edgeLabel, node?.id]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label htmlFor="node-dialog-label" className="text-sm font-medium text-foreground">
              레이블
            </Label>
            <Input
              id="node-dialog-label"
              ref={labelInputRef}
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              className="mt-1 h-10"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground">모양</Label>
            <div className="flex flex-wrap gap-4">
              {NODE_SHAPES.map((option) => {
                const selected = option.value === shape;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className="flex items-center gap-2"
                    onClick={() => setShape(option.value)}
                    aria-pressed={selected}
                  >
                    <span
                      className={cn(
                        'flex size-4 items-center justify-center rounded-full border',
                        selected ? 'border-primary' : 'border-border'
                      )}
                      aria-hidden="true"
                    >
                      <span className={cn('size-2 rounded-full', selected ? 'bg-primary' : 'bg-transparent')} />
                    </span>
                    <span className="text-sm text-foreground">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground">색</Label>
            <div className="flex flex-wrap gap-3">
              {NODE_COLORS.map((option) => {
                const selected = option === color;
                return (
                  <button
                    key={option}
                    type="button"
                    className="flex items-center gap-2"
                    onClick={() => setColor(option)}
                    aria-pressed={selected}
                  >
                    <span
                      className={cn(
                        'flex size-4 items-center justify-center rounded-full border',
                        selected ? 'border-primary' : 'border-border'
                      )}
                      aria-hidden="true"
                    >
                      <span className={cn('size-2 rounded-full', selected ? 'bg-primary' : 'bg-transparent')} />
                    </span>
                    <span className="h-5 w-5 rounded-sm border border-border" style={{ backgroundColor: option }} aria-hidden="true" />
                    <span className="sr-only">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {showEdgeLabel ? (
            <div>
              <Label htmlFor="node-dialog-edge-label" className="text-sm font-medium text-foreground">
                연결선 레이블
              </Label>
              <Input
                id="node-dialog-edge-label"
                value={edgeLabel}
                onChange={(event) => setEdgeLabel(event.target.value)}
                className="mt-1 h-10"
              />
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleOk} disabled={!canOk}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type EdgeEditorDialogProps = {
  state: EdgeModalState;
  edge: RelationshipEdgeData | null;
  nodes: { value: string; label: string }[];
  onClose: () => void;
  onUpdate: (edgeId: string, partial: Partial<RelationshipEdgeData>) => void;
};

function EdgeEditorDialog({ state, edge, nodes, onClose, onUpdate }: EdgeEditorDialogProps) {
  const isOpen = state.open;
  const [label, setLabel] = useState('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [dashes, setDashes] = useState(false);
  const [color, setColor] = useState<string>(EDGE_COLORS[0]);
  const canOk = Boolean(edge);

  useEffect(() => {
    if (!isOpen || !edge) {
      return;
    }
    setLabel(edge.label ?? '');
    setFrom(edge.from);
    setTo(edge.to);
    setDashes(edge.dashes ?? false);
    setColor(typeof edge.color === 'string' ? edge.color : (edge.color?.color ?? EDGE_COLORS[0]));
  }, [isOpen, edge?.id]);

  function handleOk() {
    if (!edge) {
      onClose();
      return;
    }
    onUpdate(edge.id, {
      label,
      from,
      to,
      dashes,
      color,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key !== 'Enter') {
        return;
      }
      event.preventDefault();
      if (canOk) {
        handleOk();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, canOk, label, from, to, dashes, color, edge?.id]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>연결선 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="edge-dialog-label" className="text-sm font-medium text-foreground">
              레이블
            </Label>
            <Input id="edge-dialog-label" value={label} onChange={(event) => setLabel(event.target.value)} className="mt-1 h-10" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">시작 노드</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="시작 노드" />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map((nodeOption) => (
                    <SelectItem key={nodeOption.value} value={nodeOption.value}>
                      {nodeOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">도착 노드</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="도착 노드" />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map((nodeOption) => (
                    <SelectItem key={nodeOption.value} value={nodeOption.value}>
                      {nodeOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground">스타일</Label>
            <div className="flex gap-3">
              <button
                type="button"
                className={cn(
                  'flex-1 rounded-md border px-3 py-2 text-sm',
                  dashes ? 'border-border text-muted-foreground' : 'border-primary bg-primary/10 text-primary'
                )}
                onClick={() => setDashes(false)}
              >
                실선
              </button>
              <button
                type="button"
                className={cn(
                  'flex-1 rounded-md border px-3 py-2 text-sm',
                  dashes ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                )}
                onClick={() => setDashes(true)}
              >
                점선
              </button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-foreground">색</Label>
            <div className="flex flex-wrap gap-3">
              {EDGE_COLORS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={cn('h-8 w-8 rounded-full border-2', option === color ? 'border-primary' : 'border-border')}
                  style={{ backgroundColor: option }}
                  onClick={() => setColor(option)}
                  aria-label={`edge color ${option}`}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleOk} disabled={!canOk}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function normalizeNode(node: RelationshipNodeData): RelationshipNodeData {
  const color = typeof node.color === 'string' ? node.color : (node.color?.background ?? NODE_COLORS[0]);
  return { ...node, color };
}

function normalizeEdge(edge: RelationshipEdgeData): RelationshipEdgeData {
  const color = typeof edge.color === 'string' ? edge.color : (edge.color?.color ?? EDGE_COLORS[0]);
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
