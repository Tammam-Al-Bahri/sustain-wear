import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityProvider } from "@/components/accessibility-context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SustainWear",
    description: "Sustainable fashion marketplace",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <AccessibilityProvider>
                            <Header />
                            <br />
                            <div className="bg-background rounded-2xl p-2 overflow-auto h-full flex flex-col justify-center items-start">
                                {children}
                            </div>
                            <Toaster />
                            <footer>
                                <p>&copy; Copyright {new Date().getFullYear()} SustainWear</p>
                            </footer>
                        </AccessibilityProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}