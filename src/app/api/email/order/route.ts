import { NextResponse } from 'next/server'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email, name, orderId, total, items } = await request.json()
    if (!email || !orderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const { error } = await sendOrderConfirmationEmail(email, name || 'Değerli Müşterimiz', orderId, total, items || [])
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
