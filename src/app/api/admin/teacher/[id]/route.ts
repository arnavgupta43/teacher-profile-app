import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";
import Teachers from "@/models/teacherModel";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const teacher = await Teachers.findById(params.id);
    if (!teacher) {
      return NextResponse.json(
        { msg: "Teacher does not exist" },
        { status: 404 }
      );
    }
    console.log(teacher);
    return NextResponse.json({ teacher }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: "Cannot get Teacher" }, { status: 500 });
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const body = await req.json();
    const update = {
      ...(body.name && { name: body.name }),
      ...(body.email && { email: body.email }),
      ...(body.password && { passwordHash: body.password }),
      ...(body.publications && { "profile.publications": body.publications }),
      ...(body.researchInterests && {
        "profile.researchInterests": body.researchInterests,
      }),
      ...(body.previousExperience && {
        "profile.previousExperience": body.previousExperience,
      }),
    };
    const updated = await Teachers.findByIdAndUpdate(params.id, update, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(
      { msg: "Teacher updated", teacher: updated },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ msg: "Cannot update Teacher" }, { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const deleted = await Teachers.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ msg: "Teacher Not Found" }, { status: 400 });
    }
    return NextResponse.json({ msg: "Teacher Deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: "Cannot delete Teacher" }, { status: 500 });
  }
}
