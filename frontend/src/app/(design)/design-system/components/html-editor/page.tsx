'use client'

import { useState } from 'react'
import { HtmlEditor } from '@/components/ui/html-editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const sampleHtml = `<h1>HTML 에디터 예시</h1>

<p>이것은 <strong>Quill.js</strong> 기반의 리치 텍스트 에디터입니다.</p>

<h2>주요 기능</h2>

<ul>
  <li><strong>WYSIWYG 편집</strong>: 실시간 시각적 편집</li>
  <li><em>텍스트 서식</em>: 굵게, 기울임, 밑줄 등</li>
  <li><code>코드 블록</code>: 인라인 및 블록 코드</li>
</ul>

<h3>텍스트 서식</h3>

<p><strong>굵은 텍스트</strong>와 <em>기울임 텍스트</em>, <u>밑줄 텍스트</u>를 지원합니다.</p>

<blockquote>
  <p>이것은 인용문입니다. Quill.js의 다양한 기능을 테스트해보세요!</p>
</blockquote>

<ol>
  <li>순서가 있는 목록</li>
  <li>두 번째 항목
    <ol>
      <li>중첩된 목록도 가능합니다</li>
    </ol>
  </li>
</ol>

<pre class="ql-syntax" spellcheck="false">// 코드 블록 예시
function greetUser(name) {
  return \`안녕하세요, \${name}님!\`;
}

console.log(greetUser('사용자'));
</pre>`

const exampleCode = `import { HtmlEditor } from '@/components/ui/html-editor'

export function MyComponent() {
  const [content, setContent] = useState('')

  return (
    <HtmlEditor
      value={content}
      onChange={setContent}
      placeholder="HTML 내용을 입력하세요..."
      height="400px"
      toolbar="full"
    />
  )
}`

export default function HtmlEditorPage() {
  const [demoContent, setDemoContent] = useState(sampleHtml)
  const [readOnlyContent] = useState('<h1>읽기 전용 에디터</h1><p>이 에디터는 <strong>읽기 전용</strong>입니다.</p>')

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">HTML Editor</h1>
        <p className="text-muted-foreground mt-2">
          Quill.js 기반의 WYSIWYG HTML 에디터 컴포넌트입니다.
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="secondary">Quill.js</Badge>
          <Badge variant="secondary">WYSIWYG</Badge>
          <Badge variant="secondary">HTML</Badge>
          <Badge variant="secondary">리치 텍스트</Badge>
          <Badge variant="default">무료 라이센스</Badge>
        </div>
      </div>

      {/* 라이브 데모 */}
      <Card>
        <CardHeader>
          <CardTitle>라이브 데모</CardTitle>
          <CardDescription>
            아래 에디터에서 HTML 내용을 직접 편집해보세요. 소스 코드 버튼으로 HTML 코드를 직접 편집할 수도 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HtmlEditor
            value={demoContent}
            onChange={setDemoContent}
            height="500px"
            toolbar="full"
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

          <Card>
            <CardHeader>
              <CardTitle>툴바 옵션</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">toolbar="full"</code>
                  <p className="text-sm text-muted-foreground mt-1">모든 편집 도구 포함 (기본값)</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">toolbar="basic"</code>
                  <p className="text-sm text-muted-foreground mt-1">기본적인 편집 도구만 포함</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">toolbar="minimal"</code>
                  <p className="text-sm text-muted-foreground mt-1">최소한의 편집 도구만 포함</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="props" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HtmlEditor Props</CardTitle>
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
                      <td className="p-2">에디터의 현재 HTML 값</td>
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
                      <td className="p-2 text-muted-foreground">&apos;HTML 내용을 입력하세요...&apos;</td>
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
                    <tr className="border-b">
                      <td className="p-2 font-mono">toolbar</td>
                      <td className="p-2 text-muted-foreground">&apos;full&apos; | &apos;basic&apos; | &apos;minimal&apos;</td>
                      <td className="p-2 text-muted-foreground">&apos;full&apos;</td>
                      <td className="p-2">툴바 구성</td>
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
              <HtmlEditor
                value={readOnlyContent}
                readOnly={true}
                height="200px"
                toolbar="basic"
              />
            </CardContent>
          </Card>

          {/* 기본 툴바 예시 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 툴바</CardTitle>
              <CardDescription>toolbar=&quot;basic&quot; 설정</CardDescription>
            </CardHeader>
            <CardContent>
              <HtmlEditor
                value="<p>기본 툴바를 사용하는 <strong>간단한</strong> 에디터입니다.</p>"
                toolbar="basic"
                height="200px"
              />
            </CardContent>
          </Card>

          {/* 최소 툴바 예시 */}
          <Card>
            <CardHeader>
              <CardTitle>최소 툴바</CardTitle>
              <CardDescription>toolbar=&quot;minimal&quot; 설정</CardDescription>
            </CardHeader>
            <CardContent>
              <HtmlEditor
                value="<p>최소한의 기능만 있는 <em>심플한</em> 에디터입니다.</p>"
                toolbar="minimal"
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
              <span className="text-sm">WYSIWYG 편집</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">텍스트 서식 (굵게, 기울임 등)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">목록 (순서, 무순서)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">링크 및 이미지 삽입</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">코드 블록</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">HTML 소스 편집 모드</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">전체화면 모드</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">다크/라이트 테마 지원</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">✅ 완료</Badge>
              <span className="text-sm">완전 무료 라이센스</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}