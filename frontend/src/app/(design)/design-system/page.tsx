export default function DesignSystemPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        디자인 시스템
      </h1>
      
      <p className="text-foreground/70 mb-8">
        복슬홈 디자인 시스템 문서화 페이지입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-background border border-foreground/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-foreground">컬러</h3>
          <p className="text-sm text-foreground/70">
            브랜드 컬러와 테마 시스템
          </p>
        </div>

        <div className="bg-background border border-foreground/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-foreground">타이포그래피</h3>
          <p className="text-sm text-foreground/70">
            폰트 및 텍스트 스타일 가이드
          </p>
        </div>

        <div className="bg-background border border-foreground/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-foreground">컴포넌트</h3>
          <p className="text-sm text-foreground/70">
            재사용 가능한 UI 컴포넌트들
          </p>
        </div>
      </div>
    </div>
  );
}