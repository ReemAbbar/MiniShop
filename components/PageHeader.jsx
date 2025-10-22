"use client";

export default function PageHeader({ title }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight text-center">
        {title}
      </h1>
    </header>
  );
}
