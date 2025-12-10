'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Type, CheckSquare, MousePointer } from 'lucide-react';

const formCategories = [
  {
    title: '입력 필드',
    description: '텍스트, 이메일, 비밀번호 등 기본적인 사용자 입력을 받는 컴포넌트들',
    href: '/design-system/components/forms/input',
    icon: Type,
    components: ['Input', 'Textarea', 'Label'],
    examples: '텍스트 입력, 비밀번호, 이메일, 전화번호',
  },
  {
    title: '선택 컴포넌트',
    description: '드롭다운, 라디오, 체크박스 등 선택을 위한 컴포넌트들',
    href: '/design-system/components/forms/select',
    icon: CheckSquare,
    components: ['Select', 'RadioGroup', 'Checkbox', 'Switch'],
    examples: '드롭다운 선택, 라디오 버튼, 체크박스, 토글',
  },
  {
    title: '통합 폼 예제',
    description: 'React Hook Form + Zod를 활용한 완전한 폼 검증 시스템',
    href: '/design-system/components/forms/complete',
    icon: MousePointer,
    components: ['Form', 'FormField', 'FormControl', 'FormMessage'],
    examples: '실시간 검증, 오류 처리, 폼 제출',
  },
];

const quickStartSteps = [
  {
    step: '1',
    title: '컴포넌트 import',
    description: 'shadcn/ui 폼 컴포넌트들을 import합니다.',
    code: `import { Input, Label, Button } from '@/components/ui/...'`,
  },
  {
    step: '2',
    title: 'React Hook Form 설정',
    description: 'useForm 훅과 Zod 스키마를 설정합니다.',
    code: `const form = useForm({ resolver: zodResolver(schema) })`,
  },
  {
    step: '3',
    title: '폼 구현',
    description: 'FormField와 FormControl을 사용해 폼을 구현합니다.',
    code: `<FormField control={form.control} name="email" ... />`,
  },
];

export default function FormsOverviewPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">폼 컴포넌트</h1>
        <p className="text-muted-foreground">
          사용자 입력을 받고 검증하기 위한 폼 컴포넌트들입니다. React Hook Form과 Zod를 활용한 타입 안전한 검증을 지원합니다.
        </p>
      </div>

      {/* 빠른 시작 */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 시작</CardTitle>
          <CardDescription>폼 컴포넌트를 사용하기 위한 기본 설정과 사용 방법입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {quickStartSteps.map((step) => (
              <div key={step.step} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                    {step.step}
                  </div>
                  <h3 className="font-medium text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-sm font-mono">{step.code}</code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 폼 컴포넌트 카테고리 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">컴포넌트 카테고리</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {formCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="group cursor-pointer hover:shadow-md transition-shadow">
                <Link href={category.href}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-lg p-2 bg-primary text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-3">{category.description}</CardDescription>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">포함 컴포넌트:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.components.map((component) => (
                            <Badge key={component} variant="secondary" className="text-xs">
                              {component}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">사용 예시:</p>
                        <p className="text-xs text-muted-foreground">{category.examples}</p>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 주요 특징 */}
      <Card>
        <CardHeader>
          <CardTitle>주요 특징</CardTitle>
          <CardDescription>복슬홈 폼 시스템의 핵심 기능들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-3">타입 안전성</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>TypeScript와 Zod 스키마로 완전한 타입 안전성 보장</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>컴파일 타임에 오류 검출 및 자동완성 지원</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>런타임 검증과 타입 추론의 완벽한 조화</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">사용자 경험</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>실시간 입력 검증과 즉각적인 피드백</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>명확하고 구체적인 오류 메시지</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>접근성과 키보드 네비게이션 완벽 지원</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">성능 최적화</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>불필요한 리렌더링 최소화</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>비제어 컴포넌트를 활용한 최적화된 성능</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>지연 검증과 디바운싱으로 효율적인 처리</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">개발자 경험</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>일관된 API와 직관적인 사용법</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>포괄적인 문서화와 코드 예시</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>모듈식 설계로 필요한 컴포넌트만 사용</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 기술 스택 */}
      <Card>
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
          <CardDescription>폼 시스템에서 사용되는 주요 라이브러리들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                RHF
              </div>
              <h4 className="font-medium text-foreground">React Hook Form</h4>
              <p className="text-xs text-muted-foreground">성능 최적화된 폼 라이브러리</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                Z
              </div>
              <h4 className="font-medium text-foreground">Zod</h4>
              <p className="text-xs text-muted-foreground">타입 안전한 스키마 검증</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-accent text-accent-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                UI
              </div>
              <h4 className="font-medium text-foreground">shadcn/ui</h4>
              <p className="text-xs text-muted-foreground">현대적인 UI 컴포넌트</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-muted text-muted-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                TS
              </div>
              <h4 className="font-medium text-foreground">TypeScript</h4>
              <p className="text-xs text-muted-foreground">정적 타입 시스템</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 시작하기 */}
      <Card>
        <CardHeader>
          <CardTitle>시작하기</CardTitle>
          <CardDescription>아래 링크를 통해 각 컴포넌트의 상세한 사용법을 확인하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/design-system/components/forms/input">
                <Type className="w-4 h-4 mr-2" />
                입력 필드 보기
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/design-system/components/forms/select">
                <CheckSquare className="w-4 h-4 mr-2" />
                선택 컴포넌트 보기
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/design-system/components/forms/complete">
                <MousePointer className="w-4 h-4 mr-2" />
                통합 예제 보기
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
