'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

type LottoGame = {
  id: number;
  numbers: number[];
};

type LottoSetResponse = {
  numberList: number[];
};

type LottoResponse = {
  setList: LottoSetResponse[];
};

export default function LottoPage() {
  const { games, generatedAt, error } = useLotto();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">인생역전 가능?</h1>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            생성 시각: {generatedAt ?? '계산 중...'}
          </p>
        </div>

        {error ? (
          <div className="mt-6 text-sm text-red-500">
            로또 번호를 불러오는 중 오류가 발생했습니다: {error}
          </div>
        ) : games ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {games.map((game) => (
              <div key={game.id} className="rounded-xl border border-border/70 bg-background/70 p-4 shadow-sm">
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Game {game.id}</p>
                  <p className="text-base font-semibold text-foreground">행운의 숫자</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.numbers.map((number) => (
                    <span
                      key={number}
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white shadow-sm ${getBallColorClass(
                        number
                      )}`}
                    >
                      {formatNumber(number)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 text-sm text-muted-foreground">로또 번호를 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
}

// --- Logic Hooks & Helpers ---

function useLotto() {
  const [games, setGames] = useState<LottoGame[] | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLotto = async () => {
      try {
        const data = await apiClient.get<LottoResponse>('/luck/lotto');
        
        const generatedGames: LottoGame[] = data.setList.map((set, index) => ({
          id: index + 1,
          numbers: set.numberList,
        }));

        const generatedAtText = new Date().toLocaleString('ko-KR', {
          dateStyle: 'medium',
          timeStyle: 'short',
        });

        setGames(generatedGames);
        setGeneratedAt(generatedAtText);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch lotto numbers:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setGeneratedAt(null);
      }
    };

    fetchLotto();
  }, []);

  return { games, generatedAt, error };
}

function getBallColorClass(value: number) {
  const colors = ['bg-amber-500', 'bg-sky-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500'];
  return colors[Math.min(Math.floor((value - 1) / 10), colors.length - 1)];
}

function formatNumber(value: number) {
  return value.toString().padStart(2, '0');
}
