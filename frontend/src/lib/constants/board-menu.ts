import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Camera,
  FileText,
  Film,
  Heart,
  MessageCircle,
  Music,
  Sparkles,
  StickyNote,
  Users,
} from 'lucide-react';

export type BoardCode = string;

export const DEFAULT_BOARD_CODE: BoardCode = 'BDAAAA01';

export interface BoardMenuItem {
  code: BoardCode;
  name: string;
  icon: LucideIcon;
}

export const BOARD_MENU_ITEMS: BoardMenuItem[] = [
  { code: 'BDAAAA01', name: '글', icon: FileText },
  { code: 'BDAAAA02', name: '책', icon: BookOpen },
  { code: 'BDAAAA03', name: '음악', icon: Music },
  { code: 'BDAAAA04', name: '영화', icon: Film },
  { code: 'BDAAAA05', name: '사진', icon: Camera },
  { code: 'BDAAAA06', name: '기억', icon: Heart },
  { code: 'BDAAAA07', name: '인연', icon: Users },
  { code: 'BDAAAA08', name: '잡담', icon: MessageCircle },
  { code: 'BDAAAA09', name: '꿈', icon: Sparkles },
  { code: 'BDAAAA12', name: '계획', icon: StickyNote },
];

export const getBoardNameByCode = (code?: string | null) =>
  code ? BOARD_MENU_ITEMS.find((item) => item.code === code)?.name : undefined;
