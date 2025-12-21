import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Provider from "./Provider";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "NextDev: AI Developer",
  description: "NextDev an Saas AI website generator ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>

      <html lang="en">
        <body
          className={outfit.className}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}
