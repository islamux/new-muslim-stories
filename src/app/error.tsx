'use client';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
