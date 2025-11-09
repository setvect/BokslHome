'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, Copy, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';

// 전체 폼 검증 스키마
const completeFormSchema = z
  .object({
    // 기본 정보
    firstName: z.string().min(1, '이름은 필수 입력 항목입니다').min(2, '이름은 최소 2글자 이상이어야 합니다'),
    lastName: z.string().min(1, '성은 필수 입력 항목입니다'),
    email: z.string().min(1, '이메일은 필수 입력 항목입니다').email('유효한 이메일 주소를 입력해주세요'),
    phone: z
      .string()
      .min(1, '전화번호는 필수 입력 항목입니다')
      .regex(/^01[0-9]-\d{3,4}-\d{4}$/, '올바른 전화번호 형식으로 입력해주세요 (010-1234-5678)'),

    // 비밀번호
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, '비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다'),
    confirmPassword: z.string().min(1, '비밀번호 확인은 필수 입력 항목입니다'),

    // 선택 옵션들
    gender: z.enum(['male', 'female', 'other'], { message: '성별을 선택해주세요' }),
    country: z.string().min(1, '국가를 선택해주세요'),
    interests: z.array(z.string()).min(1, '최소 하나의 관심사를 선택해주세요'),

    // 추가 정보
    bio: z.string().max(500, '자기소개는 500자 이내로 작성해주세요').optional(),
    newsletter: z.boolean(),
    notifications: z.boolean(),

    // 약관 동의
    terms: z.boolean().refine((val) => val === true, '서비스 이용약관에 동의해주세요'),
    privacy: z.boolean().refine((val) => val === true, '개인정보 처리방침에 동의해주세요'),
    marketing: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type CompleteFormData = z.infer<typeof completeFormSchema>;

const countries = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'other', label: '기타' },
];

const interestOptions = [
  { id: 'tech', label: '기술/IT' },
  { id: 'design', label: '디자인' },
  { id: 'business', label: '비즈니스' },
  { id: 'marketing', label: '마케팅' },
  { id: 'education', label: '교육' },
  { id: 'health', label: '건강' },
  { id: 'travel', label: '여행' },
  { id: 'music', label: '음악' },
];

export default function CompleteFormPage() {
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const form = useForm<CompleteFormData>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      gender: undefined,
      country: '',
      interests: [],
      bio: '',
      newsletter: false,
      notifications: true,
      terms: false,
      privacy: false,
      marketing: false,
    },
    mode: 'onBlur', // 실시간 검증을 위한 모드 설정
  });

  const {
    formState: { errors, isValid, touchedFields },
  } = form;

  const onSubmit = async (data: CompleteFormData) => {
    setIsSubmitting(true);

    try {
      // 실제로는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmissionResult({
        success: true,
        message: '회원가입이 성공적으로 완료되었습니다!',
        data: {
          ...data,
          password: '[보안상 숨김]',
          confirmPassword: '[보안상 숨김]',
        },
      });

      toast.success('폼이 성공적으로 제출되었습니다!');
    } catch (error) {
      setSubmissionResult({
        success: false,
        message: '오류가 발생했습니다. 다시 시도해주세요.',
        error: error,
      });

      toast.error('폼 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = (code: string, section: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
    toast.success('코드가 클립보드에 복사되었습니다');
  };

  const resetForm = () => {
    form.reset();
    setSubmissionResult(null);
  };

  // 현재 폼 상태 정보
  const formStats = {
    totalFields: Object.keys(form.getValues()).length,
    validFields: Object.keys(touchedFields).filter((key) => !errors[key as keyof typeof errors]).length,
    errorFields: Object.keys(errors).length,
    completionRate: Math.round((Object.keys(touchedFields).length / Object.keys(form.getValues()).length) * 100),
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">통합 폼 예제</h1>
        <p className="text-muted-foreground">
          React Hook Form + Zod를 활용한 완전한 폼 검증 시스템입니다. 실시간 검증, 오류 처리, 복합 검증 규칙을 포함합니다.
        </p>
      </div>

      {/* 폼 상태 대시보드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>실시간 폼 상태</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{formStats.totalFields}</div>
              <div className="text-sm text-muted-foreground">전체 필드</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formStats.validFields}</div>
              <div className="text-sm text-muted-foreground">검증 통과</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{formStats.errorFields}</div>
              <div className="text-sm text-muted-foreground">오류 필드</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formStats.completionRate}%</div>
              <div className="text-sm text-muted-foreground">완성도</div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">폼 유효성:</div>
            {isValid ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                유효함
              </Badge>
            ) : (
              <Badge variant="destructive">
                <XCircle className="h-3 w-3 mr-1" />
                유효하지 않음
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 메인 폼 */}
      <Card>
        <CardHeader>
          <CardTitle>회원가입 폼</CardTitle>
          <CardDescription>모든 필드는 실시간 검증되며, 오류 메시지가 즉시 표시됩니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">기본 정보</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">이름 *</Label>
                  <Input
                    id="firstName"
                    {...form.register('firstName')}
                    className={errors.firstName ? 'border-red-500' : ''}
                    placeholder="홍길동"
                  />
                  {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">성 *</Label>
                  <Input
                    id="lastName"
                    {...form.register('lastName')}
                    className={errors.lastName ? 'border-red-500' : ''}
                    placeholder="홍"
                  />
                  {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="hong@example.com"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">전화번호 *</Label>
                <Input
                  id="phone"
                  {...form.register('phone')}
                  className={errors.phone ? 'border-red-500' : ''}
                  placeholder="010-1234-5678"
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                <p className="text-xs text-muted-foreground">형식: 010-1234-5678</p>
              </div>
            </div>

            {/* 비밀번호 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">비밀번호</h3>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호 *</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register('password')}
                  className={errors.password ? 'border-red-500' : ''}
                  placeholder="대소문자, 숫자, 특수문자 포함 8자 이상"
                />
                {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...form.register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                  placeholder="비밀번호를 다시 입력하세요"
                />
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* 개인 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">개인 정보</h3>

              <div className="space-y-2">
                <Label>성별 *</Label>
                <RadioGroup
                  value={form.watch('gender')}
                  onValueChange={(value) => form.setValue('gender', value as 'male' | 'female' | 'other')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">남성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">여성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">기타</Label>
                  </div>
                </RadioGroup>
                {errors.gender && <p className="text-sm text-red-600">{errors.gender.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>국가 *</Label>
                <Select value={form.watch('country')} onValueChange={(value) => form.setValue('country', value)}>
                  <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                    <SelectValue placeholder="국가를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-sm text-red-600">{errors.country.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>관심사 * (복수 선택 가능)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {interestOptions.map((interest) => (
                    <div key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest.id}
                        checked={form.watch('interests')?.includes(interest.id)}
                        onCheckedChange={(checked) => {
                          const currentInterests = form.getValues('interests') || [];
                          if (checked) {
                            form.setValue('interests', [...currentInterests, interest.id]);
                          } else {
                            form.setValue(
                              'interests',
                              currentInterests.filter((i) => i !== interest.id)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={interest.id} className="text-sm">
                        {interest.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.interests && <p className="text-sm text-red-600">{errors.interests.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">자기소개 (선택사항)</Label>
                <Textarea
                  id="bio"
                  {...form.register('bio')}
                  className={errors.bio ? 'border-red-500' : ''}
                  placeholder="간단한 자기소개를 작성해주세요 (최대 500자)"
                  rows={3}
                />
                <div className="flex justify-between">
                  {errors.bio && <p className="text-sm text-red-600">{errors.bio.message}</p>}
                  <p className="text-xs text-muted-foreground text-right">{form.watch('bio')?.length || 0}/500자</p>
                </div>
              </div>
            </div>

            {/* 알림 설정 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">알림 설정</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>뉴스레터 수신</Label>
                    <p className="text-sm text-muted-foreground">새로운 소식과 업데이트를 이메일로 받아보세요</p>
                  </div>
                  <Switch checked={form.watch('newsletter')} onCheckedChange={(checked) => form.setValue('newsletter', checked)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>푸시 알림</Label>
                    <p className="text-sm text-muted-foreground">중요한 알림을 실시간으로 받아보세요</p>
                  </div>
                  <Switch checked={form.watch('notifications')} onCheckedChange={(checked) => form.setValue('notifications', checked)} />
                </div>
              </div>
            </div>

            {/* 약관 동의 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">약관 동의</h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={form.watch('terms')}
                    onCheckedChange={(checked) => form.setValue('terms', checked as boolean)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="terms" className="text-sm font-medium">
                      서비스 이용약관에 동의합니다 *
                    </Label>
                  </div>
                </div>
                {errors.terms && <p className="text-sm text-red-600 ml-6">{errors.terms.message}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={form.watch('privacy')}
                    onCheckedChange={(checked) => form.setValue('privacy', checked as boolean)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="privacy" className="text-sm font-medium">
                      개인정보 처리방침에 동의합니다 *
                    </Label>
                  </div>
                </div>
                {errors.privacy && <p className="text-sm text-red-600 ml-6">{errors.privacy.message}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing-consent"
                    checked={form.watch('marketing')}
                    onCheckedChange={(checked) => form.setValue('marketing', checked as boolean)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="marketing-consent" className="text-sm font-medium">
                      마케팅 정보 수신에 동의합니다 (선택)
                    </Label>
                    <p className="text-xs text-muted-foreground">할인 쿠폰, 이벤트 정보 등을 받아보실 수 있습니다</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex space-x-3 pt-4">
              <Button type="submit" disabled={isSubmitting || !isValid} className="flex-1">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    처리 중...
                  </>
                ) : (
                  '가입하기'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                초기화
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 제출 결과 */}
      {submissionResult && (
        <Alert className={submissionResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {submissionResult.success ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
          <AlertDescription>
            <div className="space-y-2">
              <p className={submissionResult.success ? 'text-green-800' : 'text-red-800'}>{submissionResult.message}</p>
              {submissionResult.success && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-green-700 hover:text-green-800">제출된 데이터 보기</summary>
                  <pre className="mt-2 bg-green-100 p-3 rounded text-xs text-green-800 overflow-auto">
                    {JSON.stringify(submissionResult.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* 구현 코드 예시 */}
      <Card>
        <CardHeader>
          <CardTitle>핵심 구현 코드</CardTitle>
          <CardDescription>이 폼에 사용된 주요 검증 로직과 구현 방법입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Zod 스키마 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">Zod 검증 스키마</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleCopyCode(
                    `const completeFormSchema = z.object({
  firstName: z.string().min(1, '이름은 필수 입력 항목입니다').min(2, '이름은 최소 2글자 이상이어야 합니다'),
  lastName: z.string().min(1, '성은 필수 입력 항목입니다'),
  email: z.string().min(1, '이메일은 필수 입력 항목입니다').email('유효한 이메일 주소를 입력해주세요'),
  password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/, 
           '비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다'),
  confirmPassword: z.string().min(1, '비밀번호 확인은 필수 입력 항목입니다'),
  gender: z.enum(['male', 'female', 'other'], { message: '성별을 선택해주세요' }),
  interests: z.array(z.string()).min(1, '최소 하나의 관심사를 선택해주세요'),
  terms: z.boolean().refine(val => val === true, '서비스 이용약관에 동의해주세요'),
}).refine(data => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword']
});`,
                    'schema'
                  )
                }
              >
                {copiedSection === 'schema' ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`const completeFormSchema = z.object({
  firstName: z.string().min(1, '이름은 필수 입력 항목입니다').min(2, '이름은 최소 2글자 이상이어야 합니다'),
  email: z.string().min(1, '이메일은 필수 입력 항목입니다').email('유효한 이메일 주소를 입력해주세요'),
  password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/, 
           '비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다'),
  confirmPassword: z.string().min(1, '비밀번호 확인은 필수 입력 항목입니다'),
  interests: z.array(z.string()).min(1, '최소 하나의 관심사를 선택해주세요'),
  terms: z.boolean().refine(val => val === true, '서비스 이용약관에 동의해주세요'),
}).refine(data => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword']
});`}</code>
              </pre>
            </div>
          </div>

          {/* React Hook Form 설정 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">React Hook Form 설정</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleCopyCode(
                    `const form = useForm<CompleteFormData>({
  resolver: zodResolver(completeFormSchema),
  defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
    interests: [],
    terms: false,
    privacy: false,
  },
  mode: 'onBlur' // 실시간 검증을 위한 모드 설정
});`,
                    'form-setup'
                  )
                }
              >
                {copiedSection === 'form-setup' ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`const form = useForm<CompleteFormData>({
  resolver: zodResolver(completeFormSchema),
  defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
    interests: [],
    terms: false,
    privacy: false,
  },
  mode: 'onBlur' // 실시간 검증을 위한 모드 설정
});`}</code>
              </pre>
            </div>
          </div>

          {/* 체크박스 배열 처리 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">체크박스 배열 처리</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleCopyCode(
                    `<Checkbox
  checked={form.watch('interests')?.includes(interest.id)}
  onCheckedChange={(checked) => {
    const currentInterests = form.getValues('interests') || [];
    if (checked) {
      form.setValue('interests', [...currentInterests, interest.id]);
    } else {
      form.setValue('interests', currentInterests.filter(i => i !== interest.id));
    }
  }}
/>`,
                    'checkbox'
                  )
                }
              >
                {copiedSection === 'checkbox' ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`<Checkbox
  checked={form.watch('interests')?.includes(interest.id)}
  onCheckedChange={(checked) => {
    const currentInterests = form.getValues('interests') || [];
    if (checked) {
      form.setValue('interests', [...currentInterests, interest.id]);
    } else {
      form.setValue('interests', currentInterests.filter(i => i !== interest.id));
    }
  }}
/>`}</code>
              </pre>
            </div>
          </div>

          {/* 폼 제출 처리 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">폼 제출 처리</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleCopyCode(
                    `const onSubmit = async (data: CompleteFormData) => {
  setIsSubmitting(true);
  
  try {
    // API 호출
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('제출 실패');
    
    const result = await response.json();
    setSubmissionResult({ success: true, data: result });
    toast.success('폼이 성공적으로 제출되었습니다!');
    
  } catch (error) {
    setSubmissionResult({ success: false, error });
    toast.error('폼 제출 중 오류가 발생했습니다.');
  } finally {
    setIsSubmitting(false);
  }
};`,
                    'submit'
                  )
                }
              >
                {copiedSection === 'submit' ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`const onSubmit = async (data: CompleteFormData) => {
  setIsSubmitting(true);
  
  try {
    // API 호출
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('제출 실패');
    
    const result = await response.json();
    setSubmissionResult({ success: true, data: result });
    toast.success('폼이 성공적으로 제출되었습니다!');
    
  } catch (error) {
    setSubmissionResult({ success: false, error });
    toast.error('폼 제출 중 오류가 발생했습니다.');
  } finally {
    setIsSubmitting(false);
  }
};`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 고급 기능 설명 */}
      <Card>
        <CardHeader>
          <CardTitle>고급 검증 기능</CardTitle>
          <CardDescription>이 폼에서 사용된 고급 검증 기법들입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-3">검증 모드</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <code>onBlur</code>: 필드를 벗어날 때 검증
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <code>onChange</code>: 입력할 때마다 검증
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <code>onSubmit</code>: 제출시에만 검증
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">복합 검증</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>비밀번호 일치 확인</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>정규식을 활용한 형식 검증</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>배열 데이터 최소 선택 검증</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">사용자 경험</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>실시간 폼 상태 대시보드</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>즉각적인 피드백과 오류 메시지</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>제출 상태 표시와 로딩 상태</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">접근성</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>적절한 Label과 필드 연결</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>키보드 네비게이션 지원</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>스크린 리더 친화적 구조</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
