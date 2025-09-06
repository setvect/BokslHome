'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const colorTokens = [
  {
    category: 'Primary Colors',
    description: '주요 브랜드 색상과 액센트 컬러',
    colors: [
      { name: 'Primary', className: 'bg-primary text-primary-foreground', cssVar: '--primary' },
      { name: 'Primary Foreground', className: 'bg-primary-foreground text-primary', cssVar: '--primary-foreground' },
      { name: 'Secondary', className: 'bg-secondary text-secondary-foreground', cssVar: '--secondary' },
      { name: 'Secondary Foreground', className: 'bg-secondary-foreground text-secondary', cssVar: '--secondary-foreground' },
    ],
  },
  {
    category: 'Background Colors',
    description: '배경 색상 시스템',
    colors: [
      { name: 'Background', className: 'bg-background text-foreground border border-border', cssVar: '--background' },
      { name: 'Foreground', className: 'bg-foreground text-background', cssVar: '--foreground' },
      { name: 'Card', className: 'bg-card text-card-foreground border border-border', cssVar: '--card' },
      { name: 'Card Foreground', className: 'bg-card-foreground text-card', cssVar: '--card-foreground' },
    ],
  },
  {
    category: 'Interactive Colors',
    description: '인터랙션 상태를 나타내는 색상',
    colors: [
      { name: 'Muted', className: 'bg-muted text-muted-foreground', cssVar: '--muted' },
      { name: 'Muted Foreground', className: 'bg-muted-foreground text-background', cssVar: '--muted-foreground' },
      { name: 'Accent', className: 'bg-accent text-accent-foreground', cssVar: '--accent' },
      { name: 'Accent Foreground', className: 'bg-accent-foreground text-accent', cssVar: '--accent-foreground' },
    ],
  },
  {
    category: 'Semantic Colors',
    description: '의미를 전달하는 색상',
    colors: [
      { name: 'Destructive', className: 'bg-destructive text-destructive-foreground', cssVar: '--destructive' },
      { name: 'Destructive Foreground', className: 'bg-destructive-foreground text-destructive', cssVar: '--destructive-foreground' },
    ],
  },
  {
    category: 'Border & Input Colors',
    description: '테두리와 입력 필드 색상',
    colors: [
      { name: 'Border', className: 'bg-border text-foreground', cssVar: '--border' },
      { name: 'Input', className: 'bg-input text-foreground border border-border', cssVar: '--input' },
      { name: 'Ring', className: 'bg-ring text-background', cssVar: '--ring' },
    ],
  },
];

export default function ColorsPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">색상 시스템</h1>
        <p className="text-muted-foreground">
          디자인 시스템의 색상 토큰과 CSS 변수 기반 팔레트입니다. 라이트/다크 테마를 자동으로 지원합니다.
        </p>
      </div>

      {/* 색상 토큰 그룹 */}
      <div className="space-y-8">
        {colorTokens.map((group) => (
          <Card key={group.category}>
            <CardHeader>
              <CardTitle>{group.category}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {group.colors.map((color) => (
                  <div
                    key={color.name}
                    className="group cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(`hsl(var(${color.cssVar}))`)}
                  >
                    <div
                      className={`${color.className} h-20 w-full rounded-lg flex items-center justify-center text-sm font-medium transition-transform group-hover:scale-105`}
                    >
                      {color.name}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <div className="font-mono">{color.cssVar}</div>
                      <div className="text-xs opacity-70">클릭하여 복사</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 사용법 안내 */}
      <Card>
        <CardHeader>
          <CardTitle>색상 사용법</CardTitle>
          <CardDescription>CSS 변수 기반 색상 시스템 활용 가이드</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Tailwind CSS 클래스</h4>
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
              <div>bg-primary text-primary-foreground</div>
              <div>bg-secondary text-secondary-foreground</div>
              <div>text-muted-foreground</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">CSS 변수 직접 사용</h4>
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
              <div>background: hsl(var(--primary));</div>
              <div>color: hsl(var(--primary-foreground));</div>
              <div>border-color: hsl(var(--border));</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">테마 호환성</h4>
            <p className="text-sm text-muted-foreground">
              모든 색상은 CSS 변수로 정의되어 라이트/다크 테마 전환 시 자동으로 적절한 색상으로 변경됩니다. 
              하드코딩된 색상값 대신 반드시 정의된 색상 토큰을 사용해주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}