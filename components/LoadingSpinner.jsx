"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block animate-spin h-10 w-10 border-2 border-black border-t-transparent"></div>
        <p className="mt-4 text-gray-600 text-sm uppercase tracking-wider">Loading...</p>
      </div>
    </div>
  );
}
