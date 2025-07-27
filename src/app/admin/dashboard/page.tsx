"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Teacher {
  _id: string;
  username: string;
  name: string;
  email: string;
}

export default function AdminDashBoard() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("/api/admin/teacher");
      setTeachers(res.data.allTeacher);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this teacher?")) return;
    try {
      await axios.delete(`/api/admin/teacher/${id}`);
      toast.success("Teacher deleted");
      fetchTeachers();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Teachers</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t._id}>
              <td className="border px-2 py-1">{t.name}</td>
              <td className="border px-2 py-1">{t.email}</td>
              <td className="border px-2 py-1 space-x-2">
                <Link
                  href={`/admin/teacher/${t._id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
