'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointer, Type, Layout, Zap } from 'lucide-react';

const componentCategories = [
  {
    title: '기본 요소',
    description: '텍스트, 버튼 등 기본적인 UI 요소들',
    icon: Type,
    components: [
      {
        name: '버튼',
        href: '/design-system/components/buttons',
        description: '다양한 스타일과 상태의 버튼 컴포넌트',
        count: '8개 변형',
      },
      {
        name: '타이포그래피',
        href: '/design-system/typography',
        description: '헤딩, 본문, 라벨 등 텍스트 스타일',
        count: '12개 스타일',
      },
    ],
  },
  {
    title: '폼 요소',
    description: '입력, 선택, 검증을 위한 폼 컴포넌트들',
    icon: MousePointer,
    components: [
      {
        name: '폼',
        href: '/design-system/components/forms',
        description: '입력 필드, 체크박스, 라디오 등 폼 요소들',
        count: '10개 요소',
      },
    ],
  },
  {
    title: '레이아웃',
    description: '페이지와 섹션 구성을 위한 레이아웃 컴포넌트들',
    icon: Layout,
    components: [
      {
        name: '카드',
        href: '#',
        description: '콘텐츠 그룹화를 위한 카드 컴포넌트',
        count: '4개 변형',
      },
      {
        name: '컨테이너',
        href: '/design-system/spacing',
        description: '컨텐츠 정렬과 여백을 위한 레이아웃',
        count: '6개 패턴',
      },
    ],
  },
  {
    title: '상호작용',
    description: '사용자 인터랙션을 위한 동적 컴포넌트들',
    icon: Zap,
    components: [
      {
        name: '모달 & 다이얼로그',
        href: '#',
        description: '팝업과 오버레이 컴포넌트',
        count: '5개 패턴',
      },
      {
        name: '토스트',
        href: '#',
        description: '알림과 피드백 메시지',
        count: '4개 타입',
      },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">컴포넌트</h1>
        <p className="text-muted-foreground">
          복슬홈 디자인 시스템의 모든 UI 컴포넌트들을 탐색하고 사용법을 확인하세요.
        </p>
      </div>

      {/* 빠른 시작 */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 시작</CardTitle>
          <CardDescription>
            컴포넌트를 사용하기 전에 알아두면 좋은 기본 정보입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">설치</h4>
              <p className="text-sm text-muted-foreground">
                모든 컴포넌트는 이미 설치되어 있으며 바로 사용할 수 있습니다.
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                import &#123; Button &#125; from &apos;@/components/ui/button&apos;
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">테마 지원</h4>
              <p className="text-sm text-muted-foreground">
                모든 컴포넌트는 라이트/다크 테마를 자동으로 지원합니다.
              </p>
              <div className="flex space-x-2">
                <Button variant="default" size="sm">기본 버튼</Button>
                <Button variant="secondary" size="sm">보조 버튼</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 컴포넌트 카테고리 */}
      <div className="space-y-8">
        {componentCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg p-2 bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.components.map((component) => (
                  <Card key={component.name} className="group cursor-pointer hover:shadow-md transition-shadow">
                    <Link href={component.href}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{component.name}</CardTitle>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed mb-2">
                          {component.description}
                        </CardDescription>
                        <div className="text-xs text-muted-foreground">
                          {component.count}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 개발 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>개발 가이드</CardTitle>
          <CardDescription>컴포넌트 사용 시 참고할 수 있는 가이드라인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-2">접근성</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 키보드 네비게이션 지원</li>
                <li>• 스크린 리더 호환성</li>
                <li>• 적절한 색상 대비</li>
                <li>• ARIA 속성 지원</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">반응형 디자인</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 모바일 우선 설계</li>
                <li>• 터치 친화적 크기</li>
                <li>• 브레이크포인트 대응</li>
                <li>• 유연한 레이아웃</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}