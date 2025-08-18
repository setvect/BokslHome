<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import * as Popover from '$lib/components/ui/popover';
  import * as Select from '$lib/components/ui/select';
  import * as Table from '$lib/components/ui/table';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';

  // 실제 Toast 호출 적용 (svelte-sonner)
  let toast: (msg: string, opts?: { description?: string; action?: { label: string; onClick: () => void } }) => void;
  // 동적 import로 클라이언트에서만 로드
  $effect(() => {
    import('svelte-sonner').then((m) => {
      // 기본 export가 아닌 유틸 함수를 사용
      // m.toast(msg, options)
      // 간단 래퍼로 바인딩
      toast = (msg: string, opts?: { description?: string }) => (m as any).toast(msg, opts);
    });
  });
  function notify(kind: 'success' | 'error' | 'default') {
    if (!toast) {
      alert(kind === 'success' ? '성공 메시지' : kind === 'error' ? '에러 메시지' : '일반 메시지');
      return;
    }
    if (kind === 'success') toast('성공!', { description: '작업이 완료되었습니다.' });
    else if (kind === 'error') toast('에러', { description: '문제가 발생했습니다.' });
    else toast('안내', { description: '일반 알림입니다.' });
  }

  // Select (단일 선택 제어)
  let fruit = $state<string | null>(null);
  // Select (다중 선택)
  let fruitsMulti = $state<string[]>([]);

  // Table (필터/정렬)
  type Row = { name: string; role: string };
  const baseRows: Row[] = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'User' },
    { name: 'Carol', role: 'Manager' },
    { name: 'Dave', role: 'User' },
    { name: 'Eve', role: 'Admin' }
  ];
  let filter = $state('');
  type SortKey = 'name' | 'role';
  type SortOrder = { key: SortKey; asc: boolean };
  let sortOrders = $state<SortOrder[]>([{ key: 'name', asc: true }]);
  let show = $state({ name: true, role: true });
  let rows = $state<Row[]>(baseRows);
  function toggleSort(key: SortKey) {
    const last = sortOrders.at(-1);
    if (last && last.key === key) {
      last.asc = !last.asc;
      sortOrders = [...sortOrders.slice(0, -1), last];
    } else {
      sortOrders = [...sortOrders, { key, asc: true }];
    }
  }
  function clearSort() {
    sortOrders = [];
  }
  $effect(() => {
    const q = filter.trim().toLowerCase();
    let arr = baseRows.filter((r) => (q ? r.name.toLowerCase().includes(q) || r.role.toLowerCase().includes(q) : true));
    if (sortOrders.length > 0) {
      arr = arr.slice().sort((a, b) => {
        for (const o of sortOrders) {
          const va = a[o.key].toLowerCase();
          const vb = b[o.key].toLowerCase();
          if (va < vb) return o.asc ? -1 : 1;
          if (va > vb) return o.asc ? 1 : -1;
        }
        return 0;
      });
    }
    rows = arr;
  });
</script>

<h1 class="text-2xl font-bold mb-6">Interactions</h1>

<section class="space-y-4">
  <h2 class="text-lg font-semibold">Toast</h2>
  <div class="flex gap-2">
    <Button onclick={() => notify('success')}>Success</Button>
    <Button onclick={() => notify('error')}>Error</Button>
    <Button onclick={() => notify('default')}>Default</Button>
  </div>
  <Toaster position="top-right" />
</section>

<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">Dialog</h2>
  <Dialog.Root>
    <Dialog.Trigger>
      <Button>Open dialog</Button>
    </Dialog.Trigger>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>샘플 다이얼로그</Dialog.Title>
        <Dialog.Description>간단한 설명 텍스트</Dialog.Description>
      </Dialog.Header>
      <div class="mt-4 flex justify-end gap-2">
        <Dialog.Close>
          <Button variant="secondary">Close</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</section>

<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">Tooltip</h2>
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>툴팁 내용</Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
</section>

<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">Popover</h2>
  <Popover.Root>
    <Popover.Trigger>
      <Button>Open popover</Button>
    </Popover.Trigger>
    <Popover.Content class="p-4">팝오버 내용</Popover.Content>
  </Popover.Root>
</section>

<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">Select</h2>
  <div class="text-sm text-muted-foreground">선택 값: {fruit ?? '—'}</div>
  <Select.Root type="single" name="fruit" onValueChange={(v) => (fruit = v ? String(v) : null)}>
    <Select.Trigger class="w-56">
      {#snippet children()}<span data-slot="select-value">{fruit ?? 'Select a fruit'}</span>{/snippet}
    </Select.Trigger>
    <Select.Content class="w-56">
      <Select.Group>
        <Select.Label>Fruits</Select.Label>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
      </Select.Group>
    </Select.Content>
  </Select.Root>
  <div class="text-sm text-muted-foreground">다중 선택: {fruitsMulti.length ? fruitsMulti.join(', ') : '—'}</div>
  <Select.Root type="multiple" name="fruits" onValueChange={(v) => (fruitsMulti = Array.isArray(v) ? v.map(String) : [])}>
    <Select.Trigger class="w-64">
      {#snippet children()}<span data-slot="select-value">{fruitsMulti.length ? `${fruitsMulti.length} selected` : 'Select fruits'}</span
        >{/snippet}
    </Select.Trigger>
    <Select.Content class="w-64">
      <Select.Group>
        <Select.Label>Fruits</Select.Label>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
        <Select.Item value="grape">Grape</Select.Item>
        <Select.Item value="mango">Mango</Select.Item>
      </Select.Group>
    </Select.Content>
  </Select.Root>
</section>

<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">Table (정렬/필터)</h2>
  <div class="flex items-center gap-2">
    <Input
      class="max-w-xs"
      placeholder="Filter by name/role"
      value={filter}
      oninput={(e) => (filter = (e.target as HTMLInputElement).value)}
    />
    <Button type="button" onclick={() => toggleSort('name')}
      >Then Name {sortOrders.at(-1)?.key === 'name' ? (sortOrders.at(-1)?.asc ? '↑' : '↓') : ''}</Button
    >
    <Button type="button" onclick={() => toggleSort('role')}
      >Then Role {sortOrders.at(-1)?.key === 'role' ? (sortOrders.at(-1)?.asc ? '↑' : '↓') : ''}</Button
    >
    <Button type="button" variant="secondary" onclick={clearSort}>Clear</Button>
  </div>
  <div class="flex items-center gap-3 text-sm text-muted-foreground">
    <label class="flex items-center gap-1"
      ><input type="checkbox" checked={show.name} onchange={(e) => (show.name = (e.target as HTMLInputElement).checked)} /> Name</label
    >
    <label class="flex items-center gap-1"
      ><input type="checkbox" checked={show.role} onchange={(e) => (show.role = (e.target as HTMLInputElement).checked)} /> Role</label
    >
  </div>
  <Table.Root class="w-full text-sm">
    <Table.Header>
      <Table.Row>
        {#if show.name}<Table.Cell class="font-semibold">Name</Table.Cell>{/if}
        {#if show.role}<Table.Cell class="font-semibold">Role</Table.Cell>{/if}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each rows as r (r.name + r.role)}
        <Table.Row>
          {#if show.name}<Table.Cell>{r.name}</Table.Cell>{/if}
          {#if show.role}<Table.Cell>{r.role}</Table.Cell>{/if}
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
  <div class="text-xs text-muted-foreground">
    ※ 간단한 데모 테이블입니다. 실제 정렬/필터 로직은 데이터와 함께 예시 페이지에서 확장하세요.
  </div>
</section>
