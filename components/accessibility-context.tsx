"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useTheme } from "next-themes";

type TextSize = "normal" | "large" | "xlarge";
type ThemeMode = "light" | "dark" | "highContrast";

export interface AccessibilitySettings {
  textSize: TextSize;
  themeMode: ThemeMode;
  reduceMotion: boolean;
  reduceTransparency: boolean;
  highlightFocus: boolean;
  enableShortcuts: boolean;
  disableAutoplay: boolean;
  simpleInterface: boolean;
}

const defaultSettings: AccessibilitySettings = {
  textSize: "normal",
  themeMode: "light",
  reduceMotion: false,
  reduceTransparency: false,
  highlightFocus: true,
  enableShortcuts: true,
  disableAutoplay: false,
  simpleInterface: false,
};

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null
);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [isReady, setIsReady] = useState(false); // ✅ avoid running effects before we load
  const { setTheme } = useTheme();

  // 1) Load from localStorage once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem("sustainwear-settings");
    if (!raw) {
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
      setSettings((prev) => ({ ...prev, ...parsed }));
    } catch {
      // ignore bad JSON
    } finally {
      setIsReady(true);
    }
  }, []);

  // 2) Apply settings globally whenever they change
  useEffect(() => {
    if (!isReady || typeof document === "undefined") return;

    const root = document.documentElement;

    // --- Text size ---
    root.style.fontSize =
      settings.textSize === "normal"
        ? "16px"
        : settings.textSize === "large"
        ? "18px"
        : "20px";

    // --- Theme for next-themes (light / dark only) ---
    if (settings.themeMode === "highContrast") {
      setTheme("dark");
      document.body.dataset.contrast = "high";
    } else {
      document.body.dataset.contrast = "normal";
      // here settings.themeMode is guaranteed "light" or "dark"
      setTheme(settings.themeMode);
    }

    // --- Extra flags used by CSS if you want ---
    document.body.dataset.reduceMotion = String(settings.reduceMotion);
    document.body.dataset.reduceTransparency = String(
      settings.reduceTransparency
    );
    document.body.dataset.simpleInterface = String(settings.simpleInterface);

    // ✅ expose themeMode for text-colour rules if needed
    document.body.dataset.themeMode = settings.themeMode;

    // --- Persist to localStorage ---
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "sustainwear-settings",
        JSON.stringify(settings)
      );
    }
  }, [isReady, settings, setTheme]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => setSettings(defaultSettings);

  return (
    <AccessibilityContext.Provider
      value={{ settings, updateSetting, resetSettings }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibilitySettings() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibilitySettings must be used inside <AccessibilityProvider>"
    );
  }
  return ctx;
}

