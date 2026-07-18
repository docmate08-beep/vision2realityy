import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

// Lazy load top-level applications for massive performance gains (code splitting)
const TheMateApp = React.lazy(() => import('./TheMateApp'));
const V2RApp = React.lazy(() => import('./V2RApp'));

// Fallback loader for Suspense
const GlobalLoader = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={<TheMateApp />} />
            <Route path="/v2r" element={<V2RApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
