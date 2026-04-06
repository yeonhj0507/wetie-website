import { Resend } from "resend";

export async function sendConfirmEmail({
  name,
  email,
  school,
  grade,
}: {
  name: string;
  email: string;
  school: string;
  grade: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "WeTIE 산업경영공학 캠프 <onboarding@resend.dev>",
    to: email,
    subject: "[WeTIE] 산업경영공학 캠프 신청이 완료되었습니다",
    html: `
      <!DOCTYPE html>
      <html lang="ko">
      <head><meta charset="UTF-8" /></head>
      <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Apple SD Gothic Neo',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
          <tr><td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#8B1A2A,#4A2040);padding:32px 40px;">
                  <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase;">WeTIE · 고려대학교 산업경영공학부</p>
                  <h1 style="margin:10px 0 0;font-size:22px;font-weight:800;color:#ffffff;">신청이 완료되었습니다 🎉</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:36px 40px;">
                  <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.7;">
                    안녕하세요, <strong>${name}</strong>님!<br/>
                    <strong>2026년 WeTIE 산업경영공학 캠프</strong> 참가 신청이 완료되었습니다.
                  </p>

                  <!-- Info box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:12px;margin-bottom:28px;">
                    <tr><td style="padding:24px 28px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${[
                          ["신청자", `${name} (${school} ${grade})`],
                          ["이메일", email],
                          ["행사 일시", "2026년 5월 10일 (일) 13:00 – 18:00"],
                          ["장소", "고려대학교 (세부 장소 추후 공지)"],
                          ["참가비", "무료"],
                        ]
                          .map(
                            ([label, value]) => `
                          <tr>
                            <td style="padding:6px 0;font-size:13px;color:#999;width:90px;vertical-align:top;">${label}</td>
                            <td style="padding:6px 0;font-size:13px;color:#222;font-weight:600;">${value}</td>
                          </tr>`
                          )
                          .join("")}
                      </table>
                    </td></tr>
                  </table>

                  <p style="margin:0;font-size:13px;color:#888;line-height:1.8;">
                    추가 안내는 행사 전 이메일로 발송될 예정입니다.<br/>
                    문의사항은 <a href="mailto:wetie.ku@gmail.com" style="color:#8B1A2A;">wetie.ku@gmail.com</a>으로 연락해 주세요.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:20px 40px;background:#fafafa;border-top:1px solid #eee;">
                  <p style="margin:0;font-size:11px;color:#bbb;">
                    © 2026 WeTIE — 고려대학교 산업경영공학부 학생 단체
                  </p>
                </td>
              </tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}
