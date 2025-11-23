'use client';

import { useEffect, useState } from 'react';

const CLIENT_ID_STORAGE_KEY = 'boksl_lotto_client_id';

const LOTTO_CONFIG = {
  MIN_GAME_COUNT: 1,
  MAX_GAME_COUNT: 5,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBERS_PER_GAME: 6,
} as const;

type LottoGame = {
  id: number;
  numbers: number[];
};

export default function LottoPage() {
  const { games, generatedAt } = useLotto();

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

        {games ? (
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

  useEffect(() => {
    const todaySeed = getDailySeed();
    const clientId = getOrCreateClientId();
    const combinedSeed = hashStringToSeed(`${todaySeed}-${clientId}`);
    const rng = createSeededRandom(combinedSeed);

    const gameCount = getRandomIntFrom(
      rng,
      LOTTO_CONFIG.MIN_GAME_COUNT,
      LOTTO_CONFIG.MAX_GAME_COUNT
    );

    const generatedGames: LottoGame[] = Array.from({ length: gameCount }, (_, index) => ({
      id: index + 1,
      numbers: generateLottoNumbers(rng),
    }));

    const generatedAtText = new Date().toLocaleString('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    setGames(generatedGames);
    setGeneratedAt(generatedAtText);
  }, []);

  return { games, generatedAt };
}

function getBallColorClass(value: number) {
  const colors = ['bg-amber-500', 'bg-sky-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500'];
  return colors[Math.min(Math.floor((value - 1) / 10), colors.length - 1)];
}

function formatNumber(value: number) {
  return value.toString().padStart(2, '0');
}

type RandomFn = () => number;

function generateLottoNumbers(rng: RandomFn): number[] {
  const numbers = new Set<number>();

  while (numbers.size < LOTTO_CONFIG.NUMBERS_PER_GAME) {
    numbers.add(getRandomIntFrom(rng, LOTTO_CONFIG.MIN_NUMBER, LOTTO_CONFIG.MAX_NUMBER));
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

function getDailySeed(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year * 10000 + month * 100 + day;
}

function createSeededRandom(seed: number): RandomFn {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getRandomIntFrom(random: RandomFn, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function getOrCreateClientId(): string {
  if (typeof window === 'undefined') return 'server';

  try {
    const stored = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY);
    if (stored) return stored;

    const newId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, newId);
    return newId;
  } catch {
    return typeof navigator !== 'undefined' ? `ua-${navigator.userAgent}` : 'fallback';
  }
}

function hashStringToSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash === 0 ? 1 : hash;
}
