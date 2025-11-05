import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'

// The route matcher defines routes that should be protected
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isCharityRoute = createRouteMatcher(['/charity-staff(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Fetch the user's role from the session claims
  const userRole = (await auth()).sessionClaims?.metadata?.role

  // Protect all routes starting with `/admin`
  if (isAdminRoute(req) && !(userRole === 'admin')) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
  if (isCharityRoute(req) && !(userRole === 'charity staff' || userRole === 'admin')) {
      return NextResponse.redirect(new URL('/', req.url))

  }

  return NextResponse.next()
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
