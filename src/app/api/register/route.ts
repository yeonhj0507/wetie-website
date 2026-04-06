import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = process.env.NOTION_DB_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, school, grade, phone, email, motivation, agree } = await req.json();

    if (!name || !school || !grade || !phone || !email || !agree) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "올바른 이메일 형식이 아닙니다." }, { status: 400 });
    }

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: {
        이름: { title: [{ text: { content: name } }] },
        학교: { rich_text: [{ text: { content: school } }] },
        학년: { select: { name: grade } },
        연락처: { phone_number: phone },
        이메일: { email: email },
        참가동기: { rich_text: [{ text: { content: motivation || "" } }] },
        신청일시: { date: { start: new Date().toISOString() } },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
