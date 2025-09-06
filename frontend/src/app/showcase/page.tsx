import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ShowcasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          shadcn/ui 컴포넌트 쇼케이스
        </h1>
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        {/* 기본 컴포넌트 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 컴포넌트</CardTitle>
            <CardDescription>Button, Input, Label 등 기본적인 UI 요소들</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button>기본 버튼</Button>
              <Button variant="secondary">보조 버튼</Button>
              <Button variant="outline">아웃라인 버튼</Button>
              <Button variant="ghost">고스트 버튼</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="이메일을 입력하세요" />
              </div>
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" placeholder="비밀번호를 입력하세요" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 피드백 컴포넌트 */}
        <Card>
          <CardHeader>
            <CardTitle>피드백 컴포넌트</CardTitle>
            <CardDescription>사용자에게 상태를 알려주는 컴포넌트들</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge>기본</Badge>
              <Badge variant="secondary">보조</Badge>
              <Badge variant="outline">아웃라인</Badge>
              <Badge variant="destructive">위험</Badge>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                이것은 기본 알림 메시지입니다.
              </AlertDescription>
            </Alert>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                성공적으로 완료되었습니다!
              </AlertDescription>
            </Alert>

            <div>
              <Label className="text-sm font-medium">진행률: 75%</Label>
              <Progress value={75} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* 레이아웃 컴포넌트 */}
        <Card>
          <CardHeader>
            <CardTitle>레이아웃 컴포넌트</CardTitle>
            <CardDescription>콘텐츠를 구조화하는 컴포넌트들</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">카드 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    첫 번째 예시 카드입니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">카드 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    두 번째 예시 카드입니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">카드 3</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    세 번째 예시 카드입니다.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">스켈레톤 로딩</h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 색상 테마 데모 */}
        <Card>
          <CardHeader>
            <CardTitle>색상 테마 시스템</CardTitle>
            <CardDescription>라이트/다크 모드에서의 색상 표현</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-background border border-border rounded"></div>
                <p className="text-sm">Background</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-foreground rounded"></div>
                <p className="text-sm">Foreground</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary rounded"></div>
                <p className="text-sm">Primary</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-secondary rounded"></div>
                <p className="text-sm">Secondary</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}