'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy, Check, User, Star, TrendingUp, Activity, HelpCircle, Calendar, Settings, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const DataDisplayExample = () => {
  const [copied, setCopied] = useState('');
  const [progress, setProgress] = useState(13);
  const [loading, setLoading] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('코드가 복사되었습니다!');
    setTimeout(() => setCopied(''), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    const loadTimer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(timer);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Data Display</h1>
        <p className="text-muted-foreground">
          데이터와 정보를 시각적으로 표현하는 디스플레이 컴포넌트들입니다.
        </p>
      </div>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            사용자나 엔티티를 시각적으로 표현하는 프로필 이미지 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">다양한 크기</h4>
            <div className="flex items-end space-x-4">
              <div className="text-center space-y-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Small</p>
              </div>
              <div className="text-center space-y-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Medium</p>
              </div>
              <div className="text-center space-y-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Large</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Fallback 예시</h4>
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src="/nonexistent.jpg" alt="User" />
                <AvatarFallback>홍길동</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/nonexistent.jpg" alt="User" />
                <AvatarFallback>김</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/nonexistent.jpg" alt="User" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// 다양한 크기
<Avatar className="h-8 w-8">
  <AvatarImage src="..." />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

// 아이콘 fallback
<Avatar>
  <AvatarFallback>
    <User className="h-4 w-4" />
  </AvatarFallback>
</Avatar>`, 'avatar-example')}
              >
                {copied === 'avatar-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// 다양한 크기
<Avatar className="h-8 w-8">
  <AvatarImage src="..." />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Badge */}
      <Card>
        <CardHeader>
          <CardTitle>Badge</CardTitle>
          <CardDescription>
            상태, 카테고리, 또는 메타데이터를 표시하는 작은 라벨 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 변형</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>기본</Badge>
              <Badge variant="secondary">보조</Badge>
              <Badge variant="outline">아웃라인</Badge>
              <Badge variant="destructive">위험</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">상태 표시</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                활성
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-1"></div>
                대기
              </Badge>
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-1"></div>
                비활성
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">숫자와 아이콘</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Star className="w-3 h-3 mr-1" />
                즐겨찾기
              </Badge>
              <Badge>
                새로운 메시지 <span className="ml-1 bg-white text-primary px-1 rounded text-xs">3</span>
              </Badge>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                2024-03-15
              </Badge>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<Badge>기본</Badge>
<Badge variant="secondary">보조</Badge>
<Badge variant="outline">아웃라인</Badge>
<Badge variant="destructive">위험</Badge>

// 상태 표시
<Badge className="bg-green-100 text-green-800">
  <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
  활성
</Badge>

// 아이콘과 함께
<Badge variant="secondary">
  <Star className="w-3 h-3 mr-1" />
  즐겨찾기
</Badge>`, 'badge-example')}
              >
                {copied === 'badge-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Badge>기본</Badge>
<Badge variant="secondary">보조</Badge>
<Badge variant="outline">아웃라인</Badge>

// 상태 표시
<Badge className="bg-green-100 text-green-800">
  <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
  활성
</Badge>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton</CardTitle>
          <CardDescription>
            콘텐츠가 로딩 중일 때 사용하는 플레이스홀더 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 Skeleton</h4>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">카드 로딩</h4>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[160px]" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">실제 로딩 예시</h4>
            <div className="border rounded-lg p-4">
              {loading ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[160px]" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">사용자 이름</p>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    로딩이 완료되었습니다! 이제 실제 콘텐츠를 확인할 수 있습니다.
                  </p>
                  <div className="flex space-x-2">
                    <Badge>활성</Badge>
                    <Badge variant="secondary">인증됨</Badge>
                  </div>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 2000);
              }}
            >
              다시 로딩하기
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-[300px]" />

// 카드 로딩
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>`, 'skeleton-example')}
              >
                {copied === 'skeleton-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />

// 카드 로딩
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>
            작업 진행률이나 완료도를 시각적으로 나타내는 진행 표시 바입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 Progress</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>프로젝트 진행률</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">다양한 상태</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>완료된 작업</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>진행 중인 작업</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>시작된 작업</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>미시작 작업</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="w-full" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">스킬 수준 표시</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center">
                    React
                    <Badge variant="secondary" className="ml-2 text-xs">고급</Badge>
                  </span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center">
                    TypeScript
                    <Badge variant="secondary" className="ml-2 text-xs">중급</Badge>
                  </span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center">
                    Python
                    <Badge variant="outline" className="ml-2 text-xs">초급</Badge>
                  </span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="w-full" />
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<Progress value={progress} className="w-full" />

// 라벨과 함께
<div>
  <div className="flex justify-between text-sm mb-2">
    <span>프로젝트 진행률</span>
    <span>{progress}%</span>
  </div>
  <Progress value={progress} className="w-full" />
</div>

// 상태 업데이트
const [progress, setProgress] = useState(13);
useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);`, 'progress-example')}
              >
                {copied === 'progress-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Progress value={progress} className="w-full" />

// 라벨과 함께
<div>
  <div className="flex justify-between text-sm mb-2">
    <span>프로젝트 진행률</span>
    <span>{progress}%</span>
  </div>
  <Progress value={progress} className="w-full" />
</div>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltip</CardTitle>
          <CardDescription>
            요소에 호버하거나 포커스할 때 추가 정보를 제공하는 툴팁 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 Tooltip</h4>
            <div className="flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">호버하세요</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>이것은 툴팁입니다!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>도움말 정보를 제공합니다</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">다양한 위치</h4>
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">위</Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>위쪽 툴팁</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">아래</Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>아래쪽 툴팁</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">왼쪽</Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>왼쪽 툴팁</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">오른쪽</Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>오른쪽 툴팁</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">실용적인 활용</h4>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="cursor-help">
                      <Activity className="w-3 h-3 mr-1" />
                      활성
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>서버가 정상적으로 작동 중입니다</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>홍길동 (admin@example.com)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-medium">성장률</p>
                      <p className="text-sm">지난 달 대비 15% 증가</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">호버하세요</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>이것은 툴팁입니다!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// 다양한 위치
<TooltipContent side="top">위쪽 툴팁</TooltipContent>
<TooltipContent side="right">오른쪽 툴팁</TooltipContent>
<TooltipContent side="bottom">아래쪽 툴팁</TooltipContent>
<TooltipContent side="left">왼쪽 툴팁</TooltipContent>

// 복잡한 내용
<TooltipContent>
  <div className="space-y-1">
    <p className="font-medium">제목</p>
    <p className="text-sm">상세 설명</p>
  </div>
</TooltipContent>`, 'tooltip-example')}
              >
                {copied === 'tooltip-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">호버하세요</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>이것은 툴팁입니다!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// 다양한 위치
<TooltipContent side="top">위쪽 툴팁</TooltipContent>
<TooltipContent side="right">오른쪽 툴팁</TooltipContent>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Card>
        <CardHeader>
          <CardTitle>Separator</CardTitle>
          <CardDescription>
            콘텐츠를 시각적으로 구분하는 구분선 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">수평 구분선</h4>
            <div className="space-y-4 text-sm">
              <p>첫 번째 섹션의 내용입니다.</p>
              <Separator />
              <p>두 번째 섹션의 내용입니다.</p>
              <Separator />
              <p>세 번째 섹션의 내용입니다.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">수직 구분선</h4>
            <div className="flex items-center space-x-4 text-sm">
              <span>홈</span>
              <Separator orientation="vertical" className="h-4" />
              <span>제품</span>
              <Separator orientation="vertical" className="h-4" />
              <span>서비스</span>
              <Separator orientation="vertical" className="h-4" />
              <span>연락처</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">메뉴에서 활용</h4>
            <div className="border rounded-lg p-4 space-y-2 max-w-xs">
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-accent cursor-pointer">
                <User className="h-4 w-4" />
                <span className="text-sm">프로필</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-accent cursor-pointer">
                <Settings className="h-4 w-4" />
                <span className="text-sm">설정</span>
              </div>
              <Separator />
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-accent cursor-pointer text-destructive">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">로그아웃</span>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`// 수평 구분선
<p>첫 번째 내용</p>
<Separator />
<p>두 번째 내용</p>

// 수직 구분선
<div className="flex items-center space-x-4">
  <span>홈</span>
  <Separator orientation="vertical" className="h-4" />
  <span>제품</span>
  <Separator orientation="vertical" className="h-4" />
  <span>서비스</span>
</div>`, 'separator-example')}
              >
                {copied === 'separator-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`// 수평 구분선
<p>첫 번째 내용</p>
<Separator />
<p>두 번째 내용</p>

// 수직 구분선
<div className="flex items-center space-x-4">
  <span>홈</span>
  <Separator orientation="vertical" className="h-4" />
  <span>제품</span>
</div>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* 사용 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 가이드</CardTitle>
          <CardDescription>Data Display 컴포넌트들의 활용 방법</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Avatar 활용</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 사용자 프로필, 댓글 작성자, 팀 멤버 표시</li>
              <li>• 이미지 로딩 실패 시 Fallback으로 이니셜이나 아이콘 표시</li>
              <li>• 다양한 크기로 컨텍스트에 맞게 사용</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Badge 활용</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 상태 표시 (활성/비활성, 온라인/오프라인)</li>
              <li>• 카테고리나 태그 표시</li>
              <li>• 알림 수나 새로운 항목 개수 표시</li>
              <li>• 중요도나 우선순위 구분</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">로딩 및 피드백</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Skeleton</strong>: 콘텐츠 구조 미리보기로 로딩 경험 개선</li>
              <li>• <strong>Progress</strong>: 명확한 진행률이 있는 작업에 사용</li>
              <li>• <strong>Tooltip</strong>: 추가 설명이나 도움말 제공</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">모범 사례</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 일관된 크기와 스타일 유지</li>
              <li>• 색상만으로 의미 전달하지 않고 텍스트나 아이콘 병용</li>
              <li>• 접근성 고려한 적절한 대비와 포커스 표시</li>
              <li>• 로딩 상태에서는 실제 콘텐츠와 유사한 구조로 Skeleton 제공</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataDisplayExample;