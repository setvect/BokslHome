'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationInfo, PaginationNav } from '@/components/ui/pagination-nav';

const BASIC_PAGINATION_CODE = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`;

const PAGINATION_NAV_CODE = `const [page, setPage] = useState(1)
const total = 125
const pageSize = 10

return (
  <div className="space-y-3">
    <PaginationNav
      page={page}
      total={total}
      pageSize={pageSize}
      onPageChange={setPage}
    />
    <PaginationInfo page={page} total={total} pageSize={pageSize} />
  </div>
)`;

export default function PaginationPage() {
  const [copied, setCopied] = useState('');
  const [page, setPage] = useState(1);
  const total = 125;
  const pageSize = 10;

  const copyToClipboard = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopied(id);
    toast.success('코드가 복사되었습니다!');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Pagination</h1>
        <p className="text-muted-foreground">대용량 콘텐츠를 여러 페이지로 나누어 탐색할 수 있게 하는 페이지네이션 컴포넌트입니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>기본 사용법</CardTitle>
          <CardDescription>UI 패키지에서 제공하는 기본 컴포넌트를 조합하면 자유롭게 페이지네이션을 구성할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(BASIC_PAGINATION_CODE, 'pagination-basic')}>
                {copied === 'pagination-basic' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{BASIC_PAGINATION_CODE}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PaginationNav (권장)</CardTitle>
          <CardDescription>동작 로직을 캡슐화한 고수준 컴포넌트로, 필요한 속성만 지정하면 됩니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <PaginationNav page={page} total={total} pageSize={pageSize} onPageChange={setPage} />
            <PaginationInfo page={page} total={total} pageSize={pageSize} />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">코드 예시</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(PAGINATION_NAV_CODE, 'pagination-nav')}>
                {copied === 'pagination-nav' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>{PAGINATION_NAV_CODE}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
