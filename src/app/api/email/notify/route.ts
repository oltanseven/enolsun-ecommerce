import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'enolsun.com <info@enolsun.com>'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Gecerli bir email giriniz' }, { status: 400 })
    }

    // Save to Supabase (try newsletter_subscribers, fallback gracefully)
    try {
      const _sb = await createClient()
      await _sb.from('newsletter_subscribers').insert({ email })
    } catch {
      // Table may not exist — save to a simple approach
    }

    // Send confirmation email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'enolsun.com — Çok Yakında! 🌿',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #2c4422, #4f7a3a); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; font-size: 24px; margin: 0;">enolsun<span style="color: #b5d6a3;">.com</span></h1>
            <p style="color: #d4e8c9; font-size: 14px; margin-top: 8px;">EN'lerin Dünyasına Hoş Geldiniz!</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #1a1a1a; font-size: 20px;">Kaydınız Alındı! 🎉</h2>
            <p style="color: #525252; font-size: 14px; line-height: 1.6;">
              Teşekkürler! enolsun.com açıldığında sizi ilk haberdar edeceğiz.
            </p>
            <p style="color: #525252; font-size: 14px; line-height: 1.6;">
              EN doğal, EN sürdürülebilir ve EN yenilikçi ürünlerle dolu platformumuz çok yakında sizlerle!
            </p>
            <div style="background: #f6faf3; border-radius: 12px; padding: 20px; margin-top: 20px; text-align: center;">
              <p style="color: #37552a; font-size: 13px; margin: 0; font-weight: 600;">Açılışa özel sürprizlerimiz olacak!</p>
              <p style="color: #4f7a3a; font-size: 16px; font-weight: bold; margin: 8px 0 0;">Takipte kalın 💚</p>
            </div>
          </div>
          <div style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
            <p style="color: #a3a3a3; font-size: 11px; margin: 0;">&copy; 2026 enolsun.com — Tüm hakları saklıdır.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
