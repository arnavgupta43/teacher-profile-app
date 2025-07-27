"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditTeacher({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    age: "",
    mobileNo: "",
    address: "",
    photo: "",
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`/api/admin/teacher/${id}`);
        const t = res.data.teacher;
        setForm({
          username: t.username || "",
          name: t.name || "",
          email: t.email || "",
          password: "",
          age: String(t.profile?.age || ""),
          mobileNo: t.profile?.mobileNo || "",
          address: t.profile?.address || "",
          photo: t.profile?.photo || "",
        });
      } catch (err: any) {
        toast.error("Failed to load teacher");
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      let photoUrl = form.photo;
      if (photoFile) {
        const uploadData = new FormData();
        uploadData.append("file", photoFile);
        const uploadRes = await axios.post("/api/upload", uploadData);
        photoUrl = uploadRes.data.imageUrl;
      }
      const body = {
        ...form,
        age: Number(form.age),
        photo: photoUrl,
      };
      await axios.patch(`/api/admin/teacher/${id}`, body);
      toast.success("Teacher updated");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Teacher</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="mobileNo"
          placeholder="Mobile"
          value={form.mobileNo}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input type="file" onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)} />
        <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">
          {saving ? "Saving..." : "Update"}
        </button>
      </form>
    </div>
  );
}
