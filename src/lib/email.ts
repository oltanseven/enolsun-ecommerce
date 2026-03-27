import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'enolsun.com <onboarding@resend.dev>'
// Domain verify edildiğinde: 'enolsun.com <info@enolsun.com>'

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'enolsun.com\'a Hoş Geldiniz! 🌿',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #2c4422, #4f7a3a); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; font-size: 24px; margin: 0;">enolsun<span style="color: #b5d6a3;">.com</span></h1>
          <p style="color: #d4e8c9; font-size: 14px; margin-top: 8px;">EN'lerin Dünyasına Hoş Geldiniz!</p>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a1a1a; font-size: 20px;">Merhaba ${name}! 👋</h2>
          <p style="color: #525252; font-size: 14px; line-height: 1.6;">
            enolsun.com ailesine katıldığınız için çok mutluyuz! EN doğal, EN sürdürülebilir ve EN yenilikçi ürünlerle dolu dünyamızı keşfetmeye hazır mısınız?
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://enolsun.com/products" style="background: #4f7a3a; color: white; padding: 12px 30px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">Ürünleri Keşfet</a>
          </div>
          <div style="background: #f6faf3; border-radius: 12px; padding: 20px; margin-top: 20px;">
            <p style="color: #37552a; font-size: 13px; margin: 0; font-weight: 600;">İlk alışverişinize özel:</p>
            <p style="color: #4f7a3a; font-size: 20px; font-weight: bold; margin: 8px 0;">%10 İndirim</p>
            <p style="color: #525252; font-size: 12px; margin: 0;">Kupon kodu: <strong>HOSGELDIN</strong></p>
          </div>
        </div>
        <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="color: #a3a3a3; font-size: 11px; margin: 0;">&copy; 2026 enolsun.com — Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  })
}

export async function sendOrderConfirmationEmail(to: string, name: string, orderId: string, total: string, items: { name: string; quantity: number; price: string }[]) {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #1a1a1a;">${item.name}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #525252; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #1a1a1a; text-align: right; font-weight: 600;">${item.price} TL</td>
    </tr>
  `).join('')

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Siparişiniz Alındı! #${orderId.slice(0, 8).toUpperCase()} 🎉`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #2c4422, #4f7a3a); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; font-size: 24px; margin: 0;">enolsun<span style="color: #b5d6a3;">.com</span></h1>
        </div>
        <div style="padding: 30px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 60px; height: 60px; background: #dcfce7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
              <span style="font-size: 28px;">✓</span>
            </div>
          </div>
          <h2 style="color: #1a1a1a; font-size: 20px; text-align: center;">Siparişiniz Başarıyla Alındı!</h2>
          <p style="color: #525252; font-size: 14px; text-align: center;">Merhaba ${name}, siparişiniz hazırlanmaya başladı.</p>

          <div style="background: #f6faf3; border-radius: 12px; padding: 15px 20px; margin: 20px 0;">
            <p style="color: #37552a; font-size: 13px; margin: 0;"><strong>Sipariş No:</strong> #${orderId.slice(0, 8).toUpperCase()}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 8px 0; border-bottom: 2px solid #e5e5e5; font-size: 12px; color: #a3a3a3;">Ürün</th>
                <th style="text-align: center; padding: 8px 0; border-bottom: 2px solid #e5e5e5; font-size: 12px; color: #a3a3a3;">Adet</th>
                <th style="text-align: right; padding: 8px 0; border-bottom: 2px solid #e5e5e5; font-size: 12px; color: #a3a3a3;">Tutar</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <div style="text-align: right; margin-top: 10px;">
            <p style="color: #1a1a1a; font-size: 18px; font-weight: bold;">Toplam: ${total} TL</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://enolsun.com/orders" style="background: #4f7a3a; color: white; padding: 12px 30px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">Siparişimi Takip Et</a>
          </div>
        </div>
        <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="color: #a3a3a3; font-size: 11px; margin: 0;">&copy; 2026 enolsun.com — Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  })
}

export async function sendShippingNotificationEmail(to: string, name: string, orderId: string, trackingNumber: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Siparişiniz Kargoya Verildi! 📦 #${orderId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #2c4422, #4f7a3a); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; font-size: 24px; margin: 0;">enolsun<span style="color: #b5d6a3;">.com</span></h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a1a1a; font-size: 20px;">Siparişiniz Yola Çıktı! 🚚</h2>
          <p style="color: #525252; font-size: 14px;">Merhaba ${name}, #${orderId.slice(0, 8).toUpperCase()} numaralı siparişiniz kargoya verildi.</p>
          <div style="background: #f6faf3; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="color: #37552a; font-size: 13px; margin: 0 0 8px;"><strong>Takip Numarası:</strong></p>
            <p style="color: #4f7a3a; font-size: 18px; font-weight: bold; margin: 0; letter-spacing: 1px;">${trackingNumber}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://enolsun.com/orders" style="background: #4f7a3a; color: white; padding: 12px 30px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">Kargom Nerede?</a>
          </div>
        </div>
        <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="color: #a3a3a3; font-size: 11px; margin: 0;">&copy; 2026 enolsun.com — Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Şifre Sıfırlama — enolsun.com 🔐',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #2c4422, #4f7a3a); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; font-size: 24px; margin: 0;">enolsun<span style="color: #b5d6a3;">.com</span></h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a1a1a; font-size: 20px;">Şifre Sıfırlama Talebi</h2>
          <p style="color: #525252; font-size: 14px; line-height: 1.6;">Şifrenizi sıfırlamak için aşağıdaki butona tıklayın. Bu link 1 saat geçerlidir.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: #4f7a3a; color: white; padding: 12px 30px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">Şifremi Sıfırla</a>
          </div>
          <p style="color: #a3a3a3; font-size: 12px;">Bu talebi siz yapmadıysanız, bu emaili görmezden gelebilirsiniz.</p>
        </div>
        <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="color: #a3a3a3; font-size: 11px; margin: 0;">&copy; 2026 enolsun.com — Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  })
}
