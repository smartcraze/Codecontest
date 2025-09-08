export function otpEmailHTML(
  otp: string,
  email: string,
  validitySeconds = 300
) {
  return `
  <html>
    <body style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
      <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color:#1f2937; text-align:center;">🔐 Your  Login Code</h2>
        <p>Hello,</p>
        <p>Use the code below to sign in as <b>${escapeHTML(email)}</b>:</p>
        <div style="text-align:center; margin:20px 0;">
          <span style="font-size:28px; font-weight:bold; letter-spacing:6px; background:#f3f4f6; padding:12px 25px; border-radius:8px; display:inline-block; color:#111827;">
            ${otp}
          </span>
        </div>
        <p style="color:#6b7280; font-size:14px; text-align:center;">
          This code is valid for ~${validitySeconds} seconds.
        </p>
        <p style="color:#9ca3af; font-size:12px; text-align:center;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>
    </body>
  </html>
  `
}

function escapeHTML(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!
  )
}
