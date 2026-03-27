import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()
    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name required' }, { status: 400 })
    }
    const { error } = await sendWelcomeEmail(email, name)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
