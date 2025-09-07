'use client'

import { useState } from 'react'
import { MarkdownEditor } from '@/components/ui/markdown-editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const sampleMarkdown = `# 마크다운 에디터 예시

이것은 **MarkdownEditor** 컴포넌트의 데모입니다.

## 기본 기능

- **볼드 텍스트**와 *이탤릭 텍스트*
- \`인라인 코드\`와 코드 블록

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## 리스트

1. 순서 있는 리스트
2. 두 번째 항목
   - 중첩된 항목
   - 또 다른 중첩 항목

### 인용문

> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.

### 링크와 이미지

[Next.js 공식 문서](https://nextjs.org)

### 테이블

| 기능 | 상태 | 설명 |
|------|------|------|
| 문법 강조 | ✅ | CodeMirror 기반 |
| 실시간 미리보기 | 🚧 | 개발 예정 |
| Mermaid | 🚧 | 개발 예정 |

---

더 많은 마크다운 기능을 테스트해보세요!`

const exampleCode = `import { MarkdownEditor } from '@/components/ui/markdown-editor'

export function MyComponent() {
  const [content, setContent] = useState('')

  return (
    <MarkdownEditor
      value={content}
      onChange={setContent}
      placeholder="마크다운을 입력하세요..."
      height="400px"
    />
  )
}`

export default function MarkdownPage() {
  const [demoContent, setDemoContent] = useState(sampleMarkdown)
  const [readOnlyContent] = useState('# 읽기 전용 에디터\\n\\n이 에디터는 **읽기 전용**입니다.')

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Markdown Editor</h1>
        <p className="text-muted-foreground mt-2">
          CodeMirror 6 기반의 마크다운 에디터 컴포넌트입니다.
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="secondary">CodeMirror 6</Badge>
          <Badge variant="secondary">Markdown</Badge>
          <Badge variant="secondary">실시간 편집</Badge>
        </div>
      </div>

      {/* 라이브 데모 */}
      <Card>
        <CardHeader>
          <CardTitle>라이브 데모</CardTitle>
          <CardDescription>
            아래 에디터에서 마크다운을 직접 편집해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownEditor
            value={demoContent}
            onChange={setDemoContent}
            height="500px"
          />
        </CardContent>
      </Card>

      {/* 사용 예시와 프로퍼티 */}
      <Tabs defaultValue="usage" className="w-full">
        <TabsList>
          <TabsTrigger value="usage">사용법</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
          <TabsTrigger value="examples">예시</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>기본 사용법</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{exampleCode}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="props" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>MarkdownEditor Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Prop</th>
                      <th className="text-left p-2 font-medium">타입</th>
                      <th className="text-left p-2 font-medium">기본값</th>
                      <th className="text-left p-2 font-medium">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2 text-muted-foreground">string</td>
                      <td className="p-2 text-muted-foreground">&apos;&apos;</td>
                      <td className="p-2">에디터의 현재 값</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2 text-muted-foreground">(value: string) =&gt; void</td>
                      <td className="p-2 text-muted-foreground">undefined</td>
                      <td className="p-2">값 변경 시 호출되는 콜백</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2 text-muted-foreground">string</td>
                      <td className="p-2 text-muted-foreground">&apos;마크다운을 입력하세요...&apos;</td>
                      <td className="p-2">플레이스홀더 텍스트</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">height</td>
                      <td className="p-2 text-muted-foreground">string</td>
                      <td className="p-2 text-muted-foreground">&apos;400px&apos;</td>
                      <td className="p-2">에디터 높이</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">className</td>
                      <td className="p-2 text-muted-foreground">string</td>
                      <td className="p-2 text-muted-foreground">undefined</td>
                      <td className="p-2">추가 CSS 클래스</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">readOnly</td>
                      <td className="p-2 text-muted-foreground">boolean</td>
                      <td className="p-2 text-muted-foreground">false</td>
                      <td className="p-2">읽기 전용 모드</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          {/* 읽기 전용 예시 */}
          <Card>
            <CardHeader>
              <CardTitle>읽기 전용 모드</CardTitle>
              <CardDescription>readOnly 속성이 true인 경우</CardDescription>
            </CardHeader>
            <CardContent>
              <MarkdownEditor
                value={readOnlyContent}
                readOnly={true}
                height="200px"
              />
            </CardContent>
          </Card>

          {/* 작은 높이 예시 */}
          <Card>
            <CardHeader>
              <CardTitle>컴팩트 에디터</CardTitle>
              <CardDescription>높이를 작게 설정한 경우</CardDescription>
            </CardHeader>
            <CardContent>
              <MarkdownEditor
                value="# 작은 에디터\n\n이것은 높이가 작은 에디터입니다."
                height="150px"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 개발 상태 */}
      <Card>
        <CardHeader>
          <CardTitle>개발 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">기본 마크다운 편집</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">문법 강조</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">전체화면 모드</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">🚧 개발 예정</Badge>
              <span className="text-sm">실시간 미리보기</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">🚧 개발 예정</Badge>
              <span className="text-sm">Mermaid 다이어그램 지원</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">🚧 개발 예정</Badge>
              <span className="text-sm">이미지 업로드</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}