'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Eye, EyeOff, Mail, User, Phone, MapPin, Calendar, Search, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const InputExample = ({
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
    toast.success('코드가 복사되었습니다!');
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
        <div className="p-4 border rounded-lg bg-background">{children}</div>
        <div className="bg-muted p-3 rounded-lg">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default function InputFieldsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">입력 필드</h1>
        <p className="text-muted-foreground">텍스트, 이메일, 비밀번호 등 사용자 입력을 받기 위한 기본적인 입력 필드 컴포넌트들입니다.</p>
      </div>

      {/* 기본 Input */}
      <InputExample
        title="기본 Input"
        description="가장 기본적인 텍스트 입력 필드입니다."
        code={`<div className="space-y-2">
  <Label htmlFor="basic">기본 입력</Label>
  <Input id="basic" placeholder="텍스트를 입력하세요" />
</div>`}
      >
        <div className="space-y-2">
          <Label htmlFor="basic">기본 입력</Label>
          <Input id="basic" placeholder="텍스트를 입력하세요" />
        </div>
      </InputExample>

      {/* 아이콘이 있는 Input */}
      <InputExample
        title="아이콘이 있는 Input"
        description="왼쪽에 아이콘을 추가하여 입력 필드의 목적을 명확히 나타냅니다."
        code={`<div className="space-y-4">
  {/* 사용자 이름 */}
  <div className="space-y-2">
    <Label htmlFor="username">사용자 이름</Label>
    <div className="relative">
      <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input id="username" placeholder="홍길동" className="pl-8" />
    </div>
  </div>

  {/* 이메일 */}
  <div className="space-y-2">
    <Label htmlFor="email">이메일</Label>
    <div className="relative">
      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input id="email" type="email" placeholder="user@example.com" className="pl-8" />
    </div>
  </div>

  {/* 전화번호 */}
  <div className="space-y-2">
    <Label htmlFor="phone">전화번호</Label>
    <div className="relative">
      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input id="phone" type="tel" placeholder="010-1234-5678" className="pl-8" />
    </div>
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 사용자 이름 */}
          <div className="space-y-2">
            <Label htmlFor="username">사용자 이름</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="username" placeholder="홍길동" className="pl-8" />
            </div>
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="user@example.com" className="pl-8" />
            </div>
          </div>

          {/* 전화번호 */}
          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <div className="relative">
              <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="phone" type="tel" placeholder="010-1234-5678" className="pl-8" />
            </div>
          </div>
        </div>
      </InputExample>

      {/* 비밀번호 Input */}
      <InputExample
        title="비밀번호 Input"
        description="비밀번호 표시/숨김 토글 기능이 있는 입력 필드입니다."
        code={`const [showPassword, setShowPassword] = useState(false);

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="password">비밀번호</Label>
    <div className="relative">
      <Input 
        id="password" 
        type={showPassword ? "text" : "password"} 
        placeholder="••••••••" 
        className="pr-10" 
      />
      <Button 
        type="button"
        variant="ghost" 
        size="sm"
        className="absolute right-0 top-0 h-full px-3"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="confirmPassword">비밀번호 확인</Label>
    <div className="relative">
      <Input 
        id="confirmPassword" 
        type={showConfirmPassword ? "text" : "password"} 
        placeholder="••••••••" 
        className="pr-10" 
      />
      <Button 
        type="button"
        variant="ghost" 
        size="sm"
        className="absolute right-0 top-0 h-full px-3"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      >
        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  </div>
</div>`}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pr-10" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <div className="relative">
              <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" className="pr-10" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </InputExample>

      {/* 다양한 입력 타입 */}
      <InputExample
        title="다양한 입력 타입"
        description="HTML5 입력 타입을 활용한 특수한 입력 필드들입니다."
        code={`<div className="space-y-4">
  {/* 검색 */}
  <div className="space-y-2">
    <Label htmlFor="search">검색</Label>
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input id="search" type="search" placeholder="검색어를 입력하세요" className="pl-8" />
    </div>
  </div>

  {/* 날짜 */}
  <div className="space-y-2">
    <Label htmlFor="date">날짜</Label>
    <div className="relative">
      <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input id="date" type="date" className="pl-8" />
    </div>
  </div>

  {/* 숫자 */}
  <div className="space-y-2">
    <Label htmlFor="number">가격</Label>
    <div className="relative">
      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input id="number" type="number" placeholder="0" className="pl-8" min="0" step="0.01" />
    </div>
  </div>

  {/* URL */}
  <div className="space-y-2">
    <Label htmlFor="url">웹사이트</Label>
    <Input id="url" type="url" placeholder="https://example.com" />
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 검색 */}
          <div className="space-y-2">
            <Label htmlFor="search">검색</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="search" type="search" placeholder="검색어를 입력하세요" className="pl-8" />
            </div>
          </div>

          {/* 날짜 */}
          <div className="space-y-2">
            <Label htmlFor="date">날짜</Label>
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="date" type="date" className="pl-8" />
            </div>
          </div>

          {/* 숫자 */}
          <div className="space-y-2">
            <Label htmlFor="number">가격</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="number" type="number" placeholder="0" className="pl-8" min="0" step="0.01" />
            </div>
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">웹사이트</Label>
            <Input id="url" type="url" placeholder="https://example.com" />
          </div>
        </div>
      </InputExample>

      {/* Input 상태 */}
      <InputExample
        title="Input 상태"
        description="비활성화, 읽기 전용, 오류 상태 등 다양한 상태의 입력 필드입니다."
        code={`<div className="space-y-4">
  {/* 기본 상태 */}
  <div className="space-y-2">
    <Label htmlFor="normal">기본 상태</Label>
    <Input id="normal" placeholder="일반적인 입력 필드" />
  </div>

  {/* 비활성화 */}
  <div className="space-y-2">
    <Label htmlFor="disabled">비활성화</Label>
    <Input id="disabled" placeholder="비활성화된 필드" disabled />
  </div>

  {/* 읽기 전용 */}
  <div className="space-y-2">
    <Label htmlFor="readonly">읽기 전용</Label>
    <Input id="readonly" value="읽기 전용 값" readOnly />
  </div>

  {/* 오류 상태 */}
  <div className="space-y-2">
    <Label htmlFor="error" className="text-destructive">오류 상태</Label>
    <Input 
      id="error" 
      value="잘못된 값" 
      className="border-destructive focus-visible:ring-destructive" 
    />
    <p className="text-sm text-destructive">올바른 형식이 아닙니다.</p>
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 기본 상태 */}
          <div className="space-y-2">
            <Label htmlFor="normal">기본 상태</Label>
            <Input id="normal" placeholder="일반적인 입력 필드" />
          </div>

          {/* 비활성화 */}
          <div className="space-y-2">
            <Label htmlFor="disabled">비활성화</Label>
            <Input id="disabled" placeholder="비활성화된 필드" disabled />
          </div>

          {/* 읽기 전용 */}
          <div className="space-y-2">
            <Label htmlFor="readonly">읽기 전용</Label>
            <Input id="readonly" value="읽기 전용 값" readOnly />
          </div>

          {/* 오류 상태 */}
          <div className="space-y-2">
            <Label htmlFor="error" className="text-destructive">
              오류 상태
            </Label>
            <Input id="error" defaultValue="잘못된 값" className="border-destructive focus-visible:ring-destructive" />
            <p className="text-sm text-destructive">올바른 형식이 아닙니다.</p>
          </div>
        </div>
      </InputExample>

      {/* Textarea */}
      <InputExample
        title="Textarea"
        description="긴 텍스트 입력을 위한 텍스트 영역 컴포넌트입니다."
        code={`<div className="space-y-4">
  {/* 기본 Textarea */}
  <div className="space-y-2">
    <Label htmlFor="basic-textarea">자기소개</Label>
    <Textarea 
      id="basic-textarea" 
      placeholder="자신을 간단히 소개해주세요..." 
      className="min-h-[100px]"
    />
    <p className="text-sm text-muted-foreground">500자 이내로 작성해주세요.</p>
  </div>

  {/* 크기 조절 불가 */}
  <div className="space-y-2">
    <Label htmlFor="fixed-textarea">메모</Label>
    <Textarea 
      id="fixed-textarea" 
      placeholder="간단한 메모를 작성하세요..." 
      className="min-h-[80px] resize-none"
    />
  </div>

  {/* 큰 텍스트 영역 */}
  <div className="space-y-2">
    <Label htmlFor="large-textarea">상세 설명</Label>
    <Textarea 
      id="large-textarea" 
      placeholder="상세한 내용을 작성해주세요..." 
      className="min-h-[150px]"
    />
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 기본 Textarea */}
          <div className="space-y-2">
            <Label htmlFor="basic-textarea">자기소개</Label>
            <Textarea id="basic-textarea" placeholder="자신을 간단히 소개해주세요..." className="min-h-[100px]" />
            <p className="text-sm text-muted-foreground">500자 이내로 작성해주세요.</p>
          </div>

          {/* 크기 조절 불가 */}
          <div className="space-y-2">
            <Label htmlFor="fixed-textarea">메모</Label>
            <Textarea id="fixed-textarea" placeholder="간단한 메모를 작성하세요..." className="min-h-[80px] resize-none" />
          </div>

          {/* 큰 텍스트 영역 */}
          <div className="space-y-2">
            <Label htmlFor="large-textarea">상세 설명</Label>
            <Textarea id="large-textarea" placeholder="상세한 내용을 작성해주세요..." className="min-h-[150px]" />
          </div>
        </div>
      </InputExample>

      {/* Input 크기 */}
      <InputExample
        title="Input 크기"
        description="다양한 크기의 입력 필드입니다."
        code={`<div className="space-y-4">
  {/* 작은 크기 */}
  <div className="space-y-2">
    <Label htmlFor="small">Small</Label>
    <Input id="small" placeholder="작은 크기" className="h-8 text-sm" />
  </div>

  {/* 기본 크기 */}
  <div className="space-y-2">
    <Label htmlFor="default">Default</Label>
    <Input id="default" placeholder="기본 크기" />
  </div>

  {/* 큰 크기 */}
  <div className="space-y-2">
    <Label htmlFor="large">Large</Label>
    <Input id="large" placeholder="큰 크기" className="h-12 text-lg" />
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 작은 크기 */}
          <div className="space-y-2">
            <Label htmlFor="small">Small</Label>
            <Input id="small" placeholder="작은 크기" className="h-8 text-sm" />
          </div>

          {/* 기본 크기 */}
          <div className="space-y-2">
            <Label htmlFor="default">Default</Label>
            <Input id="default" placeholder="기본 크기" />
          </div>

          {/* 큰 크기 */}
          <div className="space-y-2">
            <Label htmlFor="large">Large</Label>
            <Input id="large" placeholder="큰 크기" className="h-12 text-lg" />
          </div>
        </div>
      </InputExample>

      {/* API 참조 */}
      <Card>
        <CardHeader>
          <CardTitle>컴포넌트 API</CardTitle>
          <CardDescription>Input과 Textarea 컴포넌트의 주요 속성들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Input Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Input Props</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-foreground">속성</th>
                      <th className="text-left py-2 text-foreground">타입</th>
                      <th className="text-left py-2 text-foreground">설명</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 font-mono">type</td>
                      <td className="py-2">string</td>
                      <td className="py-2">입력 타입 (text, email, password, number 등)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">placeholder</td>
                      <td className="py-2">string</td>
                      <td className="py-2">플레이스홀더 텍스트</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">disabled</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">입력 필드 비활성화</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">readOnly</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">읽기 전용 모드</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">className</td>
                      <td className="py-2">string</td>
                      <td className="py-2">추가 CSS 클래스</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Textarea Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Textarea Props</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-foreground">속성</th>
                      <th className="text-left py-2 text-foreground">타입</th>
                      <th className="text-left py-2 text-foreground">설명</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 font-mono">rows</td>
                      <td className="py-2">number</td>
                      <td className="py-2">텍스트 영역의 행 수</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">placeholder</td>
                      <td className="py-2">string</td>
                      <td className="py-2">플레이스홀더 텍스트</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">disabled</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">텍스트 영역 비활성화</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">className</td>
                      <td className="py-2">string</td>
                      <td className="py-2">추가 CSS 클래스 (resize-none 등)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 가이드</CardTitle>
          <CardDescription>입력 필드 사용 시 고려할 사항들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">접근성</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 모든 입력 필드에 적절한 Label 연결</li>
              <li>• placeholder는 부가 정보로만 사용</li>
              <li>• 오류 메시지는 aria-describedby로 연결</li>
              <li>• required 속성과 시각적 표시 일치</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">사용성</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 명확하고 간결한 라벨 사용</li>
              <li>• 적절한 입력 타입 선택 (type 속성)</li>
              <li>• 비밀번호 토글 기능 제공</li>
              <li>• 입력 검증과 즉각적인 피드백</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">모바일 고려사항</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 충분한 터치 타겟 크기 (44px 이상)</li>
              <li>• 적절한 키보드 타입 자동 표시</li>
              <li>• 확대 방지를 위한 16px 이상 폰트 크기</li>
              <li>• 자동완성 및 자동 대문자화 설정</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
