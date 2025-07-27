import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Teachers from "@/models/teacherModel";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    const teacher = await Teachers.findById(params.id).select("-passwordHash");
    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }
    return NextResponse.json({ teacher }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    const body = await req.json();
    const { username, name, email, password, age, mobileNo, address, photo } = body;
    const updateData: any = { username, name, email };
    if (password) updateData.passwordHash = password;
    updateData.profile = { age, mobileNo, address, photo };
    const teacher = await Teachers.findByIdAndUpdate(params.id, updateData, { new: true });
    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }
    return NextResponse.json({ teacher }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    await Teachers.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Teacher deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
