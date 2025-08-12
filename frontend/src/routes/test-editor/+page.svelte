<script lang="ts">
  import HtmlEditor from '$lib/components/ui/HtmlEditor.svelte';
  import { onMount } from 'svelte';
  
  let editorValue = `<p>안녕하세요! 이것은 기본 HtmlEditor 테스트입니다.</p>
<p>색상 테스트: <span style="color: red;">빨간 글씨</span>, <span style="color: blue;">파란 글씨</span>, <span style="color: green;">초록 글씨</span></p>
<p><mark>하이라이트 텍스트</mark>와 <u>밑줄 텍스트</u>도 지원합니다.</p>
<p>복사-붙여넣기 테스트를 위한 샘플 테이블:</p>
<table>
  <thead>
    <tr>
      <th>제목1</th>
      <th>제목2</th>
      <th>제목3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>내용1</td>
      <td>내용2</td>
      <td>내용3</td>
    </tr>
    <tr>
      <td>데이터A</td>
      <td>데이터B</td>
      <td>데이터C</td>
    </tr>
  </tbody>
</table>`;
  let readonly = false;
  let allowRawHtml = true;
  let isDark = false;
  
  function onEditorChange(value: string) {
    editorValue = value;
    console.log('에디터 내용 변경:', editorValue);
  }
  
  onMount(() => {
    // 현재 테마 상태 확인
    isDark = document.documentElement.classList.contains('dark');
  });
  
  function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<svelte:head>
  <title>HtmlEditor 테스트</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-4xl">
  <h1 class="text-3xl font-bold mb-8">HtmlEditor 컴포넌트 테스트</h1>
  
  <!-- 컨트롤 패널 -->
  <div class="mb-8 p-4 bg-muted rounded-lg">
    <h2 class="text-lg font-semibold mb-4">컨트롤</h2>
    <div class="flex items-center gap-4 flex-wrap">
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          bind:checked={readonly}
        />
        읽기 전용 모드
      </label>
      
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          bind:checked={allowRawHtml}
        />
        HTML 직접 편집 모드 허용
      </label>
      
      <button
        type="button"
        onclick={toggleTheme}
        class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        {isDark ? '🌞 라이트 모드' : '🌙 다크 모드'}
      </button>
    </div>
  </div>
  
  <!-- HtmlEditor 컴포넌트 -->
  <div class="mb-8">
    <h2 class="text-lg font-semibold mb-4">에디터</h2>
    <HtmlEditor
      bind:value={editorValue}
      {readonly}
      {allowRawHtml}
      placeholder="여기에 내용을 입력해보세요..."
      onchange={onEditorChange}
    />
  </div>
  
  <!-- 현재 HTML 값 표시 -->
  <div class="mb-8">
    <h2 class="text-lg font-semibold mb-4">현재 HTML 값</h2>
    <div class="p-4 bg-muted rounded-lg">
      <pre class="text-sm overflow-auto">{editorValue}</pre>
    </div>
  </div>
  
  <!-- 렌더링된 HTML 미리보기 -->
  <div class="mb-8">
    <h2 class="text-lg font-semibold mb-4">렌더링 미리보기</h2>
    <div class="p-4 border rounded-lg bg-background">
      {@html editorValue}
    </div>
  </div>
  
  <!-- 복사-붙여넣기 테스트 안내 -->
  <div class="mb-8">
    <h2 class="text-lg font-semibold mb-4">복사-붙여넣기 테스트</h2>
    <div class="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
      <h3 class="font-semibold mb-2">✅ 지원되는 기능:</h3>
      <ul class="space-y-1 text-sm mb-4">
        <li>• 📄 다른 웹사이트의 텍스트 복사-붙여넣기</li>
        <li>• 📊 테이블 구조 보존 (Excel, Google Sheets, HTML 테이블)</li>
        <li>• 🖼️ 이미지 복사-붙여넣기 (Base64 형태로 저장)</li>
        <li>• 🔗 링크가 포함된 텍스트</li>
        <li>• 📝 서식이 적용된 텍스트 (굵게, 기울임, 제목 등)</li>
        <li>• 🎨 <strong>텍스트 색상 보존</strong> (인라인 스타일 지원)</li>
        <li>• ✏️ <strong>하이라이트와 밑줄</strong> 텍스트</li>
        <li>• 📋 리스트 구조 (불릿, 번호)</li>
      </ul>
      <p class="text-sm font-medium mb-2">
        💡 다른 웹사이트에서 테이블을 복사해서 위 에디터에 붙여넣기 해보세요!
      </p>
      <p class="text-sm font-medium text-orange-600">
        🔧 <strong>중첩 테이블이 필요한 경우</strong>: "HTML 모드"로 전환하여 직접 HTML을 편집하세요!
      </p>
    </div>
  </div>
  
  <!-- 테마 데모 섹션 -->
  <div class="mb-8">
    <h2 class="text-lg font-semibold mb-4">🎨 테마 통합 데모</h2>
    <div class="p-4 bg-secondary rounded-lg">
      <p class="text-sm text-muted-foreground mb-4">
        HtmlEditor는 디자인 시스템의 CSS 변수를 사용하여 라이트/다크 테마를 완벽하게 지원합니다.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 class="font-medium mb-2">🌞 라이트 모드</h4>
          <ul class="space-y-1 text-muted-foreground">
            <li>• 밝은 배경색과 어두운 텍스트</li>
            <li>• 은은한 경계선과 그림자</li>
            <li>• 높은 가독성과 대비</li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium mb-2">🌙 다크 모드</h4>
          <ul class="space-y-1 text-muted-foreground">
            <li>• 어두운 배경색과 밝은 텍스트</li>
            <li>• 눈에 편안한 색상 팔레트</li>
            <li>• 야간 작업에 최적화</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- 사용법 안내 -->
  <div class="mb-8">
    <h2 class="text-lg font-semibold mb-4">사용법</h2>
    <div class="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
      <ul class="space-y-2 text-sm">
        <li>• 에디터에서 텍스트를 입력하고 편집해보세요</li>
        <li>• <strong>Ctrl/Cmd + B</strong>: 굵게</li>
        <li>• <strong>Ctrl/Cmd + I</strong>: 기울임</li>
        <li>• <strong>Ctrl/Cmd + Shift + X</strong>: 취소선</li>
        <li>• <strong># </strong>: 제목 1</li>
        <li>• <strong>## </strong>: 제목 2</li>
        <li>• <strong>### </strong>: 제목 3</li>
        <li>• <strong>- </strong>: 불릿 리스트</li>
        <li>• <strong>1. </strong>: 번호 리스트</li>
        <li>• <strong>> </strong>: 인용구</li>
      </ul>
    </div>
  </div>
</div>