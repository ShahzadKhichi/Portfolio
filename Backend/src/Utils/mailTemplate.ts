function escapeHtml(value: string): string {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatBodyText(value: string): string {
  const trimmed = (value || "").trim();
  if (!trimmed) return "<p style=\"margin:0;color:#64748b;\">No message content provided.</p>";

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed);
  if (looksLikeHtml) {
    return trimmed;
  }

  return escapeHtml(trimmed).replace(/\n/g, "<br />");
}

export function buildContactMessageTemplate(senderEmail: string, senderName: string, message: string): string {
  const safeName = escapeHtml(senderName?.trim() || "Unknown sender");
  const safeEmail = escapeHtml(senderEmail?.trim() || "No email provided");
  const safeMessage = formatBodyText(message || "");
  const sentAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Portfolio Message</title>
      </head>
      <body style="margin:0;padding:0;background:linear-gradient(135deg,#07111f 0%,#0f172a 55%,#111827 100%);font-family:Inter,Segoe UI,Arial,sans-serif;color:#e2e8f0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg,#07111f 0%,#0f172a 55%,#111827 100%);padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:rgba(255,255,255,0.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.35);border-radius:20px;overflow:hidden;box-shadow:0 20px 55px rgba(2,8,23,0.28);">
                <tr>
                  <td style="background:linear-gradient(135deg,#0f766e 0%,#14b8a6 55%,#2dd4bf 100%);padding:28px 32px;color:#ffffff;">
                    <h1 style="margin:0 0 8px;font-size:26px;line-height:1.25;">New message from your portfolio</h1>
                    <p style="margin:0;font-size:14px;opacity:0.95;">A visitor has just sent a message through your contact form.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;">
                    <div style="background:rgba(255,255,255,0.75);border:1px solid rgba(15,118,110,0.16);border-radius:14px;padding:18px 20px;margin-bottom:18px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.55);">
                      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Sender details</p>
                      <p style="margin:4px 0;font-size:15px;color:#0f172a;"><strong>Name:</strong> ${safeName}</p>
                      <p style="margin:4px 0;font-size:15px;color:#0f172a;"><strong>Email:</strong> ${safeEmail}</p>
                      <p style="margin:4px 0;font-size:15px;color:#0f172a;"><strong>Received:</strong> ${sentAt}</p>
                    </div>

                    <div style="background:rgba(255,255,255,0.9);border:1px solid rgba(15,118,110,0.16);border-radius:14px;padding:18px 20px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.55);">
                      <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Message</p>
                      <div style="font-size:15px;line-height:1.7;color:#334155;white-space:pre-wrap;">${safeMessage}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 28px;">
                    <p style="margin:0;font-size:13px;color:#64748b;">Reply directly to this email to respond to the sender.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export function buildOtpTemplate(recipientEmail: string, otp: string, expiresInMinutes: number): string {
  const safeEmail = escapeHtml(recipientEmail?.trim() || "your email");
  const safeOtp = escapeHtml(otp || "000000");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Password Reset OTP</title>
      </head>
      <body style="margin:0;padding:0;background:linear-gradient(135deg,#07111f 0%,#0f172a 55%,#111827 100%);font-family:Inter,Segoe UI,Arial,sans-serif;color:#e2e8f0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg,#07111f 0%,#0f172a 55%,#111827 100%);padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:rgba(255,255,255,0.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.35);border-radius:20px;overflow:hidden;box-shadow:0 20px 55px rgba(2,8,23,0.28);">
                <tr>
                  <td style="background:linear-gradient(135deg,#0f766e 0%,#14b8a6 55%,#2dd4bf 100%);padding:28px 32px;color:#ffffff;">
                    <h1 style="margin:0 0 8px;font-size:26px;line-height:1.25;">Admin password reset request</h1>
                    <p style="margin:0;font-size:14px;opacity:0.95;">Use the secure code below to continue resetting your admin password.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 10px;font-size:15px;color:#334155;">Hello ${safeEmail},</p>
                    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155;">We received a request to reset the admin password for your portfolio dashboard. Enter the one-time code below to verify your identity.</p>

                    <div style="background:#f8fafc;border:1px solid #dbeafe;border-radius:14px;padding:18px;text-align:center;margin:18px 0;">
                      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">One-time code</p>
                      <div style="font-size:34px;font-weight:700;letter-spacing:0.25em;color:#0f172a;">${safeOtp}</div>
                    </div>

                    <p style="margin:0 0 10px;font-size:14px;color:#64748b;">This code expires in ${expiresInMinutes} minutes.</p>
                    <p style="margin:0;font-size:13px;color:#64748b;">If you did not request this change, you can safely ignore this email.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
