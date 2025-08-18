<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { z } from 'zod';

  // 4.5: 로그인/회원가입 폼 (패턴 요약)
  const loginSchema = z.object({
    email: z.string({ required_error: '이메일을 입력해주세요.' }).email('올바른 이메일 형식이 아닙니다.'),
    password: z.string({ required_error: '비밀번호를 입력해주세요.' }).min(8, '8자 이상')
  });
  let login = $state({ email: '', password: '' });
  let loginErrors = $state<{ email?: string; password?: string }>({});
  let loginLoading = $state(false);
  let loginMsg = $state<string | null>(null);
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
  async function submitLogin(e: SubmitEvent) {
    e.preventDefault();
    loginMsg = null;
    if (!validateLogin()) return;
    loginLoading = true;
    await new Promise((r) => setTimeout(r, 600));
    loginLoading = false;
    loginMsg = '로그인 패턴: 검증 통과 (모의 제출)';
  }

  // Register (패턴 요약)
  const registerSchema = z
    .object({
      email: z.string({ required_error: '이메일을 입력해주세요.' }).email('올바른 이메일 형식이 아닙니다.'),
      password: z.string({ required_error: '비밀번호를 입력해주세요.' }).min(8, '8자 이상'),
      confirmPassword: z.string({ required_error: '비밀번호 확인을 입력해주세요.' })
    })
    .refine((v) => v.password === v.confirmPassword, {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.'
    });
  let register = $state({ email: '', password: '', confirmPassword: '' });
  let registerErrors = $state<{ email?: string; password?: string; confirmPassword?: string }>({});
  let registerLoading = $state(false);
  let registerMsg = $state<string | null>(null);
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
  async function submitRegister(e: SubmitEvent) {
    e.preventDefault();
    registerMsg = null;
    if (!validateRegister()) return;
    registerLoading = true;
    await new Promise((r) => setTimeout(r, 700));
    registerLoading = false;
    registerMsg = '회원가입 패턴: 검증 통과 (모의 제출)';
  }

  // 4.5: Step Form (2단계 + 확인)
  const step1Schema = z.object({ email: z.string().email('이메일 형식') });
  const step2Schema = z.object({ password: z.string().min(8, '8자 이상') });
  let step = $state<1 | 2 | 3>(1);
  let stepForm = $state<{ email: string; password: string }>({ email: '', password: '' });
  let stepErrors = $state<{ email?: string; password?: string }>({});
  let stepLoading = $state(false);
  let stepMsg = $state<string | null>(null);
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
    }
    const r = step2Schema.safeParse({ password: stepForm.password });
    if (!r.success)
      for (const i of r.error.issues) {
        const k = i.path[0] as keyof typeof stepErrors;
        stepErrors[k] ||= i.message;
      }
    return r.success;
  }
  function nextStep() {
    if (validateStep(step === 1 ? 1 : 2)) step = step === 1 ? 2 : 3;
  }
  function prevStep() {
    if (step > 1) step = step === 3 ? 2 : 1;
  }
  async function submitStep() {
    if (!validateStep(2)) {
      step = 2;
      return;
    }
    stepLoading = true;
    stepMsg = null;
    await new Promise((r) => setTimeout(r, 800));
    stepLoading = false;
    stepMsg = 'Step Form 제출 완료';
  }

  // 4.5: 파일 업로드 (클라이언트 검증)
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

  // 4.5: 동적 필드 (추가/제거)
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

  // 4.5: 폼 상태 관리 (로딩/성공/실패)
  let saveForm = $state<{ title: string }>({ title: '' });
  let saveError = $state<string | null>(null);
  let saveLoading = $state(false);
  let saveMsg = $state<string | null>(null);
  async function submitSave(e: SubmitEvent) {
    e.preventDefault();
    saveMsg = null;
    saveError = null;
    if (!saveForm.title.trim()) {
      saveError = '제목을 입력하세요.';
      return;
    }
    saveLoading = true;
    await new Promise((r) => setTimeout(r, 700));
    // 모의 성공/실패 분기
    if (saveForm.title.toLowerCase().includes('fail')) {
      saveLoading = false;
      saveError = '서버 오류가 발생했습니다. 다시 시도하세요.';
      return;
    }
    saveLoading = false;
    saveMsg = '저장 완료';
  }
</script>

<section class="space-y-6">
  <h1 class="text-2xl font-bold">Form Patterns</h1>
  <p class="text-muted-foreground text-sm">4.5 고급 폼 패턴: 단계 진행, 파일 업로드, 동적 필드, 상태 관리</p>

  <!-- 로그인 패턴 요약 -->
  <div class="grid gap-8 md:grid-cols-2">
    <section class="space-y-3">
      <h2 class="text-lg font-semibold">Login (패턴 요약)</h2>
      <form class="space-y-3 max-w-sm" onsubmit={submitLogin} novalidate>
        <div class="space-y-2">
          <label for="p-login-email" class="text-sm font-medium">Email</label>
          <Input
            id="p-login-email"
            type="email"
            value={login.email}
            oninput={(e) => {
              login.email = (e.target as HTMLInputElement).value;
            }}
            aria-invalid={!!loginErrors.email}
          />
          {#if loginErrors.email}<p class="text-sm text-destructive">{loginErrors.email}</p>{/if}
        </div>
        <div class="space-y-2">
          <label for="p-login-password" class="text-sm font-medium">Password</label>
          <Input
            id="p-login-password"
            type="password"
            value={login.password}
            oninput={(e) => {
              login.password = (e.target as HTMLInputElement).value;
            }}
            aria-invalid={!!loginErrors.password}
          />
          {#if loginErrors.password}<p class="text-sm text-destructive">{loginErrors.password}</p>{/if}
        </div>
        <div class="flex items-center gap-2">
          <Button type="submit" formnovalidate disabled={loginLoading}>{loginLoading ? 'Submitting…' : 'Submit'}</Button>
          {#if loginMsg}<span class="text-sm text-emerald-600">{loginMsg}</span>{/if}
        </div>
      </form>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-semibold">Register (패턴 요약)</h2>
      <form class="space-y-3 max-w-sm" onsubmit={submitRegister} novalidate>
        <div class="space-y-2">
          <label for="p-reg-email" class="text-sm font-medium">Email</label>
          <Input
            id="p-reg-email"
            type="email"
            value={register.email}
            oninput={(e) => {
              register.email = (e.target as HTMLInputElement).value;
            }}
            aria-invalid={!!registerErrors.email}
          />
          {#if registerErrors.email}<p class="text-sm text-destructive">{registerErrors.email}</p>{/if}
        </div>
        <div class="space-y-2">
          <label for="p-reg-password" class="text-sm font-medium">Password</label>
          <Input
            id="p-reg-password"
            type="password"
            value={register.password}
            oninput={(e) => {
              register.password = (e.target as HTMLInputElement).value;
            }}
            aria-invalid={!!registerErrors.password}
          />
          {#if registerErrors.password}<p class="text-sm text-destructive">{registerErrors.password}</p>{/if}
        </div>
        <div class="space-y-2">
          <label for="p-reg-confirm" class="text-sm font-medium">Confirm Password</label>
          <Input
            id="p-reg-confirm"
            type="password"
            value={register.confirmPassword}
            oninput={(e) => {
              register.confirmPassword = (e.target as HTMLInputElement).value;
            }}
            aria-invalid={!!registerErrors.confirmPassword}
          />
          {#if registerErrors.confirmPassword}<p class="text-sm text-destructive">{registerErrors.confirmPassword}</p>{/if}
        </div>
        <div class="flex items-center gap-2">
          <Button type="submit" formnovalidate disabled={registerLoading}>{registerLoading ? 'Submitting…' : 'Submit'}</Button>
          {#if registerMsg}<span class="text-sm text-emerald-600">{registerMsg}</span>{/if}
        </div>
      </form>
    </section>

    <!-- Step Form -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold">Step Form</h2>
      <div class="text-sm text-muted-foreground">단계: {step} / 3</div>
      {#if step === 1}
        <div class="max-w-sm space-y-3">
          <div class="space-y-2">
            <label for="pf-email" class="text-sm font-medium">Email</label>
            <Input
              id="pf-email"
              type="email"
              value={stepForm.email}
              oninput={(e) => {
                stepForm.email = (e.target as HTMLInputElement).value;
              }}
              aria-invalid={!!stepErrors.email}
            />
            {#if stepErrors.email}<p class="text-sm text-destructive">{stepErrors.email}</p>{/if}
          </div>
          <Button type="button" onclick={nextStep}>Next</Button>
        </div>
      {:else if step === 2}
        <div class="max-w-sm space-y-3">
          <div class="space-y-2">
            <label for="pf-password" class="text-sm font-medium">Password</label>
            <Input
              id="pf-password"
              type="password"
              value={stepForm.password}
              oninput={(e) => {
                stepForm.password = (e.target as HTMLInputElement).value;
              }}
              aria-invalid={!!stepErrors.password}
            />
            {#if stepErrors.password}<p class="text-sm text-destructive">{stepErrors.password}</p>{/if}
          </div>
          <div class="flex gap-2">
            <Button type="button" onclick={prevStep}>Back</Button>
            <Button type="button" onclick={nextStep}>Next</Button>
          </div>
        </div>
      {:else}
        <div class="max-w-sm space-y-3">
          <div class="rounded border p-3 text-sm">
            <div>Email: {stepForm.email}</div>
            <div>Password: {'•'.repeat(Math.max(0, stepForm.password.length))}</div>
          </div>
          <div class="flex items-center gap-2">
            <Button type="button" onclick={prevStep} disabled={stepLoading}>Back</Button>
            <Button type="button" onclick={submitStep} disabled={stepLoading}>{stepLoading ? 'Submitting…' : 'Submit'}</Button>
            {#if stepMsg}<span class="text-sm text-emerald-600">{stepMsg}</span>{/if}
          </div>
        </div>
      {/if}
    </section>
  </div>

  <!-- 파일 업로드 -->
  <section class="space-y-3 mt-8">
    <h2 class="text-lg font-semibold">File Upload (Client validation)</h2>
    <div class="max-w-sm space-y-2">
      <label for="pf-file" class="text-sm font-medium">Avatar</label>
      <input id="pf-file" type="file" accept="image/png,image/jpeg" onchange={onFileChange} />
      {#if fileError}<p class="text-sm text-destructive">{fileError}</p>{/if}
      {#if file}
        <div class="text-sm">선택된 파일: {file.name} ({Math.round(file.size / 1024)} KB)</div>
      {/if}
    </div>
  </section>

  <!-- 동적 필드 -->
  <section class="space-y-3 mt-8">
    <h2 class="text-lg font-semibold">Dynamic Fields (Tags)</h2>
    <div class="max-w-sm space-y-3">
      {#each tags as t, i}
        <div class="space-y-2">
          <label for={`pf-tag-${i}`} class="text-sm font-medium">Tag {i + 1}</label>
          <div class="flex items-center gap-2">
            <Input
              id={`pf-tag-${i}`}
              type="text"
              value={t}
              oninput={(e) => {
                tags[i] = (e.target as HTMLInputElement).value;
                validateTags();
              }}
            />
            <Button type="button" onclick={() => removeTag(i)} disabled={tags.length <= 1}>Remove</Button>
          </div>
          {#if tagsErrors[i]}<p class="text-sm text-destructive">{tagsErrors[i]}</p>{/if}
        </div>
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

  <!-- 상태 관리 -->
  <section class="space-y-3 mt-8">
    <h2 class="text-lg font-semibold">Form State (Loading / Success / Error)</h2>
    <form class="space-y-3 max-w-sm" onsubmit={submitSave} novalidate>
      <div class="space-y-2">
        <label for="pf-title" class="text-sm font-medium">Title</label>
        <Input
          id="pf-title"
          type="text"
          value={saveForm.title}
          oninput={(e) => {
            saveForm.title = (e.target as HTMLInputElement).value;
          }}
          aria-invalid={!!saveError}
        />
        {#if saveError}<p class="text-sm text-destructive">{saveError}</p>{/if}
      </div>
      <div class="flex items-center gap-2">
        <Button type="submit" disabled={saveLoading}>{saveLoading ? 'Saving…' : 'Save'}</Button>
        {#if saveMsg}<span class="text-sm text-emerald-600">{saveMsg}</span>{/if}
      </div>
    </form>
    <div class="text-xs text-muted-foreground">※ 제목에 "fail"이 포함되면 실패 흐름을 시뮬레이션합니다.</div>
  </section>
</section>
