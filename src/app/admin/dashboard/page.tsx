"use client";

import axios from "axios";
import { useEffect } from "react";

export default function AdminDashBoard() {
  useEffect(() => {
    const getAllTeacher = async () => {
      try {
        const response = await axios.get("/api/admin/teacher");
        console.log(response);
        console.log(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllTeacher();
  }, []);
  return <div>Admin DashBoard Loaded sucessfuly</div>;
}
