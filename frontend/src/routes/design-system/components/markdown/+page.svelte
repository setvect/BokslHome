<script lang="ts">
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
  
  let editorValue = `# MarkdownEditor 컴포넌트

실시간 마크다운 편집과 미리보기를 제공하는 컴포넌트입니다.

## 주요 기능

- ✅ **실시간 미리보기**: 왼쪽 에디터, 오른쪽 미리보기
- ✅ **테마 연동**: 라이트/다크 모드 자동 전환  
- ✅ **클립보드 이미지**: 이미지 붙여넣기 지원
- ✅ **Mermaid 다이어그램**: 플로우차트, 시퀀스 다이어그램 등
- ✅ **전체화면 모드**: ESC 키로 해제 가능

## Mermaid 다이어그램 예제

\`\`\`mermaid
flowchart TD
    A[시작] --> B{조건 확인}
    B -->|Yes| C[처리 A]
    B -->|No| D[처리 B]
    C --> E[종료]
    D --> E
\`\`\`

**테스트해보세요:**
- 이미지를 클립보드에서 붙여넣기 (Ctrl+V)
- 전체화면 버튼 클릭
- 미리보기 토글 버튼 사용`;
</script>

<div class="container">
  <h1>MarkdownEditor</h1>
  
  <!-- Props 테이블 -->
  <section class="props-section">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-header">
        <div>Prop</div>
        <div>Type</div>
        <div>Default</div>
        <div>Description</div>
      </div>
      <div class="props-row">
        <div><code>value</code></div>
        <div><code>string</code></div>
        <div><code>'# Hello Markdown!...'</code></div>
        <div>에디터의 초기 내용 (양방향 바인딩)</div>
      </div>
      <div class="props-row">
        <div><code>readOnly</code></div>
        <div><code>boolean</code></div>
        <div><code>false</code></div>
        <div>읽기 전용 모드</div>
      </div>
      <div class="props-row">
        <div><code>height</code></div>
        <div><code>string</code></div>
        <div><code>'400px'</code></div>
        <div>에디터 높이</div>
      </div>
      <div class="props-row">
        <div><code>showPreview</code></div>
        <div><code>boolean</code></div>
        <div><code>true</code></div>
        <div>미리보기 초기 표시 여부</div>
      </div>
      <div class="props-row">
        <div><code>onChange</code></div>
        <div><code>(value: string) => void</code></div>
        <div><code>undefined</code></div>
        <div>내용 변경 시 호출되는 콜백</div>
      </div>
      <div class="props-row">
        <div><code>onImageUpload</code></div>
        <div><code>(file: File) => Promise&lt;string&gt;</code></div>
        <div><code>undefined</code></div>
        <div>커스텀 이미지 업로드 함수</div>
      </div>
    </div>
  </section>

  <!-- 에디터 -->
  <section class="editor-section">
    <MarkdownEditor 
      bind:value={editorValue}
      height="600px"
    />
  </section>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 32px;
    color: var(--foreground);
  }

  .props-section {
    margin-bottom: 32px;
  }

  .props-section h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--foreground);
  }

  .props-table {
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .props-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    background: var(--muted);
    font-weight: 600;
    padding: 12px;
    border-bottom: 1px solid var(--border);
  }

  .props-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    padding: 12px;
    border-bottom: 1px solid var(--border);
  }

  .props-row:last-child {
    border-bottom: none;
  }

  .props-row code {
    background: var(--muted);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
  }

  .editor-section {
    margin-top: 32px;
  }

  /* 반응형 */
  @media (max-width: 768px) {
    .props-header,
    .props-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .props-header div,
    .props-row div {
      padding: 4px 0;
    }
  }
</style>