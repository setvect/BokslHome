export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* 향후 Header + DesignSidebar + MainContent 구조로 확장 예정 */}
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  );
}