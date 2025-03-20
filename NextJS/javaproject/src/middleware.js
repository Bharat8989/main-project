import { clerkMiddleware } from "@clerk/nextjs/server";

console.log("✅ Clerk Middleware is Running...");

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
// import { authMiddleware } from "@clerk/nextjs"

// console.log("✅ Clerk Middleware is Running...")

// export default authMiddleware({
//   // Routes that can be accessed while signed out
//   publicRoutes: [
//     "/",
//     "/java",
//     "/login(.*)",
//     "/signup(.*)",
//     "/installation-setup",
//     "/jvm-jre-jdk",
//     "/basic-java-syntax",
//     "/java-comments",
//     "/java-data-types",
//     "/java-variables",
//     "/java-operators",
//     "/user-input-output",
//     "/if-statement",
//     "/nested-if",
//     "/switch-case",
//   ],
// })

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// }

