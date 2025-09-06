<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { toast } from '$lib/stores/toast';
  import { CheckCircle, AlertCircle, XCircle, Info, Bell, Download, Heart, Trash2 } from '@lucide/svelte';

  function showSuccessToast() {
    toast.success('성공!', {
      description: '게시글이 성공적으로 저장되었습니다.'
    });
  }

  function showErrorToast() {
    toast.error('오류가 발생했습니다', {
      description: '네트워크 연결을 확인해 주세요.'
    });
  }

  function showWarningToast() {
    toast.warning('주의', {
      description: '저장하지 않은 변경사항이 있습니다.'
    });
  }

  function showInfoToast() {
    toast.info('정보', {
      description: '새로운 업데이트가 사용 가능합니다.'
    });
  }

  function showCustomToast() {
    toast.info('복슬홈 알림', {
      description: '새로운 기능이 추가되었습니다!'
    });
  }

  function showActionToast() {
    toast.info('파일 다운로드 완료', {
      description: '문서.pdf가 다운로드되었습니다.'
    });
  }

  function showPersistentToast() {
    toast.warning('중요한 알림', {
      description: '이 알림은 수동으로 닫아야 합니다.',
      duration: Infinity
    });
  }

  function showPromiseToast() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('성공!') : reject('실패!');
      }, 2000);
    });

    toast.promise(promise, {
      loading: '게시글을 저장하는 중...',
      success: '게시글이 저장되었습니다!',
      error: '게시글 저장에 실패했습니다.'
    });
  }

  function showPositionedToast() {
    toast.success('오른쪽 하단 알림', {
      description: '위치를 조정한 토스트입니다.'
    });
  }

  function showRichToast() {
    toast.info('김개발님이 게시글에 좋아요를 눌렀습니다', {
      description: 'SvelteKit 5 Runes 완전 가이드'
    });
  }

  function showDeleteToast() {
    toast.error('게시글이 삭제되었습니다', {
      description: 'SvelteKit 가이드가 휴지통으로 이동했습니다.'
    });
    // 2초 후 실행 취소 토스트 표시
    setTimeout(() => {
      toast.success('삭제가 취소되었습니다');
    }, 2000);
  }
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Toast</h1>
    <p class="text-muted-foreground">토스트 알림 컴포넌트 - 사용자에게 피드백이나 상태 변화를 알려주는 임시 메시지입니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 토스트 타입</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button onclick={showSuccessToast} class="flex items-center gap-2">
          <CheckCircle class="h-4 w-4" />
          성공
        </Button>
        <Button variant="destructive" onclick={showErrorToast} class="flex items-center gap-2">
          <XCircle class="h-4 w-4" />
          오류
        </Button>
        <Button variant="outline" onclick={showWarningToast} class="flex items-center gap-2 text-yellow-600">
          <AlertCircle class="h-4 w-4" />
          경고
        </Button>
        <Button variant="secondary" onclick={showInfoToast} class="flex items-center gap-2">
          <Info class="h-4 w-4" />
          정보
        </Button>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">커스텀 토스트</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Button variant="outline" onclick={showCustomToast}>이모지 토스트</Button>
        <Button variant="outline" onclick={showActionToast} class="flex items-center gap-2">
          <Download class="h-4 w-4" />
          액션 토스트
        </Button>
        <Button variant="outline" onclick={showPersistentToast} class="flex items-center gap-2">
          <Bell class="h-4 w-4" />
          지속 토스트
        </Button>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Promise 토스트</h2>
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">
          비동기 작업의 진행 상태를 자동으로 표시하는 토스트입니다. 로딩, 성공, 실패 상태를 자동으로 관리합니다.
        </p>
        <Button onclick={showPromiseToast}>비동기 작업 시작</Button>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">실제 사용 예제</h2>
      <div class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <!-- 소셜 액션 -->
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">소셜 액션</h3>
            <div class="flex gap-2">
              <Button size="sm" onclick={showRichToast} class="flex items-center gap-2">
                <Heart class="h-4 w-4" />
                좋아요 알림
              </Button>
            </div>
          </div>

          <!-- 삭제 액션 -->
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">삭제 액션</h3>
            <div class="flex gap-2">
              <Button variant="destructive" size="sm" onclick={showDeleteToast} class="flex items-center gap-2">
                <Trash2 class="h-4 w-4" />
                삭제 (실행 취소 가능)
              </Button>
            </div>
          </div>
        </div>

        <!-- 복슬홈 시나리오 -->
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold mb-2">복슬홈 시나리오</h3>
          <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            <Button
              size="sm"
              onclick={() => {
                toast.success('게시글 발행됨', {
                  description: 'SvelteKit 가이드가 성공적으로 발행되었습니다.'
                });
              }}
            >
              게시글 발행
            </Button>

            <Button
              size="sm"
              variant="outline"
              onclick={() => {
                toast.info('지식 베이스 업데이트', {
                  description: 'TypeScript 가이드에 새 섹션이 추가되었습니다.'
                });
              }}
            >
              지식 업데이트
            </Button>

            <Button
              size="sm"
              variant="outline"
              onclick={() => {
                toast.info('새 댓글', {
                  description: '김개발님이 댓글을 남겼습니다.'
                });
              }}
            >
              댓글 알림
            </Button>

            <Button
              size="sm"
              variant="outline"
              onclick={() => {
                toast.warning('저장되지 않음', {
                  description: '5분 동안 비활성 상태입니다. 작업을 저장하세요.'
                });
                // 2초 후 저장 완료 토스트 표시
                setTimeout(() => {
                  toast.success('저장 완료');
                }, 2000);
              }}
            >
              자동저장 경고
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">위치 및 스타일</h2>
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">토스트의 위치는 전역적으로 설정되며, 다양한 위치에 표시할 수 있습니다.</p>
        <div class="grid gap-2 md:grid-cols-3">
          <Button
            size="sm"
            variant="outline"
            onclick={() => {
              toast.success('상단 중앙');
            }}
          >
            상단 중앙
          </Button>
          <Button
            size="sm"
            variant="outline"
            onclick={() => {
              toast.success('상단 오른쪽');
            }}
          >
            상단 오른쪽
          </Button>
          <Button size="sm" variant="outline" onclick={showPositionedToast}>하단 오른쪽</Button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">설치 및 설정</h2>
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">
          복슬홈에서는 svelte-sonner를 사용하여 토스트 알림을 구현했습니다. root layout에 Toaster 컴포넌트를 추가해야 합니다.
        </p>

        <div class="space-y-4">
          <div>
            <h4 class="font-semibold mb-2">1. Layout에 Toaster 추가</h4>
            <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
                >{`<!-- src/routes/+layout.svelte -->
<script>
  import { Toaster } from 'svelte-sonner';
</script>

<main>
  {#render children?.()}
</main>

<Toaster richColors position="top-right" />`}</code
              ></pre>
          </div>

          <div>
            <h4 class="font-semibold mb-2">2. 컴포넌트에서 사용</h4>
            <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
                >{`<script>
  import { toast } from 'svelte-sonner';
  
  function showToast() {
    toast.success('성공!', {
      description: '작업이 완료되었습니다.'
    });
  }
</script>

<button onclick={showToast}>
  토스트 표시
</button>`}</code
              ></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { Button } from '$lib/components/ui/button/index.js';
  
  // 기본 토스트들
  function showSuccess() {
    toast.success('성공!', {
      description: '작업이 완료되었습니다.'
    });
  }
  
  function showError() {
    toast.error('오류 발생', {
      description: '다시 시도해 주세요.'
    });
  }
  
  function showWarning() {
    toast.warning('경고', {
      description: '주의가 필요합니다.'
    });
  }
  
  function showInfo() {
    toast.info('알림', {
      description: '새로운 정보가 있습니다.'
    });
  }
  
  // 커스텀 토스트
  function showCustom() {
    toast.info('커스텀 제목', {
      description: '커스텀 설명'
    });
  }
  
  // 액션이 있는 토스트
  function showWithAction() {
    toast.success('파일 저장됨', {
      description: '문서가 저장되었습니다.',
      action: {
        label: '열기',
        onClick: () => console.log('파일 열기')
      }
    });
  }
  
  // Promise 토스트
  function showPromise() {
    const promise = fetch('/api/data');
    
    toast.promise(promise, {
      loading: '데이터 로딩 중...',
      success: '데이터 로드 완료!',
      error: '데이터 로드 실패'
    });
  }
  
  // 지속 토스트
  function showPersistent() {
    toast.warning('중요 알림', {
      description: '수동으로 닫아야 하는 알림',
      duration: Infinity
    });
  }
</script>

<div class="space-x-2">
  <Button onclick={showSuccess}>성공</Button>
  <Button onclick={showError}>오류</Button>
  <Button onclick={showWarning}>경고</Button>
  <Button onclick={showInfo}>정보</Button>
  <Button onclick={showCustom}>커스텀</Button>
  <Button onclick={showWithAction}>액션</Button>
  <Button onclick={showPromise}>Promise</Button>
  <Button onclick={showPersistent}>지속</Button>
</div>`}</code
        ></pre>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">고급 옵션</h2>
      <div class="space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border">
            <thead>
              <tr class="bg-muted">
                <th class="border p-2 text-left">옵션</th>
                <th class="border p-2 text-left">타입</th>
                <th class="border p-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="border p-2"><code>description</code></td>
                <td class="border p-2">string</td>
                <td class="border p-2">토스트의 부제목/설명</td>
              </tr>
              <tr>
                <td class="border p-2"><code>duration</code></td>
                <td class="border p-2">number</td>
                <td class="border p-2">표시 시간 (ms), Infinity로 지속 표시</td>
              </tr>
              <tr>
                <td class="border p-2"><code>icon</code></td>
                <td class="border p-2">string</td>
                <td class="border p-2">커스텀 아이콘 (이모지 등)</td>
              </tr>
              <tr>
                <td class="border p-2"><code>action</code></td>
                <td class="border p-2">object</td>
                <td class="border p-2">액션 버튼 설정 (label, onClick)</td>
              </tr>
              <tr>
                <td class="border p-2"><code>position</code></td>
                <td class="border p-2">string</td>
                <td class="border p-2">표시 위치 (top-right, bottom-left 등)</td>
              </tr>
              <tr>
                <td class="border p-2"><code>richColors</code></td>
                <td class="border p-2">boolean</td>
                <td class="border p-2">타입별 색상 활성화</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>
