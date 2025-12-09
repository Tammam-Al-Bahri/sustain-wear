"use client";

import React from "react";
import { useAccessibilitySettings } from "@/components/accessibility-context";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TextSize = "normal" | "large" | "xlarge";
type ThemeMode = "light" | "dark" | "highContrast";


const themeTokens: Record<
  ThemeMode,
  {
    pageBg: string;
    pageText: string;
    navBg: string;
    navText: string;
    navChip: string;
    panelBg: string;
    panelText: string;
  }
> = {
  light: {
    pageBg: "bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-900",
    pageText: "text-emerald-950",
    navBg: "bg-gradient-to-r from-emerald-200 to-emerald-100",
    navText: "text-emerald-950",
    navChip: "bg-emerald-900 text-emerald-50",
    panelBg: "bg-white/95",
    panelText: "text-emerald-950",
  },
  dark: {
    pageBg: "bg-gradient-to-b from-slate-900 via-slate-950 to-black",
    pageText: "text-emerald-50",
    navBg: "bg-gradient-to-r from-slate-900 to-slate-800",
    navText: "text-emerald-50",
    navChip: "bg-emerald-500 text-black",
    panelBg: "bg-slate-900/90",
    panelText: "text-emerald-50",
  },
  highContrast: {
    pageBg: "bg-black",
    pageText: "text-white",
    navBg: "bg-black border-2 border-white",
    navText: "text-white",
    navChip: "bg-yellow-400 text-black font-bold",
    panelBg: "bg-black border-2 border-white",
    panelText: "text-white",
  },
};

export default function SettingsPage() {
  const { settings, updateSetting } = useAccessibilitySettings();
  const [savedMessage, setSavedMessage] = React.useState<string | null>(null);

  const t = themeTokens[settings.themeMode];

  const handleSave = () => {
    setSavedMessage("Settings applied and saved ✓");
    setTimeout(() => setSavedMessage(null), 2500);
  };

  return (
    <div className={`min-h-screen py-8 ${t.pageBg} ${t.pageText}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
        
        <header
          className={`flex items-center justify-between rounded-3xl px-6 py-3 shadow-lg ${t.navBg}`}
        >
          <div className="text-2xl font-extrabold tracking-wide">
            SustainWear
          </div>

          <nav className={`hidden gap-6 text-sm font-semibold md:flex`}>
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
            <Button
              variant="outline"
              className={`rounded-full border-current/40 bg-transparent px-4 py-1 text-sm font-semibold hover:bg-white/10`}
              onClick={() => (window.location.href = "/Donor")}
            >
              Back to dashboard
            </Button>
            <Button
              className={`rounded-full px-4 py-1 text-sm font-semibold ${t.navChip}`}
            >
              Log out
            </Button>
          </div>
        </header>

        
        <main className="rounded-[32px] border border-emerald-200/70 bg-emerald-50/90 p-6 shadow-2xl md:p-8">
          {/* Intro banner */}
          <section className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-200 to-emerald-100 px-6 py-4 text-emerald-950">
            <p className="text-xs font-semibold uppercase tracking-wide">
              Accessibility &amp; Settings
            </p>
            <h1 className="mt-1 text-2xl font-extrabold">
              Your comfort and accessibility matter. Adjust settings below.
            </h1>
            <p className="mt-2 text-sm text-emerald-900/80">
              These settings apply across ALL SustainWear pages and are saved on
              this device.
            </p>
          </section>

         
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            
            <Card
              className={`flex h-full flex-col rounded-3xl border-emerald-100 ${t.panelBg} ${t.panelText}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Theme &amp; appearance
                </CardTitle>
                <CardDescription className="text-xs opacity-80">
                  Choose text size and theme mode.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3 text-emerald-950">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Text size</p>
                    <span className="text-xs text-emerald-800">
                      Current: {settings.textSize}
                    </span>
                  </div>
                  <select
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

                
                <div>
                  <p className="text-sm font-semibold">Theme mode</p>
                  <div className="mt-2 flex flex-col gap-3">
                    {[
                      {
                        key: "light",
                        title: "Light mode",
                        desc: "Bright, soft greens for daytime use.",
                      },
                      {
                        key: "dark",
                        title: "Dark mode",
                        desc: "Deep tones designed for low light.",
                      },
                      {
                        key: "highContrast",
                        title: "High contrast",
                        desc: "Maximum contrast for visual clarity.",
                      },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          updateSetting("themeMode", item.key as ThemeMode)
                        }
                        className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left shadow-sm transition
                          ${
                            settings.themeMode === item.key
                              ? "border-emerald-500 bg-emerald-50 shadow-md"
                              : "border-emerald-100 bg-white hover:border-emerald-300 hover:bg-emerald-50/70"
                          }`}
                      >
                        <p className="text-sm font-bold text-emerald-950">
                          {item.title}
                        </p>
                        <p className="text-xs text-emerald-900/80">
                          {item.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            
            <Card
              className={`flex h-full flex-col rounded-3xl border-emerald-100 ${t.panelBg} ${t.panelText}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Accessibility controls
                </CardTitle>
                <CardDescription className="text-xs opacity-80">
                  Motion, keyboard and cognitive support.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ToggleGroup title="Motion & display">
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
                </ToggleGroup>

                <ToggleGroup title="Keyboard & navigation">
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
                </ToggleGroup>

                <ToggleGroup title="Audio & cognitive support">
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
                </ToggleGroup>
              </CardContent>
            </Card>
          </div>

          
          <div className="mt-6 flex flex-col items-start justify-between gap-3 border-top border-t border-emerald-200 pt-4 sm:flex-row sm:items-center">
            <Button
              onClick={handleSave}
              className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
            >
              Apply &amp; save settings
            </Button>
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

        <footer className="mt-2 text-xs opacity-90">
          © {new Date().getFullYear()} SustainWear — Designed for inclusive
          donations
        </footer>
      </div>
    </div>
  );
}



function ToggleGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
      <h3 className="text-sm font-semibold text-emerald-950">{title}</h3>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/90 px-3 py-2">
      <div className="flex-1">
        <p className="text-sm font-medium text-emerald-950">{label}</p>
        {description && (
          <p className="text-[11px] text-emerald-900/70">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          value ? "bg-emerald-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            value ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
