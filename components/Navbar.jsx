import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight uppercase">MINI SHOP</h1>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-300 uppercase tracking-wide">
            Products
          </Link>
          <Link href="/orders" className="text-sm font-medium hover:text-gray-300 uppercase tracking-wide">
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
}
