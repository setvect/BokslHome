다음 요구사항에 맞춰 `HtmlEditor` 컴포넌트를 디자인 시스템에 추가하는 작업을 수행하라.  
각 작업 단계 종료 시, 웹 환경에서 결과를 미리 확인할 수 있는 상태로 만든다.  

## 1. 작업 단계
1. **프로젝트 환경 준비** OK
   - Svelte + TypeScript 기반 디자인 시스템 프로젝트에 작업 브랜치 생성  
   - Raw HTML 편집을 위한 `tinymce` 설치  
     - 설치: `npm i tinymce`  
   - 개발 서버 실행 상태에서 웹 미리보기 가능하도록 구성  

2. **기본 HtmlEditor 컴포넌트 구조 생성** 
   - Svelte 컴포넌트(`HtmlEditor.svelte`) 생성  
   - TinyMCE 인스턴스 초기화(`tinymce.init`) 및 HTML 값 바인딩(`getContent`/`setContent`)  
   - `value` prop(초기 HTML), `readOnly` prop, `onChange` 이벤트 구현  
   - CSS 없이 기능만 동작하는 버전 웹에서 확인 가능하게 함  

   예시(개념):
   ```svelte
   <script lang="ts">
     import { onMount, onDestroy } from 'svelte';
     import tinymce from 'tinymce/tinymce';
     import 'tinymce/icons/default';
     import 'tinymce/themes/silver';
     import 'tinymce/models/dom';
     import 'tinymce/plugins/code';
     import 'tinymce/plugins/table';
     import 'tinymce/plugins/link';
     import 'tinymce/plugins/lists';
     import 'tinymce/plugins/image';

     let { value = '<p>Hello</p>', readOnly = false, onChange = (v: string)=>{} } = $props<{ value?: string; readOnly?: boolean; onChange?: (v: string)=>void }>();
     let mountEl: HTMLElement;
     let editor: import('tinymce').Editor | undefined;

     onMount(async () => {
       editor = await tinymce.init({
         target: mountEl,
         menubar: false,
         plugins: 'code table link lists image',
         toolbar: 'undo redo | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | link image | table | code',
         readonly: readOnly,
         valid_elements: '*[*]',
         extended_valid_elements: '*[*]',
         verify_html: false,
         forced_root_block: false,
         init_instance_callback: (ed) => ed.setContent(value),
         setup: (ed) => ed.on('Change KeyUp SetContent', () => onChange(ed.getContent()))
       });
     });
     $effect(() => { editor?.setMode(readOnly ? 'readonly' : 'design'); });
     onDestroy(() => editor?.remove());
   </script>

   <div bind:this={mountEl} />
   ```

3. **라이트/다크 컬러 테마 적용**
   - 디자인 시스템의 테마 변수(`--background`, `--text-color`)를 사용  
   - 옵션 A: TinyMCE 다크 스킨 사용(`skin: 'oxide-dark', content_css: 'dark'`)  
   - 옵션 B: 완전 커스텀(디자인 시스템 테마 적용): `skin: false`, `content_css: false`, `content_style`에 CSS 변수 기반 스타일 주입  
   - 웹 미리보기에서 테마 토글 버튼을 통해 전환 가능하게 함  

4. **HTML 소스 보기(Source) 모드 전환 기능**
   - 모드 전환 토글 버튼 추가  
   - TinyMCE `code` 플러그인 사용하여 HTML 소스 보기 토글  
   - 전환 시 기존 내용 보존  
   - 참고: Markdown 모드는 현재 범위에서 제외(향후 필요 시 `marked`/`turndown` 등으로 변환 지원 가능)  

5. **툴바(Formatting Toolbar) 추가**
   - Bold, Italic, Underline, Heading, Link, Code(소스 보기), List(ordered/unordered), Align, Image, Table 등  
   - TinyMCE `toolbar` 문자열로 구성  
   - 툴바 스타일은 디자인 시스템 가이드에 맞춤  

6. **디자인 시스템 통합**
   - `HtmlEditor` 컴포넌트를 디자인 시스템 내 `components/form/HtmlEditor` 경로에 추가  
   - Storybook(또는 해당 UI 미리보기 도구)에 HTML 모드, Markdown 모드 스토리 작성  
   - 테마 전환 동작과 소스 보기 전환 동작 모두 확인 가능  

7. **최종 검증 및 문서화**
   - 컴포넌트 Props, Events, Slots 명세 작성 (`README.md`)  
   - 사용 예시 코드 포함  
   - 브랜치에 PR 생성 후, 웹 미리보기 링크 포함  

## 2. 추가 구현 고려사항
- 입력 내용 변경 시 `onChange` 이벤트 발생(TinyMCE `Change/KeyUp/SetContent` 훅 활용)
- 외부에서 초기 콘텐츠를 설정하는 `value` prop
- read-only 모드 지원(`editor.setMode('readonly' | 'design')`)
- 에디터 높이/폭 props로 조절 가능(컨테이너 스타일, `min_height` 등)
- Raw HTML 보존을 위한 옵션 검토
  - `valid_elements: '*[*]'`, `extended_valid_elements: '*[*]'`, `verify_html: false`, `forced_root_block: false`
  - 보안 주의: 저장/렌더 전 서버에서 sanitize 필수(XSS 방지)  
