import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, school, grade, phone, email, motivation, source, agree } = body;

    // Basic validation
    if (!name || !school || !grade || !phone || !email || !agree) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "올바른 이메일 형식이 아닙니다." }, { status: 400 });
    }

    // TODO: Google Sheets API 또는 DB 연동 시 여기에 추가
    // 예시: await appendToSheet({ name, school, grade, phone, email, motivation, source });

    console.log("New registration:", { name, school, grade, phone, email, motivation, source });

    return NextResponse.json({ success: true, message: "신청이 완료되었습니다." });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
