'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { loginSchema } from '@/lib/schemas/form-schemas';

const FormExample = ({ 
  title, 
  description, 
  children, 
  code 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  code: string; 
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
            className="shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 미리보기 */}
        <div className="p-4 border border-border rounded-lg bg-muted/30">
          {children}
        </div>
        
        {/* 코드 */}
        <div className="bg-muted p-3 rounded-lg">
          <pre className="text-sm font-mono overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FormsPage() {
  // React Hook Form 예시
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: unknown) => {
    console.log('폼 제출:', data);
    // 실제로는 API 호출 등을 수행
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">폼</h1>
        <p className="text-muted-foreground">
          사용자 입력을 받기 위한 폼 컴포넌트와 유효성 검사 시스템입니다.
        </p>
      </div>

      {/* 기본 입력 필드 */}
      <FormExample
        title="기본 입력 필드"
        description="라벨과 함께 사용되는 기본 입력 필드"
        code={`<div className="space-y-2">
  <Label htmlFor="email">이메일</Label>
  <Input 
    id="email"
    type="email" 
    placeholder="이메일을 입력하세요" 
  />
</div>
<div className="space-y-2">
  <Label htmlFor="password">비밀번호</Label>
  <Input 
    id="password"
    type="password" 
    placeholder="비밀번호를 입력하세요" 
  />
</div>`}
      >
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="이메일을 입력하세요" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input 
              id="password"
              type="password" 
              placeholder="비밀번호를 입력하세요" 
            />
          </div>
        </div>
      </FormExample>

      {/* 입력 필드 상태 */}
      <FormExample
        title="입력 필드 상태"
        description="다양한 상태의 입력 필드들"
        code={`<Input placeholder="기본 상태" />
<Input placeholder="비활성화" disabled />
<Input placeholder="오류 상태" className="border-destructive" />
<Input placeholder="성공 상태" className="border-green-500" />`}
      >
        <div className="space-y-3 max-w-sm">
          <Input placeholder="기본 상태" />
          <Input placeholder="비활성화" disabled />
          <Input placeholder="오류 상태" className="border-destructive" />
          <Input placeholder="성공 상태" className="border-green-500" />
        </div>
      </FormExample>

      {/* React Hook Form과 Zod */}
      <FormExample
        title="React Hook Form + Zod 검증"
        description="유효성 검사가 포함된 완전한 폼 예시"
        code={`const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', password: '', rememberMe: false },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <Input placeholder="이메일을 입력하세요" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">로그인</Button>
  </form>
</Form>`}
      >
        <div className="max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력하세요" {...field} />
                    </FormControl>
                    <FormDescription>
                      로그인에 사용할 이메일 주소를 입력하세요.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
              </Button>
            </form>
          </Form>
        </div>
      </FormExample>

      {/* 폼 컴포넌트 Props */}
      <Card>
        <CardHeader>
          <CardTitle>Input Props</CardTitle>
          <CardDescription>Input 컴포넌트에서 사용 가능한 주요 속성들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-medium">속성</th>
                  <th className="text-left p-2 font-medium">타입</th>
                  <th className="text-left p-2 font-medium">기본값</th>
                  <th className="text-left p-2 font-medium">설명</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-2 font-mono">type</td>
                  <td className="p-2">string</td>
                  <td className="p-2">&quot;text&quot;</td>
                  <td className="p-2">입력 필드 타입</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono">placeholder</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">플레이스홀더 텍스트</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono">disabled</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">입력 필드 비활성화</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono">value</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">입력값 (제어 컴포넌트)</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">onChange</td>
                  <td className="p-2">function</td>
                  <td className="p-2">-</td>
                  <td className="p-2">값 변경 핸들러</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 폼 패턴 */}
      <Card>
        <CardHeader>
          <CardTitle>폼 패턴</CardTitle>
          <CardDescription>일반적인 폼 사용 패턴과 모범 사례</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-3">유효성 검사</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">실시간</Badge>
                  <span className="text-sm text-muted-foreground">입력 중 즉시 검증</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">제출시</Badge>
                  <span className="text-sm text-muted-foreground">폼 제출 시점 검증</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">조건부</Badge>
                  <span className="text-sm text-muted-foreground">상황에 따른 검증</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">에러 처리</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">필드 오류</Badge>
                  <span className="text-sm text-muted-foreground">개별 필드 오류 메시지</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">폼 오류</Badge>
                  <span className="text-sm text-muted-foreground">전체 폼 오류 메시지</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">서버 오류</Badge>
                  <span className="text-sm text-muted-foreground">서버 응답 오류</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zod 스키마 예시 */}
      <Card>
        <CardHeader>
          <CardTitle>Zod 스키마 예시</CardTitle>
          <CardDescription>유효성 검사를 위한 스키마 정의 방법</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>{`import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* 접근성 */}
      <Card>
        <CardHeader>
          <CardTitle>접근성</CardTitle>
          <CardDescription>폼 접근성을 위한 고려사항</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• <strong>라벨 연결:</strong> 모든 입력 필드에 적절한 라벨 제공</li>
            <li>• <strong>오류 알림:</strong> 스크린 리더가 인식할 수 있는 오류 메시지</li>
            <li>• <strong>키보드 네비게이션:</strong> Tab 순서와 Enter/Space 키 지원</li>
            <li>• <strong>ARIA 속성:</strong> required, invalid, describedby 등 적절한 속성 사용</li>
            <li>• <strong>포커스 관리:</strong> 오류 발생 시 해당 필드로 포커스 이동</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}