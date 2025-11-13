import Link from "next/link"
import { BookOpen, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathBranches, levelInfo } from "@/lib/math-data"
import { Badge } from "@/components/ui/badge"

export default function BrowsePage() {
  const levels = ["high-school", "undergraduate", "masters", "phd"] as const

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MathWiki</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/browse" className="text-sm font-medium text-foreground">
              Browse Topics
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Browse Mathematics Topics</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Explore mathematics organized by academic level and branch
            </p>
          </div>

          <div className="space-y-12">
            {levels.map((level) => {
              const info = levelInfo[level]
              const branches = mathBranches.filter((b) => b.level === level)

              return (
                <section key={level} id={level} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{info.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">{info.title}</h2>
                      <p className="text-muted-foreground text-pretty">{info.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {branches.map((branch) => (
                      <Link key={branch.id} href={`/browse/${level}/${branch.id}`}>
                        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-xl">{branch.title}</CardTitle>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <CardDescription>{branch.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary">{branch.topics.length} topics</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
