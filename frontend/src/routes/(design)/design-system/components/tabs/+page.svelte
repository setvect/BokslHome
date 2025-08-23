<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { User, Settings, Bell, Shield, FileText, BarChart3 } from '@lucide/svelte';

  // 샘플 데이터
  const userStats = {
    posts: 23,
    knowledge: 45,
    notes: 12,
    comments: 89
  };

  const notifications = [
    { id: 1, title: '새 댓글이 달렸습니다', time: '5분 전', read: false },
    { id: 2, title: '게시글이 추천되었습니다', time: '1시간 전', read: false },
    { id: 3, title: '시스템 업데이트 안내', time: '2시간 전', read: true },
    { id: 4, title: '주간 리포트가 준비되었습니다', time: '1일 전', read: true }
  ];

  const recentActivities = [
    { action: '게시글 작성', title: 'SvelteKit 5 Runes 가이드', time: '오늘 14:30' },
    { action: '댓글 작성', title: 'TypeScript 고급 문법에 대하여', time: '어제 16:20' },
    { action: '지식 수정', title: 'React vs Svelte 성능 비교', time: '어제 09:15' },
    { action: '노트 생성', title: '프로젝트 회의록', time: '2일 전' }
  ];
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Tabs</h1>
    <p class="text-muted-foreground">탭 컴포넌트 - 관련된 콘텐츠를 여러 패널로 구성하여 사용자가 전환할 수 있게 합니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 탭</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Tabs.Root value="tab1">
            <Tabs.List>
              <Tabs.Trigger value="tab1">첫 번째 탭</Tabs.Trigger>
              <Tabs.Trigger value="tab2">두 번째 탭</Tabs.Trigger>
              <Tabs.Trigger value="tab3">세 번째 탭</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1" class="space-y-4">
              <h3 class="text-lg font-semibold">첫 번째 탭 내용</h3>
              <p class="text-muted-foreground">이것은 첫 번째 탭의 내용입니다. 탭을 통해 다양한 정보를 체계적으로 구성할 수 있습니다.</p>
            </Tabs.Content>
            <Tabs.Content value="tab2" class="space-y-4">
              <h3 class="text-lg font-semibold">두 번째 탭 내용</h3>
              <p class="text-muted-foreground">
                두 번째 탭에서는 다른 종류의 정보를 표시할 수 있습니다. 각 탭은 독립적인 콘텐츠 영역을 가집니다.
              </p>
            </Tabs.Content>
            <Tabs.Content value="tab3" class="space-y-4">
              <h3 class="text-lg font-semibold">세 번째 탭 내용</h3>
              <p class="text-muted-foreground">세 번째 탭의 내용입니다. 필요에 따라 더 많은 탭을 추가할 수 있습니다.</p>
            </Tabs.Content>
          </Tabs.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">아이콘과 배지가 있는 탭</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Tabs.Root value="notifications">
            <Tabs.List>
              <Tabs.Trigger value="profile" class="flex items-center gap-2">
                <User class="h-4 w-4" />
                프로필
              </Tabs.Trigger>
              <Tabs.Trigger value="notifications" class="flex items-center gap-2">
                <Bell class="h-4 w-4" />
                알림
                <Badge variant="destructive" class="ml-1">2</Badge>
              </Tabs.Trigger>
              <Tabs.Trigger value="settings" class="flex items-center gap-2">
                <Settings class="h-4 w-4" />
                설정
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="profile" class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User class="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold">복슬이</h3>
                  <p class="text-muted-foreground">boksl@example.com</p>
                  <Badge variant="default">관리자</Badge>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center p-4 border rounded-lg">
                  <div class="text-2xl font-bold">{userStats.posts}</div>
                  <div class="text-sm text-muted-foreground">게시글</div>
                </div>
                <div class="text-center p-4 border rounded-lg">
                  <div class="text-2xl font-bold">{userStats.knowledge}</div>
                  <div class="text-sm text-muted-foreground">지식</div>
                </div>
                <div class="text-center p-4 border rounded-lg">
                  <div class="text-2xl font-bold">{userStats.notes}</div>
                  <div class="text-sm text-muted-foreground">노트</div>
                </div>
                <div class="text-center p-4 border rounded-lg">
                  <div class="text-2xl font-bold">{userStats.comments}</div>
                  <div class="text-sm text-muted-foreground">댓글</div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="notifications" class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">알림</h3>
                <Button variant="outline" size="sm">모두 읽음 표시</Button>
              </div>
              <div class="space-y-2">
                {#each notifications as notification}
                  <div class="flex items-start gap-3 p-3 border rounded-lg {notification.read ? 'opacity-60' : ''}">
                    <div class="h-2 w-2 rounded-full bg-primary {notification.read ? 'invisible' : ''}"></div>
                    <div class="flex-1">
                      <div class="font-medium">{notification.title}</div>
                      <div class="text-sm text-muted-foreground">{notification.time}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </Tabs.Content>

            <Tabs.Content value="settings" class="space-y-4">
              <h3 class="text-lg font-semibold">계정 설정</h3>
              <div class="grid gap-4">
                <div class="grid gap-2">
                  <Label>이름</Label>
                  <Input value="복슬이" />
                </div>
                <div class="grid gap-2">
                  <Label>이메일</Label>
                  <Input value="boksl@example.com" />
                </div>
                <div class="grid gap-2">
                  <Label>소개</Label>
                  <Textarea rows={3} placeholder="자기소개를 입력하세요...">복슬홈 프로젝트를 개발하고 있는 풀스택 개발자입니다.</Textarea>
                </div>
                <div class="flex gap-2">
                  <Button>저장</Button>
                  <Button variant="outline">취소</Button>
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">관리자 대시보드 탭</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Tabs.Root value="overview">
            <Tabs.List>
              <Tabs.Trigger value="overview" class="flex items-center gap-2">
                <BarChart3 class="h-4 w-4" />
                개요
              </Tabs.Trigger>
              <Tabs.Trigger value="content" class="flex items-center gap-2">
                <FileText class="h-4 w-4" />
                콘텐츠 관리
              </Tabs.Trigger>
              <Tabs.Trigger value="users" class="flex items-center gap-2">
                <User class="h-4 w-4" />
                사용자
              </Tabs.Trigger>
              <Tabs.Trigger value="security" class="flex items-center gap-2">
                <Shield class="h-4 w-4" />
                보안
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="overview" class="space-y-4">
              <h3 class="text-lg font-semibold">시스템 개요</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 border rounded-lg">
                  <div class="text-2xl font-bold text-green-600">1,234</div>
                  <div class="text-sm text-muted-foreground">총 게시글</div>
                  <div class="text-xs text-green-600">+12% 이번 달</div>
                </div>
                <div class="p-4 border rounded-lg">
                  <div class="text-2xl font-bold text-blue-600">567</div>
                  <div class="text-sm text-muted-foreground">활성 사용자</div>
                  <div class="text-xs text-blue-600">+8% 이번 달</div>
                </div>
                <div class="p-4 border rounded-lg">
                  <div class="text-2xl font-bold text-purple-600">89</div>
                  <div class="text-sm text-muted-foreground">지식 베이스</div>
                  <div class="text-xs text-purple-600">+15% 이번 달</div>
                </div>
              </div>

              <div>
                <h4 class="font-semibold mb-3">최근 활동</h4>
                <div class="space-y-2">
                  {#each recentActivities as activity}
                    <div class="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div class="font-medium">{activity.action}: {activity.title}</div>
                        <div class="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="content" class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">콘텐츠 관리</h3>
                <Button>새 콘텐츠</Button>
              </div>
              <div class="space-y-4">
                <div class="flex gap-2">
                  <Button variant="outline" size="sm">전체</Button>
                  <Button variant="outline" size="sm">게시글</Button>
                  <Button variant="outline" size="sm">지식</Button>
                  <Button variant="outline" size="sm">노트</Button>
                </div>
                <div class="border rounded-lg p-4">
                  <div class="text-center text-muted-foreground">콘텐츠 목록이 여기에 표시됩니다.</div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="users" class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">사용자 관리</h3>
                <Button>사용자 초대</Button>
              </div>
              <div class="border rounded-lg p-4">
                <div class="text-center text-muted-foreground">사용자 목록이 여기에 표시됩니다.</div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="security" class="space-y-4">
              <h3 class="text-lg font-semibold">보안 설정</h3>
              <div class="space-y-4">
                <div class="p-4 border rounded-lg">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">2단계 인증</div>
                      <div class="text-sm text-muted-foreground">추가 보안을 위해 2FA를 활성화하세요</div>
                    </div>
                    <Button variant="outline" size="sm">활성화</Button>
                  </div>
                </div>
                <div class="p-4 border rounded-lg">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">로그인 알림</div>
                      <div class="text-sm text-muted-foreground">새로운 기기에서 로그인 시 알림을 받습니다</div>
                    </div>
                    <Button variant="outline" size="sm">설정</Button>
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">세로 탭</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Tabs.Root value="general" orientation="vertical" class="flex gap-4">
            <Tabs.List class="flex-col h-fit">
              <Tabs.Trigger value="general" class="w-full justify-start">일반 설정</Tabs.Trigger>
              <Tabs.Trigger value="appearance" class="w-full justify-start">모양</Tabs.Trigger>
              <Tabs.Trigger value="notifications" class="w-full justify-start">알림</Tabs.Trigger>
              <Tabs.Trigger value="privacy" class="w-full justify-start">개인정보</Tabs.Trigger>
            </Tabs.List>

            <div class="flex-1">
              <Tabs.Content value="general">
                <h3 class="text-lg font-semibold mb-4">일반 설정</h3>
                <div class="space-y-4">
                  <div class="grid gap-2">
                    <Label>언어</Label>
                    <select class="w-full p-2 border rounded">
                      <option>한국어</option>
                      <option>English</option>
                      <option>日本語</option>
                    </select>
                  </div>
                  <div class="grid gap-2">
                    <Label>시간대</Label>
                    <select class="w-full p-2 border rounded">
                      <option>Asia/Seoul</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="appearance">
                <h3 class="text-lg font-semibold mb-4">모양 설정</h3>
                <div class="space-y-4">
                  <div>
                    <Label class="text-base">테마</Label>
                    <div class="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">라이트</Button>
                      <Button variant="default" size="sm">다크</Button>
                      <Button variant="outline" size="sm">시스템</Button>
                    </div>
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="notifications">
                <h3 class="text-lg font-semibold mb-4">알림 설정</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">이메일 알림</div>
                      <div class="text-sm text-muted-foreground">중요한 업데이트를 이메일로 받기</div>
                    </div>
                    <input type="checkbox" checked class="rounded" />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">푸시 알림</div>
                      <div class="text-sm text-muted-foreground">브라우저 푸시 알림 받기</div>
                    </div>
                    <input type="checkbox" class="rounded" />
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="privacy">
                <h3 class="text-lg font-semibold mb-4">개인정보 설정</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">프로필 공개</div>
                      <div class="text-sm text-muted-foreground">다른 사용자에게 프로필 공개</div>
                    </div>
                    <input type="checkbox" checked class="rounded" />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">활동 기록 표시</div>
                      <div class="text-sm text-muted-foreground">최근 활동을 다른 사용자에게 공개</div>
                    </div>
                    <input type="checkbox" class="rounded" />
                  </div>
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { User, Bell, Settings } from '@lucide/svelte';
</script>

<!-- 기본 탭 -->
<Tabs.Root value="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">탭 3</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">
    첫 번째 탭 내용
  </Tabs.Content>
  <Tabs.Content value="tab2">
    두 번째 탭 내용
  </Tabs.Content>
  <Tabs.Content value="tab3">
    세 번째 탭 내용
  </Tabs.Content>
</Tabs.Root>

<!-- 아이콘과 배지가 있는 탭 -->
<Tabs.Root value="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile" class="flex items-center gap-2">
      <User class="h-4 w-4" />
      프로필
    </Tabs.Trigger>
    <Tabs.Trigger value="notifications" class="flex items-center gap-2">
      <Bell class="h-4 w-4" />
      알림
      <Badge variant="destructive" class="ml-1">3</Badge>
    </Tabs.Trigger>
    <Tabs.Trigger value="settings" class="flex items-center gap-2">
      <Settings class="h-4 w-4" />
      설정
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile">프로필 설정</Tabs.Content>
  <Tabs.Content value="notifications">알림 관리</Tabs.Content>
  <Tabs.Content value="settings">시스템 설정</Tabs.Content>
</Tabs.Root>

<!-- 세로 탭 -->
<Tabs.Root value="general" orientation="vertical" class="flex gap-4">
  <Tabs.List class="flex-col h-fit">
    <Tabs.Trigger value="general" class="w-full justify-start">
      일반
    </Tabs.Trigger>
    <Tabs.Trigger value="advanced" class="w-full justify-start">
      고급
    </Tabs.Trigger>
  </Tabs.List>
  <div class="flex-1">
    <Tabs.Content value="general">일반 설정 내용</Tabs.Content>
    <Tabs.Content value="advanced">고급 설정 내용</Tabs.Content>
  </div>
</Tabs.Root>`}</code
        ></pre>
    </div>
  </div>
</section>
