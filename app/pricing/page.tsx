"use client"
import { Button } from "@/components/ui/button";
import { Check, FolderMinusIcon } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background py-16 px-6 ">
                <Link href={'/'}>
                    <FolderMinusIcon />Back
                </Link>
            <h1 className="flex justify-center-safe text-4xl gap-10 font-bold mb-6 ">
                Pricing Model

            </h1>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {/* Free Tier */}
                <div className="rounded-2xl border bg-card shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Free Tier</h2>
                            <span className="text-xs px-3 py-1 rounded-full bg-muted font-medium">
                                Active
                            </span>
                        </div>
                        <p className="text-3xl font-bold mt-4">$0</p>
                        <p className="text-sm text-muted-foreground">
                            Always free
                        </p>
                    </div>

                    <div className="p-6 space-y-3">
                        <Feature text="Limited trials" />
                        <Feature text="Preview the product" />
                    </div>
                </div>

                {/* Unlimited Tier */}
                <div className="rounded-2xl border bg-card shadow-sm">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">Unlimited</h2>
                        <p className="text-3xl font-bold mt-4">
                            $9.99 <span className="text-sm font-normal">/ month</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Billed monthly
                        </p>
                    </div>

                    <div className="p-6 space-y-3">
                        <Feature text="Create unlimited projects" />
                        <Feature text="Export to code" />
                        <Feature text="View source code" />
                        <Feature text="24/7 Email support" />
                        <Feature text="Inline editing feature" />
                    </div>

                    <div className="p-6">
                        <Button className="w-full">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Feature({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-500" />
            <span>{text}</span>
        </div>
    );
}
