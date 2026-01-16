# Code API 사용 가이드

## 개요
Code API는 시스템 전반에서 사용되는 공통 코드(분류 코드) 관리를 위한 API입니다. 
메모 카테고리, 지식 분류, 네트워크 관계 등 다양한 모듈에서 분류 코드로 활용됩니다.

## 타입 정의 위치
**파일**: `frontend/src/lib/types/code.ts`

### CodeResponse
```typescript
export interface CodeResponse {
  codeSeq: number;      // 코드 시퀀스 (PK)
  majorCode: string;    // 대분류 코드 (예: KNOW_TYPE, MEMO_CATEGORY)
  minorCode: string;    // 소분류 코드 (예: JAVA, JAVASCRIPT)
  codeValue: string;    // 코드 표시값 (예: "자바", "자바스크립트")
  orderNo: number;      // 정렬 순서
}
```

### CodeRequest
```typescript
export interface CodeRequest {
  majorCode: string;
  minorCode: string;
  codeValue: string;
  orderNo: number;
}
```

### CodeMajorGroupResponse
```typescript
export interface CodeMajorGroupResponse {
  majorCode: string;
  count: number;              // 해당 대분류의 소분류 개수
  description?: string;       // 대분류 설명 (선택적)
}
```

### PagedResponse<T>
```typescript
export interface PagedResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
```

## API 클라이언트 사용

### 방법 1: API 클라이언트 함수 사용 (권장)
**파일**: `frontend/src/lib/api/code-api-client.ts`

```typescript
import { getCodePage, getMajorCodes } from '@/lib/api/code-api-client';

// 특정 대분류의 코드 목록 조회
const response = await getCodePage({
  majorCode: 'KNOW_TYPE',
  size: 100,
  sort: 'orderNo,asc'
});
const categories = response.content.map(code => code.minorCode);

// 모든 대분류 목록 조회
const majorCodes = await getMajorCodes();
```

### 방법 2: apiClient 직접 사용
```typescript
import { apiClient } from '@/lib/api-client';
import type { PagedResponse, CodeResponse } from '@/lib/types/code';

const data = await apiClient.get<PagedResponse<CodeResponse>>('/api/code/page', {
  params: {
    majorCode: 'KNOW_TYPE',
    page: 0,
    size: 100,
    sort: 'orderNo,asc'
  }
});
```

## 사용 예시

### 1. 카테고리/분류 드롭다운 구현
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getCodePage } from '@/lib/api/code-api-client';

export function CategorySelector() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCodePage({
          majorCode: 'YOUR_MAJOR_CODE',  // 예: KNOW_TYPE, MEMO_CATEGORY
          size: 100,
          sort: 'orderNo,asc'
        });
        
        // 중복 제거
        const uniqueCategories = Array.from(
          new Set(response.content.map(code => code.minorCode))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <select>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
```

### 2. 코드 값(표시명) 가져오기
```typescript
const response = await getCodePage({
  majorCode: 'KNOW_TYPE',
  size: 100,
  sort: 'orderNo,asc'
});

// minorCode -> codeValue 매핑
const codeMap = new Map(
  response.content.map(code => [code.minorCode, code.codeValue])
);

const displayName = codeMap.get('JAVA'); // "자바"
```

## 주요 대분류 코드

| majorCode | 설명 | 사용 위치 |
|-----------|------|----------|
| `KNOW_TYPE` | 지식 분류 | 지식 메뉴 |
| `MEMO_CATEGORY` | 메모 카테고리 | 메모 메뉴 |
| `NETWORK_TYPE` | 네트워크 관계 유형 | 관계 메뉴 |

## 백엔드 API 엔드포인트

자세한 내용은 [api-endpoints.md](./api-endpoints.md)의 Code 섹션 참조

- `GET /api/code/page` - 코드 목록 페이징 조회
  - Query: `majorCode` (optional), `page`, `size`, `sort`
- `GET /api/code/majorCode` - 대분류 목록 조회
- `POST /api/code` - 코드 생성
- `PUT /api/code/{codeSeq}` - 코드 수정
- `DELETE /api/code/{codeSeq}` - 코드 삭제

## 주의사항

1. **타입 Import 경로**
   ```typescript
   // ✅ 올바른 경로
   import type { CodeResponse, PagedResponse } from '@/lib/types/code';
   
   // ❌ 사용하지 마세요 (deprecated)
   import type { CodeResponse } from '@/lib/types/code-api';
   ```

2. **중복 제거**
   - 같은 `majorCode`에 동일한 `minorCode`가 여러 개 있을 수 있음
   - 드롭다운 등에서 사용 시 `Set`으로 중복 제거 권장

3. **정렬**
   - `orderNo` 필드로 정렬 순서 지정
   - API 호출 시 `sort: 'orderNo,asc'` 파라미터 사용 권장

4. **인증**
   - 모든 Code API는 인증 필요
   - 클라이언트 컴포넌트에서 호출 (localStorage의 JWT 토큰 사용)

## 참고 파일

- 타입 정의: [lib/types/code.ts](file:///d:/intellij-project/BokslHome/frontend/src/lib/types/code.ts)
- API 클라이언트: [lib/api/code-api-client.ts](file:///d:/intellij-project/BokslHome/frontend/src/lib/api/code-api-client.ts)
- 사용 예시: [knowledge/_components/knowledge-list-view.tsx](file:///d:/intellij-project/BokslHome/frontend/src/app/(app)/knowledge/_components/knowledge-list-view.tsx)
