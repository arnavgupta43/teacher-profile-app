"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/admin/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Logout failed");
    }
  };
  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />
      <aside className="w-60 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="block hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/teacher/create" className="block hover:underline">
            Create Teacher
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 text-left hover:underline"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-x-auto">{children}</main>
    </div>
  );
}
