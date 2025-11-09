'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} reset={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md mx-auto text-center p-6">
        <h1 className="text-2xl font-bold mb-4 text-foreground">문제가 발생했습니다</h1>
        <p className="text-foreground/70 mb-6">{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
        <button onClick={reset} className="bg-foreground text-background px-4 py-2 rounded hover:opacity-80 transition-opacity">
          다시 시도
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
