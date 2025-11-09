'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Download, Heart, Plus, Settings } from 'lucide-react';

const ButtonExample = ({
  title,
  description,
  children,
  code,
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
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="shrink-0">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 미리보기 */}
        <div className="flex flex-wrap gap-3 p-4 border border-border rounded-lg bg-muted/30">{children}</div>

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

export default function ButtonsPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">버튼</h1>
        <p className="text-muted-foreground">사용자 액션을 위한 다양한 스타일과 상태의 버튼 컴포넌트입니다.</p>
      </div>

      {/* 기본 변형 */}
      <ButtonExample
        title="기본 변형"
        description="주요 액션에 사용되는 기본 버튼 스타일들"
        code={`<Button variant="default">기본 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="outline">아웃라인 버튼</Button>
<Button variant="ghost">고스트 버튼</Button>
<Button variant="link">링크 버튼</Button>`}
      >
        <Button variant="default">기본 버튼</Button>
        <Button variant="secondary">보조 버튼</Button>
        <Button variant="outline">아웃라인 버튼</Button>
        <Button variant="ghost">고스트 버튼</Button>
        <Button variant="link">링크 버튼</Button>
      </ButtonExample>

      {/* 크기 */}
      <ButtonExample
        title="크기"
        description="다양한 상황에 맞는 버튼 크기"
        code={`<Button size="sm">작은 버튼</Button>
<Button size="default">기본 버튼</Button>
<Button size="lg">큰 버튼</Button>
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>`}
      >
        <Button size="sm">작은 버튼</Button>
        <Button size="default">기본 버튼</Button>
        <Button size="lg">큰 버튼</Button>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </ButtonExample>

      {/* 상태 */}
      <ButtonExample
        title="상태"
        description="버튼의 다양한 상태 표현"
        code={`<Button>기본 상태</Button>
<Button disabled>비활성화</Button>
<Button variant="destructive">위험 액션</Button>`}
      >
        <Button>기본 상태</Button>
        <Button disabled>비활성화</Button>
        <Button variant="destructive">위험 액션</Button>
      </ButtonExample>

      {/* 아이콘과 함께 */}
      <ButtonExample
        title="아이콘 버튼"
        description="아이콘이 포함된 버튼들"
        code={`<Button>
  <Download className="mr-2 h-4 w-4" />
  다운로드
</Button>
<Button variant="outline">
  <Heart className="mr-2 h-4 w-4" />
  좋아요
</Button>
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>`}
      >
        <Button>
          <Download className="mr-2 h-4 w-4" />
          다운로드
        </Button>
        <Button variant="outline">
          <Heart className="mr-2 h-4 w-4" />
          좋아요
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </ButtonExample>

      {/* 로딩 상태 */}
      <ButtonExample
        title="로딩 상태"
        description="비동기 작업 중 로딩 표시"
        code={`<Button disabled>
  로딩 중...
</Button>
<Button disabled>
  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  처리 중
</Button>`}
      >
        <Button disabled>로딩 중...</Button>
        <Button disabled>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          처리 중
        </Button>
      </ButtonExample>

      {/* Props 문서 */}
      <Card>
        <CardHeader>
          <CardTitle>Props</CardTitle>
          <CardDescription>Button 컴포넌트에서 사용 가능한 속성들</CardDescription>
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
                  <td className="p-2 font-mono">variant</td>
                  <td className="p-2">string</td>
                  <td className="p-2">&quot;default&quot;</td>
                  <td className="p-2">버튼 스타일 변형</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono">size</td>
                  <td className="p-2">string</td>
                  <td className="p-2">&quot;default&quot;</td>
                  <td className="p-2">버튼 크기</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono">disabled</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">버튼 비활성화</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono">children</td>
                  <td className="p-2">ReactNode</td>
                  <td className="p-2">-</td>
                  <td className="p-2">버튼 내용</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">className</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">추가 CSS 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 변형 옵션 */}
      <Card>
        <CardHeader>
          <CardTitle>변형 옵션</CardTitle>
          <CardDescription>사용 가능한 variant와 size 옵션들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-3">Variant</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">default</Badge>
                  <span className="text-sm text-muted-foreground">주요 액션용</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">secondary</Badge>
                  <span className="text-sm text-muted-foreground">보조 액션용</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">outline</Badge>
                  <span className="text-sm text-muted-foreground">테두리만 있는 스타일</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">ghost</Badge>
                  <span className="text-sm text-muted-foreground">배경 없는 스타일</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">link</Badge>
                  <span className="text-sm text-muted-foreground">링크 스타일</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">destructive</Badge>
                  <span className="text-sm text-muted-foreground">위험한 액션용</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Size</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">sm</Badge>
                  <span className="text-sm text-muted-foreground">작은 크기</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">default</Badge>
                  <span className="text-sm text-muted-foreground">기본 크기</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">lg</Badge>
                  <span className="text-sm text-muted-foreground">큰 크기</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">icon</Badge>
                  <span className="text-sm text-muted-foreground">아이콘 전용</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 접근성 */}
      <Card>
        <CardHeader>
          <CardTitle>접근성</CardTitle>
          <CardDescription>버튼 컴포넌트의 접근성 고려사항</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              • <strong>키보드 네비게이션:</strong> Tab, Enter, Space 키로 조작 가능
            </li>
            <li>
              • <strong>스크린 리더:</strong> 버튼 역할과 상태가 적절히 전달됨
            </li>
            <li>
              • <strong>포커스 표시:</strong> 키보드 포커스 시 명확한 아웃라인 표시
            </li>
            <li>
              • <strong>색상 대비:</strong> WCAG AA 기준 충족
            </li>
            <li>
              • <strong>터치 타겟:</strong> 최소 44px 크기 보장
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
