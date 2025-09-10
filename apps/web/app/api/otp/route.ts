import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const { token } = await req.json()
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    })
    return NextResponse.json({ message: 'Token set in cookie' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set token in cookie' },
      { status: 500 }
    )
  }
}
