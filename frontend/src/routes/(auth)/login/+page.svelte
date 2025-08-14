<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { AlertCircle, Lock, User } from '@lucide/svelte';
  import { goto } from '$app/navigation';

  // 로그인 폼 상태
  let username = $state('');
  let password = $state('');
  let isLoading = $state(false);
  let error = $state('');

  // 로그인 처리 함수 (API 모킹)
  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      error = '아이디와 비밀번호를 입력해주세요.';
      return;
    }

    isLoading = true;
    error = '';

    try {
      // API 호출 모킹 - 1초 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 로그인 검증 로직
      if (username === 'admin' && password === 'admin') {
        // 로그인 성공 - 임시로 localStorage에 토큰 저장
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          username: 'admin',
          name: '관리자'
        }));
        
        goto('/');
      } else {
        error = '아이디 또는 비밀번호가 올바르지 않습니다.';
      }
    } catch (err) {
      error = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
    } finally {
      isLoading = false;
    }
  }

  // Enter 키 처리
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }
</script>

<svelte:head>
  <title>로그인 - 복슬홈</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background p-4">
  <div class="w-full max-w-md space-y-6">
    <!-- 로고/타이틀 영역 -->
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-bold text-foreground">복슬홈</h1>
      <p class="text-foreground/70">로그인하여 시작하세요</p>
    </div>

    <!-- 로그인 폼 카드 -->
    <Card>
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl text-center">로그인</CardTitle>
        <CardDescription class="text-center">
          계정 정보를 입력하여 로그인하세요
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <!-- 오류 메시지 -->
        {#if error}
          <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        {/if}

        <!-- 로그인 폼 -->
        <form onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div class="space-y-4">
            <!-- 아이디 입력 -->
            <div class="space-y-2">
              <Label for="username">아이디</Label>
              <div class="relative">
                <User class="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
                <Input
                  id="username"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  bind:value={username}
                  onkeydown={handleKeydown}
                  disabled={isLoading}
                  class="pl-10"
                  required
                />
              </div>
            </div>

            <!-- 비밀번호 입력 -->
            <div class="space-y-2">
              <Label for="password">비밀번호</Label>
              <div class="relative">
                <Lock class="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  bind:value={password}
                  onkeydown={handleKeydown}
                  disabled={isLoading}
                  class="pl-10"
                  required
                />
              </div>
            </div>

            <!-- 로그인 버튼 -->
            <Button 
              type="submit"
              class="w-full" 
              onclick={handleLogin}
              disabled={isLoading}
            >
              {#if isLoading}
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                로그인 중...
              {:else}
                로그인
              {/if}
            </Button>
          </div>
        </form>

        <!-- 테스트 계정 정보 -->
        <div class="pt-4 border-t border-border">
          <div class="text-center space-y-2">
            <p class="text-sm text-foreground/60">테스트 계정</p>
            <div class="text-xs text-foreground/50 space-y-1">
              <div>아이디: admin</div>
              <div>비밀번호: admin</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>