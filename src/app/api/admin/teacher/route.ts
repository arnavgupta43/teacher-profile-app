import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";
import Teachers from "@/models/teacherModel";
console.log("Hit");
export async function GET() {
  try {
    const allTeacher = await Teachers.find().select(
      "-passwordHash -createdAt -updatedAt"
    );
    console.log(allTeacher);
    if (!allTeacher) {
      return NextResponse.json(
        { msg: "No Teachers in DataBase" },
        { status: 404 }
      );
    }
    return NextResponse.json({ allTeacher }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { msg: "Errror fectching teachers" },
      { status: 500 }
    );
  }
}
