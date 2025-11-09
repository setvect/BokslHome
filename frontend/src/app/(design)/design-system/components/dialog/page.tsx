'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Copy, Check, Trash2, Settings, Info, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const DialogExample = () => {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('코드가 복사되었습니다!');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dialog &amp; Modal</h1>
        <p className="text-muted-foreground">
          사용자와의 상호작용을 위한 오버레이 컴포넌트들입니다. 정보 입력, 확인, 알림 등에 사용됩니다.
        </p>
      </div>

      {/* 기본 Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>기본 Dialog</CardTitle>
          <CardDescription>일반적인 모달 다이얼로그입니다. 폼 입력이나 정보 표시에 사용합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Settings className="w-4 h-4 mr-2" />
                  설정 열기
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>프로필 설정</DialogTitle>
                  <DialogDescription>여기에서 프로필 정보를 변경할 수 있습니다. 완료 후 저장을 클릭하세요.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      이름
                    </Label>
                    <Input id="name" defaultValue="홍길동" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      사용자명
                    </Label>
                    <Input id="username" defaultValue="@gildong" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      취소
                    </Button>
                  </DialogClose>
                  <Button type="submit">저장</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Info className="w-4 h-4 mr-2" />
                  정보 보기
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>상세 정보</DialogTitle>
                  <DialogDescription>사용자에게 중요한 정보나 상세 내용을 표시하는 다이얼로그입니다.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    이것은 정보 표시용 다이얼로그입니다. 사용자에게 중요한 정보나 상세 내용을 보여줄 때 사용합니다.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">주요 기능</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 오버레이와 함께 표시</li>
                      <li>• ESC 키로 닫기 가능</li>
                      <li>• 접근성 지원</li>
                      <li>• 반응형 레이아웃</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">닫기</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `<Dialog>
  <DialogTrigger asChild>
    <Button variant="default">설정 열기</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>프로필 설정</DialogTitle>
      <DialogDescription>
        여기에서 프로필 정보를 변경할 수 있습니다.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">이름</Label>
        <Input id="name" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">취소</Button>
      </DialogClose>
      <Button type="submit">저장</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
                    'basic-dialog'
                  )
                }
              >
                {copied === 'basic-dialog' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="default">설정 열기</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>프로필 설정</DialogTitle>
      <DialogDescription>
        여기에서 프로필 정보를 변경할 수 있습니다.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">이름</Label>
        <Input id="name" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">취소</Button>
      </DialogClose>
      <Button type="submit">저장</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Alert Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Dialog</CardTitle>
          <CardDescription>
            중요한 확인이나 경고 메시지를 위한 다이얼로그입니다. 삭제, 로그아웃 등 중요한 액션에 사용합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  계정 삭제
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center text-destructive">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    계정을 정말 삭제하시겠습니까?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 계정과 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">로그아웃</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>로그아웃</AlertDialogTitle>
                  <AlertDialogDescription>
                    정말 로그아웃 하시겠습니까? 저장되지 않은 작업이 있다면 먼저 저장해주세요.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction>로그아웃</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">계정 삭제</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>계정을 정말 삭제하시겠습니까?</AlertDialogTitle>
      <AlertDialogDescription>
        이 작업은 되돌릴 수 없습니다. 계정과 모든 데이터가 
        영구적으로 삭제됩니다.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground">
        삭제
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
                    'alert-dialog'
                  )
                }
              >
                {copied === 'alert-dialog' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">계정 삭제</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>계정을 정말 삭제하시겠습니까?</AlertDialogTitle>
      <AlertDialogDescription>
        이 작업은 되돌릴 수 없습니다. 계정과 모든 데이터가 
        영구적으로 삭제됩니다.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground">
        삭제
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Dialog 컴포넌트 API */}
      <Card>
        <CardHeader>
          <CardTitle>컴포넌트 API</CardTitle>
          <CardDescription>Dialog 컴포넌트의 속성과 사용법</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Dialog Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Dialog 컴포넌트</h4>
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
                      <td className="py-2 font-mono">Dialog</td>
                      <td className="py-2">루트 다이얼로그 컴포넌트</td>
                      <td className="py-2">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">DialogTrigger</td>
                      <td className="py-2">다이얼로그를 여는 트리거 요소</td>
                      <td className="py-2">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">DialogContent</td>
                      <td className="py-2">다이얼로그 메인 컨텐츠</td>
                      <td className="py-2">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">DialogHeader</td>
                      <td className="py-2">제목과 설명을 포함하는 헤더</td>
                      <td className="py-2">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">DialogTitle</td>
                      <td className="py-2">다이얼로그 제목</td>
                      <td className="py-2">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">DialogDescription</td>
                      <td className="py-2">다이얼로그 설명</td>
                      <td className="py-2">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">DialogFooter</td>
                      <td className="py-2">액션 버튼들을 포함하는 푸터</td>
                      <td className="py-2">-</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">DialogClose</td>
                      <td className="py-2">다이얼로그를 닫는 요소</td>
                      <td className="py-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* AlertDialog Props */}
            <div>
              <h4 className="font-medium text-foreground mb-3">AlertDialog 컴포넌트</h4>
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
                      <td className="py-2 font-mono">AlertDialog</td>
                      <td className="py-2">루트 알림 다이얼로그</td>
                      <td className="py-2">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">AlertDialogTrigger</td>
                      <td className="py-2">알림 다이얼로그 트리거</td>
                      <td className="py-2">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">AlertDialogContent</td>
                      <td className="py-2">알림 다이얼로그 컨텐츠</td>
                      <td className="py-2">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">AlertDialogAction</td>
                      <td className="py-2">주요 액션 버튼</td>
                      <td className="py-2">✓</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">AlertDialogCancel</td>
                      <td className="py-2">취소 액션 버튼</td>
                      <td className="py-2">-</td>
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
          <CardDescription>Dialog와 Modal 사용 시 고려할 사항들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">언제 사용하나요?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                • <strong>Dialog</strong>: 폼 입력, 설정 변경, 상세 정보 표시
              </li>
              <li>
                • <strong>AlertDialog</strong>: 중요한 확인, 경고, 삭제 등의 위험한 작업
              </li>
              <li>• 사용자의 현재 작업을 중단하고 즉시 응답이 필요할 때</li>
              <li>• 복잡한 폼이나 많은 정보를 별도 화면에서 처리할 때</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">접근성 고려사항</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• ESC 키로 다이얼로그 닫기 지원</li>
              <li>• Tab 키로 다이얼로그 내 요소들 간 이동</li>
              <li>• 다이얼로그 열릴 때 첫 번째 요소로 포커스 이동</li>
              <li>• 다이얼로그 닫힐 때 원래 요소로 포커스 복귀</li>
              <li>• 적절한 ARIA 속성 자동 적용</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">모범 사례</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 다이얼로그 제목은 명확하고 구체적으로 작성</li>
              <li>• 중요한 작업에는 AlertDialog 사용</li>
              <li>• 취소 버튼은 항상 제공</li>
              <li>• 모바일에서도 적절한 크기로 표시되도록 반응형 설계</li>
              <li>• 너무 많은 중첩 다이얼로그는 피하기</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DialogExample;
