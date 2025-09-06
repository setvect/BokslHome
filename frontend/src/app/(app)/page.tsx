import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, StickyNote, Users, Settings, Dices } from 'lucide-react';

const features = [
  {
    title: '게시판',
    description: '다양한 주제로 소통하고 정보를 공유하는 커뮤니티 공간',
    icon: FileText,
    href: '/board',
    color: 'text-blue-500',
  },
  {
    title: '복슬지식',
    description: '체계적으로 정리된 지식 베이스와 문서 관리 시스템',
    icon: BookOpen,
    href: '/knowledge',
    color: 'text-green-500',
  },
  {
    title: '복슬노트',
    description: '개인 노트와 아이디어를 체계적으로 관리하는 공간',
    icon: StickyNote,
    href: '/note',
    color: 'text-yellow-500',
  },
  {
    title: '복슬관계',
    description: '인맥과 네트워크를 시각적으로 관리하는 도구',
    icon: Users,
    href: '/network',
    color: 'text-purple-500',
  },
  {
    title: '로또번호 생성',
    description: '행운의 번호를 생성해보는 재미있는 기능',
    icon: Dices,
    href: '/lotto',
    color: 'text-red-500',
  },
  {
    title: '설정',
    description: '시스템 설정과 개인화 옵션을 관리하는 공간',
    icon: Settings,
    href: '/settings',
    color: 'text-gray-500',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">복슬홈에 오신 것을 환영합니다</h1>
        <p className="text-muted-foreground">
          복슬포털의 현대화된 버전으로, 게시판부터 지식 관리까지 모든 기능을 한곳에서 만나보세요.
        </p>
      </div>

      {/* 기능 카드 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="group cursor-pointer transition-all hover:shadow-md hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-lg p-2 bg-muted ${feature.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 추가 정보 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>시작하기</CardTitle>
          <CardDescription>
            복슬홈의 다양한 기능들을 탐색해보세요. 각 메뉴를 클릭하면 해당 기능으로 이동할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• 좌측 사이드바에서 원하는 기능을 선택할 수 있습니다</p>
            <p>• 우측 상단의 테마 토글로 다크/라이트 모드를 변경할 수 있습니다</p>
            <p>• 모바일에서는 햄버거 메뉴를 통해 사이드바에 접근할 수 있습니다</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}