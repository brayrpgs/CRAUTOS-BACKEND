import nodemailer from 'nodemailer'
import { env } from 'process'
const sendEmail = async (email: string, userName: string): Promise<void> => {
  const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_APP_PASS
    }
  })

  await mailer.sendMail({
    from: `CR-AUTOS <${process.env.MAIL_USER as string}>`,
    to: email,
    subject: 'Bienvenido a CR-AUTOS',
    // Plain-text alternative for clients that don't render HTML
    text: `Hola ${userName}!\n\nGracias por unirte a CR-AUTOS. Para completar tu registro, visita: ${process.env.FRONTEND_URL as string}/panel\n\nSi tienes problemas, responde este correo para ayuda.`,
    // HTML template with inline styles for broad email client compatibility
    html: `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </head>
    <body style="margin:0;padding:0;background:#f4f4f7;font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="margin:20px auto;background:#ffffff;border-radius:8px;overflow:hidden;color:#333;">
              <tr>
                <td style="padding:20px 24px;background:#0d6efd;color:#ffffff;text-align:center;">
                  <h1 style="margin:0;font-size:22px;">Bienvenido a CR-AUTOS</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:24px;">
                  <p style="font-size:16px;margin:0 0 12px;">Hola ${userName},</p>
                  <p style="font-size:16px;margin:0 0 20px;">¡Gracias por crear una cuenta en CR-AUTOS! Para disfrutar de todos nuestros servicios, por favor completa tu registro haciendo clic en el botón abajo.</p>
                  <p style="text-align:center;margin:0 0 20px;">
                    <a href="${process.env.FRONTEND_URL as string}/profile" style="display:inline-block;padding:12px 20px;background:#0d6efd;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">Completar registro</a>
                  </p>
                  <p style="font-size:14px;color:#6b7280;margin:0;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                  <p style="font-size:14px;word-break:break-all;"><a href="${process.env.FRONTEND_URL as string}/panel" style="color:#0d6efd;text-decoration:none;">${process.env.FRONTEND_URL as string}/panel</a></p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px;text-align:center;background:#f8fafc;color:#9ca3af;font-size:12px;">
                  © ${new Date().getFullYear()} CR-AUTOS. Todos los derechos reservados.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`
  })
}
export { sendEmail }
