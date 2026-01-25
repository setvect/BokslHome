export type NetworkEditorMode = 'select' | 'addNode' | 'addEdge';

export type NetworkEditorSelection =
  | {
      type: 'node';
      id: string;
    }
  | {
      type: 'edge';
      id: string;
    }
  | null;
