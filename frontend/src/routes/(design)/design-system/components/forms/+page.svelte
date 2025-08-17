<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { z } from 'zod';

  // 인라인 Zod 스키마 (디자인 시스템 데모용)
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

  // 폼 데이터 상태 (간단한 로컬 상태)
  let login = $state({ email: '', password: '' });
  let loginErrors = $state<{ email?: string; password?: string }>({});
  let loginSubmitted = $state(false);

  let register = $state({ email: '', password: '', confirmPassword: '' });
  let registerErrors = $state<{ email?: string; password?: string; confirmPassword?: string }>({});
  let registerSubmitted = $state(false);

  function validateLogin() {
    const r = loginSchema.safeParse(login);
    loginErrors = {};
    if (!r.success) {
      for (const issue of r.error.issues) {
        const key = issue.path[0] as keyof typeof loginErrors;
        loginErrors[key] ||= issue.message;
      }
    }
    return r.success;
  }

  function validateRegister() {
    const r = registerSchema.safeParse(register);
    registerErrors = {};
    if (!r.success) {
      for (const issue of r.error.issues) {
        const key = issue.path[0] as keyof typeof registerErrors;
        registerErrors[key] ||= issue.message;
      }
    }
    return r.success;
  }

  function onSubmitLogin(e: SubmitEvent) {
    e.preventDefault();
    loginSubmitted = true;
    if (validateLogin()) {
      alert('로그인 폼 검증 통과');
    }
  }

  function onSubmitRegister(e: SubmitEvent) {
    e.preventDefault();
    registerSubmitted = true;
    if (validateRegister()) {
      alert('회원가입 폼 검증 통과');
    }
  }
</script>

<h1 class="text-2xl font-bold mb-6">Forms (CSR Validation)</h1>

<div class="grid gap-10 md:grid-cols-2">
  <!-- Login -->
  <section class="space-y-4">
    <h2 class="text-lg font-semibold">Login</h2>
    <form class="space-y-3" onsubmit={onSubmitLogin} novalidate>
      <div class="space-y-2">
        <Label for="login-email">Email</Label>
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
        {#if loginSubmitted && loginErrors.email}
          <p class="text-sm text-destructive">{loginErrors.email}</p>
        {/if}
      </div>
      <div class="space-y-2">
        <Label for="login-password">Password</Label>
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
        {#if loginSubmitted && loginErrors.password}
          <p class="text-sm text-destructive">{loginErrors.password}</p>
        {/if}
      </div>
      <Button type="submit" formnovalidate>Submit</Button>
    </form>
  </section>

  <!-- Register -->
  <section class="space-y-4">
    <h2 class="text-lg font-semibold">Register</h2>
    <form class="space-y-3" onsubmit={onSubmitRegister} novalidate>
      <div class="space-y-2">
        <Label for="reg-email">Email</Label>
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
        {#if registerSubmitted && registerErrors.email}
          <p class="text-sm text-destructive">{registerErrors.email}</p>
        {/if}
      </div>
      <div class="space-y-2">
        <Label for="reg-password">Password</Label>
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
        {#if registerSubmitted && registerErrors.password}
          <p class="text-sm text-destructive">{registerErrors.password}</p>
        {/if}
      </div>
      <div class="space-y-2">
        <Label for="reg-confirm">Confirm Password</Label>
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
        {#if registerSubmitted && registerErrors.confirmPassword}
          <p class="text-sm text-destructive">{registerErrors.confirmPassword}</p>
        {/if}
      </div>
      <Button type="submit" formnovalidate>Submit</Button>
    </form>
  </section>
</div>
