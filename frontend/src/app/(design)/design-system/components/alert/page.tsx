'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Check, AlertCircle, CheckCircle, Info, AlertTriangle, Bell, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const AlertExample = () => {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('코드가 복사되었습니다!');
    setTimeout(() => setCopied(''), 2000);
  };

  const showToastExamples = () => {
    toast.success('성공 메시지입니다!');
    setTimeout(() => {
      toast.error('오류가 발생했습니다!');
    }, 500);
    setTimeout(() => {
      toast.warning('주의가 필요합니다!');
    }, 1000);
    setTimeout(() => {
      toast.info('정보를 확인해주세요!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Alert &amp; Toast</h1>
        <p className="text-muted-foreground">사용자에게 중요한 정보를 전달하고 피드백을 제공하는 알림 컴포넌트들입니다.</p>
      </div>

      {/* Alert 컴포넌트 */}
      <Card>
        <CardHeader>
          <CardTitle>Alert 컴포넌트</CardTitle>
          <CardDescription>중요한 정보나 상태를 사용자에게 지속적으로 표시하는 정적 알림입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 기본 Alert */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 Alert</h4>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>안내</AlertTitle>
              <AlertDescription>이것은 기본 알림 메시지입니다. 사용자에게 일반적인 정보를 전달할 때 사용합니다.</AlertDescription>
            </Alert>
          </div>

          {/* Success Alert */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">성공 Alert</h4>
            <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-200">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-200">성공!</AlertTitle>
              <AlertDescription>작업이 성공적으로 완료되었습니다. 데이터가 안전하게 저장되었습니다.</AlertDescription>
            </Alert>
          </div>

          {/* Warning Alert */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">경고 Alert</h4>
            <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertTitle className="text-yellow-800 dark:text-yellow-200">주의 필요</AlertTitle>
              <AlertDescription>이 작업을 계속하면 기존 데이터가 변경될 수 있습니다. 신중하게 진행해주세요.</AlertDescription>
            </Alert>
          </div>

          {/* Error Alert */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">오류 Alert</h4>
            <Alert className="border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-200">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-red-800 dark:text-red-200">오류 발생</AlertTitle>
              <AlertDescription>네트워크 연결에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.</AlertDescription>
            </Alert>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `// 기본 Alert
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>안내</AlertTitle>
  <AlertDescription>
    이것은 기본 알림 메시지입니다.
  </AlertDescription>
</Alert>

// 성공 Alert
<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-200">
  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
  <AlertTitle className="text-green-800 dark:text-green-200">성공!</AlertTitle>
  <AlertDescription>
    작업이 성공적으로 완료되었습니다.
  </AlertDescription>
</Alert>`,
                    'alert-examples'
                  )
                }
              >
                {copied === 'alert-examples' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`// 기본 Alert
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>안내</AlertTitle>
  <AlertDescription>
    이것은 기본 알림 메시지입니다.
  </AlertDescription>
</Alert>

// 성공 Alert
<Alert className="border-green-200 bg-green-50 text-green-800">
  <CheckCircle className="h-4 w-4 text-green-600" />
  <AlertTitle className="text-green-800">성공!</AlertTitle>
  <AlertDescription>
    작업이 성공적으로 완료되었습니다.
  </AlertDescription>
</Alert>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Toast 컴포넌트 */}
      <Card>
        <CardHeader>
          <CardTitle>Toast 알림</CardTitle>
          <CardDescription>임시적으로 나타나는 동적 알림입니다. 사용자 액션에 대한 즉각적인 피드백을 제공합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Toast 예시</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => toast.success('성공!')} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                성공
              </Button>
              <Button onClick={() => toast.error('오류 발생!')} variant="destructive">
                <AlertCircle className="w-4 h-4 mr-2" />
                오류
              </Button>
              <Button onClick={() => toast.warning('주의 필요!')} className="bg-yellow-600 hover:bg-yellow-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                경고
              </Button>
              <Button onClick={() => toast.info('정보 확인!')} variant="outline">
                <Info className="w-4 h-4 mr-2" />
                정보
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={showToastExamples} variant="outline" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                모든 Toast 보기
              </Button>
              <Button
                onClick={() =>
                  toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
                    loading: '처리 중...',
                    success: '완료되었습니다!',
                    error: '오류가 발생했습니다.',
                  })
                }
                variant="outline"
                className="w-full"
              >
                <Bell className="w-4 h-4 mr-2" />
                Promise Toast
              </Button>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">Toast 코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `import { toast } from 'sonner';

// 기본 Toast 사용법
toast.success('성공 메시지');
toast.error('오류 메시지');
toast.warning('경고 메시지');
toast.info('정보 메시지');

// Promise Toast
toast.promise(
  fetch('/api/data'),
  {
    loading: '데이터를 불러오는 중...',
    success: '데이터를 성공적으로 불러왔습니다!',
    error: '데이터를 불러오는데 실패했습니다.',
  }
);

// 커스텀 Toast
toast.custom((t) => (
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h3>커스텀 알림</h3>
    <p>원하는 스타일로 커스터마이징할 수 있습니다.</p>
    <button onClick={() => toast.dismiss(t)}>닫기</button>
  </div>
));`,
                    'toast-examples'
                  )
                }
              >
                {copied === 'toast-examples' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`import { toast } from 'sonner';

// 기본 Toast 사용법
toast.success('성공 메시지');
toast.error('오류 메시지');
toast.warning('경고 메시지');
toast.info('정보 메시지');

// Promise Toast
toast.promise(
  fetch('/api/data'),
  {
    loading: '데이터를 불러오는 중...',
    success: '데이터를 성공적으로 불러왔습니다!',
    error: '데이터를 불러오는데 실패했습니다.',
  }
);`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Alert vs Toast 비교 */}
      <Card>
        <CardHeader>
          <CardTitle>Alert vs Toast</CardTitle>
          <CardDescription>두 컴포넌트의 차이점과 사용 시나리오</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-foreground">구분</th>
                  <th className="text-left py-3 text-foreground">Alert</th>
                  <th className="text-left py-3 text-foreground">Toast</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 font-medium">표시 방식</td>
                  <td className="py-3">페이지 내 정적 표시</td>
                  <td className="py-3">화면 위에 임시 표시</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">지속 시간</td>
                  <td className="py-3">수동으로 제거할 때까지</td>
                  <td className="py-3">자동으로 사라짐 (보통 3-5초)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">사용 시나리오</td>
                  <td className="py-3">중요한 정보, 폼 검증 오류</td>
                  <td className="py-3">액션 결과, 상태 변경 알림</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">사용자 주의</td>
                  <td className="py-3">높음 (시선을 끔)</td>
                  <td className="py-3">중간 (방해하지 않음)</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">레이아웃 영향</td>
                  <td className="py-3">페이지 레이아웃에 영향</td>
                  <td className="py-3">레이아웃에 영향 없음</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 컴포넌트 API */}
      <Card>
        <CardHeader>
          <CardTitle>컴포넌트 API</CardTitle>
          <CardDescription>Alert 컴포넌트의 구조와 Toast 함수들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alert API */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Alert 컴포넌트</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-foreground">컴포넌트</th>
                    <th className="text-left py-2 text-foreground">설명</th>
                    <th className="text-left py-2 text-foreground">필수</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 font-mono">Alert</td>
                    <td className="py-2">루트 알림 컨테이너</td>
                    <td className="py-2">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono">AlertTitle</td>
                    <td className="py-2">알림 제목</td>
                    <td className="py-2">-</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">AlertDescription</td>
                    <td className="py-2">알림 내용 설명</td>
                    <td className="py-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Toast API */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Toast 함수들</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-foreground">함수</th>
                    <th className="text-left py-2 text-foreground">설명</th>
                    <th className="text-left py-2 text-foreground">예시</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 font-mono">toast.success()</td>
                    <td className="py-2">성공 메시지</td>
                    <td className="py-2 font-mono text-xs">toast.success(&quot;저장됨!&quot;)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono">toast.error()</td>
                    <td className="py-2">오류 메시지</td>
                    <td className="py-2 font-mono text-xs">toast.error(&quot;실패!&quot;)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono">toast.warning()</td>
                    <td className="py-2">경고 메시지</td>
                    <td className="py-2 font-mono text-xs">toast.warning(&quot;주의!&quot;)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono">toast.info()</td>
                    <td className="py-2">정보 메시지</td>
                    <td className="py-2 font-mono text-xs">toast.info(&quot;알림&quot;)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">toast.promise()</td>
                    <td className="py-2">Promise 기반 알림</td>
                    <td className="py-2 font-mono text-xs">toast.promise(promise, options)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 가이드</CardTitle>
          <CardDescription>Alert와 Toast 활용 방법과 모범 사례</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Alert 사용 시나리오</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 폼 검증 결과나 입력 오류 표시</li>
              <li>• 시스템 상태나 서비스 중단 안내</li>
              <li>• 중요한 업데이트나 공지사항</li>
              <li>• 사용자가 반드시 읽어야 할 경고나 주의사항</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Toast 사용 시나리오</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 저장, 삭제, 업데이트 등 액션 완료 알림</li>
              <li>• 파일 업로드나 다운로드 상태</li>
              <li>• 일시적인 오류나 네트워크 상태</li>
              <li>• 실시간 알림이나 메시지</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">디자인 원칙</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 색상으로 의미를 구분하되, 색맹 사용자 고려</li>
              <li>• 아이콘과 함께 사용하여 시각적 이해도 향상</li>
              <li>• 메시지는 명확하고 구체적으로 작성</li>
              <li>• Toast는 너무 자주 표시하지 않도록 주의</li>
              <li>• 중복된 알림 방지</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertExample;
