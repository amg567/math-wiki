import Link from "next/link"
import { BookOpen, Target, Users, Globe, Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-foreground">
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">About MathWiki</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Building the world's most accessible mathematics encyclopedia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To organize all of mathematics into a clear, connected, and accessible structure that serves students,
                  educators, and researchers worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>For Everyone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  From high school students to PhD researchers, MathWiki provides structured, level-appropriate content
                  for all learners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Open & Modern</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Built with modern web technologies and an open-source approach, MathWiki combines credibility with
                  beautiful design.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Github className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Community-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Every page can be edited on GitHub, allowing the mathematics community to contribute and improve
                  content together.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
              <CardDescription>MathWiki is organized by academic level and mathematical branch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Four Academic Levels</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Content is organized from High School through Undergraduate, Master's, and PhD levels, allowing you to
                  navigate mathematics based on your current knowledge.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Connected Topics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each topic page includes prerequisites, related concepts, and references, creating a web of
                  mathematical knowledge that builds conceptual understanding.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Concise & Clear</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Instead of long, unstructured articles, we provide focused explanations that get to the core of each
                  concept with clarity and precision.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Get Involved</h2>
            <p className="text-muted-foreground text-pretty">
              MathWiki is an open project. Help us build the best mathematics encyclopedia.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <a href="https://github.com/amg567/math-wiki" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Contribute on GitHub
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/browse">Browse Topics</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
