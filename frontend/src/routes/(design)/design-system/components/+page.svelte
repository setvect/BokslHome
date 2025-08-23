<script lang="ts">
  type Item = { href: string; label: string; keywords: string[] };
  let components = $state<Item[]>([
    // 기존 컴포넌트
    { href: '/design-system/components/buttons', label: 'Buttons', keywords: ['button', '버튼'] },
    { href: '/design-system/components/forms', label: 'Forms', keywords: ['form', 'input', 'label', '폼'] },
    { href: '/design-system/components/markdown', label: 'Markdown Editor', keywords: ['markdown', 'editor', 'md', '에디터'] },
    { href: '/design-system/components/editor', label: 'HTML Editor', keywords: ['html', 'tinymce', 'editor', '에디터'] },
    
    // 높은 우선순위 컴포넌트
    { href: '/design-system/components/pagination', label: 'Pagination', keywords: ['pagination', 'paging', '페이지네이션', '페이징'] },
    { href: '/design-system/components/table', label: 'Table', keywords: ['table', 'data', '테이블', '표', '데이터'] },
    { href: '/design-system/components/card', label: 'Card', keywords: ['card', 'container', '카드', '컨테이너'] },
    { href: '/design-system/components/dialog', label: 'Dialog', keywords: ['dialog', 'modal', 'popup', '다이얼로그', '모달', '팝업'] },
    { href: '/design-system/components/search', label: 'Search Bar', keywords: ['search', 'input', 'find', '검색', '찾기'] },
    { href: '/design-system/components/select', label: 'Select', keywords: ['select', 'dropdown', 'option', '선택', '드롭다운'] },
    
    // 중간 우선순위 컴포넌트  
    { href: '/design-system/components/breadcrumb', label: 'Breadcrumb', keywords: ['breadcrumb', 'navigation', '브래드크럼', '네비게이션'] },
    { href: '/design-system/components/tabs', label: 'Tabs', keywords: ['tabs', 'switch', 'toggle', '탭', '전환'] },
    { href: '/design-system/components/toast', label: 'Toast', keywords: ['toast', 'notification', 'alert', '토스트', '알림'] },
    { href: '/design-system/components/badge', label: 'Badge', keywords: ['badge', 'status', 'tag', '배지', '상태', '태그'] },
    { href: '/design-system/components/accordion', label: 'Accordion', keywords: ['accordion', 'collapse', 'expand', '아코디언', '접기', '펼치기'] },
    { href: '/design-system/components/skeleton', label: 'Skeleton', keywords: ['skeleton', 'loading', 'placeholder', '스켈레톤', '로딩'] }
  ]);
  let query = $state('');
  let filtered: Item[] = $derived(
    (() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return components;
      }
      return components.filter((c) => [c.label.toLowerCase(), ...(c.keywords ?? [])].some((k) => k.toLowerCase().includes(q)));
    })()
  );
  function onInput(e: Event) {
    const t = e.target as HTMLInputElement;
    query = t.value ?? '';
  }
</script>

<section class="space-y-4">
  <h1 class="text-2xl font-bold">Components</h1>
  <div class="max-w-md">
    <input
      type="text"
      placeholder="Search components..."
      class="w-full border rounded px-3 py-2 bg-background"
      value={query}
      oninput={onInput}
      aria-label="검색"
    />
  </div>
  <ul class="list-disc pl-6 space-y-1">
    {#each filtered as item (item.href)}
      <li><a class="underline" href={item.href}>{item.label}</a></li>
    {/each}
  </ul>
</section>
