"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="signup-container">
      <div className="left-section">
        <div className="brand-box">
          {/* <-- This is for our future logo--> */}
          <h1 className="brand-title">SustainWear</h1>
          <p className="brand-tagline">Small actions create big change</p>
        </div>
      </div>

      <div className="right-section">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "clerk-primary-btn",
              card: "clerk-card",
              headerTitle: "clerk-title",
              headerSubtitle: "clerk-subtext",
              formFieldInput: "clerk-input",
              footer: "clerk-footer",
            },
            layout: {
              socialButtonsPlacement: "bottom",
            },
          }}
        />
      </div>
    </div>
  );
}
