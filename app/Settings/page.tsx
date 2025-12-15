"use client";

import { useEffect, useState } from "react";
import { useAccessibilitySettings } from "@/components/accessibility-context";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

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

export default function SettingsPage() {
    const {
        settings: globalSettings,
        updateSetting,
        resetSettings,
        isReady,
    } = useAccessibilitySettings();

    const [draft, setDraft] = useState<Settings>(globalSettings);
    const [saved, setSaved] = useState<string | null>(null);

    useEffect(() => {
        if (isReady) setDraft(globalSettings);
    }, [isReady, globalSettings]);

    const updateDraft = <K extends keyof Settings>(key: K, value: Settings[K]) =>
        setDraft((p) => ({ ...p, [key]: value }));

    const apply = () => {
        Object.entries(draft).forEach(([k, v]) => updateSetting(k as keyof Settings, v));
        toast.success("Settings applied");
        setTimeout(() => setSaved(null), 2000);
    };

    const hasChanges = JSON.stringify(draft) !== JSON.stringify(globalSettings);

    return (
        <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
            {/* Header */}
            <Card>
                <CardHeader>
                    <CardTitle>Accessibility & Settings</CardTitle>
                    <CardDescription>
                        Changes apply after pressing “Apply settings”.
                    </CardDescription>
                    {hasChanges && (
                        <p className="text-sm font-medium text-amber-600">
                            You have unsaved changes.
                        </p>
                    )}
                </CardHeader>
            </Card>

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Theme & appearance</CardTitle>
                        <CardDescription>Control text size and theme mode.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Text size</label>
                            <Select
                                value={draft.textSize}
                                onValueChange={(v: TextSize) =>
                                    updateDraft("textSize", v as TextSize)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="large">Large</SelectItem>
                                    <SelectItem value="xlarge">Extra large</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Theme</label>
                            <Select
                                value={draft.themeMode}
                                onValueChange={(v: ThemeMode) =>
                                    updateDraft("themeMode", v as ThemeMode)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="highContrast">High contrast</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Accessibility */}
                <Card>
                    <CardHeader>
                        <CardTitle>Accessibility controls</CardTitle>
                        <CardDescription>Motion, keyboard, and Visibility Support.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Toggle
                            label="Reduce motion"
                            value={draft.reduceMotion}
                            onChange={(v) => updateDraft("reduceMotion", v)}
                        />
                        <Toggle
                            label="Reduce transparency"
                            value={draft.reduceTransparency}
                            onChange={(v) => updateDraft("reduceTransparency", v)}
                        />
                        <Toggle
                            label="Highlight keyboard focus"
                            value={draft.highlightFocus}
                            onChange={(v) => updateDraft("highlightFocus", v)}
                        />
                        <Toggle
                            label="Enable shortcuts"
                            value={draft.enableShortcuts}
                            onChange={(v) => updateDraft("enableShortcuts", v)}
                        />
                        <Toggle
                            label="Simplified interface"
                            value={draft.simpleInterface}
                            onChange={(v) => updateDraft("simpleInterface", v)}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                <Button onClick={apply}>Apply settings</Button>
                <Button variant="outline" onClick={() => setDraft(globalSettings)}>
                    Undo changes
                </Button>
                <Button variant="destructive" onClick={resetSettings}>
                    Reset to default
                </Button>
            </div>

            {saved && (
                <p aria-live="polite" className="text-sm font-medium">
                    {saved}
                </p>
            )}
        </main>
    );
}

function Toggle({
    label,
    value,
    onChange,
}: {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-sm font-medium">{label}</span>
            <Switch checked={value} onCheckedChange={onChange} />
        </div>
    );
}
