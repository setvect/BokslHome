export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* 향후 Header + Sidebar + MainContent 구조로 확장 예정 */}
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  );
}