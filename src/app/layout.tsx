import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"; // import font
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"
import Minibar from "@/components/minibar";

export const metadata: Metadata = {
  title: "Crazy Health Stats",
  description: "Macro health trends by country",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.className} antialiased dark:bg-gray-950`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body>{children}</body>
        <footer className="fixed bottom-0 w-full z-20">
          <Minibar />
        </footer>

        <Analytics />
      </ThemeProvider>
    </html>

  );
}
