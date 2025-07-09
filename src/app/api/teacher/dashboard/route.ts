import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Teachers from "@/models/teacherModel";
import jwt from "jsonwebtoken";
export async function GET(request: NextRequest) {
  try {
    await connect();
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ msg: "No token provide" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      username: string;
    };
    console.log("Decoded in route:", decoded);
    const teacher = await Teachers.findOne({ username: decoded.username });
    console.log(teacher);
    console.log("Hit");
    if (!teacher) {
      return NextResponse.json({ msg: "Cannot find tecaher" }, { status: 404 });
    }
    return NextResponse.json({ teacher }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
