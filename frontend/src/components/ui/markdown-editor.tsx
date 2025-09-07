'use client'

import { useState, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MarkdownEditorProps } from '@/lib/types/editor'
import { useIsDarkMode } from '@/lib/utils/theme-detector'
import { renderMarkdown } from '@/lib/utils/markdown-renderer'

export function MarkdownEditor({
  value = '',
  onChange,
  placeholder = '마크다운을 입력하세요...',
  height = '400px',
  className,
  readOnly = false
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isDarkMode = useIsDarkMode()

  const handleChange = (val: string) => {
    if (onChange && !readOnly) {
      onChange(val)
    }
  }

  // 실시간 마크다운 렌더링 (메모화로 성능 최적화)
  const previewHtml = useMemo(() => {
    if (!showPreview || !value.trim()) return ''
    return renderMarkdown(value, { sanitize: true, enableMermaid: false })
  }, [value, showPreview])

  return (
    <div 
      className={cn(
        'border rounded-lg overflow-hidden bg-background',
        isFullscreen && 'fixed inset-0 z-50 rounded-none',
        className
      )}
    >
      {/* 툴바 */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Markdown Editor</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="h-8 px-2"
          >
            {showPreview ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 px-2"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div className={cn(
        "flex",
        showPreview ? "divide-x divide-border" : ""
      )}>
        {/* 코드 에디터 */}
        <div className={cn(
          "relative",
          showPreview ? "w-1/2" : "w-full"
        )}>
          <CodeMirror
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            height={isFullscreen ? 'calc(100vh - 60px)' : height}
            extensions={[markdown()]}
            theme={isDarkMode ? oneDark : 'light'}
            readOnly={readOnly}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
            }}
            className="text-sm"
          />
        </div>

        {/* 미리보기 영역 */}
        {showPreview && (
          <div 
            className="w-1/2 overflow-auto bg-background"
            style={{
              height: isFullscreen ? 'calc(100vh - 60px)' : height
            }}
          >
            <div 
              className="markdown-preview p-4 text-foreground"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        )}
      </div>
    </div>
  )
}