"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathBranches, levelInfo } from "@/lib/math-data"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const levels = ["high-school", "undergraduate", "masters", "phd"] as const

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MathWiki</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/browse"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Topics
            </Link>
            <Link
              href="/bookmarks"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Bookmarks
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              A clear, structured map of{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">mathematics</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              An open, modern encyclopedia organizing all of mathematics — from basic school concepts to advanced
              research
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form className="relative" onSubmit={handleSearch}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for topics... (e.g., Fourier Transform, Prime Numbers)"
                className="pl-12 pr-4 py-6 text-lg glass rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="pt-4">
            <Link href="/browse">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                Explore Topics
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Level Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Mathematics by Level</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Navigate through mathematics organized by academic progression
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {levels.map((level) => {
            const info = levelInfo[level]
            const branches = mathBranches.filter((b) => b.level === level)

            return (
              <Link key={level} href={`/browse/${level}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 glass">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{info.icon}</span>
                      <CardTitle className="text-2xl">{info.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground mb-3">Key Branches:</p>
                      <div className="flex flex-wrap gap-2">
                        {branches.map((branch) => (
                          <span
                            key={branch.id}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                          >
                            {branch.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <Card className="max-w-4xl mx-auto glass">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-lg text-muted-foreground text-pretty">
              MathWiki is dedicated to organizing all of mathematics into a clear, connected, and accessible structure.
              Instead of long, unstructured pages, we focus on concise, linked entries that build conceptual
              understanding.
            </p>
            <p className="text-lg text-muted-foreground text-pretty">
              We combine the credibility of a wiki with the readability of modern educational design, making mathematics
              more approachable for students, educators, and researchers worldwide.
            </p>
            <div className="pt-4">
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  Edit this page on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 MathWiki. An open mathematics encyclopedia.</p>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link
                href="/contribute"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contribute
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
