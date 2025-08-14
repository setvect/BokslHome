<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  import TrashIcon from "@lucide/svelte/icons/trash-2";
  import EditIcon from "@lucide/svelte/icons/edit";
  import ImageIcon from "@lucide/svelte/icons/image";
  import UserPlusIcon from "@lucide/svelte/icons/user-plus";
  
  let userName = $state('');
  let userEmail = $state('');
  let userMessage = $state('');
  let profileName = $state('김철수');
  let profileEmail = $state('kim@example.com');
  let isDeleteDialogOpen = $state(false);
  let isFormDialogOpen = $state(false);
  let isEditDialogOpen = $state(false);
  
  function handleSubmit() {
    console.log('사용자 추가:', { userName, userEmail, userMessage });
    isFormDialogOpen = false;
    userName = '';
    userEmail = '';
    userMessage = '';
  }
  
  function handleEdit() {
    console.log('프로필 수정:', { profileName, profileEmail });
    isEditDialogOpen = false;
  }
  
  function handleDelete() {
    console.log('사용자 삭제 확인');
    isDeleteDialogOpen = false;
  }

  const dialogProps = [
    {
      name: 'Dialog',
      type: 'component',
      description: '대화상자의 루트 컴포넌트입니다.',
      required: true
    },
    {
      name: 'DialogTrigger',
      type: 'component',
      description: '대화상자를 여는 트리거 요소입니다.',
      required: true
    },
    {
      name: 'DialogContent',
      type: 'component',
      description: '대화상자의 메인 콘텐츠 영역입니다.',
      required: true
    },
    {
      name: 'DialogHeader',
      type: 'component',
      description: '대화상자의 헤더 영역입니다.',
      required: false
    },
    {
      name: 'DialogTitle',
      type: 'component',
      description: '대화상자의 제목입니다.',
      required: false
    },
    {
      name: 'DialogDescription',
      type: 'component',
      description: '대화상자의 설명 텍스트입니다.',
      required: false
    }
  ];
</script>

<svelte:head>
  <title>Dialog - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Dialog</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        사용자와의 상호작용을 위한 모달 대화상자 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Overlay</Badge>
      <Badge variant="secondary">Modal</Badge>
    </div>
  </section>
  
  <!-- 기본 대화상자 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>기본 대화상자</CardTitle>
        <CardDescription>간단한 정보 표시용 대화상자</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>기본 대화상자 열기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>알림</DialogTitle>
              <DialogDescription>
                이것은 기본적인 대화상자 예시입니다.
              </DialogDescription>
            </DialogHeader>
            <div class="mt-4">
              <p class="text-sm text-foreground">추가 정보나 메시지를 여기에 표시할 수 있습니다.</p>
            </div>
            <div class="flex justify-end mt-6">
              <Button>확인</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  </section>

  <!-- 폼이 있는 대화상자 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>폼 대화상자</CardTitle>
        <CardDescription>사용자 입력을 받는 폼이 포함된 대화상자</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog bind:open={isFormDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlusIcon class="w-4 h-4 mr-2" />
              사용자 추가
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>새 사용자 추가</DialogTitle>
              <DialogDescription>
                새로운 사용자의 정보를 입력해주세요.
              </DialogDescription>
            </DialogHeader>
            <div class="space-y-4 py-4">
              <div class="space-y-2">
                <Label for="name">이름</Label>
                <Input 
                  id="name" 
                  bind:value={userName}
                  placeholder="사용자 이름을 입력하세요" 
                />
              </div>
              <div class="space-y-2">
                <Label for="email">이메일</Label>
                <Input 
                  id="email" 
                  type="email"
                  bind:value={userEmail}
                  placeholder="email@example.com" 
                />
              </div>
              <div class="space-y-2">
                <Label for="message">메시지 (선택사항)</Label>
                <Textarea 
                  id="message"
                  bind:value={userMessage}
                  placeholder="추가 메시지를 입력하세요..."
                  rows={3}
                />
              </div>
            </div>
            <div class="flex justify-end space-x-2">
              <Button variant="outline" onclick={() => isFormDialogOpen = false}>
                취소
              </Button>
              <Button onclick={handleSubmit} disabled={!userName || !userEmail}>
                추가
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  </section>

  <!-- 수정 대화상자 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>수정 대화상자</CardTitle>
        <CardDescription>기존 데이터를 수정하는 대화상자</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="p-4 border rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-foreground">{profileName}</h4>
                <p class="text-sm text-muted-foreground">{profileEmail}</p>
              </div>
              <Dialog bind:open={isEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <EditIcon class="w-4 h-4 mr-2" />
                    수정
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>프로필 수정</DialogTitle>
                    <DialogDescription>
                      사용자 정보를 수정하세요.
                    </DialogDescription>
                  </DialogHeader>
                  <div class="space-y-4 py-4">
                    <div class="space-y-2">
                      <Label for="edit-name">이름</Label>
                      <Input 
                        id="edit-name" 
                        bind:value={profileName}
                      />
                    </div>
                    <div class="space-y-2">
                      <Label for="edit-email">이메일</Label>
                      <Input 
                        id="edit-email" 
                        type="email"
                        bind:value={profileEmail}
                      />
                    </div>
                  </div>
                  <div class="flex justify-end space-x-2">
                    <Button variant="outline" onclick={() => isEditDialogOpen = false}>
                      취소
                    </Button>
                    <Button onclick={handleEdit}>
                      저장
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>

  <!-- 확인/삭제 대화상자 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>확인 대화상자</CardTitle>
        <CardDescription>위험한 동작에 대한 확인을 받는 대화상자</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog bind:open={isDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <TrashIcon class="w-4 h-4 mr-2" />
              사용자 삭제
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle class="text-destructive">사용자 삭제 확인</DialogTitle>
              <DialogDescription>
                정말로 이 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </DialogDescription>
            </DialogHeader>
            <div class="py-4">
              <div class="bg-destructive/10 p-4 rounded-lg">
                <div class="flex items-center space-x-2">
                  <TrashIcon class="w-5 h-5 text-destructive" />
                  <div>
                    <p class="font-medium text-foreground">김철수</p>
                    <p class="text-sm text-muted-foreground">kim@example.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end space-x-2">
              <Button variant="outline" onclick={() => isDeleteDialogOpen = false}>
                취소
              </Button>
              <Button variant="destructive" onclick={handleDelete}>
                삭제
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  </section>

  <!-- 이미지 뷰어 대화상자 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>이미지 뷰어 대화상자</CardTitle>
        <CardDescription>이미지나 미디어를 보여주는 대화상자</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <ImageIcon class="w-4 h-4 mr-2" />
              이미지 보기
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>이미지 미리보기</DialogTitle>
              <DialogDescription>
                sample-image.jpg
              </DialogDescription>
            </DialogHeader>
            <div class="py-4">
              <div class="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div class="text-center text-muted-foreground">
                  <ImageIcon class="w-16 h-16 mx-auto mb-2" />
                  <p class="text-foreground">이미지 플레이스홀더</p>
                  <p class="text-sm text-muted-foreground">1920 × 1080 픽셀</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-sm text-muted-foreground">
                크기: 2.5 MB
              </div>
              <div class="space-x-2">
                <Button variant="outline" size="sm">다운로드</Button>
                <Button size="sm">공유</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  </section>

  <!-- 사용법 예시 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>기본 사용법</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock code={`<` + `script>
  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '$lib/components/ui/dialog';
<` + `/script>

<Dialog>
  <DialogTrigger>
    <Button>대화상자 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>
        설명 텍스트
      </DialogDescription>
    </DialogHeader>
    <!-- 내용 -->
  </DialogContent>
</Dialog>`} language="svelte" />
      </CardContent>
    </Card>
  </section>

  <!-- 속성 -->
  <PropsTable 
    props={dialogProps} 
    title="컴포넌트 구조"
    description="Dialog 컴포넌트의 하위 컴포넌트들입니다."
  />
</div>