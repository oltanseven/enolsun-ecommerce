import { NextResponse } from 'next/server'
import { sendShippingNotificationEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email, name, orderId, trackingNumber } = await request.json()
    if (!email || !orderId || !trackingNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const { error } = await sendShippingNotificationEmail(email, name || 'Değerli Müşterimiz', orderId, trackingNumber)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
