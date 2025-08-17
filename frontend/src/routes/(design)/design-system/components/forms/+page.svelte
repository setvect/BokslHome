<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { FormField } from '$lib/components/form-lite';
  import { z } from 'zod';

  // 4.4: 기본 폼 (Login / Register)
  const loginSchema = z.object({
    email: z.string({ required_error: '이메일을 입력해주세요.' }).email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(50, '비밀번호는 최대 50자 이하이어야 합니다.')
  });

  const registerSchema = z
    .object({
      email: z.string({ required_error: '이메일을 입력해주세요.' }).email('올바른 이메일 형식이 아닙니다.'),
      password: z
        .string({ required_error: '비밀번호를 입력해주세요.' })
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
        .max(50, '비밀번호는 최대 50자 이하이어야 합니다.'),
      confirmPassword: z.string({ required_error: '비밀번호 확인을 입력해주세요.' })
    })
    .refine((v) => v.password === v.confirmPassword, {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.'
    });

  let login = $state({ email: '', password: '' });
  let loginErrors = $state<{ email?: string; password?: string }>({});
  let loginSubmitted = $state(false);
  let loginLoading = $state(false);
  let loginMessage = $state<string | null>(null);

  let register = $state({ email: '', password: '', confirmPassword: '' });
  let registerErrors = $state<{ email?: string; password?: string; confirmPassword?: string }>({});
  let registerSubmitted = $state(false);
  let registerLoading = $state(false);
  let registerMessage = $state<string | null>(null);

  function validateLogin() {
    const r = loginSchema.safeParse(login);
    loginErrors = {};
    if (!r.success)
      for (const i of r.error.issues) {
        const k = i.path[0] as keyof typeof loginErrors;
        loginErrors[k] ||= i.message;
      }
    return r.success;
  }
  function validateRegister() {
    const r = registerSchema.safeParse(register);
    registerErrors = {};
    if (!r.success)
      for (const i of r.error.issues) {
        const k = i.path[0] as keyof typeof registerErrors;
        registerErrors[k] ||= i.message;
      }
    return r.success;
  }

  async function onSubmitLogin(e: SubmitEvent) {
    e.preventDefault();
    loginSubmitted = true;
    loginMessage = null;
    if (!validateLogin()) return;
    loginLoading = true;
    await new Promise((r) => setTimeout(r, 700));
    loginLoading = false;
    loginMessage = '로그인 폼 검증 통과 (모의 제출 성공)';
  }
  async function onSubmitRegister(e: SubmitEvent) {
    e.preventDefault();
    registerSubmitted = true;
    registerMessage = null;
    if (!validateRegister()) return;
    registerLoading = true;
    await new Promise((r) => setTimeout(r, 900));
    registerLoading = false;
    registerMessage = '회원가입 폼 검증 통과 (모의 제출 성공)';
  }

  // 4.5: 고급 - Step Form (2단계 + 확인)
  const step1Schema = z.object({
    email: z.string({ required_error: '이메일을 입력해주세요.' }).email('올바른 이메일 형식이 아닙니다.')
  });
  const step2Schema = z.object({
    password: z.string({ required_error: '비밀번호를 입력해주세요.' }).min(8, '8자 이상')
  });
  let step = $state<1 | 2 | 3>(1);
  let stepForm = $state<{ email: string; password: string }>({ email: '', password: '' });
  let stepErrors = $state<{ email?: string; password?: string }>({});
  let stepLoading = $state(false);
  let stepMessage = $state<string | null>(null);

  function validateStep(cur: 1 | 2) {
    stepErrors = {};
    if (cur === 1) {
      const r = step1Schema.safeParse({ email: stepForm.email });
      if (!r.success)
        for (const i of r.error.issues) {
          const k = i.path[0] as keyof typeof stepErrors;
          stepErrors[k] ||= i.message;
        }
      return r.success;
    } else {
      const r = step2Schema.safeParse({ password: stepForm.password });
      if (!r.success)
        for (const i of r.error.issues) {
          const k = i.path[0] as keyof typeof stepErrors;
          stepErrors[k] ||= i.message;
        }
      return r.success;
    }
  }
  function nextStep() {
    if (validateStep(step === 1 ? 1 : 2)) step = step === 1 ? 2 : 3;
  }
  function prevStep() {
    if (step > 1) step = step === 3 ? 2 : 1;
  }
  async function submitStepForm() {
    if (!validateStep(2)) {
      step = 2;
      return;
    }
    stepLoading = true;
    stepMessage = null;
    await new Promise((r) => setTimeout(r, 800));
    stepLoading = false;
    stepMessage = 'Step Form 제출 완료';
  }

  // 4.5: 고급 - 파일 업로드 (클라이언트 검증)
  let file: File | null = $state(null);
  let fileError = $state<string | null>(null);
  function onFileChange(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0] ?? null;
    file = f;
    fileError = null;
    if (!f) return;
    const max = 2 * 1024 * 1024; // 2MB
    const okType = ['image/png', 'image/jpeg'];
    if (!okType.includes(f.type)) fileError = 'PNG/JPEG만 업로드 가능합니다.';
    else if (f.size > max) fileError = '파일 용량은 2MB 이하여야 합니다.';
  }

  // 4.5: 고급 - 동적 필드 (추가/제거)
  let tags = $state<string[]>(['']);
  let tagsErrors = $state<string[]>([]);
  function addTag() {
    tags = [...tags, ''];
  }
  function removeTag(idx: number) {
    tags = tags.filter((_, i) => i !== idx);
    tagsErrors = tagsErrors.filter((_, i) => i !== idx);
  }
  function validateTags() {
    tagsErrors = tags.map((t) => (!t.trim() ? '값을 입력하세요.' : ''));
    return tagsErrors.every((m) => !m);
  }
</script>

<h1 class="text-2xl font-bold mb-6">Forms (CSR Validation)</h1>

<div class="grid gap-10 md:grid-cols-2">
  <!-- 4.4 Login -->
  <section class="space-y-4">
    <h2 class="text-lg font-semibold">Login</h2>
    <form class="space-y-3" onsubmit={onSubmitLogin} novalidate>
      <FormField id="login-email" label="Email" required error={loginSubmitted ? loginErrors.email : undefined}>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          value={login.email}
          oninput={(e) => {
            login.email = (e.target as HTMLInputElement).value;
            if (loginSubmitted) validateLogin();
          }}
          aria-invalid={!!loginErrors.email}
        />
      </FormField>
      <FormField id="login-password" label="Password" required error={loginSubmitted ? loginErrors.password : undefined}>
        <Input
          id="login-password"
          type="password"
          value={login.password}
          oninput={(e) => {
            login.password = (e.target as HTMLInputElement).value;
            if (loginSubmitted) validateLogin();
          }}
          aria-invalid={!!loginErrors.password}
        />
      </FormField>
      <div class="flex items-center gap-2">
        <Button type="submit" formnovalidate disabled={loginLoading}>{loginLoading ? 'Submitting…' : 'Submit'}</Button>
        {#if loginMessage}<span class="text-sm text-emerald-600">{loginMessage}</span>{/if}
      </div>
    </form>
  </section>

  <!-- 4.4 Register -->
  <section class="space-y-4">
    <h2 class="text-lg font-semibold">Register</h2>
    <form class="space-y-3" onsubmit={onSubmitRegister} novalidate>
      <FormField id="reg-email" label="Email" required error={registerSubmitted ? registerErrors.email : undefined}>
        <Input
          id="reg-email"
          type="email"
          placeholder="you@example.com"
          value={register.email}
          oninput={(e) => {
            register.email = (e.target as HTMLInputElement).value;
            if (registerSubmitted) validateRegister();
          }}
          aria-invalid={!!registerErrors.email}
        />
      </FormField>
      <FormField id="reg-password" label="Password" required error={registerSubmitted ? registerErrors.password : undefined}>
        <Input
          id="reg-password"
          type="password"
          value={register.password}
          oninput={(e) => {
            register.password = (e.target as HTMLInputElement).value;
            if (registerSubmitted) validateRegister();
          }}
          aria-invalid={!!registerErrors.password}
        />
      </FormField>
      <FormField id="reg-confirm" label="Confirm Password" required error={registerSubmitted ? registerErrors.confirmPassword : undefined}>
        <Input
          id="reg-confirm"
          type="password"
          value={register.confirmPassword}
          oninput={(e) => {
            register.confirmPassword = (e.target as HTMLInputElement).value;
            if (registerSubmitted) validateRegister();
          }}
          aria-invalid={!!registerErrors.confirmPassword}
        />
      </FormField>
      <div class="flex items-center gap-2">
        <Button type="submit" formnovalidate disabled={registerLoading}>{registerLoading ? 'Submitting…' : 'Submit'}</Button>
        {#if registerMessage}<span class="text-sm text-emerald-600">{registerMessage}</span>{/if}
      </div>
    </form>
  </section>
</div>

<!-- 4.5 Step Form -->
<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">Step Form</h2>
  <div class="text-sm text-muted-foreground">단계: {step} / 3</div>
  {#if step === 1}
    <div class="max-w-sm space-y-3">
      <FormField id="st-email" label="Email" required error={stepErrors.email}>
        <Input
          id="st-email"
          type="email"
          value={stepForm.email}
          oninput={(e) => {
            stepForm.email = (e.target as HTMLInputElement).value;
          }}
        />
      </FormField>
      <div class="flex gap-2">
        <Button type="button" onclick={nextStep}>Next</Button>
      </div>
    </div>
  {:else if step === 2}
    <div class="max-w-sm space-y-3">
      <FormField id="st-password" label="Password" required error={stepErrors.password}>
        <Input
          id="st-password"
          type="password"
          value={stepForm.password}
          oninput={(e) => {
            stepForm.password = (e.target as HTMLInputElement).value;
          }}
        />
      </FormField>
      <div class="flex gap-2">
        <Button type="button" onclick={prevStep}>Back</Button>
        <Button type="button" onclick={nextStep}>Next</Button>
      </div>
    </div>
  {:else}
    <div class="max-w-sm space-y-3">
      <div class="text-sm">입력 확인</div>
      <div class="rounded border p-3 text-sm">
        <div>Email: {stepForm.email}</div>
        <div>Password: {'•'.repeat(Math.max(0, stepForm.password.length))}</div>
      </div>
      <div class="flex items-center gap-2">
        <Button type="button" onclick={prevStep} disabled={stepLoading}>Back</Button>
        <Button type="button" onclick={submitStepForm} disabled={stepLoading}>{stepLoading ? 'Submitting…' : 'Submit'}</Button>
        {#if stepMessage}<span class="text-sm text-emerald-600">{stepMessage}</span>{/if}
      </div>
    </div>
  {/if}
</section>

<!-- 4.5 File Upload -->
<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">File Upload (Client validation)</h2>
  <div class="max-w-sm space-y-3">
    <FormField id="file" label="Avatar" error={fileError ?? undefined}>
      <input id="file" type="file" accept="image/png,image/jpeg" onchange={onFileChange} />
    </FormField>
    {#if file}
      <div class="text-sm">선택된 파일: {file.name} ({Math.round(file.size / 1024)} KB)</div>
    {/if}
  </div>
</section>

<!-- 4.5 Dynamic Fields -->
<section class="space-y-4 mt-10">
  <h2 class="text-lg font-semibold">Dynamic Fields (Tags)</h2>
  <div class="max-w-sm space-y-3">
    {#each tags as t, i}
      <FormField id={`tag-${i}`} label={`Tag ${i + 1}`} error={tagsErrors[i] || undefined}>
        <div class="flex items-center gap-2">
          <Input
            id={`tag-${i}`}
            type="text"
            value={t}
            oninput={(e) => {
              tags[i] = (e.target as HTMLInputElement).value;
              validateTags();
            }}
          />
          <Button type="button" onclick={() => removeTag(i)} disabled={tags.length <= 1}>Remove</Button>
        </div>
      </FormField>
    {/each}
    <div class="flex gap-2">
      <Button type="button" onclick={addTag}>Add field</Button>
      <Button
        type="button"
        onclick={() => {
          if (validateTags()) alert('태그 검증 통과');
        }}>Validate</Button
      >
    </div>
  </div>
</section>
