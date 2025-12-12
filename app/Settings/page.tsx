"use client";

import React, { useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark" | "highContrast";
type TextSize = "normal" | "large" | "xlarge";

interface Settings {
  themeMode: ThemeMode;
  textSize: TextSize;
  reduceMotion: boolean;
  reduceTransparency: boolean;
  highlightFocus: boolean;
  enableShortcuts: boolean;
  disableAutoplay: boolean;
  simpleInterface: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  themeMode: "light",
  textSize: "normal",
  reduceMotion: false,
  reduceTransparency: false,
  highlightFocus: false,
  enableShortcuts: false,
  disableAutoplay: false,
  simpleInterface: false,
};

function getPageTheme(mode: ThemeMode) {
  switch (mode) {
    case "light":
      return {
        pageBg: "bg-[#C8D5B9]",
        pageText: "text-[#2D5016]",
        panelBg: "bg-white",
        panelText: "text-[#2D5016]",
        cardBorder: "border-[#A8C090]",
        selectBg: "bg-white",
        selectText: "text-[#2D5016]",
        buttonBg: "bg-[#2D5016]",
        buttonText: "text-white",
        buttonActive: "bg-emerald-100 border-emerald-500",
      };

    case "dark":
      return {
        pageBg: "bg-slate-900",
        pageText: "text-white",
        panelBg: "bg-slate-800",
        panelText: "text-white",
        cardBorder: "border-slate-700",
        selectBg: "bg-slate-700",
        selectText: "text-white",
        buttonBg: "bg-emerald-600",
        buttonText: "text-white",
        buttonActive: "bg-slate-700 border-emerald-500",
      };

    case "highContrast":
      return {
        pageBg: "bg-white",
        pageText: "text-black",
        panelBg: "bg-white",
        panelText: "text-black",
        cardBorder: "border-black",
        selectBg: "bg-white",
        selectText: "text-black font-bold",
        buttonBg: "bg-black",
        buttonText: "text-white font-bold",
        buttonActive: "bg-white border-black text-black",
      };
  }
}

function getTextSizeClass(size: TextSize) {
  switch (size) {
    case "normal":
      return "text-base";
    case "large":
      return "text-lg";
    case "xlarge":
      return "text-xl";
  }
}

export default function SettingsPage() {
  const [committedSettings, setCommittedSettings] =
    useState<Settings>(DEFAULT_SETTINGS);
  const [draftSettings, setDraftSettings] =
    useState<Settings>(DEFAULT_SETTINGS);

  const [saved, setSaved] = useState<string | null>(null);
  useEffect(() => {
    const raw = localStorage.getItem("sustainwear-settings");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Settings;


      setCommittedSettings(parsed);
      setDraftSettings(parsed);
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
  }, []);

  
  const theme = useMemo(
    () => getPageTheme(draftSettings.themeMode),
    [draftSettings.themeMode]
  );
  const textSizeClass = useMemo(
    () => getTextSizeClass(draftSettings.textSize),
    [draftSettings.textSize]
  );

  const updateDraft = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setDraftSettings((prev) => ({ ...prev, [key]: value }));
  };

  
  const handleApply = () => {
    localStorage.setItem("sustainwear-settings", JSON.stringify(draftSettings));
    setCommittedSettings(draftSettings);
    window.dispatchEvent(
  new CustomEvent("sustainwear-settings-updated", {
    detail: draftSettings,
  })
);


    setSaved("Settings applied ✓");
    setTimeout(() => setSaved(null), 2000);
  };

  
  const handleResetDraft = () => {
    setDraftSettings(committedSettings);
    setSaved("Changes reset ✓");
    setTimeout(() => setSaved(null), 2000);
  };

  
  const handleResetDefaults = () => {
    localStorage.setItem("sustainwear-settings", JSON.stringify(DEFAULT_SETTINGS));
    setDraftSettings(DEFAULT_SETTINGS);
    setCommittedSettings(DEFAULT_SETTINGS);

    setSaved("Reset to default ✓");
    setTimeout(() => setSaved(null), 2000);
  };

  const hasUnsavedChanges =
    JSON.stringify(draftSettings) !== JSON.stringify(committedSettings);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme.pageBg} ${theme.pageText}`}
    >
      

      <main className={`mx-auto max-w-6xl px-4 py-10 ${textSizeClass}`}>
        
        <section
          className={`rounded-3xl border-2 p-6 shadow-md ${theme.panelBg} ${theme.panelText} ${theme.cardBorder}`}
        >
          <h1 className="text-2xl font-extrabold">Accessibility & Settings</h1>
          <p className="mt-2 text-sm opacity-80">
            Change how SustainWear looks and feels. Your changes will only affect
            other pages after you press <span className="font-semibold">Apply settings</span>.
          </p>

          {hasUnsavedChanges && (
            <p className="mt-3 text-sm font-semibold">
              You have unsaved changes.
            </p>
          )}
        </section>

        
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          
          <div
            className={`rounded-3xl border-2 p-6 shadow-lg ${theme.panelBg} ${theme.panelText} ${theme.cardBorder}`}
          >
            <h2 className="text-lg font-bold">Theme & appearance</h2>
            <p className="mt-1 text-sm opacity-70">
              Choose text size and theme mode.
            </p>

            <div className="mt-6 space-y-5">
              
              <div>
                <p className="text-sm font-semibold mb-2">Text size</p>
                <select
                  value={draftSettings.textSize}
                  onChange={(e) =>
                    updateDraft("textSize", e.target.value as TextSize)
                  }
                  className={`w-full rounded-xl border-2 px-3 py-2 transition ${theme.selectBg} ${theme.selectText} ${theme.cardBorder}`}
                >
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra large</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Theme mode</p>

                <div className="space-y-2">
                  <ThemeOption
                    active={draftSettings.themeMode === "light"}
                    label="Light mode"
                    onClick={() => updateDraft("themeMode", "light")}
                    theme={theme}
                  />
                  <ThemeOption
                    active={draftSettings.themeMode === "dark"}
                    label="Dark mode"
                    onClick={() => updateDraft("themeMode", "dark")}
                    theme={theme}
                  />
                  <ThemeOption
                    active={draftSettings.themeMode === "highContrast"}
                    label="High contrast"
                    onClick={() => updateDraft("themeMode", "highContrast")}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border-2 p-6 shadow-lg ${theme.panelBg} ${theme.panelText} ${theme.cardBorder}`}
          >
            <h2 className="text-lg font-bold">Accessibility controls</h2>
            <p className="mt-1 text-sm opacity-70">
              Motion, keyboard and cognitive support.
            </p>

            <div className="mt-6 space-y-4">
              <ToggleRow
                label="Reduce motion"
                value={draftSettings.reduceMotion}
                onChange={(v) => updateDraft("reduceMotion", v)}
              />
              <ToggleRow
                label="Reduce transparency"
                value={draftSettings.reduceTransparency}
                onChange={(v) => updateDraft("reduceTransparency", v)}
              />
              <ToggleRow
                label="Highlight keyboard focus"
                value={draftSettings.highlightFocus}
                onChange={(v) => updateDraft("highlightFocus", v)}
              />
              <ToggleRow
                label="Enable shortcuts"
                value={draftSettings.enableShortcuts}
                onChange={(v) => updateDraft("enableShortcuts", v)}
              />
              <ToggleRow
                label="Disable autoplay"
                value={draftSettings.disableAutoplay}
                onChange={(v) => updateDraft("disableAutoplay", v)}
              />
              <ToggleRow
                label="Simplified interface"
                value={draftSettings.simpleInterface}
                onChange={(v) => updateDraft("simpleInterface", v)}
              />
            </div>
          </div>
        </div>

        
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={handleApply}
            className={`rounded-full px-6 py-3 font-semibold transition hover:opacity-90 ${theme.buttonBg} ${theme.buttonText}`}
          >
            Apply settings
          </button>

          <button
            onClick={handleResetDraft}
            className={`rounded-full px-6 py-3 font-semibold transition hover:opacity-90 border-2 ${theme.cardBorder}`}
          >
            Undo changes
          </button>

          <button
            onClick={handleResetDefaults}
            className={`rounded-full px-6 py-3 font-semibold transition hover:opacity-90 border-2 ${theme.cardBorder}`}
          >
            Reset to default
          </button>
        </div>

        {saved && (
          <p className="mt-3 text-sm font-semibold" aria-live="polite">
            {saved}
          </p>
        )}
      </main>
    </div>
  );
}

interface ThemeOptionProps {
  label: string;
  active: boolean;
  onClick: () => void;
  theme: ReturnType<typeof getPageTheme>;
}

function ThemeOption({ label, active, onClick, theme }: ThemeOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition
        ${active ? theme.buttonActive : theme.cardBorder}
      `}
    >
      <p className="font-semibold">{label}</p>
    </button>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black/5 px-3 py-2">
      <p className="text-sm font-medium">{label}</p>

      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition ${
          value ? "bg-emerald-500" : "bg-gray-400"
        }`}
        aria-label={label}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            value ? "left-5" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
