<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { AlertTriangle, Info, CheckCircle, XCircle, Trash2, Settings, User, FileText } from '@lucide/svelte';

  let formData = $state({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  let confirmDeleteOpen = $state(false);
  let settingsOpen = $state(false);
  let createPostOpen = $state(false);
  let userProfileOpen = $state(false);

  function handleCreatePost() {
    console.log('Creating post:', formData);
    createPostOpen = false;
    // 실제로는 API 호출 등의 로직이 여기에 들어감
  }

  function handleConfirmDelete() {
    console.log('Deleting item...');
    confirmDeleteOpen = false;
    // 실제 삭제 로직
  }

  function resetForm() {
    formData = {
      title: '',
      content: '',
      category: '',
      tags: ''
    };
  }

  $effect(() => {
    if (!createPostOpen) {
      resetForm();
    }
  });
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Dialog</h1>
    <p class="text-muted-foreground">다이얼로그/모달 컴포넌트 - 중요한 정보나 사용자 입력을 위한 오버레이 창입니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 다이얼로그</h2>
      <div class="flex flex-wrap gap-4">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="outline">
              <Info class="h-4 w-4 mr-2" />
              정보 다이얼로그
            </Button>
          </Dialog.Trigger>
          <Dialog.Content class="sm:max-w-[425px]">
            <Dialog.Header>
              <Dialog.Title>정보</Dialog.Title>
              <Dialog.Description>이것은 기본적인 정보 다이얼로그입니다. 사용자에게 중요한 정보를 전달할 때 사용합니다.</Dialog.Description>
            </Dialog.Header>
            <div class="py-4">
              <p class="text-sm text-muted-foreground">
                복슬홈 프로젝트는 현재 개발 중입니다. 새로운 기능들이 지속적으로 추가되고 있으니 기대해 주세요!
              </p>
            </div>
            <Dialog.Footer>
              <Dialog.Close>
                <Button>확인</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>

        <Dialog.Root bind:open={confirmDeleteOpen}>
          <Dialog.Trigger>
            <Button variant="destructive">
              <Trash2 class="h-4 w-4 mr-2" />
              삭제 확인
            </Button>
          </Dialog.Trigger>
          <Dialog.Content class="sm:max-w-[425px]">
            <Dialog.Header>
              <div class="flex items-center gap-2">
                <AlertTriangle class="h-5 w-5 text-destructive" />
                <Dialog.Title>삭제 확인</Dialog.Title>
              </div>
              <Dialog.Description>정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</Dialog.Description>
            </Dialog.Header>
            <div class="py-4">
              <div class="rounded-lg border p-3 bg-muted">
                <div class="font-medium">삭제될 항목</div>
                <div class="text-sm text-muted-foreground">복슬홈 프로젝트 게시글 #123</div>
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close>
                <Button variant="outline">취소</Button>
              </Dialog.Close>
              <Button variant="destructive" onclick={handleConfirmDelete}>삭제</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">폼 다이얼로그</h2>
      <Dialog.Root bind:open={createPostOpen}>
        <Dialog.Trigger>
          <Button>
            <FileText class="h-4 w-4 mr-2" />
            새 게시글 작성
          </Button>
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[625px]">
          <Dialog.Header>
            <Dialog.Title>새 게시글 작성</Dialog.Title>
            <Dialog.Description>새로운 게시글을 작성해보세요. 모든 필드를 채워주세요.</Dialog.Description>
          </Dialog.Header>
          <div class="grid gap-4 py-4">
            <div class="grid gap-2">
              <Label for="title">제목</Label>
              <Input id="title" placeholder="게시글 제목을 입력하세요" bind:value={formData.title} />
            </div>
            <div class="grid gap-2">
              <Label for="category">카테고리</Label>
              <Select.Root bind:selected={formData.category}>
                <Select.Trigger>
                  {formData.category || '카테고리를 선택하세요'}
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="general">일반</Select.Item>
                    <Select.Item value="dev">개발</Select.Item>
                    <Select.Item value="design">디자인</Select.Item>
                    <Select.Item value="notice">공지사항</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
            <div class="grid gap-2">
              <Label for="content">내용</Label>
              <Textarea id="content" placeholder="게시글 내용을 입력하세요" rows="4" bind:value={formData.content} />
            </div>
            <div class="grid gap-2">
              <Label for="tags">태그 (쉼표로 구분)</Label>
              <Input id="tags" placeholder="태그1, 태그2, 태그3" bind:value={formData.tags} />
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="outline">취소</Button>
            </Dialog.Close>
            <Button onclick={handleCreatePost} disabled={!formData.title || !formData.content}>작성 완료</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">설정 다이얼로그</h2>
      <Dialog.Root bind:open={settingsOpen}>
        <Dialog.Trigger>
          <Button variant="outline">
            <Settings class="h-4 w-4 mr-2" />
            설정
          </Button>
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[500px]">
          <Dialog.Header>
            <Dialog.Title>설정</Dialog.Title>
            <Dialog.Description>애플리케이션 설정을 변경할 수 있습니다.</Dialog.Description>
          </Dialog.Header>
          <div class="space-y-6 py-4">
            <div class="space-y-4">
              <h3 class="text-sm font-medium">계정 설정</h3>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label>이메일 알림</Label>
                  <input type="checkbox" checked class="rounded" />
                </div>
                <div class="flex items-center justify-between">
                  <Label>푸시 알림</Label>
                  <input type="checkbox" class="rounded" />
                </div>
              </div>
            </div>

            <Separator />

            <div class="space-y-4">
              <h3 class="text-sm font-medium">테마 설정</h3>
              <div class="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">라이트</Button>
                <Button variant="default" size="sm">다크</Button>
                <Button variant="outline" size="sm">시스템</Button>
              </div>
            </div>

            <Separator />

            <div class="space-y-4">
              <h3 class="text-sm font-medium">언어 설정</h3>
              <Select.Root>
                <Select.Trigger>언어를 선택하세요</Select.Trigger>
                <Select.Content>
                  <Select.Item value="ko">한국어</Select.Item>
                  <Select.Item value="en">English</Select.Item>
                  <Select.Item value="ja">日本語</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="outline">취소</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>저장</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">사용자 프로필 다이얼로그</h2>
      <Dialog.Root bind:open={userProfileOpen}>
        <Dialog.Trigger>
          <Button variant="outline">
            <User class="h-4 w-4 mr-2" />
            프로필 보기
          </Button>
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[500px]">
          <Dialog.Header>
            <Dialog.Title>사용자 프로필</Dialog.Title>
          </Dialog.Header>
          <div class="space-y-6 py-4">
            <div class="flex items-center gap-4">
              <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User class="h-8 w-8 text-primary" />
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-medium">복슬이</h3>
                <p class="text-sm text-muted-foreground">boksl@example.com</p>
                <div class="flex gap-2">
                  <Badge variant="default">관리자</Badge>
                  <Badge variant="secondary">개발자</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div class="grid gap-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Label class="text-sm text-muted-foreground">가입일</Label>
                  <p class="text-sm font-medium">2023년 1월 15일</p>
                </div>
                <div>
                  <Label class="text-sm text-muted-foreground">마지막 로그인</Label>
                  <p class="text-sm font-medium">2024년 1월 15일</p>
                </div>
              </div>

              <div>
                <Label class="text-sm text-muted-foreground">소개</Label>
                <p class="text-sm mt-1">복슬홈 프로젝트를 개발하고 있는 풀스택 개발자입니다. Spring Boot와 SvelteKit을 주로 사용합니다.</p>
              </div>
            </div>

            <Separator />

            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <p class="text-2xl font-bold">23</p>
                <p class="text-sm text-muted-foreground">게시글</p>
              </div>
              <div>
                <p class="text-2xl font-bold">45</p>
                <p class="text-sm text-muted-foreground">지식베이스</p>
              </div>
              <div>
                <p class="text-2xl font-bold">12</p>
                <p class="text-sm text-muted-foreground">노트</p>
              </div>
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="outline">닫기</Button>
            </Dialog.Close>
            <Button>프로필 수정</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">상태별 다이얼로그</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <!-- 성공 상태 -->
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="outline" class="w-full">
              <CheckCircle class="h-4 w-4 mr-2 text-green-500" />
              성공
            </Button>
          </Dialog.Trigger>
          <Dialog.Content class="sm:max-w-[400px]">
            <Dialog.Header>
              <div class="flex items-center gap-2">
                <CheckCircle class="h-5 w-5 text-green-500" />
                <Dialog.Title class="text-green-700">성공!</Dialog.Title>
              </div>
              <Dialog.Description>작업이 성공적으로 완료되었습니다.</Dialog.Description>
            </Dialog.Header>
            <div class="py-4">
              <div class="rounded-lg border border-green-200 bg-green-50 p-3">
                <p class="text-sm text-green-700">게시글이 성공적으로 발행되었습니다.</p>
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close>
                <Button>확인</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>

        <!-- 경고 상태 -->
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="outline" class="w-full">
              <AlertTriangle class="h-4 w-4 mr-2 text-yellow-500" />
              경고
            </Button>
          </Dialog.Trigger>
          <Dialog.Content class="sm:max-w-[400px]">
            <Dialog.Header>
              <div class="flex items-center gap-2">
                <AlertTriangle class="h-5 w-5 text-yellow-500" />
                <Dialog.Title class="text-yellow-700">경고</Dialog.Title>
              </div>
              <Dialog.Description>주의가 필요한 상황입니다.</Dialog.Description>
            </Dialog.Header>
            <div class="py-4">
              <div class="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <p class="text-sm text-yellow-700">저장하지 않은 변경사항이 있습니다.</p>
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close>
                <Button variant="outline">무시</Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button>저장</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>

        <!-- 오류 상태 -->
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="outline" class="w-full">
              <XCircle class="h-4 w-4 mr-2 text-red-500" />
              오류
            </Button>
          </Dialog.Trigger>
          <Dialog.Content class="sm:max-w-[400px]">
            <Dialog.Header>
              <div class="flex items-center gap-2">
                <XCircle class="h-5 w-5 text-red-500" />
                <Dialog.Title class="text-red-700">오류</Dialog.Title>
              </div>
              <Dialog.Description>작업을 완료할 수 없습니다.</Dialog.Description>
            </Dialog.Header>
            <div class="py-4">
              <div class="rounded-lg border border-red-200 bg-red-50 p-3">
                <p class="text-sm text-red-700">네트워크 연결을 확인해 주세요.</p>
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close>
                <Button>확인</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>

        <!-- 정보 상태 -->
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="outline" class="w-full">
              <Info class="h-4 w-4 mr-2 text-blue-500" />
              정보
            </Button>
          </Dialog.Trigger>
          <Dialog.Content class="sm:max-w-[400px]">
            <Dialog.Header>
              <div class="flex items-center gap-2">
                <Info class="h-5 w-5 text-blue-500" />
                <Dialog.Title class="text-blue-700">알림</Dialog.Title>
              </div>
              <Dialog.Description>새로운 정보가 있습니다.</Dialog.Description>
            </Dialog.Header>
            <div class="py-4">
              <div class="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p class="text-sm text-blue-700">시스템 업데이트가 예정되어 있습니다.</p>
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close>
                <Button>확인</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Button } from '$lib/components/ui/button/index.js';

  let dialogOpen = $state(false);
</script>

<!-- 기본 다이얼로그 -->
<Dialog.Root>
  <Dialog.Trigger>
    <Button>다이얼로그 열기</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>다이얼로그 제목</Dialog.Title>
      <Dialog.Description>다이얼로그 설명</Dialog.Description>
    </Dialog.Header>
    <div class="py-4">
      <p>다이얼로그 내용</p>
    </div>
    <Dialog.Footer>
      <Dialog.Close>
        <Button>확인</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- 상태 제어 가능한 다이얼로그 -->
<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger>
    <Button>제어 가능한 다이얼로그</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>확인</Dialog.Title>
      <Dialog.Description>작업을 계속하시겠습니까?</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Button variant="outline" onclick={() => dialogOpen = false}>취소</Button>
      <Button onclick={() => { handleAction(); dialogOpen = false; }}>확인</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`}</code
        ></pre>
    </div>
  </div>
</section>
