"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

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
  isReady: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null
);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const raw = localStorage.getItem("sustainwear-settings");
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
          setSettings((prev) => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsReady(true);
      }
    };

    loadSettings();
  }, []);

  // Apply settings to the DOM whenever they change
  useEffect(() => {
    if (!isReady) return;

    const applySettings = () => {
      const root = document.documentElement;
      const body = document.body;

      // Apply text size to root element
      root.style.fontSize =
        settings.textSize === "normal"
          ? "16px"
          : settings.textSize === "large"
          ? "18px"
          : "20px";

      // Apply theme mode classes to body
      body.classList.remove("theme-light", "theme-dark", "theme-high-contrast");
      
      if (settings.themeMode === "light") {
        body.classList.add("theme-light");
      } else if (settings.themeMode === "dark") {
        body.classList.add("theme-dark");
      } else if (settings.themeMode === "highContrast") {
        body.classList.add("theme-high-contrast");
      }

      // Apply accessibility settings as data attributes
      body.dataset.reduceMotion = String(settings.reduceMotion);
      body.dataset.reduceTransparency = String(settings.reduceTransparency);
      body.dataset.highlightFocus = String(settings.highlightFocus);
      body.dataset.simpleInterface = String(settings.simpleInterface);
      body.dataset.themeMode = settings.themeMode;
      body.dataset.textSize = settings.textSize;

      // Apply CSS custom properties for easier access
      root.style.setProperty('--text-size', settings.textSize);
      root.style.setProperty('--theme-mode', settings.themeMode);

      // Save to localStorage
      try {
        localStorage.setItem("sustainwear-settings", JSON.stringify(settings));
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    };

    applySettings();
  }, [isReady, settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("sustainwear-settings", JSON.stringify(defaultSettings));
  };

  return (
    <AccessibilityContext.Provider
      value={{ settings, updateSetting, resetSettings, isReady }}
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