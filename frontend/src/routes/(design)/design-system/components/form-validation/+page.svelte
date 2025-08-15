<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import CodeBlock from '$lib/components/design-system/CodeBlock.svelte';

  // 폼 데이터 (순수 UI, validation 없음)
  let formData = $state({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    gender: '',
    bio: '',
    agreeTerms: false,
    agreeMarketing: false
  });

  // 임시 제출 핸들러 (아무 기능 없음)
  function handleSubmit() {
    console.log('폼 데이터:', formData);
    alert('폼이 제출되었습니다! (콘솔 확인)');
  }

  function resetForm() {
    formData = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      age: '',
      gender: '',
      bio: '',
      agreeTerms: false,
      agreeMarketing: false
    };
  }
</script>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <div class="space-y-8">
    <!-- 헤더 -->
    <section class="mb-12">
      <h1 class="text-3xl font-bold text-foreground">폼 검증 (Form Validation)</h1>
      <p class="text-foreground/70 mt-2">
        다양한 폼 검증 패턴과 UI 상태를 보여주는 예제입니다.
      </p>
    </section>

  <!-- 기본 회원가입 폼 -->
  <Card>
    <CardHeader>
      <CardTitle>기본 회원가입 폼</CardTitle>
      <CardDescription>
        순수 UI 컴포넌트만 사용한 회원가입 폼입니다. 아직 검증 로직은 없습니다.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <!-- 이메일 -->
        <div class="space-y-2">
          <Label for="email">이메일 <span class="text-destructive">*</span></Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            bind:value={formData.email}
            required
          />
          <!-- 에러 표시 영역 (아직 비어있음) -->
        </div>

        <!-- 비밀번호 -->
        <div class="space-y-2">
          <Label for="password">비밀번호 <span class="text-destructive">*</span></Label>
          <Input
            id="password"
            type="password"
            placeholder="8자 이상 입력"
            bind:value={formData.password}
            required
          />
          <!-- 에러 표시 영역 (아직 비어있음) -->
        </div>

        <!-- 비밀번호 확인 -->
        <div class="space-y-2">
          <Label for="confirmPassword">비밀번호 확인 <span class="text-destructive">*</span></Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력"
            bind:value={formData.confirmPassword}
            required
          />
          <!-- 에러 표시 영역 (아직 비어있음) -->
        </div>

        <!-- 이름 -->
        <div class="space-y-2">
          <Label for="name">이름 <span class="text-destructive">*</span></Label>
          <Input
            id="name"
            type="text"
            placeholder="홍길동"
            bind:value={formData.name}
            required
          />
          <!-- 에러 표시 영역 (아직 비어있음) -->
        </div>

        <!-- 나이 -->
        <div class="space-y-2">
          <Label for="age">나이</Label>
          <Input
            id="age"
            type="number"
            placeholder="25"
            bind:value={formData.age}
            min="1"
            max="150"
          />
          <!-- 에러 표시 영역 (아직 비어있음) -->
        </div>

        <!-- 성별 (라디오 그룹) -->
        <div class="space-y-3">
          <Label>성별</Label>
          <RadioGroup bind:value={formData.gender}>
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label for="male">남성</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label for="female">여성</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label for="other">기타</Label>
            </div>
          </RadioGroup>
        </div>

        <!-- 자기소개 -->
        <div class="space-y-2">
          <Label for="bio">자기소개</Label>
          <Textarea
            id="bio"
            placeholder="간단한 자기소개를 작성해주세요..."
            bind:value={formData.bio}
            rows={4}
          />
          <p class="text-sm text-foreground/60">최대 500자까지 입력 가능합니다.</p>
        </div>

        <!-- 체크박스 동의 -->
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <Checkbox id="agreeTerms" bind:checked={formData.agreeTerms} />
            <Label for="agreeTerms" class="text-sm">
              이용약관에 동의합니다 <span class="text-destructive">*</span>
            </Label>
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox id="agreeMarketing" bind:checked={formData.agreeMarketing} />
            <Label for="agreeMarketing" class="text-sm">
              마케팅 정보 수신에 동의합니다 (선택)
            </Label>
          </div>
        </div>

        <!-- 버튼 영역 -->
        <div class="flex gap-3 pt-4">
          <Button type="submit" class="flex-1">
            회원가입
          </Button>
          <Button type="button" variant="outline" onclick={resetForm}>
            초기화
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>

  <!-- 현재 폼 데이터 -->
  <Card>
    <CardHeader>
      <CardTitle>현재 폼 데이터 (디버깅용)</CardTitle>
      <CardDescription>실시간으로 폼 데이터 상태를 확인할 수 있습니다.</CardDescription>
    </CardHeader>
    <CardContent>
      <CodeBlock language="json" code={JSON.stringify(formData, null, 2)} />
    </CardContent>
  </Card>

  <!-- 다음 단계 안내 -->
  <Card>
    <CardHeader>
      <CardTitle>다음 단계 계획</CardTitle>
      <CardDescription>단계적으로 추가할 기능들</CardDescription>
    </CardHeader>
    <CardContent class="space-y-3">
      <div class="grid gap-3 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-muted"></div>
          <span class="text-foreground/80">1단계: 기본 UI 폼 (현재)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-muted"></div>
          <span class="text-foreground/60">2단계: 기본 검증 로직 추가</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-muted"></div>
          <span class="text-foreground/60">3단계: 실시간 검증 및 에러 표시</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-muted"></div>
          <span class="text-foreground/60">4단계: 검증 라이브러리 (Zod) 적용</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-muted"></div>
          <span class="text-foreground/60">5단계: Superforms 통합</span>
        </div>
      </div>
    </CardContent>
  </Card>
  </div>
</div>