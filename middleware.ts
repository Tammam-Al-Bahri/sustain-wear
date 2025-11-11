import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isCharityRoute = createRouteMatcher(["/charity-staff(.*)"]);
const isDonorRoute = createRouteMatcher(["/donor(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata?.role;
  const currentPath = req.nextUrl.pathname;

  //  1. If NOT logged in, allow homepage and block protected routes
  if (!userId) {
    if (isAdminRoute(req) || isCharityRoute(req)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next(); // allow access to home
  }

  //  2. If logged in and on homepage → send to correct role page
  if (currentPath === "/") {
    if (userRole === "admin") return NextResponse.redirect(new URL("/admin", req.url));
    if (userRole === "charity-staff") return NextResponse.redirect(new URL("/charity-staff", req.url));
    if (userRole === "donor") return NextResponse.redirect(new URL("/donor", req.url));
       // or redirect to /donor if you add a donor page later
  }

  //  3. Protect admin routes
  if (isAdminRoute(req) && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //  4. Protect charity-staff routes (allow admin too)
  if (isCharityRoute(req) && userRole !== "charity-staff" && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //  5. Protect donor routes (allow admin too)
  if (isDonorRoute(req) && userRole !== "donor" && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
 

  return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
