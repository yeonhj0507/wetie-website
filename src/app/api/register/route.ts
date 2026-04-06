import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { sendConfirmEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ID) {
    return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 500 });
  }

  try {
    const { name, school, grade, phone, email, motivation, agree } = await req.json();

    if (!name || !school || !grade || !phone || !email || !agree) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "올바른 이메일 형식이 아닙니다." }, { status: 400 });
    }

    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    // Notion에 저장
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        이름: { title: [{ text: { content: name } }] },
        학교: { rich_text: [{ text: { content: school } }] },
        학년: { select: { name: grade } },
        연락처: { phone_number: phone },
        이메일: { email: email },
        "참가 동기": { rich_text: [{ text: { content: motivation || "" } }] },
        "신청 일시": { date: { start: new Date().toISOString() } },
      },
    });

    // 확인 이메일 발송 (실패해도 신청은 성공 처리)
    if (process.env.RESEND_API_KEY) {
      await sendConfirmEmail({ name, email, school, grade }).catch((err) =>
        console.error("Email send failed:", err)
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Register error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
