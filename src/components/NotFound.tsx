

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center text-white font-sans">
      <div className="max-w-md">
        <h1 className="text-5xl font-semibold mb-4 text-[#F3F4F6]">404</h1>
        <p className="text-[#9CA3AF] mb-8 leading-relaxed text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
