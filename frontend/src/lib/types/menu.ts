export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
  isActive?: boolean;
  pathPattern?: RegExp; // 경로 패턴 매칭용
}

export interface MenuData {
  items: MenuItem[];
}
