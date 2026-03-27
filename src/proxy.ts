import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Customer-protected routes
const CUSTOMER_PROTECTED_ROUTES = [
  '/dashboard',
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

// Admin-protected routes
const ADMIN_PROTECTED_ROUTES = [
  '/admin-dashboard',
  '/admin-users',
  '/admin-products',
  '/admin-orders',
  '/admin-categories',
  '/admin-coupons',
]

// Auth pages for logged-in customers
const CUSTOMER_AUTH_ROUTES = ['/login', '/register']

// Auth pages for logged-in sellers
const SELLER_AUTH_ROUTES = ['/seller-login', '/seller-register']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Maintenance mode — redirect all public traffic to /maintenance
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE || process.env.MAINTENANCE_MODE
  if (maintenanceMode === 'true') {
    // Allow maintenance page itself, static assets, API, and admin/seller login
    const allowed = ['/maintenance', '/_next', '/favicon.ico', '/api', '/seller-login', '/seller-dashboard', '/admin-dashboard']
    if (!allowed.some(p => pathname.startsWith(p))) {
      const url = request.nextUrl.clone()
      url.pathname = '/maintenance'
      return NextResponse.redirect(url)
    }
  }

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

  // Protect customer routes — redirect to /login if no session
  if (CUSTOMER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    // Prevent seller users from accessing customer-only routes
    const role = user.user_metadata?.role
    if (role === 'seller') {
      const url = request.nextUrl.clone()
      url.pathname = '/seller-dashboard'
      return NextResponse.redirect(url)
    }
  }

  // Protect seller routes — redirect to /seller-login if no session or wrong role
  if (SELLER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/seller-login'
      return NextResponse.redirect(url)
    }
    // Prevent non-seller users from accessing seller routes
    const role = user.user_metadata?.role
    if (role !== 'seller') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // Protect admin routes — redirect to /login if no session or wrong role
  if (ADMIN_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    // Must be admin or seller (temporary until dedicated admin user exists)
    const role = user.user_metadata?.role
    if (role !== 'admin' && role !== 'seller') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from customer auth pages
  if (CUSTOMER_AUTH_ROUTES.some((route) => pathname === route)) {
    if (user) {
      const role = user.user_metadata?.role
      const url = request.nextUrl.clone()
      url.pathname = role === 'seller' ? '/seller-dashboard' : '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in sellers away from seller auth pages
  if (SELLER_AUTH_ROUTES.some((route) => pathname === route)) {
    if (user) {
      const role = user.user_metadata?.role
      const url = request.nextUrl.clone()
      url.pathname = role === 'seller' ? '/seller-dashboard' : '/dashboard'
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
