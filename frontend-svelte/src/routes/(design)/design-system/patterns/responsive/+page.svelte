<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Table from '$lib/components/ui/table';
</script>

<section class="space-y-8">
  <h1 class="text-2xl font-bold">Responsive Patterns</h1>
  <p class="text-sm text-muted-foreground">모바일 우선 설계, 브레이크포인트별 변화, 터치 친화, 데스크톱/모바일 변형 예시</p>

  <!-- 1) 모바일 우선 컴포넌트 설계 -->
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">모바일 우선 (Mobile-first)</h2>
    <Card.Root class="max-w-xl">
      <Card.Header>
        <Card.Title class="text-base md:text-lg">뉴스 카드</Card.Title>
        <Card.Description class="text-xs md:text-sm">요약 텍스트가 표시됩니다.</Card.Description>
      </Card.Header>
      <Card.Content class="space-y-2">
        <p class="text-sm md:text-base">모바일에서 기본 타이포 스케일, 데스크톱에서 약간 확대됩니다.</p>
      </Card.Content>
      <Card.Footer class="flex gap-2">
        <Button size="default" class="w-full md:w-auto">자세히</Button>
        <Button variant="secondary" class="w-full md:w-auto">저장</Button>
      </Card.Footer>
    </Card.Root>
  </div>

  <!-- 2) 브레이크포인트별 컴포넌트 변화 -->
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">브레이크포인트별 변화</h2>
    <div class="grid gap-3 md:grid-cols-2">
      <div class="rounded border p-3">
        <div class="text-sm text-muted-foreground mb-2">모바일 레이아웃</div>
        <div class="md:hidden space-y-2">
          <Button class="w-full">Primary</Button>
          <Button variant="secondary" class="w-full">Secondary</Button>
        </div>
        <div class="hidden md:flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </div>
      <div class="rounded border p-3">
        <div class="text-sm text-muted-foreground mb-2">그리드 변화</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {#each Array.from({ length: 6 }) as _, i}
            <div class="rounded border p-3 text-sm">아이템 {i + 1}</div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- 3) 터치 친화적 인터랙션 크기 -->
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">터치 친화 (Touch-friendly)</h2>
    <div class="flex flex-wrap gap-2">
      <Button class="h-12 px-6 md:h-9 md:px-4">크게(모바일)/보통(데스크톱)</Button>
      <Button variant="secondary" class="h-12 px-6 md:h-9 md:px-4">Secondary</Button>
    </div>
    <div class="text-xs text-muted-foreground">모바일에서 터치 타겟을 크게 유지하고, 데스크톱에서 적절히 축소합니다.</div>
  </div>

  <!-- 4) 데스크톱/모바일 다른 컴포넌트 변형 -->
  <div class="space-y-3">
    <h2 class="text-lg font-semibold">컴포넌트 변형 (Mobile vs Desktop)</h2>
    <div class="md:hidden space-y-2">
      <!-- 모바일: 카드 리스트 -->
      {#each [{ name: 'Alice', role: 'Admin' }, { name: 'Bob', role: 'User' }, { name: 'Carol', role: 'Manager' }] as r}
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-base">{r.name}</Card.Title>
            <Card.Description class="text-xs">{r.role}</Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button size="sm">상세</Button>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
    <div class="hidden md:block">
      <!-- 데스크톱: 테이블 -->
      <Table.Root class="w-full text-sm">
        <Table.Header>
          <Table.Row>
            <Table.Cell class="font-semibold">Name</Table.Cell>
            <Table.Cell class="font-semibold">Role</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bob</Table.Cell>
            <Table.Cell>User</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Carol</Table.Cell>
            <Table.Cell>Manager</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  </div>
</section>
