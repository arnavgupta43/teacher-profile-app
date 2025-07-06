import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Teachers from "@/models/teacherModel";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const teacher = await Teachers.findOne({ email });
    if (!teacher) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }
    const validPassword = await teacher.matchPassword(password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    const token = teacher.createJWT();
    const response = NextResponse.json({ message: "Success" }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
