"use client";

import React, { useEffect, useState } from "react";
import "./Setting.css";

type TextSize = "normal" | "large" | "xlarge";
type ThemeMode = "dark" | "highContrast";

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
  themeMode: "dark",
  reduceMotion: false,
  reduceTransparency: false,
  highlightFocus: true,
  enableShortcuts: true,
  disableAutoplay: false,
  simpleInterface: false,
};

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

    
    if (settings.textSize === "normal") {
      root.style.fontSize = "16px";
    } else if (settings.textSize === "large") {
      root.style.fontSize = "18px";
    } else {
      root.style.fontSize = "20px";
    }

    
    document.body.classList.remove("theme-dark", "theme-high-contrast");
    if (settings.themeMode === "dark") {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.add("theme-high-contrast");
    }
  }, [settings.textSize, settings.themeMode]);

  
  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "sustainwear-settings",
      JSON.stringify(settings)
    );
    setSavedMessage("Settings saved ✓");
    setTimeout(() => setSavedMessage(null), 2500);
  };

  return (
    <div className="settings-page-wrapper">
      <div className="settings-container">
        
        <nav className="settings-nav">
          <ul>
            <li>
              <a href="/admin">Admin Dashboard</a>
            </li>
            <li>
              <a href="/charity-staff">Charity Staff Dashboard</a>
            </li>
            <li>
              <a href="/Donor">Donor Dashboard</a>
            </li>
          </ul>
        </nav>

        
        <header className="settings-header">
          <h1>Accessibility &amp; Settings</h1>
          <p>Your comfort and accessibility matter. Adjust settings below.</p>
        </header>

        
        <section className="section">
          <h2>Accessibility Commitment</h2>
          <p>
            SustainWear is committed to providing an inclusive experience for
            all users. This page allows you to adjust visual, audio, motion, and
            cognitive preferences to suit your needs.
          </p>
        </section>

        
        <section className="section">
          <h2>Visual Settings</h2>

          <div className="field-group">
            <label htmlFor="textSize">Text Size</label>
            <select
              id="textSize"
              value={settings.textSize}
              onChange={(e) =>
                updateSetting("textSize", e.target.value as TextSize)
              }
            >
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="themeMode">Theme</label>
            <select
              id="themeMode"
              value={settings.themeMode}
              onChange={(e) =>
                updateSetting("themeMode", e.target.value as ThemeMode)
              }
            >
              <option value="dark">Dark Mode</option>
              <option value="highContrast">High Contrast</option>
            </select>
          </div>
        </section>

        
        <section className="section">
          <h2>Motion &amp; Display</h2>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.reduceMotion}
              onChange={(e) => updateSetting("reduceMotion", e.target.checked)}
            />
            Reduce animations &amp; motion
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.reduceTransparency}
              onChange={(e) =>
                updateSetting("reduceTransparency", e.target.checked)
              }
            />
            Reduce transparency
          </label>
        </section>

        
        <section className="section">
          <h2>Keyboard &amp; Navigation</h2>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.highlightFocus}
              onChange={(e) =>
                updateSetting("highlightFocus", e.target.checked)
              }
            />
            Highlight keyboard focus
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.enableShortcuts}
              onChange={(e) =>
                updateSetting("enableShortcuts", e.target.checked)
              }
            />
            Enable simple keyboard shortcuts
          </label>
        </section>

        
        <section className="section">
          <h2>Audio Settings</h2>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.disableAutoplay}
              onChange={(e) =>
                updateSetting("disableAutoplay", e.target.checked)
              }
            />
            Disable video autoplay
          </label>
        </section>

        
        <section className="section">
          <h2>Cognitive Support</h2>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.simpleInterface}
              onChange={(e) =>
                updateSetting("simpleInterface", e.target.checked)
              }
            />
            Enable simplified interface
          </label>
        </section>

        
        <button
          className="save-btn"
          type="button"
          onClick={handleSave}
          id="saveSettingsBtn"
        >
          Save Settings
        </button>

        {savedMessage && <p className="save-message">{savedMessage}</p>}
      </div>

      <footer className="settings-footer">
        © Copyright 2025 SustainWear
      </footer>
    </div>
  );
}
