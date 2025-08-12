<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Badge } from '$lib/components/ui/badge';
  
  let formData = {
    text: '',
    email: '',
    password: '',
    number: 0,
    date: '',
    time: '',
    search: '',
    url: '',
    tel: ''
  };
  
  let validationErrors: Record<string, string> = {};
  
  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validateForm() {
    validationErrors = {};
    
    if (!formData.text.trim()) {
      validationErrors.text = '텍스트를 입력해주세요';
    }
    
    if (!formData.email.trim()) {
      validationErrors.email = '이메일을 입력해주세요';
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = '유효한 이메일 형식이 아닙니다';
    }
    
    if (!formData.password.trim()) {
      validationErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      validationErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }
    
    return Object.keys(validationErrors).length === 0;
  }
  
  function handleSubmit() {
    if (validateForm()) {
      alert('폼 검증 성공!\n' + JSON.stringify(formData, null, 2));
    }
  }
</script>

<svelte:head>
  <title>Input 컴포넌트 테스트 - 디자인 시스템</title>
</svelte:head>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-6xl mx-auto">
    <!-- 헤더 -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-4 text-foreground">Input & Label 컴포넌트 테스트</h1>
        <p class="text-lg text-muted-foreground">
          Input과 Label 컴포넌트의 다양한 타입과 상태를 테스트하는 페이지입니다.
        </p>
      </div>
      
      <ThemeToggle />
    </div>
    
    <!-- 기본 Input 타입들 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">기본 Input 타입</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Text Input -->
        <Card>
          <CardHeader>
            <CardTitle>Text Input</CardTitle>
            <CardDescription>일반 텍스트 입력 필드</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="text-basic">기본 텍스트</Label>
              <Input id="text-basic" type="text" placeholder="텍스트를 입력하세요" />
            </div>
            <div class="space-y-2">
              <Label for="text-value">초기값이 있는 텍스트</Label>
              <Input id="text-value" type="text" value="미리 입력된 값" />
            </div>
            <div class="space-y-2">
              <Label for="text-disabled">비활성화된 텍스트</Label>
              <Input id="text-disabled" type="text" value="수정할 수 없습니다" disabled />
            </div>
          </CardContent>
        </Card>
        
        <!-- Email Input -->
        <Card>
          <CardHeader>
            <CardTitle>Email Input</CardTitle>
            <CardDescription>이메일 주소 입력 필드</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="email-basic">이메일 주소</Label>
              <Input id="email-basic" type="email" placeholder="example@email.com" />
            </div>
            <div class="space-y-2">
              <Label for="email-required">필수 이메일</Label>
              <Input id="email-required" type="email" placeholder="필수 입력 필드" required />
            </div>
            <div class="space-y-2">
              <Label for="email-readonly">읽기 전용 이메일</Label>
              <Input id="email-readonly" type="email" value="readonly@example.com" readonly />
            </div>
          </CardContent>
        </Card>
        
        <!-- Password Input -->
        <Card>
          <CardHeader>
            <CardTitle>Password Input</CardTitle>
            <CardDescription>비밀번호 입력 필드</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="password-basic">비밀번호</Label>
              <Input id="password-basic" type="password" placeholder="비밀번호를 입력하세요" />
            </div>
            <div class="space-y-2">
              <Label for="password-confirm">비밀번호 확인</Label>
              <Input id="password-confirm" type="password" placeholder="비밀번호를 다시 입력하세요" />
            </div>
          </CardContent>
        </Card>
        
        <!-- Number Input -->
        <Card>
          <CardHeader>
            <CardTitle>Number Input</CardTitle>
            <CardDescription>숫자 입력 필드</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="number-basic">기본 숫자</Label>
              <Input id="number-basic" type="number" placeholder="숫자를 입력하세요" />
            </div>
            <div class="space-y-2">
              <Label for="number-range">범위 제한 (1-100)</Label>
              <Input id="number-range" type="number" min="1" max="100" value="50" />
            </div>
            <div class="space-y-2">
              <Label for="number-step">단계 제한 (5씩 증감)</Label>
              <Input id="number-step" type="number" step="5" value="25" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 날짜/시간 Input -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">날짜/시간 Input</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Date Input</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="date-basic">날짜 선택</Label>
              <Input id="date-basic" type="date" />
            </div>
            <div class="space-y-2">
              <Label for="date-min">최소 날짜 제한</Label>
              <Input id="date-min" type="date" min="2024-01-01" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Time Input</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="time-basic">시간 선택</Label>
              <Input id="time-basic" type="time" />
            </div>
            <div class="space-y-2">
              <Label for="time-value">기본 시간 설정</Label>
              <Input id="time-value" type="time" value="14:30" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>DateTime Input</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="datetime-basic">날짜/시간</Label>
              <Input id="datetime-basic" type="datetime-local" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 특수 Input 타입 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">특수 Input 타입</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Search Input</CardTitle>
            <CardDescription>검색 입력 필드</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="search-basic">검색</Label>
              <Input id="search-basic" type="search" placeholder="검색어를 입력하세요..." />
            </div>
            <div class="space-y-2">
              <Label for="search-live">실시간 검색</Label>
              <Input id="search-live" type="search" placeholder="입력하면 실시간으로 검색" 
                     bind:value={formData.search} />
              {#if formData.search}
                <div class="text-sm text-muted-foreground">
                  검색어: "{formData.search}"
                </div>
              {/if}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>URL & Tel Input</CardTitle>
            <CardDescription>URL과 전화번호 입력</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="url-basic">웹사이트 URL</Label>
              <Input id="url-basic" type="url" placeholder="https://example.com" />
            </div>
            <div class="space-y-2">
              <Label for="tel-basic">전화번호</Label>
              <Input id="tel-basic" type="tel" placeholder="010-1234-5678" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 크기 및 스타일 변형 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">크기 및 스타일 변형</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Input 크기</CardTitle>
            <CardDescription>다양한 크기의 Input</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="size-small">작은 Input</Label>
              <Input id="size-small" placeholder="작은 크기" class="h-8 text-sm" />
            </div>
            <div class="space-y-2">
              <Label for="size-default">기본 Input</Label>
              <Input id="size-default" placeholder="기본 크기" />
            </div>
            <div class="space-y-2">
              <Label for="size-large">큰 Input</Label>
              <Input id="size-large" placeholder="큰 크기" class="h-12 text-lg" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>전체 너비</CardTitle>
            <CardDescription>다양한 너비 설정</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="width-auto">자동 너비</Label>
              <Input id="width-auto" placeholder="자동 너비" class="w-auto" />
            </div>
            <div class="space-y-2">
              <Label for="width-half">50% 너비</Label>
              <Input id="width-half" placeholder="50% 너비" class="w-1/2" />
            </div>
            <div class="space-y-2">
              <Label for="width-full">전체 너비</Label>
              <Input id="width-full" placeholder="전체 너비" class="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 유효성 검사 폼 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">폼 유효성 검사</h2>
      <Card>
        <CardHeader>
          <CardTitle>회원가입 폼</CardTitle>
          <CardDescription>실시간 유효성 검사가 적용된 폼 예시</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="form-text" class={validationErrors.text ? 'text-destructive' : ''}>
                이름 *
              </Label>
              <Input 
                id="form-text" 
                type="text" 
                placeholder="이름을 입력하세요"
                bind:value={formData.text}
                class={validationErrors.text ? 'border-destructive focus:ring-destructive' : ''}
              />
              {#if validationErrors.text}
                <p class="text-sm text-destructive">{validationErrors.text}</p>
              {/if}
            </div>
            
            <div class="space-y-2">
              <Label for="form-email" class={validationErrors.email ? 'text-destructive' : ''}>
                이메일 *
              </Label>
              <Input 
                id="form-email" 
                type="email" 
                placeholder="example@email.com"
                bind:value={formData.email}
                class={validationErrors.email ? 'border-destructive focus:ring-destructive' : ''}
              />
              {#if validationErrors.email}
                <p class="text-sm text-destructive">{validationErrors.email}</p>
              {/if}
            </div>
          </div>
          
          <div class="space-y-2">
            <Label for="form-password" class={validationErrors.password ? 'text-destructive' : ''}>
              비밀번호 *
            </Label>
            <Input 
              id="form-password" 
              type="password" 
              placeholder="6자 이상 입력하세요"
              bind:value={formData.password}
              class={validationErrors.password ? 'border-destructive focus:ring-destructive' : ''}
            />
            {#if validationErrors.password}
              <p class="text-sm text-destructive">{validationErrors.password}</p>
            {:else if formData.password.length > 0}
              <p class="text-sm text-muted-foreground">
                비밀번호 강도: 
                {#if formData.password.length < 6}
                  <Badge variant="destructive">약함</Badge>
                {:else if formData.password.length < 10}
                  <Badge variant="secondary">보통</Badge>
                {:else}
                  <Badge>강함</Badge>
                {/if}
              </p>
            {/if}
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="form-date">생년월일</Label>
              <Input 
                id="form-date" 
                type="date"
                bind:value={formData.date}
              />
            </div>
            
            <div class="space-y-2">
              <Label for="form-tel">전화번호</Label>
              <Input 
                id="form-tel" 
                type="tel" 
                placeholder="010-1234-5678"
                bind:value={formData.tel}
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <Label for="form-url">개인 웹사이트 (선택)</Label>
            <Input 
              id="form-url" 
              type="url" 
              placeholder="https://your-website.com"
              bind:value={formData.url}
            />
          </div>
          
          <div class="space-y-2">
            <Label for="form-bio">자기소개 (선택)</Label>
            <textarea
              id="form-bio"
              placeholder="간단한 자기소개를 입력하세요...&#10;여러 줄 작성이 가능합니다."
              class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
              rows="4"
            ></textarea>
          </div>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button onclick={handleSubmit}>회원가입</Button>
          <Button variant="outline" onclick={() => {
            formData = {
              text: '',
              email: '',
              password: '',
              number: 0,
              date: '',
              time: '',
              search: '',
              url: '',
              tel: ''
            };
            validationErrors = {};
          }}>
            초기화
          </Button>
        </CardFooter>
      </Card>
    </section>
    
    <!-- Textarea (다줄 텍스트) -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">Textarea (다줄 텍스트 입력)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>기본 Textarea</CardTitle>
            <CardDescription>줄바꿈이 가능한 다줄 텍스트 입력</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="textarea-basic">기본 텍스트 영역</Label>
              <textarea
                id="textarea-basic"
                placeholder="여러 줄 텍스트를 입력하세요...&#10;Enter 키로 줄바꿈이 가능합니다."
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
                rows="4"
              ></textarea>
            </div>
            
            <div class="space-y-2">
              <Label for="textarea-small">작은 텍스트 영역</Label>
              <textarea
                id="textarea-small"
                placeholder="작은 텍스트 영역"
                class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
                rows="3"
              ></textarea>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>다양한 Textarea 옵션</CardTitle>
            <CardDescription>크기와 기능이 다른 텍스트 영역들</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="textarea-large">큰 텍스트 영역</Label>
              <textarea
                id="textarea-large"
                placeholder="긴 내용을 입력할 때 사용하는 큰 텍스트 영역입니다.&#10;블로그 포스트, 댓글, 설명 등에 활용할 수 있습니다."
                class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
                rows="6"
              ></textarea>
            </div>
            
            <div class="space-y-2">
              <Label for="textarea-disabled">비활성화된 텍스트 영역</Label>
              <textarea
                id="textarea-disabled"
                value="이 텍스트 영역은 비활성화되어 있습니다.&#10;내용을 수정할 수 없습니다."
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
                rows="4"
                disabled
              ></textarea>
            </div>
            
            <div class="space-y-2">
              <Label for="textarea-noresize">크기 고정 텍스트 영역</Label>
              <textarea
                id="textarea-noresize"
                placeholder="크기 변경이 불가능한 텍스트 영역입니다."
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                rows="4"
              ></textarea>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- Focus 및 상태 테스트 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">Focus 및 상태 테스트</h2>
      <Card>
        <CardHeader>
          <CardTitle>Input 상태별 스타일</CardTitle>
          <CardDescription>다양한 상태에서의 Input 모양과 동작 확인</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium">정상 상태</h4>
              <div class="space-y-2">
                <Label for="normal-focus">Focus 테스트</Label>
                <Input id="normal-focus" placeholder="클릭하여 focus 확인" />
                <p class="text-xs text-muted-foreground">클릭하면 focus ring이 나타납니다</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <h4 class="font-medium">오류 상태</h4>
              <div class="space-y-2">
                <Label for="error-focus" class="text-destructive">오류가 있는 입력</Label>
                <Input id="error-focus" 
                       placeholder="오류 상태" 
                       class="border-destructive focus:ring-destructive focus:border-destructive" />
                <p class="text-xs text-destructive">오류 메시지가 여기 표시됩니다</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-2">
            <Label>키보드 네비게이션 테스트</Label>
            <p class="text-sm text-muted-foreground mb-2">Tab 키로 순차적으로 이동해보세요</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input placeholder="첫 번째" tabindex={1} />
              <Input placeholder="두 번째" tabindex={2} />
              <Input placeholder="세 번째" tabindex={3} />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4 pt-8 border-t">
      <Button href="/test-components/card" variant="outline">
        ← Card 테스트
      </Button>
      <Button href="/test-components" variant="secondary">
        전체 컴포넌트 테스트
      </Button>
      <Button href="/test-components/breadcrumb" variant="outline">
        Breadcrumb 테스트 →
      </Button>
    </div>
  </div>
</div>