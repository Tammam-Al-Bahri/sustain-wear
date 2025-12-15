// components/page-theme.ts

export type ThemeMode = "light" | "dark" | "highContrast";

export function getPageTheme(mode: ThemeMode) {
  switch (mode) {
    case "light":
      return {
        pageBg: "bg-emerald-50",
        pageText: "text-emerald-900",
        navBg: "bg-emerald-100",
        navText: "text-emerald-900",
        panelBg: "bg-white",
        panelText: "text-emerald-900",
        navChip: "bg-emerald-600 text-white",
      };

    case "dark":
      return {
        pageBg: "bg-[#0D1B1E]",
        pageText: "text-gray-100",
        navBg: "bg-[#142529]",
        navText: "text-gray-100",
        panelBg: "bg-[#1B2F33]",
        panelText: "text-gray-100",
        navChip: "bg-yellow-500 text-black",
      };

    case "highContrast":
      return {
        pageBg: "bg-white",
        pageText: "text-black",
        navBg: "bg-white",
        navText: "text-black font-bold",
        panelBg: "bg-white border-2 border-black",
        panelText: "text-black",
        navChip: "bg-black text-white font-bold",
      };

    default:
      return {
        pageBg: "bg-emerald-50",
        pageText: "text-emerald-900",
        navBg: "bg-emerald-100",
        navText: "text-emerald-900",
        panelBg: "bg-white",
        panelText: "text-emerald-900",
        navChip: "bg-emerald-600 text-white",
      };
  }
}
