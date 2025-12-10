"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="signup-container">
      <div className="left-section">
        <div className="brand-box">
          <h1 className="brand-title">Welcome Back</h1>
          <p className="brand-tagline">Login to continue</p>
        </div>
      </div>

      <div className="right-section">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "clerk-primary-btn",
              card: "clerk-card",
              headerTitle: "clerk-title",
              headerSubtitle: "clerk-subtext",
              formFieldInput: "clerk-input",
              footer: "clerk-footer",
            },
          }}
        />
      </div>
    </div>
  );
}
