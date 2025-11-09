'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const SelectExample = ({
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

export default function SelectComponentsPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setInterests((prev) => [...prev, interest]);
    } else {
      setInterests((prev) => prev.filter((item) => item !== interest));
    }
  };

  const handleNotificationChange = (type: keyof typeof notifications, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: checked }));
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">선택 컴포넌트</h1>
        <p className="text-muted-foreground">드롭다운, 라디오 버튼, 체크박스, 스위치 등 사용자가 선택할 수 있는 컴포넌트들입니다.</p>
      </div>

      {/* Select Dropdown */}
      <SelectExample
        title="Select (드롭다운)"
        description="옵션 목록에서 하나를 선택하는 드롭다운 메뉴입니다."
        code={`<div className="space-y-4">
  {/* 기본 선택 */}
  <div className="space-y-2">
    <Label>국가</Label>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="국가를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kr">🇰🇷 대한민국</SelectItem>
        <SelectItem value="us">🇺🇸 미국</SelectItem>
        <SelectItem value="jp">🇯🇵 일본</SelectItem>
        <SelectItem value="cn">🇨🇳 중국</SelectItem>
        <SelectItem value="uk">🇬🇧 영국</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* 그룹화된 선택 */}
  <div className="space-y-2">
    <Label>직업</Label>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="직업을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="frontend">프론트엔드 개발자</SelectItem>
        <SelectItem value="backend">백엔드 개발자</SelectItem>
        <SelectItem value="fullstack">풀스택 개발자</SelectItem>
        <SelectItem value="designer">UI/UX 디자이너</SelectItem>
        <SelectItem value="pm">프로덕트 매니저</SelectItem>
        <SelectItem value="data">데이터 사이언티스트</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 기본 선택 */}
          <div className="space-y-2">
            <Label>국가</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="국가를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kr">🇰🇷 대한민국</SelectItem>
                <SelectItem value="us">🇺🇸 미국</SelectItem>
                <SelectItem value="jp">🇯🇵 일본</SelectItem>
                <SelectItem value="cn">🇨🇳 중국</SelectItem>
                <SelectItem value="uk">🇬🇧 영국</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 그룹화된 선택 */}
          <div className="space-y-2">
            <Label>직업</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="직업을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">프론트엔드 개발자</SelectItem>
                <SelectItem value="backend">백엔드 개발자</SelectItem>
                <SelectItem value="fullstack">풀스택 개발자</SelectItem>
                <SelectItem value="designer">UI/UX 디자이너</SelectItem>
                <SelectItem value="pm">프로덕트 매니저</SelectItem>
                <SelectItem value="data">데이터 사이언티스트</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SelectExample>

      {/* Radio Group */}
      <SelectExample
        title="Radio Group (라디오 버튼)"
        description="여러 옵션 중 하나만 선택할 수 있는 라디오 버튼입니다."
        code={`<div className="space-y-4">
  {/* 기본 라디오 그룹 */}
  <div className="space-y-3">
    <Label>성별</Label>
    <RadioGroup defaultValue="male">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="male" id="male" />
        <Label htmlFor="male">남성</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="female" id="female" />
        <Label htmlFor="female">여성</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="other" id="other" />
        <Label htmlFor="other">기타</Label>
      </div>
    </RadioGroup>
  </div>

  {/* 수평 라디오 그룹 */}
  <div className="space-y-3">
    <Label>결제 방법</Label>
    <RadioGroup defaultValue="card" className="flex space-x-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card">신용카드</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="bank" id="bank" />
        <Label htmlFor="bank">계좌이체</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="mobile" id="mobile" />
        <Label htmlFor="mobile">모바일페이</Label>
      </div>
    </RadioGroup>
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 기본 라디오 그룹 */}
          <div className="space-y-3">
            <Label>성별</Label>
            <RadioGroup defaultValue="male">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">남성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">여성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">기타</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 수평 라디오 그룹 */}
          <div className="space-y-3">
            <Label>결제 방법</Label>
            <RadioGroup defaultValue="card" className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">신용카드</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank">계좌이체</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile">모바일페이</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SelectExample>

      {/* Checkbox */}
      <SelectExample
        title="Checkbox (체크박스)"
        description="여러 항목을 동시에 선택할 수 있는 체크박스입니다."
        code={`const [interests, setInterests] = useState<string[]>([]);

const handleInterestChange = (interest: string, checked: boolean) => {
  if (checked) {
    setInterests(prev => [...prev, interest]);
  } else {
    setInterests(prev => prev.filter(item => item !== interest));
  }
};

<div className="space-y-4">
  <div className="space-y-3">
    <Label>관심 분야</Label>
    <div className="grid grid-cols-2 gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="frontend" 
          checked={interests.includes('frontend')}
          onCheckedChange={(checked) => handleInterestChange('frontend', !!checked)}
        />
        <Label htmlFor="frontend">프론트엔드</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="backend" 
          checked={interests.includes('backend')}
          onCheckedChange={(checked) => handleInterestChange('backend', !!checked)}
        />
        <Label htmlFor="backend">백엔드</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="mobile" 
          checked={interests.includes('mobile')}
          onCheckedChange={(checked) => handleInterestChange('mobile', !!checked)}
        />
        <Label htmlFor="mobile">모바일</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="design" 
          checked={interests.includes('design')}
          onCheckedChange={(checked) => handleInterestChange('design', !!checked)}
        />
        <Label htmlFor="design">디자인</Label>
      </div>
    </div>
  </div>
  
  {interests.length > 0 && (
    <div className="space-y-2">
      <Label>선택된 관심사</Label>
      <div className="flex flex-wrap gap-1">
        {interests.map(interest => (
          <Badge key={interest} variant="secondary">{interest}</Badge>
        ))}
      </div>
    </div>
  )}
</div>`}
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>관심 분야</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="frontend"
                  checked={interests.includes('frontend')}
                  onCheckedChange={(checked) => handleInterestChange('frontend', !!checked)}
                />
                <Label htmlFor="frontend">프론트엔드</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="backend"
                  checked={interests.includes('backend')}
                  onCheckedChange={(checked) => handleInterestChange('backend', !!checked)}
                />
                <Label htmlFor="backend">백엔드</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mobile"
                  checked={interests.includes('mobile')}
                  onCheckedChange={(checked) => handleInterestChange('mobile', !!checked)}
                />
                <Label htmlFor="mobile">모바일</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="design"
                  checked={interests.includes('design')}
                  onCheckedChange={(checked) => handleInterestChange('design', !!checked)}
                />
                <Label htmlFor="design">디자인</Label>
              </div>
            </div>
          </div>

          {interests.length > 0 && (
            <div className="space-y-2">
              <Label>선택된 관심사</Label>
              <div className="flex flex-wrap gap-1">
                {interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </SelectExample>

      {/* Switch */}
      <SelectExample
        title="Switch (스위치)"
        description="ON/OFF 상태를 토글하는 스위치 컴포넌트입니다."
        code={`const [notifications, setNotifications] = useState({
  email: true,
  push: false,
  sms: false,
});

const handleNotificationChange = (type: string, checked: boolean) => {
  setNotifications(prev => ({ ...prev, [type]: checked }));
};

<div className="space-y-4">
  <div className="space-y-4">
    <Label>알림 설정</Label>
    
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="space-y-0.5">
        <Label className="text-base">이메일 알림</Label>
        <p className="text-sm text-muted-foreground">
          중요한 업데이트와 소식을 이메일로 받아보세요.
        </p>
      </div>
      <Switch
        checked={notifications.email}
        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
      />
    </div>

    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="space-y-0.5">
        <Label className="text-base">푸시 알림</Label>
        <p className="text-sm text-muted-foreground">
          실시간 알림을 브라우저에서 받아보세요.
        </p>
      </div>
      <Switch
        checked={notifications.push}
        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
      />
    </div>

    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="space-y-0.5">
        <Label className="text-base">SMS 알림</Label>
        <p className="text-sm text-muted-foreground">
          긴급한 알림을 문자로 받아보세요.
        </p>
      </div>
      <Switch
        checked={notifications.sms}
        onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
      />
    </div>
  </div>
</div>`}
      >
        <div className="space-y-4">
          <div className="space-y-4">
            <Label>알림 설정</Label>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label className="text-base">이메일 알림</Label>
                <p className="text-sm text-muted-foreground">중요한 업데이트와 소식을 이메일로 받아보세요.</p>
              </div>
              <Switch checked={notifications.email} onCheckedChange={(checked) => handleNotificationChange('email', checked)} />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label className="text-base">푸시 알림</Label>
                <p className="text-sm text-muted-foreground">실시간 알림을 브라우저에서 받아보세요.</p>
              </div>
              <Switch checked={notifications.push} onCheckedChange={(checked) => handleNotificationChange('push', checked)} />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label className="text-base">SMS 알림</Label>
                <p className="text-sm text-muted-foreground">긴급한 알림을 문자로 받아보세요.</p>
              </div>
              <Switch checked={notifications.sms} onCheckedChange={(checked) => handleNotificationChange('sms', checked)} />
            </div>
          </div>
        </div>
      </SelectExample>

      {/* 체크박스 상태 */}
      <SelectExample
        title="Checkbox 상태"
        description="다양한 상태의 체크박스를 보여줍니다."
        code={`<div className="space-y-4">
  {/* 기본 상태들 */}
  <div className="space-y-3">
    <Label>체크박스 상태</Label>
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">선택되지 않음</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" defaultChecked />
        <Label htmlFor="checked">선택됨</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="text-muted-foreground">비활성화</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="text-muted-foreground">비활성화 (선택됨)</Label>
      </div>
    </div>
  </div>
</div>`}
      >
        <div className="space-y-4">
          {/* 기본 상태들 */}
          <div className="space-y-3">
            <Label>체크박스 상태</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="unchecked" />
                <Label htmlFor="unchecked">선택되지 않음</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checked" defaultChecked />
                <Label htmlFor="checked">선택됨</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled" className="text-muted-foreground">
                  비활성화
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-checked" disabled defaultChecked />
                <Label htmlFor="disabled-checked" className="text-muted-foreground">
                  비활성화 (선택됨)
                </Label>
              </div>
            </div>
          </div>
        </div>
      </SelectExample>

      {/* API 참조 */}
      <Card>
        <CardHeader>
          <CardTitle>컴포넌트 API</CardTitle>
          <CardDescription>선택 컴포넌트들의 주요 속성들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Select Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Select Props</h4>
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
                      <td className="py-2 font-mono">value</td>
                      <td className="py-2">string</td>
                      <td className="py-2">선택된 값</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">defaultValue</td>
                      <td className="py-2">string</td>
                      <td className="py-2">기본 선택값</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">onValueChange</td>
                      <td className="py-2">(value: string) =&gt; void</td>
                      <td className="py-2">값 변경 핸들러</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">disabled</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">비활성화 상태</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RadioGroup Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">RadioGroup Props</h4>
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
                      <td className="py-2 font-mono">value</td>
                      <td className="py-2">string</td>
                      <td className="py-2">선택된 값</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">defaultValue</td>
                      <td className="py-2">string</td>
                      <td className="py-2">기본 선택값</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">onValueChange</td>
                      <td className="py-2">(value: string) =&gt; void</td>
                      <td className="py-2">값 변경 핸들러</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">className</td>
                      <td className="py-2">string</td>
                      <td className="py-2">레이아웃 스타일 (flex 등)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Checkbox Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Checkbox Props</h4>
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
                      <td className="py-2 font-mono">checked</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">체크 상태</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">defaultChecked</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">기본 체크 상태</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">onCheckedChange</td>
                      <td className="py-2">(checked: boolean) =&gt; void</td>
                      <td className="py-2">체크 변경 핸들러</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">disabled</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">비활성화 상태</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Switch Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Switch Props</h4>
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
                      <td className="py-2 font-mono">checked</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">스위치 상태</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">defaultChecked</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">기본 스위치 상태</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">onCheckedChange</td>
                      <td className="py-2">(checked: boolean) =&gt; void</td>
                      <td className="py-2">상태 변경 핸들러</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">disabled</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">비활성화 상태</td>
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
          <CardDescription>선택 컴포넌트 사용 시 고려할 사항들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">언제 어떤 컴포넌트를 사용할까요?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                • <strong>Select</strong>: 5개 이상의 옵션 중 하나를 선택할 때
              </li>
              <li>
                • <strong>RadioGroup</strong>: 2-4개의 옵션 중 하나를 선택할 때
              </li>
              <li>
                • <strong>Checkbox</strong>: 여러 항목을 동시에 선택할 때
              </li>
              <li>
                • <strong>Switch</strong>: ON/OFF 설정이나 기능 활성화/비활성화
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">접근성</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 모든 선택 요소에 적절한 Label 연결</li>
              <li>• 키보드로 모든 기능 접근 가능</li>
              <li>• 스크린 리더 호환성 확보</li>
              <li>• 충분한 터치 타겟 크기 (44px 이상)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">사용성</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 선택지가 많을 때는 그룹핑이나 검색 기능 제공</li>
              <li>• 기본값 설정으로 사용자 편의성 향상</li>
              <li>• 일관된 선택 패턴과 레이아웃 유지</li>
              <li>• 선택 결과를 시각적으로 명확히 표시</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
