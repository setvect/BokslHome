import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">복슬홈 소개</h1>
        <p className="text-muted-foreground">
          BokslPortal 프로젝트의 현대화된 버전으로 새롭게 탄생한 통합 플랫폼입니다.
        </p>
      </div>

      {/* 프로젝트 개요 */}
      <Card>
        <CardHeader>
          <CardTitle>프로젝트 개요</CardTitle>
          <CardDescription>
            복슬홈은 기존 BokslPortal의 모든 기능을 현대적인 기술 스택으로 재구성한 웹 애플리케이션입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">주요 특징</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 반응형 디자인으로 모든 디바이스에서 최적화된 사용자 경험</li>
              <li>• 다크/라이트 테마 지원으로 개인 취향에 맞는 UI 제공</li>
              <li>• 직관적인 네비게이션과 깔끔한 레이아웃</li>
              <li>• 빠른 로딩 속도와 성능 최적화</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 기술 스택 */}
      <Card>
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
          <CardDescription>
            최신 웹 기술을 사용하여 안정적이고 확장 가능한 애플리케이션을 구축했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">프론트엔드</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Next.js 14+</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">백엔드</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Spring Boot</Badge>
              <Badge variant="secondary">Kotlin</Badge>
              <Badge variant="secondary">H2 Database</Badge>
              <Badge variant="secondary">JWT 인증</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 주요 기능 */}
      <Card>
        <CardHeader>
          <CardTitle>주요 기능</CardTitle>
          <CardDescription>
            복슬홈에서 제공하는 다양한 기능들을 소개합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">게시판</h4>
              <p className="text-sm text-muted-foreground">
                카테고리별 게시글 작성, 댓글, 첨부파일 기능을 제공하는 커뮤니티 공간
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">복슬지식</h4>
              <p className="text-sm text-muted-foreground">
                체계적인 지식 관리와 문서화를 위한 위키 형태의 지식 베이스
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">복슬노트</h4>
              <p className="text-sm text-muted-foreground">
                개인 노트와 아이디어를 카테고리별로 정리하고 관리하는 시스템
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">복슬관계</h4>
              <p className="text-sm text-muted-foreground">
                인맥과 관계를 시각적으로 관리하고 네트워크를 구축하는 도구
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 개발 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>개발 정보</CardTitle>
          <CardDescription>
            프로젝트의 개발 과정과 구조에 대한 정보입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">개발 단계</h4>
            <p className="text-sm text-muted-foreground">
              현재 기본 레이아웃과 UI 컴포넌트 구축 단계를 완료하고, 
              디자인 시스템과 에디터 컴포넌트 개발을 진행 중입니다.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">아키텍처</h4>
            <p className="text-sm text-muted-foreground">
              모노레포 구조로 프론트엔드와 백엔드를 분리하여 개발하며, 
              Docker를 통한 컨테이너화된 배포를 지원합니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}