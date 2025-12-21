import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import { Toaster } from "sonner";
import DesktopOnly from "@/components/DesktopOnly";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextDev: AI Developer",
  description: "NextDev an SaaS AI website generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={outfit.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Provider>
              <DesktopOnly>
                {children}
              </DesktopOnly>
              <Toaster />
            </Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
