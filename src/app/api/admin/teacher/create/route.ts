import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";
import Teachers from "@/models/teacherModel";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const formdata = await req.formData();
    const username = formdata.get("username") as string;
    const name = formdata.get("name") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const ageStr = formdata.get("age") as string;
    const mobileNo = formdata.get("mobileNo") as string;
    const address = formdata.get("address") as string;
    const photo = formdata.get("photo") as string;
    const previousExperience = formdata.get("previousExperience") as string;
    const researchInterests = formdata.getAll("researchInterests") as string[];
    const publications = formdata.getAll("publications") as string[];
    const age = Number(ageStr);

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
