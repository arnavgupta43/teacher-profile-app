import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";
import Teachers from "@/models/teacherModel";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const {
      username,
      name,
      email,
      password,
      age,
      mobileNo,
      address,
      photo,
      previousExperience,
      researchInterests,
      publications,
    } = body;
    const profile = {
      photo,
      age,
      mobileNo,
      address,
    };
    if (!username || !name || !email || !password || !age || !mobileNo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const new_Teacher = Teachers.create({
      username,
      name,
      email,
      passwordHash: password,
      profile,
      previousExperience,
      researchInterests,
      publications,
    });
    if (!new_Teacher) {
      return NextResponse.json(
        { msg: "Unable to create Teacher" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { msg: "Teacher created Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating teacher:", error);
    return NextResponse.json(
      { error: "Failed to create teacher" },
      { status: 500 }
    );
  }
}
