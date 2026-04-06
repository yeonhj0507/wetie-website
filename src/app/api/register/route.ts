import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function POST(req: NextRequest) {
  // 환경변수 확인
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ID) {
    console.error("Missing env vars:", {
      token: !!process.env.NOTION_TOKEN,
      db: !!process.env.NOTION_DB_ID,
    });
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

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        // Title 컬럼 — Notion DB의 첫 번째 컬럼(Title 타입)
        이름: {
          title: [{ text: { content: name } }],
        },
        학교: {
          rich_text: [{ text: { content: school } }],
        },
        학년: {
          rich_text: [{ text: { content: grade } }],
        },
        연락처: {
          rich_text: [{ text: { content: phone } }],
        },
        이메일: {
          rich_text: [{ text: { content: email } }],
        },
        "참가 동기": {
          rich_text: [{ text: { content: motivation || "" } }],
        },
        신청일시: {
          rich_text: [{ text: { content: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) } }],
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Notion API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
