export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-foreground">
            복슬홈에 오신 것을 환영합니다
          </h1>
          
          <p className="text-xl mb-12 text-foreground/70">
            게시판, 지식베이스, 노트, 메모를 통합한 현대적인 플랫폼입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background border border-foreground/10 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-foreground">게시판</h3>
              <p className="text-sm text-foreground/70">
                다양한 주제의 게시글을 작성하고 공유하세요.
              </p>
            </div>

            <div className="bg-background border border-foreground/10 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-foreground">복슬지식</h3>
              <p className="text-sm text-foreground/70">
                체계적인 지식 관리와 문서화를 위한 공간입니다.
              </p>
            </div>

            <div className="bg-background border border-foreground/10 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-foreground">복슬노트</h3>
              <p className="text-sm text-foreground/70">
                개인적인 노트와 메모를 체계적으로 정리하세요.
              </p>
            </div>

            <div className="bg-background border border-foreground/10 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-foreground">복슬메모</h3>
              <p className="text-sm text-foreground/70">
                빠른 메모와 아이디어를 간편하게 기록하세요.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm text-foreground/50">
              React + Next.js + TypeScript로 구축된 현대적인 웹 애플리케이션
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
