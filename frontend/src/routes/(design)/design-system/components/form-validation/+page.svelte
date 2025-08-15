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
  import { validateField, validateForm, getSchemaFields, getFieldClasses } from '$lib/utils/form-validation';

  // 전체 검증 스키마
  const validationSchema = z
    .object({
      email: z.string().min(1, '이메일을 입력하세요').email('유효한 이메일 주소를 입력하세요'),
      password: z
        .string()
        .min(1, '비밀번호를 입력하세요')
        .min(8, '비밀번호는 8자 이상이어야 합니다')
        .regex(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
          '비밀번호는 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다'
        ),
      confirmPassword: z.string().min(1, '비밀번호 확인을 입력하세요'),
      name: z.string().min(1, '이름을 입력하세요').min(2, '이름은 2자 이상이어야 합니다'),
      age: z.union([z.string(), z.number()])
        .refine((val) => {
          // 빈 값 체크
          if (val === '' || val === null || val === undefined) {
            return false;
          }
          return true;
        }, '나이를 입력하세요')
        .refine((val) => {
          if (val === '' || val === null || val === undefined) {
            return true; // 이전 체크에서 걸러짐
          }
          const num = typeof val === 'string' ? Number(val) : val;
          return !isNaN(num) && num >= 1 && num <= 150;
        }, '나이는 1~150 사이의 숫자여야 합니다'),
      gender: z.string().min(1, '성별을 선택하세요'),
      bio: z.string().max(500, '자기소개는 500자 이하로 입력하세요'),
      agreeTerms: z.boolean().refine((val) => val === true, '이용약관에 동의해야 합니다')
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다',
      path: ['confirmPassword']
    });

  // 폼 상태 (svelte 파일에서 $state 사용)
  let formData = $state({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '' as string | number,
    gender: '',
    bio: '',
    agreeTerms: false
  });

  let errors = $state<Record<string, string>>({});
  let touched = $state<Record<string, boolean>>({});

  // 개별 필드 검증
  function handleFieldValidation(fieldName: string) {
    const error = validateField(validationSchema, formData, fieldName);
    errors[fieldName] = error;
  }

  // 전체 폼 검증
  function handleFormValidation(): boolean {
    const result = validateForm(validationSchema, formData);
    errors = result.errors;
    return result.isValid;
  }

  // 포커스/블러 핸들러
  function handleFocus(fieldName: string) {
    errors[fieldName] = '';
  }

  function handleBlur(fieldName: string) {
    touched[fieldName] = true;
    if (touched[fieldName]) {
      handleFieldValidation(fieldName);
      
      // 비밀번호 관련 필드는 상호 검증
      if (fieldName === 'password' && touched.confirmPassword) {
        handleFieldValidation('confirmPassword');
      } else if (fieldName === 'confirmPassword' && touched.password) {
        handleFieldValidation('password');
      }
    }
  }

  // 비밀번호 입력 시 실시간 검증 핸들러
  function handlePasswordChange() {
    if (touched.password) {
      handleFieldValidation('password');
    }
    if (touched.confirmPassword) {
      handleFieldValidation('confirmPassword');
    }
  }

  // 폼 제출 핸들러
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // 모든 필드를 touched로 표시
    getSchemaFields(validationSchema).forEach((fieldName) => {
      touched[fieldName] = true;
    });

    if (handleFormValidation()) {
      console.log('폼 데이터:', formData);
      alert('폼이 제출되었습니다! (콘솔 확인)');
    }
  }

  // 기타 검증하지 않는 필드들
  let otherFormData = $state({
    agreeMarketing: false
  });

  function resetForm() {
    formData = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      age: '' as string | number,
      gender: '',
      bio: '',
      agreeTerms: false
    };
    errors = {};
    touched = {};
    otherFormData = {
      agreeMarketing: false
    };
  }
</script>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <div class="space-y-8">
    <!-- 헤더 -->
    <section class="mb-12">
      <h1 class="text-3xl font-bold text-foreground">폼 검증 (Form Validation)</h1>
      <p class="text-foreground/70 mt-2">다양한 폼 검증 패턴과 UI 상태를 보여주는 예제입니다.</p>
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
        <form class="space-y-4" onsubmit={handleSubmit}>
          <!-- 이메일 -->
          <div class="space-y-2">
            <Label for="email">이메일 <span class="text-destructive">*</span></Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="example@email.com"
              bind:value={formData.email}
              class={getFieldClasses(!!errors.email)}
              aria-invalid={errors.email ? 'true' : undefined}
              onfocus={() => handleFocus('email')}
              onblur={() => handleBlur('email')}
            />
            {#if errors.email}
              <p class="text-sm text-destructive mt-1">{errors.email}</p>
            {/if}
          </div>

          <!-- 비밀번호 -->
          <div class="space-y-2">
            <Label for="password">비밀번호 <span class="text-destructive">*</span></Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="8자 이상, 영문+숫자+특수문자 포함"
              bind:value={formData.password}
              class={getFieldClasses(!!errors.password)}
              aria-invalid={errors.password ? 'true' : undefined}
              onfocus={() => handleFocus('password')}
              onblur={() => handleBlur('password')}
              oninput={() => handlePasswordChange()}
            />
            {#if errors.password}
              <p class="text-sm text-destructive mt-1">{errors.password}</p>
            {/if}
          </div>

          <!-- 비밀번호 확인 -->
          <div class="space-y-2">
            <Label for="confirmPassword">비밀번호 확인 <span class="text-destructive">*</span></Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력"
              bind:value={formData.confirmPassword}
              class={getFieldClasses(!!errors.confirmPassword)}
              aria-invalid={errors.confirmPassword ? 'true' : undefined}
              onfocus={() => handleFocus('confirmPassword')}
              onblur={() => handleBlur('confirmPassword')}
              oninput={() => handlePasswordChange()}
            />
            {#if errors.confirmPassword}
              <p class="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
            {/if}
          </div>

          <!-- 이름 -->
          <div class="space-y-2">
            <Label for="name">이름 <span class="text-destructive">*</span></Label>
            <Input 
              id="name" 
              name="name"
              type="text" 
              placeholder="홍길동" 
              bind:value={formData.name}
              class={getFieldClasses(!!errors.name)}
              aria-invalid={errors.name ? 'true' : undefined}
              onfocus={() => handleFocus('name')}
              onblur={() => handleBlur('name')}
            />
            {#if errors.name}
              <p class="text-sm text-destructive mt-1">{errors.name}</p>
            {/if}
          </div>

          <!-- 나이 -->
          <div class="space-y-2">
            <Label for="age">나이 <span class="text-destructive">*</span></Label>
            <Input 
              id="age" 
              name="age"
              type="number" 
              placeholder="25" 
              bind:value={formData.age} 
              min="1" 
              max="150"
              class={getFieldClasses(!!errors.age)}
              aria-invalid={errors.age ? 'true' : undefined}
              onfocus={() => handleFocus('age')}
              onblur={() => handleBlur('age')}
            />
            {#if errors.age}
              <p class="text-sm text-destructive mt-1">{errors.age}</p>
            {/if}
          </div>

          <!-- 성별 (라디오 그룹) -->
          <div class="space-y-3">
            <Label>성별 <span class="text-destructive">*</span></Label>
            <RadioGroup 
              bind:value={formData.gender}
              class={getFieldClasses(!!errors.gender)}
              onchange={() => {
                touched.gender = true;
                handleFieldValidation('gender');
              }}
            >
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
            {#if errors.gender}
              <p class="text-sm text-destructive mt-1">{errors.gender}</p>
            {/if}
          </div>

          <!-- 자기소개 -->
          <div class="space-y-2">
            <Label for="bio">자기소개</Label>
            <Textarea 
              id="bio" 
              name="bio"
              placeholder="간단한 자기소개를 작성해주세요..." 
              bind:value={formData.bio} 
              rows={4}
              class={getFieldClasses(!!errors.bio)}
              aria-invalid={errors.bio ? 'true' : undefined}
              onfocus={() => handleFocus('bio')}
              onblur={() => handleBlur('bio')}
            />
            <p class="text-sm text-foreground/60">최대 500자까지 입력 가능합니다. (현재: {formData.bio.length}자)</p>
            {#if errors.bio}
              <p class="text-sm text-destructive mt-1">{errors.bio}</p>
            {/if}
          </div>

          <!-- 체크박스 동의 -->
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <Checkbox 
                id="agreeTerms" 
                bind:checked={formData.agreeTerms}
                onchange={() => {
                  touched.agreeTerms = true;
                  handleFieldValidation('agreeTerms');
                }}
              />
              <Label for="agreeTerms" class="text-sm">
                이용약관에 동의합니다 <span class="text-destructive">*</span>
              </Label>
            </div>
            {#if errors.agreeTerms}
              <p class="text-sm text-destructive mt-1">{errors.agreeTerms}</p>
            {/if}
            <div class="flex items-center space-x-2">
              <Checkbox id="agreeMarketing" bind:checked={otherFormData.agreeMarketing} />
              <Label for="agreeMarketing" class="text-sm">마케팅 정보 수신에 동의합니다 (선택)</Label>
            </div>
          </div>

          <!-- 버튼 영역 -->
          <div class="flex gap-3 pt-4">
            <Button type="submit" class="flex-1">회원가입</Button>
            <Button type="button" variant="outline" onclick={resetForm}>초기화</Button>
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
          code={JSON.stringify(
            {
              // 검증 대상 필드
              ...formData,
              // 기타 필드 
              ...otherFormData
            },
            null,
            2
          )}
        />
      </CardContent>
    </Card>
  </div>
</div>
