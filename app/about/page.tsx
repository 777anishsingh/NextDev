"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Code,
    Briefcase,
    GraduationCap,
    FolderMinusIcon,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background px-6 py-16">
                <Link href={'/'}>
                    <FolderMinusIcon />Back
                </Link>
            <div className="mx-auto max-w-5xl space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">

                    <h1 className="text-4xl font-bold">About the Developer</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Hi, I’m <span className="font-medium">Anish Singh Butola</span> — a
                        Full-Stack Developer building modern, scalable, AI-powered web
                        applications.
                    </p>
                </div>

                {/* Profile Card */}
                <Card>
                    <CardContent className="p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Anish Singh Butola</h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                Chandigarh, India
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Link href="https://github.com/777anishsingh" target="_blank">
                                    <Button variant="outline" size="icon">
                                        <Github />
                                    </Button>
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/777anishsingh"
                                    target="_blank"
                                >
                                    <Button variant="outline" size="icon">
                                        <Linkedin />
                                    </Button>
                                </Link>
                                <Link href="mailto:777anish.singh@gmail.com">
                                    <Button variant="outline" size="icon">
                                        <Mail />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 max-w-md">
                            {[
                                "Next.js",
                                "React",
                                "JavaScript",
                                "TypeScript",
                                "Tailwind CSS",
                                "Node.js",
                                "Express",
                                "PostgreSQL",
                                "MongoDB",
                                "SQL",
                                "AI / GenAI",
                                "Ai Agents",
                                "LLM",
                            ].map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>


                {/* Education */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education
                    </h2>

                    <Card>
                        <CardContent className="p-6 space-y-2">
                            <h3 className="font-semibold">
                                B.E. in Electronics & Computer Engineering
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Thapar Institute of Engineering and Technology, Patiala — Government of India Academic
                                Scholar
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
