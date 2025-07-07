import { NextResponse } from "next/server";
import Teachers from "@/models/teacherModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET() {
  try {
    await connect();
    const teacherObj = {
      username: "benson",
      name: "Benson K Money",
      email: "benson@gmail.com",
      passwordHash: "password123",
      profile: {
        mobileNo: "1234",
        age: 30,
        previousExperience: "Mysore College of Engineering",
        researchInterests: ["Materials"],
      },
    };

    const teacherOne = await Teachers.create(teacherObj);
    return NextResponse.json({ success: true, data: teacherOne });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
