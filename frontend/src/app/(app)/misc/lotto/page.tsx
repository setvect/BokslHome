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
  const todaySeed = getDailySeed();
  const rng = createSeededRandom(todaySeed);

  const gameCount = getRandomIntFrom(rng, LOTTO_MIN_GAME_COUNT, LOTTO_MAX_GAME_COUNT);
  const games: LottoGame[] = Array.from({ length: gameCount }, (_, index) => ({
    id: index + 1,
    numbers: generateLottoNumbers(rng),
  }));
  const generatedAt = new Date().toLocaleString('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">Lucky Numbers</p>
        <h1 className="text-3xl font-bold text-foreground">로또 번호 생성기</h1>
        <p className="text-muted-foreground">
          오늘 날짜를 기준으로 {LOTTO_MIN_GAME_COUNT}~{LOTTO_MAX_GAME_COUNT} 게임을 생성하며, 새로고침해도 동일한
          결과를 보여줍니다.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">이번 생성 결과</p>
            <p className="text-lg font-semibold text-foreground">{gameCount}게임</p>
          </div>
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
