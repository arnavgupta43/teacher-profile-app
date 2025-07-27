"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateTeacher() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    age: "",
    mobileNo: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let photoUrl = "";
      if (photoFile) {
        const uploadData = new FormData();
        uploadData.append("file", photoFile);
        const uploadRes = await axios.post("/api/upload", uploadData);
        photoUrl = uploadRes.data.imageUrl;
      }
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      data.append("photo", photoUrl);
      await axios.post("/api/admin/teacher/create", data);
      toast.success("Teacher created");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to create teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create Teacher</h1>
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
        <input
          type="file"
          onChange={(e) =>
            setPhotoFile(e.target.files ? e.target.files[0] : null)
          }
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Create"}
        </button>
      </form>
    </div>
  );
}
