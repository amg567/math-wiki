import Link from "next/link"
import { BookOpen, ChevronRight, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathBranches, levelInfo } from "@/lib/math-data"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return [{ level: "high-school" }, { level: "undergraduate" }, { level: "masters" }, { level: "phd" }]
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>
}) {
  const { level } = await params

  if (!["high-school", "undergraduate", "masters", "phd"].includes(level)) {
    notFound()
  }

  const info = levelInfo[level as keyof typeof levelInfo]
  const branches = mathBranches.filter((b) => b.level === level)

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
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/browse" className="hover:text-foreground transition-colors">
              Browse
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{info.title}</span>
          </nav>

          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{info.icon}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{info.title}</h1>
            </div>
            <p className="text-lg text-muted-foreground text-pretty">{info.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <Link key={branch.id} href={`/browse/${level}/${branch.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-2xl">{branch.title}</CardTitle>
                      <ChevronRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <CardDescription className="text-base">{branch.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm">
                        {branch.topics.length} topics
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
