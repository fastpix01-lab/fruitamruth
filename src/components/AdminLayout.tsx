"use client";

import { type ReactNode } from "react";
import AdminGuard from "./AdminGuard";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-gray-50 p-6 md:p-8 overflow-auto pt-6">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
