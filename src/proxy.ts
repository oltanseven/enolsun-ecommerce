import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Customer-protected routes
const CUSTOMER_PROTECTED_ROUTES = [
  '/profile',
  '/orders',
  '/wishlist',
  '/coupons',
  '/reviews',
  '/cards',
]

// Seller-protected routes
const SELLER_PROTECTED_ROUTES = [
  '/seller-dashboard',
  '/seller-orders',
  '/seller-products',
  '/seller-add-product',
  '/seller-messages',
  '/seller-finance',
  '/seller-stats',
  '/seller-settings',
]

// Auth pages for logged-in customers
const CUSTOMER_AUTH_ROUTES = ['/login', '/register']

// Auth pages for logged-in sellers
const SELLER_AUTH_ROUTES = ['/seller-login', '/seller-register']

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — important for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protect customer routes — redirect to /login if no session
  if (CUSTOMER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Protect seller routes — redirect to /seller-login if no session
  if (SELLER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/seller-login'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from customer auth pages
  if (CUSTOMER_AUTH_ROUTES.some((route) => pathname === route)) {
    if (user) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in sellers away from seller auth pages
  if (SELLER_AUTH_ROUTES.some((route) => pathname === route)) {
    if (user) {
      const url = request.nextUrl.clone()
      url.pathname = '/seller-dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (svg, png, jpg, jpeg, gif, webp, ico)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
