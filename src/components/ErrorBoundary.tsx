import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // In a real production app, log to an error reporting service here (e.g. Sentry)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center text-white font-sans">
          <div className="max-w-md">
            <h1 className="text-4xl font-semibold mb-4 text-[#F3F4F6]">Something went wrong.</h1>
            <p className="text-[#9CA3AF] mb-8 leading-relaxed">
              We've encountered an unexpected issue. Our engineering team has been notified. 
              Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
