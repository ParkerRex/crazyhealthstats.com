import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // import font
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Health Clock ",
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
        <NavBar />
        <body>{children}</body>
      </ThemeProvider>
    </html>

  );
}
