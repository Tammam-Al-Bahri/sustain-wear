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
  const [isReady, setIsReady] = useState(false); 
  const { setTheme } = useTheme();

  
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
      
    } finally {
      setIsReady(true);
    }
  }, []);

  
  useEffect(() => {
    if (!isReady || typeof document === "undefined") return;

    const root = document.documentElement;

    
    root.style.fontSize =
      settings.textSize === "normal"
        ? "16px"
        : settings.textSize === "large"
        ? "18px"
        : "20px";

    
    if (settings.themeMode === "highContrast") {
      setTheme("dark");
      document.body.dataset.contrast = "high";
    } else {
      document.body.dataset.contrast = "normal";
      
      setTheme(settings.themeMode);
    }

    
    document.body.dataset.reduceMotion = String(settings.reduceMotion);
    document.body.dataset.reduceTransparency = String(
      settings.reduceTransparency
    );
    document.body.dataset.simpleInterface = String(settings.simpleInterface);

    
    document.body.dataset.themeMode = settings.themeMode;

    
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

