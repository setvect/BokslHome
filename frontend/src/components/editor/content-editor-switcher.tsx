'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { HtmlEditor } from '@/components/ui/html-editor';
import { Label } from '@/components/ui/label';
import { MarkdownEditor } from '@/components/ui/markdown-editor';
import { cn } from '@/lib/utils';

export type ContentEditorType = 'html' | 'markdown';

type SwitchConfirmOptions = {
  enabled?: boolean;
  title?: string;
  description?: string | ((nextEditorLabel: string) => string);
  confirmLabel?: string;
  cancelLabel?: string;
};

type ContentEditorSwitcherProps = {
  id?: string;
  label?: string;
  toolbarLabel?: string;
  value: string;
  onChange: (content: string) => void;
  editorType: ContentEditorType;
  onEditorTypeChange: (next: ContentEditorType) => void;
  height?: string;
  className?: string;
  switchConfirm?: SwitchConfirmOptions;
};

const EDITOR_LABELS: Record<ContentEditorType, string> = {
  html: 'HTML',
  markdown: 'Markdown',
};

const DEFAULT_CONFIRMED_DESCRIPTION = (nextEditorLabel: string) =>
  `에디터를 변경하면 현재 작성 중인 내용이 모두 삭제되고 ${nextEditorLabel} 에디터로 전환됩니다. 계속 진행하시겠습니까?`;

export function ContentEditorSwitcher({
  id = 'content-editor',
  label = '내용',
  toolbarLabel = '에디터',
  value,
  onChange,
  editorType,
  onEditorTypeChange,
  height = '360px',
  className,
  switchConfirm,
}: ContentEditorSwitcherProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingEditorType, setPendingEditorType] = useState<ContentEditorType | null>(null);

  const shouldConfirmSwitch = () => {
    if (switchConfirm?.enabled === false) {
      return false;
    }
    return value.trim().length > 0;
  };

  const descriptionText = useMemo(() => {
    const nextLabel = pendingEditorType ? EDITOR_LABELS[pendingEditorType] : '';
    if (typeof switchConfirm?.description === 'function') {
      return switchConfirm.description(nextLabel);
    }
    if (typeof switchConfirm?.description === 'string') {
      return switchConfirm.description;
    }
    return DEFAULT_CONFIRMED_DESCRIPTION(nextLabel);
  }, [pendingEditorType, switchConfirm]);

  function finalizeSwitch(nextType: ContentEditorType) {
    onChange('');
    onEditorTypeChange(nextType);
  }

  function openConfirmation(nextType: ContentEditorType) {
    setPendingEditorType(nextType);
    setIsConfirmOpen(true);
  }

  function requestEditorSwitch(nextType: ContentEditorType) {
    if (nextType === editorType) return;

    if (shouldConfirmSwitch()) {
      openConfirmation(nextType);
      return;
    }

    finalizeSwitch(nextType);
  }

  function handleConfirm() {
    if (pendingEditorType) {
      finalizeSwitch(pendingEditorType);
    }
    setIsConfirmOpen(false);
    setPendingEditorType(null);
  }

  function handleCancel() {
    setIsConfirmOpen(false);
    setPendingEditorType(null);
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{toolbarLabel}</span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={editorType === 'markdown' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => requestEditorSwitch('markdown')}
            >
              Markdown
            </Button>
            <Button
              type="button"
              variant={editorType === 'html' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => requestEditorSwitch('html')}
            >
              HTML
            </Button>
          </div>
        </div>
      </div>

      <div id={id}>
        {editorType === 'markdown' ? (
          <MarkdownEditor value={value} onChange={onChange} height={height} />
        ) : (
          <HtmlEditor value={value} onChange={onChange} height={height} />
        )}
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={(open) => {
          setIsConfirmOpen(open);
          if (!open) {
            setPendingEditorType(null);
          }
        }}
        title={switchConfirm?.title ?? '작성 중인 내용이 삭제됩니다'}
        description={descriptionText}
        confirmLabel={switchConfirm?.confirmLabel ?? '전환'}
        cancelLabel={switchConfirm?.cancelLabel ?? '취소'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}


