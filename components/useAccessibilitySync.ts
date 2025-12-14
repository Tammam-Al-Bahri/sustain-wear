"use client";

import { useEffect } from "react";

type ThemeMode = "light" | "dark" | "highContrast";
type TextSize = "normal" | "large" | "xlarge";

interface Settings {
  themeMode: ThemeMode;
  textSize: TextSize;
}

export function useAccessibilitySync() {
  useEffect(() => {
    // Apply settings safely (only what is needed)
    const applySettings = (settings: Settings) => {
      /* ---------------- TEXT SIZE ---------------- */
      if (settings.textSize) {
        document.documentElement.style.fontSize =
          settings.textSize === "normal"
            ? "16px"
            : settings.textSize === "large"
            ? "18px"
            : "20px";
      }

      /* ---------------- THEME MODE ---------------- */
      // IMPORTANT:
      // Light mode = DO NOTHING (keep page normal)
      document.body.classList.remove(
        "sw-dark",
        "sw-high-contrast"
      );

      if (settings.themeMode === "dark") {
        document.body.classList.add("sw-dark");
      }

      if (settings.themeMode === "highContrast") {
        document.body.classList.add("sw-high-contrast");
      }
    };

    /* ---------- 1️⃣ Load saved settings on page load ---------- */
    const raw = localStorage.getItem("sustainwear-settings");
    if (raw) {
      try {
        applySettings(JSON.parse(raw));
      } catch {
        // ignore bad data
      }
    }

    /* ---------- 2️⃣ Listen for Apply button broadcast ---------- */
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<Settings>;
      applySettings(customEvent.detail);
    };

    window.addEventListener(
      "sustainwear-settings-updated",
      handler
    );

    return () => {
      window.removeEventListener(
        "sustainwear-settings-updated",
        handler
      );
    };
  }, []);
}
