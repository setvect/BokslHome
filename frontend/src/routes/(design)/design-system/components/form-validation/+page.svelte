<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { z } from 'zod';
  import { onMount } from 'svelte';

  // UI 컴포넌트 imports
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { toast } from 'svelte-sonner';
  import { Check, X, AlertCircle, Eye, EyeOff } from '@lucide/svelte';

  // Zod 회원가입 스키마 정의
  const signupSchema = z
    .object({
      email: z
        .string({ required_error: '이메일은 필수 입력 항목입니다.' })
        .min(1, '이메일을 입력해주세요.')
        .email('올바른 이메일 형식이 아닙니다.')
        .max(100, '이메일은 100자 이하로 입력해주세요.'),

      password: z
        .string({ required_error: '비밀번호는 필수 입력 항목입니다.' })
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
        .max(50, '비밀번호는 50자 이하로 입력해주세요.'),

      confirmPassword: z.string({ required_error: '비밀번호 확인은 필수 입력 항목입니다.' }).min(1, '비밀번호 확인을 입력해주세요.'),

      name: z
        .string({ required_error: '이름은 필수 입력 항목입니다.' })
        .min(2, '이름은 최소 2자 이상이어야 합니다.')
        .max(50, '이름은 50자 이하로 입력해주세요.')
        .regex(/^[가-힣a-zA-Z\s]+$/, '이름은 한글, 영문, 공백만 입력 가능합니다.'),

      gender: z
        .enum(['male', 'female', 'other', ''], {
          required_error: '성별을 선택해주세요.',
          invalid_type_error: '올바른 성별을 선택해주세요.'
        })
        .refine((val) => val !== '', {
          message: '성별을 선택해주세요.'
        }),

      agreeToTerms: z.boolean({ required_error: '약관 동의는 필수입니다.' }).refine((val) => val === true, {
        message: '서비스 이용약관에 동의해주세요.'
      }),

      agreeToPrivacy: z.boolean({ required_error: '개인정보 처리방침 동의는 필수입니다.' }).refine((val) => val === true, {
        message: '개인정보 처리방침에 동의해주세요.'
      }),

      agreeToMarketing: z.boolean().default(false)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword']
    });

  // 초기 폼 데이터
  const initialData = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false
  };

  // Superforms 설정 (SPA 모드)
  const { form, errors, message, submitting, enhance } = superForm(initialData, {
    validators: zodClient(signupSchema),
    SPA: true,
    validationMethod: 'oninput',
    clearOnSubmit: 'errors-and-message',
    async onUpdate({ form }) {
      if (form.valid) {
        // 성공 시 알림
        toast.success('회원가입이 완료되었습니다!', {
          description: `${form.data.name}님, 환영합니다!`
        });

        // 실제 API 호출 시뮬레이션
        setTimeout(() => {
          console.log('회원가입 데이터:', form.data);
        }, 100);
      }
    },
    onError() {
      toast.error('회원가입 중 오류가 발생했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  });

  // 반응형 상태
  let showPassword = $state(false);
  let showConfirmPassword = $state(false);
  let formContainer: HTMLElement;

  // 키보드 접근성 지원
  function handleKeyDown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  onMount(() => {
    // 첫 번째 입력 필드에 포커스
    const firstInput = formContainer?.querySelector('input');
    firstInput?.focus();
  });
</script>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">폼 유효성 검사</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        Superforms + Zod + shadcn-svelte를 사용한 완전한 회원가입 폼 예제입니다. 실시간 유효성 검사와 접근성을 지원하는 실용적인 폼 구현을
        확인할 수 있습니다.
      </p>
    </div>

    <div class="flex flex-wrap gap-2">
      <Badge>Forms</Badge>
      <Badge variant="secondary">Validation</Badge>
      <Badge variant="outline">Accessible</Badge>
    </div>
  </section>

  <!-- 회원가입 폼 -->
  <section class="mb-16">
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- 회원가입 폼 -->
      <Card>
        <CardHeader>
          <CardTitle class="text-foreground">회원가입</CardTitle>
          <CardDescription>아래 정보를 입력하여 계정을 생성하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form use:enhance bind:this={formContainer} class="space-y-6">
            <!-- 이메일 -->
            <div class="space-y-2">
              <Label for="email" class="text-foreground">이메일 *</Label>
              <div class="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  bind:value={$form.email}
                  aria-describedby="email-error"
                />
              </div>
              {#if $errors.email}
                <p id="email-error" class="text-sm text-red-500">{$errors.email[0]}</p>
              {/if}
            </div>

            <!-- 비밀번호 -->
            <div class="space-y-2">
              <Label for="password" class="text-foreground">비밀번호 *</Label>
              <div class="space-y-2">
                <div class="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    bind:value={$form.password}
                    aria-describedby="password-error"
                    class="pr-10"
                  />
                  <button
                    type="button"
                    onclick={() => (showPassword = !showPassword)}
                    onkeydown={(e) => handleKeyDown(e, () => (showPassword = !showPassword))}
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    tabindex="0"
                  >
                    {#if showPassword}
                      <EyeOff class="h-4 w-4" />
                    {:else}
                      <Eye class="h-4 w-4" />
                    {/if}
                  </button>
                </div>
              </div>
              {#if $errors.password}
                <p id="password-error" class="text-sm text-red-500">{$errors.password[0]}</p>
              {/if}
            </div>

            <!-- 비밀번호 확인 -->
            <div class="space-y-2">
              <Label for="confirmPassword" class="text-foreground">비밀번호 확인 *</Label>
              <div class="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                  bind:value={$form.confirmPassword}
                  aria-describedby="confirmPassword-error"
                  class="pr-10"
                />
                <button
                  type="button"
                  onclick={() => (showConfirmPassword = !showConfirmPassword)}
                  onkeydown={(e) => handleKeyDown(e, () => (showConfirmPassword = !showConfirmPassword))}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                  aria-label={showConfirmPassword ? '비밀번호 확인 숨기기' : '비밀번호 확인 보기'}
                  tabindex="0"
                >
                  {#if showConfirmPassword}
                    <EyeOff class="h-4 w-4" />
                  {:else}
                    <Eye class="h-4 w-4" />
                  {/if}
                </button>
                {#if $form.confirmPassword && $form.password}
                  <div class="absolute right-12 top-1/2 -translate-y-1/2">
                    {#if $form.password === $form.confirmPassword}
                      <Check class="h-4 w-4 text-green-500" />
                    {:else}
                      <X class="h-4 w-4 text-red-500" />
                    {/if}
                  </div>
                {/if}
              </div>
              {#if $errors.confirmPassword}
                <p id="confirmPassword-error" class="text-sm text-red-500">{$errors.confirmPassword[0]}</p>
              {/if}
            </div>

            <!-- 이름 -->
            <div class="space-y-2">
              <Label for="name" class="text-foreground">이름 *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="이름을 입력하세요"
                bind:value={$form.name}
                aria-describedby="name-error"
              />
              {#if $errors.name}
                <p id="name-error" class="text-sm text-red-500">{$errors.name[0]}</p>
              {/if}
            </div>

            <!-- 성별 -->
            <div class="space-y-2">
              <Label class="text-foreground">성별 *</Label>
              <RadioGroup bind:value={$form.gender} class="flex flex-row space-x-6">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label for="male" class="text-foreground">남성</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label for="female" class="text-foreground">여성</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label for="other" class="text-foreground">기타</Label>
                </div>
              </RadioGroup>
              {#if $errors.gender}
                <p class="text-sm text-red-500">{$errors.gender[0]}</p>
              {/if}
            </div>

            <!-- 약관 동의 -->
            <div class="space-y-4">
              <!-- 서비스 이용약관 -->
              <div class="space-y-2">
                <div class="flex items-start space-x-2">
                  <Checkbox id="agreeToTerms" bind:checked={$form.agreeToTerms} aria-describedby="agreeToTerms-error" />
                  <div class="grid gap-1.5 leading-none">
                    <Label for="agreeToTerms" class="text-sm font-medium text-foreground cursor-pointer"
                      >서비스 이용약관 동의 (필수) *</Label
                    >
                    <p class="text-xs text-foreground/60">서비스 이용을 위해 약관에 동의해주세요.</p>
                  </div>
                </div>
                {#if $errors.agreeToTerms}
                  <p id="agreeToTerms-error" class="text-sm text-red-500">{$errors.agreeToTerms[0]}</p>
                {/if}
              </div>

              <!-- 개인정보 처리방침 -->
              <div class="space-y-2">
                <div class="flex items-start space-x-2">
                  <Checkbox id="agreeToPrivacy" bind:checked={$form.agreeToPrivacy} aria-describedby="agreeToPrivacy-error" />
                  <div class="grid gap-1.5 leading-none">
                    <Label for="agreeToPrivacy" class="text-sm font-medium text-foreground cursor-pointer">
                      개인정보 처리방침 동의 (필수) *
                    </Label>
                    <p class="text-xs text-foreground/60">개인정보 보호를 위한 처리방침에 동의해주세요.</p>
                  </div>
                </div>
                {#if $errors.agreeToPrivacy}
                  <p id="agreeToPrivacy-error" class="text-sm text-red-500">{$errors.agreeToPrivacy[0]}</p>
                {/if}
              </div>

              <!-- 마케팅 정보 수신 동의 -->
              <div class="space-y-2">
                <div class="flex items-start space-x-2">
                  <Checkbox id="agreeToMarketing" bind:checked={$form.agreeToMarketing} />
                  <div class="grid gap-1.5 leading-none">
                    <Label for="agreeToMarketing" class="text-sm font-medium text-foreground cursor-pointer">
                      마케팅 정보 수신 동의 (선택)
                    </Label>
                    <p class="text-xs text-foreground/60">이벤트, 프로모션 등의 마케팅 정보를 받아보시겠습니까?</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 폼 상태 표시 -->
            {#if $message}
              <div class="flex items-center gap-2 p-3 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                <AlertCircle class="h-4 w-4" />
                <span class="text-sm">{$message}</span>
              </div>
            {/if}

            <!-- 제출 버튼 -->
            <div class="flex gap-3">
              <Button type="submit" disabled={$submitting} class="flex-1">
                {#if $submitting}
                  <div class="flex items-center gap-2">
                    <div class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></div>
                    처리 중...
                  </div>
                {:else}
                  회원가입
                {/if}
              </Button>

              <Button
                type="button"
                variant="outline"
                onclick={() => {
                  // 폼 초기화
                  Object.assign($form, initialData);
                }}
              >
                초기화
              </Button>
            </div>

            <!-- 디버그 정보 (개발용) -->
            <details class="mt-6">
              <summary class="cursor-pointer text-sm text-foreground/70 hover:text-foreground">
                개발자 디버그 정보 (클릭하여 펼치기)
              </summary>
              <div class="mt-2 p-4 bg-muted rounded-md">
                <div class="space-y-4 text-xs">
                  <div>
                    <h4 class="font-semibold text-foreground mb-2">폼 데이터:</h4>
                    <pre class="text-foreground/80 whitespace-pre-wrap">{JSON.stringify($form, null, 2)}</pre>
                  </div>

                  {#if Object.keys($errors).length > 0}
                    <div>
                      <h4 class="font-semibold text-red-600 mb-2">에러:</h4>
                      <pre class="text-red-600 whitespace-pre-wrap">{JSON.stringify($errors, null, 2)}</pre>
                    </div>
                  {/if}

                  <div>
                    <h4 class="font-semibold text-foreground mb-2">폼 상태:</h4>
                    <ul class="text-foreground/80 space-y-1">
                      <li>• 제출 중: {$submitting}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          </form>
        </CardContent>
      </Card>

      <!-- 추가 정보 -->
      <Card>
        <CardHeader>
          <CardTitle class="text-foreground">구현 특징</CardTitle>
          <CardDescription>이 폼에서 구현된 주요 기능들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div class="space-y-3">
              <h4 class="font-semibold text-foreground">유효성 검사</h4>
              <ul class="space-y-1 text-foreground/80">
                <li>• 실시간 입력 검증 (oninput)</li>
                <li>• 이메일 형식 검사</li>
                <li>• 비밀번호 일치 확인</li>
                <li>• 한글/영문 이름 검증</li>
                <li>• 필수 약관 동의 확인</li>
              </ul>
            </div>

            <div class="space-y-3">
              <h4 class="font-semibold text-foreground">사용자 경험</h4>
              <ul class="space-y-1 text-foreground/80">
                <li>• 시각적 피드백 (체크/X 아이콘)</li>
                <li>• 비밀번호 보기/숨기기</li>
                <li>• 로딩 상태 표시</li>
                <li>• Toast 알림</li>
                <li>• 폼 초기화 기능</li>
                <li>• 키보드 접근성</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <!-- 기술 스택 정보 -->
      <Card>
        <CardHeader>
          <CardTitle class="text-foreground">사용된 기술</CardTitle>
          <CardDescription>이 예제에서 사용된 주요 기술 스택과 기능들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="space-y-2">
              <h4 class="font-semibold text-foreground">라이브러리</h4>
              <ul class="space-y-1 text-foreground/80">
                <li>• sveltekit-superforms (SPA 모드)</li>
                <li>• zod 스키마 검증</li>
                <li>• shadcn-svelte 기본 컴포넌트</li>
                <li>• Svelte 5 Runes</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-foreground">기능</h4>
              <ul class="space-y-1 text-foreground/80">
                <li>• 실시간 유효성 검사</li>
                <li>• 접근성 지원</li>
                <li>• 키보드 네비게이션</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</div>
