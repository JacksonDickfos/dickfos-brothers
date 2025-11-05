"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0B0C] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-[#a1a1aa] mb-4">{error.message || "An unexpected error occurred"}</p>
        {error.digest && <p className="text-sm text-[#a1a1aa] mb-4">Digest: {error.digest}</p>}
        <button
          onClick={reset}
          className="rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold transition-all hover:bg-[#6EE7F9]/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

