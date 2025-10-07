import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";

/**
 * Development-only route for quick authentication bypass
 * 
 * Usage:
 *   http://localhost:3000/api/dev-login?email=user@example.com&password=yourpassword
 * 
 * This automatically logs you in and redirects to the dashboard
 * 
 * WARNING: This should NEVER be deployed to production!
 */
export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This route is only available in development" },
      { status: 403 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  if (!email || !password) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dev Login</title>
          <style>
            body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
            input { width: 100%; padding: 10px; margin: 10px 0; font-size: 16px; }
            button { width: 100%; padding: 12px; background: #0070f3; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
            button:hover { background: #0051cc; }
            .info { background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>🚀 Development Quick Login</h1>
          <div class="info">
            <p><strong>Note:</strong> This is a development-only tool to bypass the login page.</p>
            <p>Enter the credentials of an existing user in your database.</p>
          </div>
          <form method="GET">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Quick Login</button>
          </form>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  try {
    const { account } = await createAdminClient();

    // Create session with email and password
    const session = await account.createEmailPasswordSession(email, password);

    // Set the session cookie
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false, // Development only
    });

    // Redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error: any) {
    console.error("Dev login error:", error);
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login Error</title>
          <style>
            body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
            .error { background: #fee; border: 1px solid #fcc; padding: 15px; border-radius: 5px; color: #c00; }
            a { display: inline-block; margin-top: 20px; color: #0070f3; }
          </style>
        </head>
        <body>
          <h1>❌ Login Failed</h1>
          <div class="error">
            <strong>Error:</strong> ${error.message || "Invalid credentials"}
            <p>Make sure the email and password match a user in your database.</p>
          </div>
          <a href="/api/dev-login">← Try again</a>
        </body>
      </html>
      `,
      {
        status: 401,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}
