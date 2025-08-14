export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
  isActive?: boolean;
}

export interface MenuData {
  items: MenuItem[];
}
