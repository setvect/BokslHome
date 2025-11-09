'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Maximize2,
  Minimize2,
  Code2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HtmlEditorProps } from '@/lib/types/editor';
import { useClipboardImageUpload } from '@/lib/hooks/use-clipboard-image-upload';

export function HtmlEditor({
  value = '',
  onChange,
  placeholder = 'HTML 내용을 입력하세요...',
  height = '400px',
  className,
  readOnly = false,
  toolbar = 'full',
}: HtmlEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSourceCode, setShowSourceCode] = useState(false);
  const [sourceCode, setSourceCode] = useState(value);
  const [currentContent, setCurrentContent] = useState(value);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleChange = (content: string) => {
    setCurrentContent(content);
    if (onChange && !readOnly) {
      onChange(content);
    }
  };

  const handleSourceCodeToggle = () => {
    if (!showSourceCode) {
      // WYSIWYG에서 소스 코드로 전환
      if (editorRef.current) {
        const content = editorRef.current.innerHTML || currentContent;
        setSourceCode(content);
      }
    } else {
      // 소스 코드에서 WYSIWYG로 전환
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceCode;
        setCurrentContent(sourceCode);
        handleChange(sourceCode);
      }
    }
    setShowSourceCode(!showSourceCode);
  };

  const handleSourceCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setSourceCode(newCode);
    handleChange(newCode);
  };

  const handleEditorInput = () => {
    if (editorRef.current && !readOnly) {
      const content = editorRef.current.innerHTML;
      setCurrentContent(content);
      handleChange(content);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  // 에디터에 이미지 삽입
  const insertImageToEditor = (url: string, alt: string) => {
    if (editorRef.current) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = alt;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';

      // 현재 커서 위치에 삽입
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(img);
        range.collapse(false);
      } else {
        // 커서 위치를 찾을 수 없으면 끝에 추가
        editorRef.current.appendChild(img);
      }

      // 내용 업데이트
      handleEditorInput();
    }
  };

  // 클립보드 이미지 업로드 훅 사용
  const { handlePaste } = useClipboardImageUpload({
    onImageInsert: insertImageToEditor,
    onError: (error) => console.error('HTML Editor 이미지 업로드 오류:', error),
  });

  // 툴바 버튼 구성
  const getToolbarButtons = () => {
    const buttons = {
      minimal: [
        { icon: Bold, command: 'bold', title: '굵게' },
        { icon: Italic, command: 'italic', title: '기울임' },
        { icon: Underline, command: 'underline', title: '밑줄' },
      ],
      basic: [
        { icon: Bold, command: 'bold', title: '굵게' },
        { icon: Italic, command: 'italic', title: '기울임' },
        { icon: Underline, command: 'underline', title: '밑줄' },
        { icon: Quote, command: 'formatBlock', value: 'blockquote', title: '인용구' },
        { icon: List, command: 'insertUnorderedList', title: '목록' },
        { icon: ListOrdered, command: 'insertOrderedList', title: '번호 목록' },
      ],
      full: [
        { icon: Bold, command: 'bold', title: '굵게' },
        { icon: Italic, command: 'italic', title: '기울임' },
        { icon: Underline, command: 'underline', title: '밑줄' },
        { icon: Quote, command: 'formatBlock', value: 'blockquote', title: '인용구' },
        { icon: List, command: 'insertUnorderedList', title: '목록' },
        { icon: ListOrdered, command: 'insertOrderedList', title: '번호 목록' },
        { icon: AlignLeft, command: 'justifyLeft', title: '왼쪽 정렬' },
        { icon: AlignCenter, command: 'justifyCenter', title: '가운데 정렬' },
        { icon: AlignRight, command: 'justifyRight', title: '오른쪽 정렬' },
      ],
    };
    return buttons[toolbar as keyof typeof buttons] || buttons.full;
  };

  // 외부 value prop이 변경되었을 때만 내부 상태 업데이트
  useEffect(() => {
    if (value !== currentContent) {
      setCurrentContent(value);
      setSourceCode(value);
      if (editorRef.current && !showSourceCode) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  // WYSIWYG 모드로 전환될 때 에디터 내용 업데이트
  useEffect(() => {
    if (!showSourceCode && editorRef.current && currentContent !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = currentContent || '';
    }
  }, [showSourceCode, currentContent]);

  return (
    <div
      className={cn(
        'html-editor border rounded-lg overflow-hidden bg-background',
        isFullscreen && 'fixed inset-0 z-50 rounded-none',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b bg-background">
        <div className="flex flex-wrap items-center gap-1">
          {!showSourceCode && !readOnly
            ? getToolbarButtons().map((button, index) => {
                const Icon = button.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => execCommand(button.command, (button as any).value)}
                    className="h-8 px-2"
                    title={button.title}
                    type="button"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })
            : null}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSourceCodeToggle}
            className="h-8 px-2"
            title={showSourceCode ? 'WYSIWYG 모드' : '소스 코드 모드'}
            type="button"
          >
            <Code2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 px-2"
            title={isFullscreen ? '일반 모드' : '전체화면 모드'}
            type="button"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div className="relative">
        {showSourceCode ? (
          /* HTML 소스 코드 편집 모드 */
          <textarea
            value={sourceCode}
            onChange={handleSourceCodeChange}
            className={cn(
              'w-full resize-none bg-background text-foreground font-mono text-sm p-4 border-none outline-none overflow-y-auto',
              readOnly && 'cursor-default'
            )}
            style={{
              height: isFullscreen ? 'calc(100vh - 160px)' : height,
              maxHeight: isFullscreen ? 'calc(100vh - 160px)' : height,
              minHeight: isFullscreen ? 'calc(100vh - 160px)' : height,
            }}
            placeholder="HTML 소스 코드를 입력하세요..."
            readOnly={readOnly}
          />
        ) : (
          /* ContentEditable WYSIWYG 편집 모드 */
          <div
            ref={editorRef}
            contentEditable={!readOnly}
            onInput={handleEditorInput}
            onPaste={handlePaste}
            className={cn(
              'html-editor__content w-full p-4 border-none outline-none bg-background text-foreground overflow-y-auto',
              isFullscreen ? 'h-[calc(100vh-160px)]' : `h-[${height}]`,
              readOnly && 'cursor-default',
              'prose prose-sm max-w-none',
              '[&>*]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0'
            )}
            style={{
              height: isFullscreen ? 'calc(100vh - 160px)' : height,
              maxHeight: isFullscreen ? 'calc(100vh - 160px)' : height,
              minHeight: isFullscreen ? 'calc(100vh - 160px)' : height,
            }}
            suppressContentEditableWarning={true}
            data-placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}
