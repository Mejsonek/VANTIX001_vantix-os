import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function middleware(request: NextRequest) {
  const correlationId = uuidv4();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Correlation-ID', correlationId);

  console.log(
    `[MIDDLEWARE] ${request.method} ${request.nextUrl.pathname} | correlation_id=${correlationId}`
  );

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Phase 1 mockup mode — Supabase nie jest skonfigurowany → passthrough
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasSupabase) {
    console.log(
      `[MIDDLEWARE] SUPABASE NOT CONFIGURED | path=${request.nextUrl.pathname} | skipping auth (Phase 1 mockup)`
    );
    supabaseResponse.headers.set('X-Correlation-ID', correlationId);
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/crm') ||
    request.nextUrl.pathname.startsWith('/cockpit') ||
    request.nextUrl.pathname.startsWith('/dev') ||
    request.nextUrl.pathname.startsWith('/system');

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login');

  if (!user && isProtectedRoute) {
    console.log(
      `[MIDDLEWARE] UNAUTH | path=${request.nextUrl.pathname} | redirect=/login | correlation_id=${correlationId}`
    );
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isAuthRoute) {
    console.log(
      `[MIDDLEWARE] AUTH | user=${user.email} | redirect=/dashboard | correlation_id=${correlationId}`
    );
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (user) {
    requestHeaders.set('X-User-ID', user.id);
    console.log(
      `[MIDDLEWARE] AUTH | user=${user.email} | path=${request.nextUrl.pathname} | correlation_id=${correlationId}`
    );
  }

  supabaseResponse.headers.set('X-Correlation-ID', correlationId);

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/dashboard',
    '/crm',
    '/cockpit',
    '/dev',
    '/system/:path*',
    '/login',
  ],
};
