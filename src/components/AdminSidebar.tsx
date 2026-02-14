"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "🧃" },
  { href: "/admin/categories", label: "Categories", icon: "📁" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-brand-dark min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍊</span>
          <span className="font-display text-lg font-bold text-white">
            Admin Panel
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              pathname === item.href
                ? "bg-brand-orange text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <p className="text-gray-500 text-xs truncate mb-3 px-2">
          {user?.email}
        </p>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all cursor-pointer"
        >
          <span>🚪</span>
          Sign Out
        </button>
        <Link
          href="/"
          className="mt-1 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
        >
          <span>🌐</span>
          View Site
        </Link>
      </div>
    </aside>
  );
}
