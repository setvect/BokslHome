<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import CodeBlock from '$lib/components/design-system/CodeBlock.svelte';
  import { z } from 'zod';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // 검증 스키마 (이메일, 비밀번호만)
  const validationSchema = z.object({
    email: z.string().min(1, '이메일을 입력하세요').email('유효한 이메일 주소를 입력하세요'),
    password: z.string().min(1, '비밀번호를 입력하세요').min(8, '비밀번호는 8자 이상이어야 합니다')
  });

  // 초기 데이터
  const initialData = {
    email: '',
    password: ''
  };

  // Superforms 상태 (클라이언트 사이드에서만 초기화)
  let formStore = $state<any>(null);
  let errorsStore = $state<any>(null);
  let enhance = $state<any>(null);
  let constraintsStore = $state<any>(null);

  // Fallback 상태 (Superforms 로드 전)
  let fallbackForm = $state(initialData);
  let fallbackErrors = $state<Record<string, string>>({});

  // 바인딩을 위한 getter/setter
  let emailValue = $state({
    get() {
      return formStore ? $formStore.email : fallbackForm.email;
    },
    set(value: string) {
      if (formStore) {
        $formStore.email = value;
      } else {
        fallbackForm.email = value;
      }
    }
  });

  let passwordValue = $state({
    get() {
      return formStore ? $formStore.password : fallbackForm.password;
    },
    set(value: string) {
      if (formStore) {
        $formStore.password = value;
      } else {
        fallbackForm.password = value;
      }
    }
  });

  // 클라이언트 사이드에서만 Superforms 초기화
  onMount(async () => {
    if (browser) {
      try {
        const { superForm } = await import('sveltekit-superforms/client');
        const { zod } = await import('sveltekit-superforms/adapters');
        
        const superFormInstance = superForm(initialData, {
          validators: zod(validationSchema),
          resetForm: true,
          taintedMessage: null,
          delayMs: 0,
          onSubmit: ({ formData }) => {
            console.log('폼 데이터:', Object.fromEntries(formData));
            alert('폼이 제출되었습니다! (콘솔 확인)');
          }
        });

        formStore = superFormInstance.form;
        errorsStore = superFormInstance.errors;
        enhance = superFormInstance.enhance;
        constraintsStore = superFormInstance.constraints;
      } catch (error) {
        console.error('Superforms 로드 실패:', error);
      }
    }
  });

  // 다른 폼 데이터 (검증하지 않는 필드들)
  let otherFormData = $state({
    confirmPassword: '',
    name: '',
    age: '',
    gender: '',
    bio: '',
    agreeTerms: false,
    agreeMarketing: false
  });

  function resetForm() {
    // Superforms 초기화는 자동으로 처리됨
    otherFormData = {
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
        Zod를 사용한 이메일 검증이 적용된 회원가입 폼입니다. 이메일을 입력하지 않고 제출하면 에러가 표시됩니다.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <form 
        class="space-y-4" 
        use:enhance={enhance}
        onsubmit={(e: SubmitEvent) => {
          if (!enhance) {
            e.preventDefault();
            // Fallback 검증 로직
            const emailResult = validationSchema.shape.email.safeParse(fallbackForm.email);
            const passwordResult = validationSchema.shape.password.safeParse(fallbackForm.password);
            
            fallbackErrors = {};
            if (!emailResult.success) {
              fallbackErrors.email = emailResult.error.errors[0].message;
            }
            if (!passwordResult.success) {
              fallbackErrors.password = passwordResult.error.errors[0].message;
            }
            
            if (Object.keys(fallbackErrors).length === 0) {
              console.log('폼 데이터:', fallbackForm);
              alert('폼이 제출되었습니다! (콘솔 확인)');
            }
          }
        }}
      >
        <!-- 이메일 -->
        <div class="space-y-2">
          <Label for="email">이메일 <span class="text-destructive">*</span></Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="example@email.com"
            bind:value={emailValue}
            class={(errorsStore ? $errorsStore.email : fallbackErrors.email) ? 'border-destructive focus-visible:ring-destructive' : ''}
            aria-invalid={(errorsStore ? $errorsStore.email : fallbackErrors.email) ? 'true' : undefined}
            {...(constraintsStore ? $constraintsStore.email || {} : {})}
          />
          {#if errorsStore ? $errorsStore.email : fallbackErrors.email}
            <p class="text-sm text-destructive mt-1">{errorsStore ? $errorsStore.email : fallbackErrors.email}</p>
          {/if}
        </div>

        <!-- 비밀번호 -->
        <div class="space-y-2">
          <Label for="password">비밀번호 <span class="text-destructive">*</span></Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="8자 이상 입력"
            bind:value={passwordValue}
            class={(errorsStore ? $errorsStore.password : fallbackErrors.password) ? 'border-destructive focus-visible:ring-destructive' : ''}
            aria-invalid={(errorsStore ? $errorsStore.password : fallbackErrors.password) ? 'true' : undefined}
            {...(constraintsStore ? $constraintsStore.password || {} : {})}
          />
          {#if errorsStore ? $errorsStore.password : fallbackErrors.password}
            <p class="text-sm text-destructive mt-1">{errorsStore ? $errorsStore.password : fallbackErrors.password}</p>
          {/if}
        </div>

        <!-- 비밀번호 확인 -->
        <div class="space-y-2">
          <Label for="confirmPassword">비밀번호 확인 <span class="text-destructive">*</span></Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력"
            bind:value={otherFormData.confirmPassword}
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
            bind:value={otherFormData.name}
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
            bind:value={otherFormData.age}
            min="1"
            max="150"
          />
          <!-- 에러 표시 영역 (아직 비어있음) -->
        </div>

        <!-- 성별 (라디오 그룹) -->
        <div class="space-y-3">
          <Label>성별</Label>
          <RadioGroup bind:value={otherFormData.gender}>
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
            bind:value={otherFormData.bio}
            rows={4}
          />
          <p class="text-sm text-foreground/60">최대 500자까지 입력 가능합니다.</p>
        </div>

        <!-- 체크박스 동의 -->
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <Checkbox id="agreeTerms" bind:checked={otherFormData.agreeTerms} />
            <Label for="agreeTerms" class="text-sm">
              이용약관에 동의합니다 <span class="text-destructive">*</span>
            </Label>
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox id="agreeMarketing" bind:checked={otherFormData.agreeMarketing} />
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
      <CodeBlock 
        language="json" 
        code={JSON.stringify({
          // Superforms 관리 필드
          email: formStore ? $formStore.email : fallbackForm.email,
          password: formStore ? $formStore.password : fallbackForm.password,
          // 기타 필드
          ...otherFormData
        }, null, 2)} 
      />
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