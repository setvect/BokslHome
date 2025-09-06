'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Home } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const NavigationExample = () => {
  const [copied, setCopied] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
        <h1 className="text-3xl font-bold text-foreground">Navigation</h1>
        <p className="text-muted-foreground">
          사용자가 애플리케이션 내에서 이동할 수 있도록 돕는 네비게이션 컴포넌트들입니다.
        </p>
      </div>

      {/* Breadcrumb */}
      <Card>
        <CardHeader>
          <CardTitle>Breadcrumb</CardTitle>
          <CardDescription>
            사용자의 현재 위치를 보여주고 상위 페이지로 쉽게 이동할 수 있게 하는 네비게이션입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 Breadcrumb</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/design-system">디자인 시스템</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/design-system/components">컴포넌트</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>네비게이션</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">긴 경로 Breadcrumb</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/design-system/components">컴포넌트</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>네비게이션</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">
        <Home className="h-4 w-4" />
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/design-system">디자인 시스템</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>네비게이션</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`, 'breadcrumb-example')}
              >
                {copied === 'breadcrumb-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">
        <Home className="h-4 w-4" />
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/design-system">디자인 시스템</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>네비게이션</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Pagination</CardTitle>
          <CardDescription>
            대용량 콘텐츠를 여러 페이지로 나누어 탐색할 수 있게 하는 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 Pagination</h4>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === 1}
                    onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === 2}
                    onClick={(e) => { e.preventDefault(); setCurrentPage(2); }}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === 3}
                    onClick={(e) => { e.preventDefault(); setCurrentPage(3); }}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < 10) setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="text-center text-sm text-muted-foreground">
              현재 페이지: {currentPage}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`, 'pagination-example')}
              >
                {copied === 'pagination-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Menu</CardTitle>
          <CardDescription>
            복잡한 네비게이션 구조를 위한 드롭다운 메뉴 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">드롭다운 Navigation</h4>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>제품</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] grid-cols-2">
                      <div className="space-y-2">
                        <NavigationMenuLink className="block p-2 rounded hover:bg-accent">
                          <div className="text-sm font-medium">웹 애플리케이션</div>
                          <p className="text-xs text-muted-foreground">현대적인 웹 앱 구축</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block p-2 rounded hover:bg-accent">
                          <div className="text-sm font-medium">모바일 앱</div>
                          <p className="text-xs text-muted-foreground">iOS/Android 네이티브 앱</p>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-2">
                        <NavigationMenuLink className="block p-2 rounded hover:bg-accent">
                          <div className="text-sm font-medium">API 서비스</div>
                          <p className="text-xs text-muted-foreground">RESTful API 구축</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block p-2 rounded hover:bg-accent">
                          <div className="text-sm font-medium">데이터베이스</div>
                          <p className="text-xs text-muted-foreground">안전한 데이터 관리</p>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>솔루션</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-[300px]">
                      <div className="space-y-2">
                        <NavigationMenuLink className="block p-2 rounded hover:bg-accent">
                          <div className="text-sm font-medium">엔터프라이즈</div>
                          <p className="text-xs text-muted-foreground">대기업 솔루션</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block p-2 rounded hover:bg-accent">
                          <div className="text-sm font-medium">스타트업</div>
                          <p className="text-xs text-muted-foreground">빠른 개발과 배포</p>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-4 py-2 rounded hover:bg-accent">
                    문서
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-4 py-2 rounded hover:bg-accent">
                    지원
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>제품</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 w-[400px] grid-cols-2">
          <NavigationMenuLink className="block p-2 rounded hover:bg-accent">
            <div className="text-sm font-medium">웹 애플리케이션</div>
            <p className="text-xs text-muted-foreground">현대적인 웹 앱 구축</p>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#">문서</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`, 'navigation-menu-example')}
              >
                {copied === 'navigation-menu-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>제품</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-4">
          <NavigationMenuLink>웹 애플리케이션</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#">문서</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>
            관련된 콘텐츠를 탭으로 구분하여 표시하는 네비게이션 컴포넌트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">기본 Tabs</h4>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">계정</TabsTrigger>
                <TabsTrigger value="password">비밀번호</TabsTrigger>
                <TabsTrigger value="notifications">알림</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">계정 설정</h3>
                  <p className="text-muted-foreground">
                    여기에서 계정 정보를 관리할 수 있습니다. 프로필 사진, 이름, 이메일 등을 변경하세요.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">이름</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md bg-background"
                      placeholder="홍길동" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">이메일</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded-md bg-background"
                      placeholder="hong@example.com" 
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="password" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">비밀번호 변경</h3>
                  <p className="text-muted-foreground">
                    보안을 위해 정기적으로 비밀번호를 변경하는 것이 좋습니다.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">현재 비밀번호</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-md bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">새 비밀번호</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-md bg-background"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">알림 설정</h3>
                  <p className="text-muted-foreground">
                    받고 싶은 알림의 종류를 선택할 수 있습니다.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">이메일 알림</div>
                      <div className="text-sm text-muted-foreground">중요한 업데이트를 이메일로 받기</div>
                    </div>
                    <Badge variant="secondary">활성</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">푸시 알림</div>
                      <div className="text-sm text-muted-foreground">실시간 알림을 브라우저에서 받기</div>
                    </div>
                    <Badge variant="outline">비활성</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`<Tabs defaultValue="account" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
    <TabsTrigger value="notifications">알림</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div className="space-y-4">
      <h3 className="text-lg font-medium">계정 설정</h3>
      <p className="text-muted-foreground">
        여기에서 계정 정보를 관리할 수 있습니다.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="password">
    <div className="space-y-4">
      <h3 className="text-lg font-medium">비밀번호 변경</h3>
      <p className="text-muted-foreground">
        보안을 위해 정기적으로 비밀번호를 변경하세요.
      </p>
    </div>
  </TabsContent>
</Tabs>`, 'tabs-example')}
              >
                {copied === 'tabs-example' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Tabs defaultValue="account" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
    <TabsTrigger value="notifications">알림</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div className="space-y-4">
      <h3 className="text-lg font-medium">계정 설정</h3>
      <p>여기에서 계정 정보를 관리할 수 있습니다.</p>
    </div>
  </TabsContent>
</Tabs>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* 사용 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 가이드</CardTitle>
          <CardDescription>Navigation 컴포넌트들의 활용 방법</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Breadcrumb 사용 시나리오</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 깊은 페이지 계층 구조에서 현재 위치 표시</li>
              <li>• 사용자가 상위 페이지로 쉽게 돌아갈 수 있도록</li>
              <li>• 전자상거래 카테고리 탐색</li>
              <li>• 파일 시스템이나 폴더 구조 표시</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Pagination 사용 시나리오</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 검색 결과나 게시물 목록 페이징</li>
              <li>• 대용량 데이터 테이블 분할</li>
              <li>• 갤러리나 카탈로그 페이지</li>
              <li>• API 응답 데이터의 페이지네이션</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Tabs 사용 시나리오</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 설정 페이지의 카테고리 분류</li>
              <li>• 대시보드의 서로 다른 뷰</li>
              <li>• 상품 정보의 세부사항, 리뷰, Q&amp;A 구분</li>
              <li>• 프로필 페이지의 개인정보, 활동, 설정 분리</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">모범 사례</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 일관된 네비게이션 패턴 유지</li>
              <li>• 현재 위치나 활성 상태 명확히 표시</li>
              <li>• 키보드 네비게이션 지원</li>
              <li>• 모바일에서도 사용하기 쉬운 크기와 간격</li>
              <li>• 로딩 상태나 비활성 상태 적절히 표현</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationExample;