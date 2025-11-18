export interface RelationshipNodeData {
  id: string;
  label: string;
  color?: string | { background: string; border?: string };
  shape?: 'ellipse' | 'circle' | 'box';
  x?: number;
  y?: number;
  font?: {
    size?: number;
    color?: string;
  };
}

export interface RelationshipEdgeColor {
  color?: string;
  highlight?: string;
}

export interface RelationshipEdgeData {
  id: string;
  from: string;
  to: string;
  label?: string | null;
  dashes?: boolean;
  color?: string | RelationshipEdgeColor;
  width?: number;
}

export interface RelationshipRecord {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodes: RelationshipNodeData[];
  edges: RelationshipEdgeData[];
}

export interface RelationshipCollectionMock {
  records: RelationshipRecord[];
}

