import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const { pathname } = req.nextUrl

  // if (pathname === '/' && !token) {
  //   return NextResponse.redirect(new URL('/signin', req.url))
  // }

  if (pathname === '/signin' && token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/signin'],
}
