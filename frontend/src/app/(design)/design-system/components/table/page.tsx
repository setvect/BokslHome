'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Check, MoreHorizontal, ArrowUpDown, Search, Filter, Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const TableExample = () => {
  const [copied, setCopied] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('코드가 복사되었습니다!');
    setTimeout(() => setCopied(''), 2000);
  };

  const sampleUsers = [
    {
      id: '1',
      name: '홍길동',
      email: 'hong@example.com',
      role: '관리자',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: '김영희',
      email: 'kim@example.com',
      role: '에디터',
      status: 'active',
      joinDate: '2024-02-20',
    },
    {
      id: '3',
      name: '박철수',
      email: 'park@example.com',
      role: '사용자',
      status: 'inactive',
      joinDate: '2024-01-08',
    },
    {
      id: '4',
      name: '이미래',
      email: 'lee@example.com',
      role: '에디터',
      status: 'pending',
      joinDate: '2024-03-10',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">활성</Badge>;
      case 'inactive':
        return <Badge variant="secondary">비활성</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">대기</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  const toggleAllRows = () => {
    if (selectedRows.length === sampleUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sampleUsers.map((user) => user.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Table</h1>
        <p className="text-muted-foreground">구조화된 데이터를 표시하고 관리하기 위한 테이블 컴포넌트입니다.</p>
      </div>

      {/* 기본 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 테이블</CardTitle>
          <CardDescription>간단한 데이터를 표시하는 기본 테이블입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>가입일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>이메일</TableHead>
      <TableHead>역할</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">홍길동</TableCell>
      <TableCell>hong@example.com</TableCell>
      <TableCell>관리자</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
                    'basic-table'
                  )
                }
              >
                {copied === 'basic-table' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>이메일</TableHead>
      <TableHead>역할</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">홍길동</TableCell>
      <TableCell>hong@example.com</TableCell>
      <TableCell>관리자</TableCell>
    </TableRow>
  </TableBody>
</Table>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* 고급 기능이 포함된 테이블 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>고급 테이블</CardTitle>
              <CardDescription>선택, 검색, 액션 등의 기능이 포함된 테이블입니다.</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 검색 및 컨트롤 */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="사용자 검색..." className="pl-8" />
            </div>
            {selectedRows.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{selectedRows.length}개 선택됨</span>
                <Button variant="outline" size="sm">
                  삭제
                </Button>
              </div>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === sampleUsers.length}
                    onCheckedChange={toggleAllRows}
                    aria-label="모든 행 선택"
                  />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="h-auto p-0">
                    이름 <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>가입일</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUsers.map((user) => (
                <TableRow key={user.id} className={selectedRows.includes(user.id) ? 'bg-muted/50' : ''}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(user.id)}
                      onCheckedChange={() => toggleRowSelection(user.id)}
                      aria-label={`${user.name} 선택`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">메뉴 열기</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>편집</DropdownMenuItem>
                        <DropdownMenuItem>복사</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">삭제</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">고급 테이블 코드</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `// 선택 상태 관리
const [selectedRows, setSelectedRows] = useState<string[]>([]);

// 테이블 구조
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Checkbox
          checked={selectedRows.length === data.length}
          onCheckedChange={toggleAllRows}
        />
      </TableHead>
      <TableHead>
        <Button variant="ghost">
          이름 <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
      <TableHead>액션</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>
          <Checkbox
            checked={selectedRows.includes(item.id)}
            onCheckedChange={() => toggleRowSelection(item.id)}
          />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>편집</DropdownMenuItem>
              <DropdownMenuItem>삭제</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
                    'advanced-table'
                  )
                }
              >
                {copied === 'advanced-table' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{`// 선택 상태 관리
const [selectedRows, setSelectedRows] = useState<string[]>([]);

// 테이블 구조
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Checkbox
          checked={selectedRows.length === data.length}
          onCheckedChange={toggleAllRows}
        />
      </TableHead>
      <TableHead>
        <Button variant="ghost">
          이름 <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>
          <Checkbox checked={selectedRows.includes(item.id)} />
        </TableCell>
        <TableCell>{item.name}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* 테이블 변형 */}
      <Card>
        <CardHeader>
          <CardTitle>테이블 변형</CardTitle>
          <CardDescription>다양한 스타일의 테이블 변형들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 줄무늬 테이블 */}
          <div>
            <h4 className="font-medium text-foreground mb-3">줄무늬 테이블</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>제품명</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>재고</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="even:bg-muted/50">
                  <TableCell>MacBook Pro</TableCell>
                  <TableCell>노트북</TableCell>
                  <TableCell>₩2,500,000</TableCell>
                  <TableCell>12개</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/50">
                  <TableCell>iPhone 15</TableCell>
                  <TableCell>스마트폰</TableCell>
                  <TableCell>₩1,200,000</TableCell>
                  <TableCell>25개</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/50">
                  <TableCell>iPad Air</TableCell>
                  <TableCell>태블릿</TableCell>
                  <TableCell>₩800,000</TableCell>
                  <TableCell>8개</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* 컴팩트 테이블 */}
          <div>
            <h4 className="font-medium text-foreground mb-3">컴팩트 테이블</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-8 px-2 text-xs">ID</TableHead>
                  <TableHead className="h-8 px-2 text-xs">작업</TableHead>
                  <TableHead className="h-8 px-2 text-xs">시간</TableHead>
                  <TableHead className="h-8 px-2 text-xs">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="h-8 px-2 text-xs font-mono">#001</TableCell>
                  <TableCell className="h-8 px-2 text-xs">데이터 백업</TableCell>
                  <TableCell className="h-8 px-2 text-xs">14:30</TableCell>
                  <TableCell className="h-8 px-2 text-xs">
                    <Badge variant="outline" className="text-xs h-5">
                      완료
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="h-8 px-2 text-xs font-mono">#002</TableCell>
                  <TableCell className="h-8 px-2 text-xs">시스템 점검</TableCell>
                  <TableCell className="h-8 px-2 text-xs">15:45</TableCell>
                  <TableCell className="h-8 px-2 text-xs">
                    <Badge className="text-xs h-5 bg-yellow-100 text-yellow-800">진행중</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 컴포넌트 API */}
      <Card>
        <CardHeader>
          <CardTitle>컴포넌트 API</CardTitle>
          <CardDescription>Table 컴포넌트의 구조와 속성</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <td className="py-2 font-mono">Table</td>
                  <td className="py-2">루트 테이블 컨테이너</td>
                  <td className="py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-mono">TableHeader</td>
                  <td className="py-2">테이블 헤더 섹션</td>
                  <td className="py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-mono">TableBody</td>
                  <td className="py-2">테이블 바디 섹션</td>
                  <td className="py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-mono">TableRow</td>
                  <td className="py-2">테이블 행</td>
                  <td className="py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-mono">TableHead</td>
                  <td className="py-2">헤더 셀</td>
                  <td className="py-2">-</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-mono">TableCell</td>
                  <td className="py-2">데이터 셀</td>
                  <td className="py-2">-</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">TableCaption</td>
                  <td className="py-2">테이블 캡션 (접근성)</td>
                  <td className="py-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 사용 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 가이드</CardTitle>
          <CardDescription>테이블 컴포넌트 활용 방법</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">언제 사용하나요?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 구조화된 데이터를 행과 열로 표시할 때</li>
              <li>• 사용자 목록, 주문 내역, 제품 카탈로그 등</li>
              <li>• 데이터를 비교하거나 정렬해야 할 때</li>
              <li>• 대량의 정보를 효율적으로 탐색할 때</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">접근성 고려사항</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• TableCaption으로 테이블 목적 설명</li>
              <li>• 적절한 헤더 사용으로 스크린 리더 지원</li>
              <li>• 키보드 네비게이션 지원</li>
              <li>• 충분한 색상 대비 유지</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">모범 사례</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 헤더에는 명확하고 간결한 라벨 사용</li>
              <li>• 중요한 데이터는 왼쪽 컬럼에 배치</li>
              <li>• 긴 테이블에는 가상화나 페이지네이션 적용</li>
              <li>• 모바일에서는 반응형 또는 카드 레이아웃 고려</li>
              <li>• 정렬 가능한 컬럼에는 시각적 힌트 제공</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableExample;
