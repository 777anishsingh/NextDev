"use client";

import { Laptop } from "lucide-react";

export default function DesktopOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block">
        {children}
      </div>

      {/* Mobile Block */}
      <div className="flex lg:hidden h-screen items-center justify-center px-6 text-center">
        <div className="max-w-md space-y-4">
          <Laptop className="mx-auto h-10 w-10" />
          <h2 className="text-xl font-semibold">
            Desktop Experience Only
          </h2>
          <p className="text-muted-foreground">
            NextDev is optimized for laptops and desktops.
            Please open this website on a larger screen.
          </p>
        </div>
      </div>
    </>
  );
}
