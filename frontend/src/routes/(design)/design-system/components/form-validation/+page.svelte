<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { z } from 'zod';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { createFieldHandlers, shouldShowError, getAriaInvalid } from '$lib/utils/form';

  // 이메일 + 비밀번호 + 성별 + 약관 검증 스키마
  const formSchema = z
    .object({
      email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해주세요'),
      password: z
        .string()
        .min(1, '비밀번호를 입력해주세요')
        .min(8, '비밀번호는 8자 이상이어야 합니다')
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).*$/, '비밀번호는 영문과 숫자를 포함해야 합니다'),
      confirmPassword: z.string().min(1, '비밀번호를 다시 입력해주세요'),
      gender: z.string().min(1, '성별을 선택해주세요'),
      requiredTerms: z.boolean().refine((val) => val === true, {
        message: '필수 약관에 동의해주세요'
      }),
      optionalTerms: z.boolean()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다',
      path: ['confirmPassword']
    });

  // 초기 폼 데이터
  const initialData = {
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    requiredTerms: false,
    optionalTerms: false
  };

  // 포커스 상태 추적
  let focusedField = $state<string | null>(null);

  // 포커스 상태를 객체 형태로 래핑 (유틸 함수와 호환성을 위해)
  const focusedFieldRef = {
    get current() {
      return focusedField;
    },
    set current(value: string | null) {
      focusedField = value;
    }
  };

  // Superforms 설정 (클라이언트 전용 모드)
  const { form, errors, enhance, validate } = superForm(initialData, {
    SPA: true,
    validators: zod(formSchema),
    onUpdate: ({ form }) => {
      if (form.valid) {
        console.log('Form data:', form.data);
        alert(`폼 검증이 완료되었습니다!`);
      }
    }
  });

  // 업계 표준 에러 메시지 헬퍼 함수
  const showError = (field: string) => (shouldShowError($errors, field, focusedField) ? ($errors as any)[field] : null);
</script>

<div class="container mx-auto px-6 py-8 max-w-4xl">
  <div class="space-y-8">
    <!-- Header -->
    <section class="mb-12">
      <h1 class="text-3xl font-bold text-foreground">폼 유효성 검증 테스트</h1>
      <p class="text-foreground/70 mt-2">Superforms + Zod를 사용한 폼 유효성 검증 예제입니다.</p>
    </section>

    <!-- Email Form -->
    <Card>
      <CardHeader>
        <CardTitle>회원가입 폼</CardTitle>
        <CardDescription>모든 필수 정보를 입력하고 제출 버튼을 클릭해주세요.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <form class="space-y-4" method="POST" use:enhance novalidate>
          <!-- Email Field -->
          <div class="space-y-2">
            <Label for="email">이메일 주소 <span class="text-destructive">*</span></Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              bind:value={$form.email}
              aria-invalid={getAriaInvalid($errors, 'email', focusedField)}
              {...createFieldHandlers('email', focusedFieldRef, errors, validate)}
            />
            {#if showError('email')}
              <p class="text-sm text-destructive mt-1">{showError('email')}</p>
            {/if}
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <Label for="password">비밀번호 <span class="text-destructive">*</span></Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="8자 이상, 영문+숫자 포함"
              bind:value={$form.password}
              aria-invalid={getAriaInvalid($errors, 'password', focusedField)}
              {...createFieldHandlers('password', focusedFieldRef, errors, validate, () => {
                // 비밀번호 확인 필드도 재검증 (비밀번호가 변경되었으므로)
                if ($form.confirmPassword) {
                  validate('confirmPassword');
                }
              })}
            />
            {#if showError('password')}
              <p class="text-sm text-destructive mt-1">{showError('password')}</p>
            {/if}
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-2">
            <Label for="confirmPassword">비밀번호 확인 <span class="text-destructive">*</span></Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              bind:value={$form.confirmPassword}
              aria-invalid={getAriaInvalid($errors, 'confirmPassword', focusedField)}
              {...createFieldHandlers('confirmPassword', focusedFieldRef, errors, validate)}
            />
            {#if showError('confirmPassword')}
              <p class="text-sm text-destructive mt-1">{showError('confirmPassword')}</p>
            {/if}
          </div>

          <!-- Gender Field -->
          <div class="space-y-3">
            <Label>성별 <span class="text-destructive">*</span></Label>
            <RadioGroup bind:value={$form.gender} {...createFieldHandlers('gender', focusedFieldRef, errors, validate)}>
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" name="gender" />
                <Label for="male">남성</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" name="gender" />
                <Label for="female">여성</Label>
              </div>
            </RadioGroup>
            {#if showError('gender')}
              <p class="text-sm text-destructive mt-1">{showError('gender')}</p>
            {/if}
          </div>

          <!-- Terms & Conditions -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-foreground">약관 동의</h3>

            <!-- Required Terms -->
            <div class="space-y-2">
              <div class="flex items-start space-x-3">
                <Checkbox
                  id="requiredTerms"
                  name="requiredTerms"
                  bind:checked={$form.requiredTerms}
                  aria-invalid={getAriaInvalid($errors, 'requiredTerms', focusedField)}
                  {...createFieldHandlers('requiredTerms', focusedFieldRef, errors, validate)}
                />
                <div class="grid gap-1.5 leading-none">
                  <Label
                    for="requiredTerms"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <span class="text-primary underline cursor-pointer">이용약관</span> 및
                    <span class="text-primary underline cursor-pointer">개인정보처리방침</span>에 동의합니다
                    <span class="text-destructive">*</span>
                  </Label>
                  <p class="text-xs text-foreground/60">계정 생성 및 서비스 이용을 위해 필수로 동의해야 합니다.</p>
                </div>
              </div>
              {#if showError('requiredTerms')}
                <p class="text-sm text-destructive mt-1 ml-7">{showError('requiredTerms')}</p>
              {/if}
            </div>

            <!-- Optional Terms -->
            <div class="space-y-2">
              <div class="flex items-start space-x-3">
                <Checkbox
                  id="optionalTerms"
                  name="optionalTerms"
                  bind:checked={$form.optionalTerms}
                  {...createFieldHandlers('optionalTerms', focusedFieldRef, errors, validate)}
                />
                <div class="grid gap-1.5 leading-none">
                  <Label
                    for="optionalTerms"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    마케팅 이메일 및 프로모션 정보 수신에 동의합니다
                  </Label>
                  <p class="text-xs text-foreground/60">선택사항 - 언제든지 구독을 해지할 수 있습니다.</p>
                </div>
              </div>
              {#if showError('optionalTerms')}
                <p class="text-sm text-destructive mt-1 ml-7">{showError('optionalTerms')}</p>
              {/if}
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <Button type="submit" class="flex-1">가입하기</Button>
            <Button type="button" variant="outline" onclick={() => form.set(initialData)}>초기화</Button>
          </div>
        </form>
      </CardContent>
    </Card>

    <!-- Current Form Status -->
    <Card>
      <CardHeader>
        <CardTitle>현재 폼 상태</CardTitle>
        <CardDescription>실시간 폼 데이터 및 오류 상태입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <p><strong>이메일:</strong> {$form.email || '(비어있음)'}</p>
          <p><strong>비밀번호:</strong> {$form.password ? '•'.repeat($form.password.length) : '(비어있음)'}</p>
          <p><strong>비밀번호 확인:</strong> {$form.confirmPassword ? '•'.repeat($form.confirmPassword.length) : '(비어있음)'}</p>
          <p><strong>성별:</strong> {$form.gender === 'male' ? '남성' : $form.gender === 'female' ? '여성' : '(선택안함)'}</p>
          <p><strong>필수 약관:</strong> {$form.requiredTerms ? '✅ 동의함' : '❌ 동의안함'}</p>
          <p><strong>선택 약관:</strong> {$form.optionalTerms ? '✅ 동의함' : '❌ 동의안함'}</p>
          <p><strong>오류:</strong> {Object.keys($errors).length > 0 ? Object.keys($errors).join(', ') : '(없음)'}</p>
          <p>
            <strong>폼 유효성:</strong>
            {Object.keys($errors).length === 0 &&
            $form.email &&
            $form.password &&
            $form.confirmPassword &&
            $form.gender &&
            $form.requiredTerms
              ? '✅ 유효함'
              : '❌ 무효함'}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
