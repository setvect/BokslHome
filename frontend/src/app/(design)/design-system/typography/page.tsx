'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const headings = [
  {
    level: 'h1',
    className: 'text-4xl font-bold',
    text: '복슬홈 메인 헤딩 (H1)',
    description: '페이지의 주요 제목에 사용',
  },
  {
    level: 'h2',
    className: 'text-3xl font-bold',
    text: '섹션 헤딩 (H2)',
    description: '주요 섹션 제목에 사용',
  },
  {
    level: 'h3',
    className: 'text-2xl font-semibold',
    text: '서브 섹션 헤딩 (H3)',
    description: '하위 섹션 제목에 사용',
  },
  {
    level: 'h4',
    className: 'text-xl font-semibold',
    text: '컴포넌트 헤딩 (H4)',
    description: '카드 제목 등 컴포넌트 제목에 사용',
  },
];

const bodyTexts = [
  {
    name: 'Large',
    className: 'text-lg',
    text: '큰 본문 텍스트입니다. 중요한 설명이나 리드 문구에 사용합니다.',
    description: 'text-lg (18px)',
  },
  {
    name: 'Base',
    className: 'text-base',
    text: '기본 본문 텍스트입니다. 일반적인 내용 설명에 가장 많이 사용됩니다.',
    description: 'text-base (16px)',
  },
  {
    name: 'Small',
    className: 'text-sm',
    text: '작은 본문 텍스트입니다. 부가 설명이나 메타 정보에 사용합니다.',
    description: 'text-sm (14px)',
  },
  {
    name: 'Extra Small',
    className: 'text-xs',
    text: '매우 작은 텍스트입니다. 라벨이나 캡션에 사용합니다.',
    description: 'text-xs (12px)',
  },
];

const textVariants = [
  {
    name: 'Default',
    className: 'text-foreground',
    text: '기본 텍스트 색상입니다.',
  },
  {
    name: 'Muted',
    className: 'text-muted-foreground',
    text: '보조 텍스트 색상입니다.',
  },
  {
    name: 'Primary',
    className: 'text-primary',
    text: '주요 브랜드 색상 텍스트입니다.',
  },
  {
    name: 'Secondary',
    className: 'text-secondary-foreground',
    text: '보조 브랜드 색상 텍스트입니다.',
  },
  {
    name: 'Destructive',
    className: 'text-destructive',
    text: '경고 또는 오류 텍스트입니다.',
  },
];

const fontWeights = [
  {
    name: 'Normal',
    className: 'font-normal',
    weight: '400',
    text: '일반 굵기 텍스트입니다.',
  },
  {
    name: 'Medium',
    className: 'font-medium',
    weight: '500',
    text: '중간 굵기 텍스트입니다.',
  },
  {
    name: 'Semibold',
    className: 'font-semibold',
    weight: '600',
    text: '세미볼드 텍스트입니다.',
  },
  {
    name: 'Bold',
    className: 'font-bold',
    weight: '700',
    text: '볼드 텍스트입니다.',
  },
];

export default function TypographyPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">타이포그래피</h1>
        <p className="text-muted-foreground">일관된 텍스트 스타일과 계층 구조를 위한 타이포그래피 시스템입니다.</p>
      </div>

      {/* 헤딩 계층 */}
      <Card>
        <CardHeader>
          <CardTitle>헤딩 계층</CardTitle>
          <CardDescription>페이지와 섹션의 제목 스타일</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {headings.map((heading) => (
            <div key={heading.level} className="space-y-2">
              <div className={`${heading.className} text-foreground`}>{heading.text}</div>
              <div className="text-sm text-muted-foreground">
                {heading.description} • {heading.className}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 본문 텍스트 */}
      <Card>
        <CardHeader>
          <CardTitle>본문 텍스트</CardTitle>
          <CardDescription>내용 표시를 위한 다양한 크기의 본문 텍스트</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {bodyTexts.map((text) => (
            <div key={text.name} className="space-y-2">
              <div className={`${text.className} text-foreground leading-relaxed`}>{text.text}</div>
              <div className="text-sm text-muted-foreground">
                {text.name} • {text.description}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 텍스트 색상 */}
      <Card>
        <CardHeader>
          <CardTitle>텍스트 색상</CardTitle>
          <CardDescription>의미에 따른 텍스트 색상 변형</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {textVariants.map((variant) => (
            <div key={variant.name} className="flex items-center justify-between">
              <div className={`${variant.className} text-base`}>{variant.text}</div>
              <div className="text-sm text-muted-foreground font-mono">{variant.className}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 폰트 굵기 */}
      <Card>
        <CardHeader>
          <CardTitle>폰트 굵기</CardTitle>
          <CardDescription>강조와 계층을 위한 폰트 굵기 변형</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fontWeights.map((weight) => (
            <div key={weight.name} className="flex items-center justify-between">
              <div className={`${weight.className} text-foreground text-base`}>{weight.text}</div>
              <div className="text-sm text-muted-foreground">
                {weight.name} ({weight.weight}) • {weight.className}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 사용법 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용법 가이드</CardTitle>
          <CardDescription>타이포그래피 적용 방법과 모범 사례</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">기본 원칙</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 페이지당 H1은 하나만 사용</li>
              <li>• 헤딩 계층을 순서대로 사용 (H1 → H2 → H3 → H4)</li>
              <li>• 본문 텍스트는 주로 text-base 사용</li>
              <li>• 보조 정보는 text-muted-foreground 색상 사용</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">접근성 고려사항</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 충분한 색상 대비 유지 (최소 4.5:1)</li>
              <li>• 의미 전달을 색상에만 의존하지 않기</li>
              <li>• 읽기 쉬운 줄 간격 유지 (leading-relaxed 권장)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
