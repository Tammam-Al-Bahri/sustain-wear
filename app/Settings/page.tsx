"use client";

import { ModeToggle } from "@/components/mode-toggle";
import React, { useEffect, useState } from "react";

type TextSize = "normal" | "large" | "xlarge";
type ThemeMode = "light" | "dark" | "highContrast";

interface SettingsState {
  textSize: TextSize;
  themeMode: ThemeMode;
  reduceMotion: boolean;
  reduceTransparency: boolean;
  highlightFocus: boolean;
  enableShortcuts: boolean;
  disableAutoplay: boolean;
  simpleInterface: boolean;
}

const defaultSettings: SettingsState = {
  textSize: "normal",
  themeMode: "light",
  reduceMotion: false,
  reduceTransparency: false,
  highlightFocus: true,
  enableShortcuts: true,
  disableAutoplay: false,
  simpleInterface: false,
};

interface ThemeOption {
  id: ThemeMode;
  title: string;
  badge: string;
  description: string;
  preview: string[];
}

const themeOptions: ThemeOption[] = [
  {
    id: "light",
    title: "Light mode",
    badge: "Balanced",
    description: "Soft greens and light backgrounds for bright, airy viewing.",
    preview: ["bg-white", "bg-emerald-100", "bg-emerald-200"],
  },
  {
    id: "dark",
    title: "Dark mode",
    badge: "Low light",
    description: "Deep greens with reduced glare for evening use.",
    preview: ["bg-slate-900", "bg-slate-700", "bg-slate-500"],
  },
  {
    id: "highContrast",
    title: "High contrast",
    badge: "Maximum clarity",
    description: "Strong contrast and bold edges to support visual clarity.",
    preview: ["bg-black", "bg-white", "bg-emerald-400"],
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

 
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("sustainwear-settings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SettingsState;
        setSettings({ ...defaultSettings, ...parsed });
      } catch {
       
      }
    }
  }, []);

  
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.style.fontSize =
      settings.textSize === "normal"
        ? "16px"
        : settings.textSize === "large"
        ? "18px"
        : "20px";

    document.body.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-high-contrast"
    );
    document.body.classList.add(
      settings.themeMode === "light"
        ? "theme-light"
        : settings.themeMode === "dark"
        ? "theme-dark"
        : "theme-high-contrast"
    );
  }, [settings.textSize, settings.themeMode]);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };2

  const handleSave = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "sustainwear-settings",
      JSON.stringify(settings)
    );
    setSavedMessage("Settings applied and saved ✓");
    setTimeout(() => setSavedMessage(null), 2500);
  };

  return (
    <div className="h-full bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-900 py-8">
      <div className="mx-auto h-full flex max-w-6xl flex-col gap-4 px-4">
        
        <header className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-emerald-400 to-emerald-200 px-6 py-3 shadow-lg">
          <div className="text-2xl font-extrabold tracking-wide text-emerald-950">
            SustainWear
          </div>

          <nav className="hidden gap-6 text-sm font-semibold text-emerald-950 md:flex">
            <a href="/admin" className="hover:underline">
              Admin Dashboard
            </a>
            <a href="/charity-staff" className="hover:underline">
              Charity Staff Dashboard
            </a>
            <a href="/Donor" className="hover:underline">
              Donor Dashboard
            </a>
          </nav>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => (window.location.href = "/Donor")}
              className="rounded-full border border-emerald-900 px-4 py-1 text-sm font-semibold text-emerald-900 hover:bg-emerald-900 hover:text-emerald-50"
            >
              Back to dashboard
            </button>
            <button
              type="button"
              className="rounded-full bg-emerald-950 px-4 py-1 text-sm font-semibold text-emerald-50 hover:bg-emerald-900"
            >
              Log out
            </button>
          </div>
        </header>

        
        <main className="rounded-3xl bg-emerald-50/90 p-6 shadow-2xl">
          
          <section className="rounded-2xl bg-gradient-to-r from-emerald-200 to-emerald-100 px-6 py-4 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900">
              Accessibility &amp; Settings
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-emerald-950">
              Your comfort and accessibility matter. Adjust settings below.
            </h1>
            <p className="mt-2 text-sm text-emerald-900/80">
              SustainWear is committed to providing an inclusive experience for
              all users. Use this panel to tweak visual, motion, keyboard and
              audio behaviour to suit your needs.
            </p>
          </section>

         
          <div className="grid gap-6 md:grid-cols-2">
            
            <section className="space-y-4 rounded-2xl bg-white/90 p-4 shadow">
              <h2 className="text-lg font-bold text-emerald-950">
                Theme &amp; appearance<ModeToggle/>
              </h2>
              <p className="text-xs text-emerald-900/70">
                Choose a colour theme and base text size. These settings apply
                across all SustainWear dashboards.
              </p>

              
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                <label
                  htmlFor="textSize"
                  className="flex items-center justify-between text-sm font-semibold text-emerald-950"
                >
                  <span>Text size</span>
                  <span className="text-xs font-normal text-emerald-800">
                    Current:{" "}
                    {settings.textSize === "normal"
                      ? "Normal"
                      : settings.textSize === "large"
                      ? "Large"
                      : "Extra large"}
                  </span>
                </label>
                <select
                  id="textSize"
                  value={settings.textSize}
                  onChange={(e) =>
                    updateSetting("textSize", e.target.value as TextSize)
                  }
                  className="mt-2 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra large</option>
                </select>
              </div>

              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-emerald-950">
                  Theme mode
                </h3>
                <div className="flex flex-col gap-3">
                  {themeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateSetting("themeMode", option.id)}
                      className={`flex w-full flex-col rounded-xl border px-4 py-3 text-left shadow-sm transition 
                        ${
                          settings.themeMode === option.id
                            ? "border-emerald-500 bg-emerald-50 shadow-md"
                            : "border-emerald-100 bg-white hover:border-emerald-300 hover:bg-emerald-50/60"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-900">
                            {option.badge}
                          </span>
                          <p className="mt-1 text-sm font-bold text-emerald-950">
                            {option.title}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {option.preview.map((cls, idx) => (
                            <span
                              key={idx}
                              className={`h-2 w-5 rounded-full ${cls}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-emerald-900/75">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            
            <section className="space-y-4 rounded-2xl bg-white/90 p-4 shadow">
              <h2 className="text-lg font-bold text-emerald-950">
                Accessibility controls
              </h2>
              <p className="text-xs text-emerald-900/70">
                Toggle extra support for motion sensitivity, keyboard users and
                reducing distractions.
              </p>

              
              <SettingGroup
                title="Motion & display"
                subtitle="Helpful if you are sensitive to animation or blur."
              >
                <ToggleRow
                  label="Reduce animations & motion"
                  description="Smooths transitions and disables non-essential movement."
                  value={settings.reduceMotion}
                  onChange={(v) => updateSetting("reduceMotion", v)}
                />
                <ToggleRow
                  label="Reduce transparency"
                  description="Replaces transparent backgrounds with solid colours."
                  value={settings.reduceTransparency}
                  onChange={(v) => updateSetting("reduceTransparency", v)}
                />
              </SettingGroup>

              
              <SettingGroup
                title="Keyboard & navigation"
                subtitle="Improve focus visibility and keyboard control."
              >
                <ToggleRow
                  label="Highlight keyboard focus"
                  description="Adds strong outlines to focused buttons and links."
                  value={settings.highlightFocus}
                  onChange={(v) => updateSetting("highlightFocus", v)}
                />
                <ToggleRow
                  label="Enable simple keyboard shortcuts"
                  description="Allow quick navigation using basic shortcut keys."
                  value={settings.enableShortcuts}
                  onChange={(v) => updateSetting("enableShortcuts", v)}
                />
              </SettingGroup>

              
              <SettingGroup
                title="Audio & cognitive support"
                subtitle="Reduce distractions and visual load."
              >
                <ToggleRow
                  label="Disable video autoplay"
                  description="Videos and media will only play when you choose."
                  value={settings.disableAutoplay}
                  onChange={(v) => updateSetting("disableAutoplay", v)}
                />
                <ToggleRow
                  label="Use simplified interface"
                  description="Hides some decorative elements for a cleaner layout."
                  value={settings.simpleInterface}
                  onChange={(v) => updateSetting("simpleInterface", v)}
                />
              </SettingGroup>
            </section>
          </div>

          
          <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-emerald-200 pt-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleSave}
              id="saveSettingsBtn"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2 text-sm font-semibold text-emerald-50 shadow-lg hover:from-emerald-700 hover:to-emerald-600"
            >
              Apply &amp; save settings
            </button>
            {savedMessage && (
              <p
                className="text-sm font-medium text-emerald-800"
                aria-live="polite"
              >
                {savedMessage}
              </p>
            )}
          </div>
        </main>

        
        <footer className="mt-2 text-xs text-emerald-50">
          © {new Date().getFullYear()} SustainWear · Designed for inclusive
          donations
        </footer>
      </div>
    </div>
  );
}



interface SettingGroupProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function SettingGroup({ title, subtitle, children }: SettingGroupProps) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
      <h3 className="text-sm font-semibold text-emerald-950">{title}</h3>
      {subtitle && (
        <p className="mt-0.5 text-xs text-emerald-900/70">{subtitle}</p>
      )}
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-white/70 px-3 py-2">
      <div className="flex-1">
        <p className="text-sm font-medium text-emerald-950">{label}</p>
        {description && (
          <p className="text-[11px] text-emerald-900/70">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition 
          ${value ? "bg-emerald-500" : "bg-slate-300"}`}
        aria-pressed={value}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition 
            ${value ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}
