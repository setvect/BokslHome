'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const spacingScale = [
  { name: '0', value: '0px', className: 'p-0', tailwind: 'p-0, m-0' },
  { name: '1', value: '4px', className: 'p-1', tailwind: 'p-1, m-1' },
  { name: '2', value: '8px', className: 'p-2', tailwind: 'p-2, m-2' },
  { name: '3', value: '12px', className: 'p-3', tailwind: 'p-3, m-3' },
  { name: '4', value: '16px', className: 'p-4', tailwind: 'p-4, m-4' },
  { name: '5', value: '20px', className: 'p-5', tailwind: 'p-5, m-5' },
  { name: '6', value: '24px', className: 'p-6', tailwind: 'p-6, m-6' },
  { name: '8', value: '32px', className: 'p-8', tailwind: 'p-8, m-8' },
  { name: '10', value: '40px', className: 'p-10', tailwind: 'p-10, m-10' },
  { name: '12', value: '48px', className: 'p-12', tailwind: 'p-12, m-12' },
  { name: '16', value: '64px', className: 'p-16', tailwind: 'p-16, m-16' },
];

const componentSpacing = [
  {
    component: 'Card',
    spacing: [
      { area: 'Padding', value: 'p-6 (24px)', description: '카드 내부 여백' },
      { area: 'Gap', value: 'space-y-4 (16px)', description: '카드 간 간격' },
    ],
  },
  {
    component: 'Button',
    spacing: [
      { area: 'Padding X', value: 'px-4 (16px)', description: '버튼 좌우 여백' },
      { area: 'Padding Y', value: 'py-2 (8px)', description: '버튼 상하 여백' },
      { area: 'Gap', value: 'space-x-2 (8px)', description: '버튼 간 간격' },
    ],
  },
  {
    component: 'Form Field',
    spacing: [
      { area: 'Margin Bottom', value: 'mb-4 (16px)', description: '필드 간 간격' },
      { area: 'Label Margin', value: 'mb-2 (8px)', description: '라벨과 입력 사이' },
    ],
  },
  {
    component: 'Navigation',
    spacing: [
      { area: 'Item Padding', value: 'px-3 py-2', description: '메뉴 아이템 여백' },
      { area: 'Item Gap', value: 'space-y-1 (4px)', description: '메뉴 아이템 간격' },
    ],
  },
];

const layoutExamples = [
  {
    name: 'Container',
    description: '페이지 최대 너비와 중앙 정렬',
    className: 'container mx-auto',
    example: 'container mx-auto px-4',
  },
  {
    name: 'Section Spacing',
    description: '섹션 간 간격',
    className: 'space-y-6',
    example: 'space-y-6 (24px gaps)',
  },
  {
    name: 'Grid Gap',
    description: '그리드 아이템 간격',
    className: 'gap-4',
    example: 'grid gap-4 md:grid-cols-2',
  },
  {
    name: 'Stack Spacing',
    description: '수직 요소 간격',
    className: 'space-y-4',
    example: 'space-y-4 (16px gaps)',
  },
];

export default function SpacingPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">스페이싱</h1>
        <p className="text-muted-foreground">
          일관된 여백과 간격을 위한 스페이싱 시스템입니다. Tailwind CSS의 스페이싱 스케일을 기반으로 합니다.
        </p>
      </div>

      {/* 기본 스페이싱 스케일 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 스페이싱 스케일</CardTitle>
          <CardDescription>여백(padding)과 마진(margin)에 사용되는 기본 스케일</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spacingScale.map((spacing) => (
              <div key={spacing.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-mono text-muted-foreground">
                    {spacing.name}
                  </div>
                  <div className="w-20 text-sm text-muted-foreground">
                    {spacing.value}
                  </div>
                  <div className="flex items-center">
                    <div 
                      className="bg-primary h-4"
                      style={{ width: spacing.value === '0px' ? '1px' : spacing.value }}
                    />
                  </div>
                </div>
                <div className="text-sm font-mono text-muted-foreground">
                  {spacing.tailwind}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 컴포넌트별 스페이싱 */}
      <Card>
        <CardHeader>
          <CardTitle>컴포넌트별 스페이싱</CardTitle>
          <CardDescription>주요 컴포넌트에서 사용되는 표준 스페이싱</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {componentSpacing.map((comp) => (
              <div key={comp.component} className="space-y-3">
                <h4 className="font-medium text-foreground">{comp.component}</h4>
                <div className="space-y-2">
                  {comp.spacing.map((space, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-foreground">{space.area}</div>
                        <div className="text-xs text-muted-foreground">{space.description}</div>
                      </div>
                      <div className="text-sm font-mono text-muted-foreground">
                        {space.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 레이아웃 패턴 */}
      <Card>
        <CardHeader>
          <CardTitle>레이아웃 패턴</CardTitle>
          <CardDescription>일반적인 레이아웃에서 사용되는 스페이싱 패턴</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {layoutExamples.map((pattern) => (
              <div key={pattern.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{pattern.name}</h4>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground">
                    {pattern.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 스페이싱 시연 */}
      <Card>
        <CardHeader>
          <CardTitle>스페이싱 시연</CardTitle>
          <CardDescription>다양한 스페이싱 적용 예시</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 패딩 예시 */}
          <div>
            <h4 className="font-medium text-foreground mb-4">패딩 예시</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-muted p-2 rounded">
                <div className="bg-background p-2 rounded text-center text-sm">p-2</div>
              </div>
              <div className="bg-muted p-4 rounded">
                <div className="bg-background p-2 rounded text-center text-sm">p-4</div>
              </div>
              <div className="bg-muted p-6 rounded">
                <div className="bg-background p-2 rounded text-center text-sm">p-6</div>
              </div>
            </div>
          </div>

          {/* 간격 예시 */}
          <div>
            <h4 className="font-medium text-foreground mb-4">간격 예시 (space-y)</h4>
            <div className="bg-muted p-4 rounded">
              <div className="space-y-2">
                <div className="bg-background p-2 rounded text-center text-sm">Item 1</div>
                <div className="bg-background p-2 rounded text-center text-sm">Item 2</div>
                <div className="bg-background p-2 rounded text-center text-sm">Item 3</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">space-y-2 (8px)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용법 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용법 가이드</CardTitle>
          <CardDescription>스페이싱 시스템 활용 방법</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">기본 원칙</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 4의 배수 스케일 사용 (4px, 8px, 16px, 24px...)</li>
              <li>• 일관된 스페이싱으로 리듬감 있는 레이아웃 구성</li>
              <li>• 컴포넌트 내부보다는 외부 마진으로 간격 조절</li>
              <li>• space-y, space-x 유틸리티로 자동 간격 관리</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">반응형 스페이싱</h4>
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
              <div>p-4 md:p-6 lg:p-8</div>
              <div>space-y-4 md:space-y-6</div>
              <div>gap-4 md:gap-6 lg:gap-8</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}