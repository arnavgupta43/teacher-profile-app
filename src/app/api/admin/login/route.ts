import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";
connect();
console.log("Hit");
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("No users");
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }
    const validPassword = await admin.matchPassword(password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    const token = admin.createJWT();
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
