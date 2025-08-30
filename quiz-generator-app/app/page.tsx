import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Trophy, MessageSquare, Plus, Play } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Create Amazing Quizzes with <span className="text-blue-600 dark:text-blue-400">AI Power</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4">
            Build quizzes manually or let AI generate them for you. Share with friends, track performance, and engage in
            discussions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Link href="/quiz/create">
                <Plus className="mr-2 h-5 w-5" />
                Create Quiz
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/quiz/join">
                <Play className="mr-2 h-5 w-5" />
                Join Quiz
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Link href="/quiz/create">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
              <CardHeader className="pb-4">
                <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="group-hover:text-blue-600 transition-colors text-lg sm:text-xl">
                  AI-Powered
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm sm:text-base">
                  Generate quizzes automatically with AI or get explanations for wrong answers
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/quiz/join">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
              <CardHeader className="pb-4">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="group-hover:text-green-600 transition-colors text-lg sm:text-xl">
                  Share & Collaborate
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm sm:text-base">
                  Share quizzes with friends and collaborate through discussions
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
              <CardHeader className="pb-4">
                <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-600 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="group-hover:text-yellow-600 transition-colors text-lg sm:text-xl">
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm sm:text-base">
                  Track scores, view leaderboards, and analyze performance trends
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/discussions">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
              <CardHeader className="pb-4">
                <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="group-hover:text-purple-600 transition-colors text-lg sm:text-xl">
                  Discussion Forum
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm sm:text-base">
                  Discuss questions, ask for help, and engage with the community
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                  Popular Quizzes
                  <Badge variant="secondary">Trending</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">JavaScript Fundamentals</span>
                  <Badge className="text-xs sm:text-sm">245 attempts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">React Hooks Deep Dive</span>
                  <Badge className="text-xs sm:text-sm">189 attempts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Python Data Structures</span>
                  <Badge className="text-xs sm:text-sm">156 attempts</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Top Performers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">🥇 Alex Johnson</span>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    98% avg
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">🥈 Sarah Chen</span>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    95% avg
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">🥉 Mike Rodriguez</span>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    92% avg
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
