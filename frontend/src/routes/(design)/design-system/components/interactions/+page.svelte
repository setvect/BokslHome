<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import * as Popover from '$lib/components/ui/popover';
  import { Button } from '$lib/components/ui/button';

  function notify(kind: 'success' | 'error' | 'default') {
    // 간단한 대체: 브라우저 alert (실제 프로젝트에서는 sonner의 toast API 래퍼를 추가 권장)
    if (kind === 'success') alert('성공 메시지');
    else if (kind === 'error') alert('에러 메시지');
    else alert('일반 메시지');
  }
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
    <Dialog.Trigger asChild>
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
