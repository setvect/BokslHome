'use client';

import { useEffect, useState } from 'react';

const CLIENT_ID_STORAGE_KEY = 'boksl_lotto_client_id';

const LOTTO_MIN_GAME_COUNT = 1;
const LOTTO_MAX_GAME_COUNT = 5;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;
const LOTTO_NUMBERS_PER_GAME = 6;

type LottoGame = {
  id: number;
  numbers: number[];
};

export default function LottoPage() {
  const [games, setGames] = useState<LottoGame[] | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  useEffect(() => {
    const todaySeed = getDailySeed();
    const clientId = getOrCreateClientId();
    const combinedSeed = hashStringToSeed(`${todaySeed}-${clientId}`);
    const rng = createSeededRandom(combinedSeed);

    const gameCount = getRandomIntFrom(rng, LOTTO_MIN_GAME_COUNT, LOTTO_MAX_GAME_COUNT);
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

  // 서버와 클라이언트 초기 렌더를 동일하게 맞추기 위해
  // 마운트 전에는 고정된 플레이스홀더를 렌더링한다.
  if (!games || !generatedAt) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">인생역전 가능?</h1>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">생성 시각: 계산 중...</p>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">로또 번호를 불러오는 중입니다...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">인생역전 가능?</h1>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">생성 시각: {generatedAt}</p>
        </div>

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
      </div>
    </div>
  );
}

type RandomFn = () => number;

function generateLottoNumbers(rng: RandomFn): number[] {
  const numbers = new Set<number>();

  while (numbers.size < LOTTO_NUMBERS_PER_GAME) {
    numbers.add(getRandomIntFrom(rng, LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER));
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

function getBallColorClass(value: number) {
  if (value <= 10) return 'bg-amber-500';
  if (value <= 20) return 'bg-sky-500';
  if (value <= 30) return 'bg-emerald-500';
  if (value <= 40) return 'bg-violet-500';
  return 'bg-rose-500';
}

function formatNumber(value: number) {
  return value.toString().padStart(2, '0');
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
  if (typeof window === 'undefined') {
    // 서버 렌더링 시에는 고정 값 사용 (클라이언트에서 다시 계산됨)
    return 'server';
  }

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
    // localStorage 접근 실패 시에도 어느 정도 브라우저별 차이를 위해 userAgent 사용
    if (typeof navigator !== 'undefined') {
      return `ua-${navigator.userAgent}`;
    }
    return 'fallback';
  }
}

function hashStringToSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  // 0 이 나오지 않도록 보정
  if (hash === 0) {
    hash = 1;
  }

  return hash;
}

