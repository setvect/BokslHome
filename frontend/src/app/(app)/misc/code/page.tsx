'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import type { CodeMajorGroupResponse } from '@/lib/types/code';
import { CodeMajorListView } from './_components/code-major-list-view';

export default function CodePage() {
  const [majorCodes, setMajorCodes] = useState<CodeMajorGroupResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMajorCodes = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get<CodeMajorGroupResponse[]>('/api/code/majorCode');
      setMajorCodes(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch major codes:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMajorCodes();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">코드 관리</h1>
      </header>

      {error ? (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : (
        <CodeMajorListView
          majorCodes={majorCodes}
          isLoading={isLoading}
          onRefresh={fetchMajorCodes}
        />
      )}
    </div>
  );
}

