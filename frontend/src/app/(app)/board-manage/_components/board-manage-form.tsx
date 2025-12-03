'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const YES_NO_OPTIONS = [
  { label: '예', value: 'yes' },
  { label: '아니오', value: 'no' },
] as const;

const boardFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, '코드를 입력하세요')
    .max(8, '코드는 8자 이내로 입력하세요')
    .regex(/^[A-Za-z0-9]+$/, '영문자와 숫자만 사용할 수 있습니다'),
  name: z.string().trim().min(1, '이름을 입력하세요').max(20, '이름은 20자 이내로 입력하세요'),
  uploadLimit: z
    .string()
    .trim()
    .min(1, '업로드 용량을 입력하세요')
    .refine((val) => /^\d+$/.test(val), {
      message: '숫자만 입력하세요',
    })
    .refine((val) => {
      const value = Number(val);
      return value >= 0 && value <= 10000;
    }, '0에서 10,000 사이의 값을 입력하세요'),
  allowComments: z.enum(['yes', 'no']),
  allowFiles: z.enum(['yes', 'no']),
  allowEncryptedPosts: z.enum(['yes', 'no']),
});

export type BoardFormValues = z.infer<typeof boardFormSchema>;

type BoardFormProps = {
  mode: 'create' | 'edit';
  initialValues?: Partial<BoardFormValues>;
  cancelHref?: string;
  submitLabel?: string;
  onSubmit: (values: BoardFormValues) => void | Promise<void>;
};

export function BoardForm({ mode, initialValues, cancelHref = '/board-manage', submitLabel, onSubmit }: BoardFormProps) {
  const isEdit = mode === 'edit';

  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      code: '',
      name: '',
      uploadLimit: '',
      allowComments: 'no',
      allowFiles: 'yes',
      allowEncryptedPosts: 'no',
      ...initialValues,
    },
    mode: 'onBlur',
  });

  const resolvedSubmitLabel = submitLabel ?? (isEdit ? '저장' : '확인');

  const handleSubmit = async (values: BoardFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="rounded-3xl border border-border bg-card shadow-sm transition-colors">
          <div className="space-y-6 p-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="md:grid md:grid-cols-[160px_1fr] md:items-center md:gap-4">
                    <FormLabel className="text-sm font-medium md:text-base data-[error=true]:text-foreground">코드</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input {...field} placeholder="예: BDAAAA10" className="md:max-w-md" readOnly={isEdit} disabled={isEdit} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:grid md:grid-cols-[160px_1fr] md:items-center md:gap-4">
                    <FormLabel className="text-sm font-medium md:text-base data-[error=true]:text-foreground">이름</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input {...field} placeholder="게시판 이름을 입력하세요" className="md:max-w-md" />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uploadLimit"
                render={({ field }) => (
                  <FormItem className="md:grid md:grid-cols-[160px_1fr] md:items-center md:gap-4">
                    <FormLabel className="text-sm font-medium md:text-base data-[error=true]:text-foreground">
                      업로드 용량제한 (KB)
                    </FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            {...field}
                            type="number"
                            value={field.value ?? ''}
                            placeholder="0 ~ 10,000"
                            className="md:max-w-xs"
                            inputMode="numeric"
                            min={0}
                            max={10000}
                            step={1}
                          />
                          <span className="text-sm text-muted-foreground">KB</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <fieldset className="space-y-4">
                <legend className="text-sm font-medium text-muted-foreground">사용 설정</legend>

                <FormField
                  control={form.control}
                  name="allowComments"
                  render={({ field }) => (
                    <FormItem className="md:grid md:grid-cols-[160px_1fr] md:items-center md:gap-4">
                      <FormLabel className="text-sm font-medium md:text-base data-[error=true]:text-foreground">댓글 사용</FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4">
                            {YES_NO_OPTIONS.map((option) => {
                              const id = `allow-comments-${option.value}`;
                              return (
                                <div key={option.value} className="flex items-center gap-2">
                                  <RadioGroupItem id={id} value={option.value} />
                                  <Label htmlFor={id} className="cursor-pointer text-sm">
                                    {option.label}
                                  </Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowFiles"
                  render={({ field }) => (
                    <FormItem className="md:grid md:grid-cols-[160px_1fr] md:items-center md:gap-4">
                      <FormLabel className="text-sm font-medium md:text-base data-[error=true]:text-foreground">파일 업로드</FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4">
                            {YES_NO_OPTIONS.map((option) => {
                              const id = `allow-upload-${option.value}`;
                              return (
                                <div key={option.value} className="flex items-center gap-2">
                                  <RadioGroupItem id={id} value={option.value} />
                                  <Label htmlFor={id} className="cursor-pointer text-sm">
                                    {option.label}
                                  </Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowEncryptedPosts"
                  render={({ field }) => (
                    <FormItem className="md:grid md:grid-cols-[160px_1fr] md:items-center md:gap-4">
                      <FormLabel className="text-sm font-medium md:text-base data-[error=true]:text-foreground">암호화 글 등록</FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4">
                            {YES_NO_OPTIONS.map((option) => {
                              const id = `allow-encrypted-${option.value}`;
                              return (
                                <div key={option.value} className="flex items-center gap-2">
                                  <RadioGroupItem id={id} value={option.value} />
                                  <Label htmlFor={id} className="cursor-pointer text-sm">
                                    {option.label}
                                  </Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </fieldset>
            </div>
          </div>
          <footer className="border-t border-border bg-muted/30 p-6">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href={cancelHref}>취소</Link>
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                {resolvedSubmitLabel}
              </Button>
            </div>
          </footer>
        </section>
      </form>
    </Form>
  );
}
