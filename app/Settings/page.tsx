"use client";

import React from "react";

// Mock context for demo - replace with your actual context
const AccessibilityContext = React.createContext({
  settings: {
    themeMode: "light",
    textSize: "normal",
    reduceMotion: true,
    reduceTransparency: true,
    highlightFocus: true,
    enableShortcuts: true,
    disableAutoplay: true,
    simpleInterface: true,
  },
  updateSetting: (key: string, value: any) => {},
});

function useAccessibilitySettings() {
  const context = React.useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibilitySettings must be used within AccessibilityProvider");
  }
  return context;
}

// Improved theme function with better color contrast
function getPageTheme(mode: "light" | "dark" | "highContrast") {
  switch (mode) {
    case "light":
      return {
        pageBg: "bg-emerald-50",
        pageText: "text-emerald-900",
        navBg: "bg-white",
        navText: "text-emerald-900",
        panelBg: "bg-white",
        panelText: "text-emerald-900",
        navChip: "bg-emerald-600 text-white hover:bg-emerald-700",
        cardBorder: "border-emerald-200",
        selectBg: "bg-white",
        selectText: "text-emerald-900",
        buttonBg: "bg-emerald-600",
        buttonText: "text-white",
      };

    case "dark":
      return {
        pageBg: "bg-slate-900",
        pageText: "text-white",
        navBg: "bg-slate-800",
        navText: "text-white",
        panelBg: "bg-slate-800",
        panelText: "text-white",
        navChip: "bg-emerald-500 text-slate-900 hover:bg-emerald-400",
        cardBorder: "border-slate-700",
        selectBg: "bg-slate-700",
        selectText: "text-white",
        buttonBg: "bg-emerald-600",
        buttonText: "text-white",
      };

    case "highContrast":
      return {
        pageBg: "bg-white",
        pageText: "text-black",
        navBg: "bg-white border-b-4 border-black",
        navText: "text-black font-bold",
        panelBg: "bg-white border-4 border-black",
        panelText: "text-black font-semibold",
        navChip: "bg-black text-white font-bold border-4 border-black hover:bg-gray-800",
        cardBorder: "border-black border-4",
        selectBg: "bg-white border-4 border-black",
        selectText: "text-black font-bold",
        buttonBg: "bg-black border-4 border-black",
        buttonText: "text-white font-bold",
      };

    default:
      return {
        pageBg: "bg-emerald-50",
        pageText: "text-emerald-900",
        navBg: "bg-white",
        navText: "text-emerald-900",
        panelBg: "bg-white",
        panelText: "text-emerald-900",
        navChip: "bg-emerald-600 text-white hover:bg-emerald-700",
        cardBorder: "border-emerald-200",
        selectBg: "bg-white",
        selectText: "text-emerald-900",
        buttonBg: "bg-emerald-600",
        buttonText: "text-white",
      };
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = React.useState({
    themeMode: "light" as "light" | "dark" | "highContrast",
    textSize: "normal",
    reduceMotion: true,
    reduceTransparency: true,
    highlightFocus: true,
    enableShortcuts: true,
    disableAutoplay: true,
    simpleInterface: true,
  });

  const [saved, setSaved] = React.useState<string | null>(null);

  const theme = getPageTheme(settings.themeMode);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save to localStorage so it persists
    localStorage.setItem('sustainwear-settings', JSON.stringify(settings));
    setSaved("Settings applied ✓");
    setTimeout(() => setSaved(null), 2000);
  };

  // Load settings on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('sustainwear-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.pageBg} ${theme.pageText}`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-8 py-4 shadow-lg rounded-b-3xl transition-colors ${theme.navBg} ${theme.navText}`}>
        <h1 className="text-3xl font-extrabold">SustainWear</h1>

        <nav className="hidden gap-6 text-sm font-semibold md:flex">
          <a href="/admin" className={theme.navText}>Admin Dashboard</a>
          <a href="/charity-staff" className={theme.navText}>Charity Staff Dashboard</a>
          <a href="/donor" className={theme.navText}>Donor Dashboard</a>
        </nav>

        <button className={`rounded-full px-5 py-2 transition ${theme.navChip}`}>
          Log out
        </button>
      </header>

      {/* Main Content */}
      <main className="mx-auto mt-8 max-w-6xl space-y-8 px-4 pb-16">
        <section className={`rounded-2xl p-6 shadow-md transition border ${theme.panelBg} ${theme.panelText} ${theme.cardBorder}`}>
          <h2 className="text-xl font-bold">Accessibility & Settings</h2>
          <p className="mt-2 text-sm opacity-80">
            Your comfort and accessibility matter. Adjust settings below.
          </p>
        </section>

        {/* Settings Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Theme & Appearance */}
          <div className={`rounded-3xl p-6 shadow-lg border ${theme.panelBg} ${theme.panelText} ${theme.cardBorder}`}>
            <h3 className="text-lg font-bold mb-2">Theme & appearance</h3>
            <p className="text-sm opacity-70 mb-4">Choose text size and theme mode.</p>

            <div className="space-y-4">
              {/* Text Size */}
              <div>
                <p className="text-sm font-semibold mb-2">Text size</p>
                <select
                  value={settings.textSize}
                  onChange={(e) => updateSetting("textSize", e.target.value)}
                  className={`w-full rounded-lg border-2 px-3 py-2 transition ${theme.selectBg} ${theme.selectText} ${theme.cardBorder}`}
                >
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra large</option>
                </select>
              </div>

              {/* Theme Mode */}
              <div className="space-y-2">
                <p className="text-sm font-semibold">Theme mode</p>

                <ThemeOption
                  active={settings.themeMode === "light"}
                  label="Light mode"
                  onClick={() => updateSetting("themeMode", "light")}
                  theme={theme}
                />

                <ThemeOption
                  active={settings.themeMode === "dark"}
                  label="Dark mode"
                  onClick={() => updateSetting("themeMode", "dark")}
                  theme={theme}
                />

                <ThemeOption
                  active={settings.themeMode === "highContrast"}
                  label="High contrast"
                  onClick={() => updateSetting("themeMode", "highContrast")}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {/* Accessibility Controls */}
          <div className={`rounded-3xl p-6 shadow-lg border ${theme.panelBg} ${theme.panelText} ${theme.cardBorder}`}>
            <h3 className="text-lg font-bold mb-2">Accessibility controls</h3>
            <p className="text-sm opacity-70 mb-4">Motion, keyboard and cognitive support.</p>

            <div className="space-y-4">
              <ToggleRow
                label="Reduce motion"
                value={settings.reduceMotion}
                onChange={(v) => updateSetting("reduceMotion", v)}
                theme={theme}
              />

              <ToggleRow
                label="Reduce transparency"
                value={settings.reduceTransparency}
                onChange={(v) => updateSetting("reduceTransparency", v)}
                theme={theme}
              />

              <ToggleRow
                label="Highlight keyboard focus"
                value={settings.highlightFocus}
                onChange={(v) => updateSetting("highlightFocus", v)}
                theme={theme}
              />

              <ToggleRow
                label="Enable shortcuts"
                value={settings.enableShortcuts}
                onChange={(v) => updateSetting("enableShortcuts", v)}
                theme={theme}
              />

              <ToggleRow
                label="Disable autoplay"
                value={settings.disableAutoplay}
                onChange={(v) => updateSetting("disableAutoplay", v)}
                theme={theme}
              />

              <ToggleRow
                label="Simplified interface"
                value={settings.simpleInterface}
                onChange={(v) => updateSetting("simpleInterface", v)}
                theme={theme}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`rounded-full px-6 py-3 transition hover:opacity-90 ${theme.buttonBg} ${theme.buttonText}`}
        >
          Apply settings
        </button>

        {saved && (
          <p className="pt-2 text-sm font-semibold" style={{ color: 'rgb(16, 185, 129)' }} aria-live="polite">
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
      onClick={onClick}
      className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition
        ${active ? "border-emerald-500 bg-emerald-100" : theme.cardBorder}
        ${active && theme.pageText === "text-black" ? "font-bold" : ""}
      `}
    >
      <p className="font-semibold">{label}</p>
    </button>
  );
}

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  theme: ReturnType<typeof getPageTheme>;
}

function ToggleRow({ label, value, onChange, theme }: ToggleRowProps) {
  return (
    <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${theme.panelBg === "bg-white border-4 border-black" ? "bg-gray-50 border-2 border-gray-300" : "bg-white/10"}`}>
      <p>{label}</p>

      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition 
          ${value ? "bg-emerald-500" : "bg-gray-400"}
        `}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition 
            ${value ? "left-5" : "left-1"}
          `}
        />
      </button>
    </div>
  );
}