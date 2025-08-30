"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Trophy, Clock, Target, TrendingUp, Plus, Eye, Share2, MessageSquare, RefreshCw } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface QuizResult {
  id: string
  userId: string
  quizId: string
  quizTitle: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  completedAt: string
  category: string
}

const createdQuizzes = [
  {
    id: "1",
    title: "Advanced JavaScript Concepts",
    questions: 25,
    attempts: 156,
    avgScore: 74,
    created: "2024-01-01",
    visibility: "public",
  },
  {
    id: "2",
    title: "React Best Practices",
    questions: 18,
    attempts: 89,
    avgScore: 82,
    created: "2024-01-03",
    visibility: "public",
  },
  {
    id: "3",
    title: "Team Assessment",
    questions: 15,
    attempts: 12,
    avgScore: 88,
    created: "2024-01-05",
    visibility: "private",
  },
]

export default function DashboardPage() {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchQuizResults = async () => {
    try {
      const response = await fetch("/api/quiz/results?userId=user123")
      if (response.ok) {
        const data = await response.json()
        setQuizResults(data.results || [])
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchQuizResults()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchQuizResults()
  }

  // Calculate stats from real data
  const calculateStats = () => {
    if (quizResults.length === 0) {
      return {
        totalQuizzes: 0,
        avgScore: 0,
        totalTimeSpent: 0,
        streak: 0,
      }
    }

    const totalQuizzes = quizResults.length
    const avgScore = Math.round(quizResults.reduce((sum, result) => sum + result.score, 0) / totalQuizzes)
    const totalTimeSpent = Math.round(quizResults.reduce((sum, result) => sum + result.timeSpent, 0) / 3600) // Convert to hours

    // Calculate streak (consecutive days with quizzes)
    const sortedResults = quizResults
      .map((r) => new Date(r.completedAt).toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort()

    let streak = 0
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    if (sortedResults.includes(today) || sortedResults.includes(yesterday)) {
      streak = 1
      // Simple streak calculation - could be enhanced
      for (let i = sortedResults.length - 2; i >= 0; i--) {
        const current = new Date(sortedResults[i + 1])
        const previous = new Date(sortedResults[i])
        const diffDays = Math.floor((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays === 1) {
          streak++
        } else {
          break
        }
      }
    }

    return { totalQuizzes, avgScore, totalTimeSpent, streak }
  }

  // Generate performance data from real results
  const generatePerformanceData = () => {
    if (quizResults.length === 0) {
      return []
    }

    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const dayResults = quizResults.filter((result) => result.completedAt.split("T")[0] === dateStr)

      const avgScore =
        dayResults.length > 0 ? Math.round(dayResults.reduce((sum, r) => sum + r.score, 0) / dayResults.length) : 0

      last7Days.push({
        date: dateStr,
        score: avgScore,
      })
    }

    return last7Days
  }

  // Generate category data from real results
  const generateCategoryData = () => {
    if (quizResults.length === 0) {
      return []
    }

    const categoryMap = new Map()

    quizResults.forEach((result) => {
      const category = result.category || "General"
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { scores: [], attempts: 0 })
      }
      categoryMap.get(category).scores.push(result.score)
      categoryMap.get(category).attempts++
    })

    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      score: Math.round(data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length),
      attempts: data.attempts,
    }))
  }

  const stats = calculateStats()
  const performanceData = generatePerformanceData()
  const categoryData = generateCategoryData()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your quiz performance and manage your created quizzes
              </p>
            </div>
            <Button onClick={handleRefresh} variant="outline" disabled={refreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Quizzes Taken</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuizzes}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {quizResults.length > 0 ? "Updated now" : "No quizzes yet"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.avgScore > 0 ? `${stats.avgScore}%` : "0%"}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {stats.avgScore >= 80
                      ? "Excellent!"
                      : stats.avgScore >= 60
                        ? "Good progress"
                        : stats.avgScore > 0
                          ? "Keep improving"
                          : "Take a quiz"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Time Spent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalTimeSpent > 0 ? `${stats.totalTimeSpent}h` : "0h"}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Learning time
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Streak</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.streak} days</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {stats.streak > 0 ? "Keep it up!" : "Start your streak"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="taken">Quizzes Taken</TabsTrigger>
              <TabsTrigger value="created">Created Quizzes</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              {quizResults.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Performance Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Score Trend</CardTitle>
                      <CardDescription>Your quiz performance over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: "#3b82f6" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Category Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Category</CardTitle>
                      <CardDescription>Your average scores across different topics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quiz data yet</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Take your first quiz to see your performance analytics here.
                    </p>
                    <Button asChild>
                      <Link href="/quiz/join">
                        <Plus className="mr-2 h-4 w-4" />
                        Take Your First Quiz
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Detailed Category Stats */}
              {categoryData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                    <CardDescription>Detailed performance metrics by topic</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categoryData.map((category) => (
                        <div
                          key={category.category}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{category.category}</h4>
                              <Badge variant="outline">{category.score}% avg</Badge>
                            </div>
                            <Progress value={category.score} className="w-full" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {category.attempts} quizzes attempted
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="taken" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Quiz Attempts</h2>
                <Button asChild>
                  <Link href="/quiz/join">
                    <Plus className="mr-2 h-4 w-4" />
                    Take New Quiz
                  </Link>
                </Button>
              </div>

              {quizResults.length > 0 ? (
                <div className="space-y-4">
                  {quizResults
                    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                    .map((result) => (
                      <Card key={result.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{result.quizTitle}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                <span>Score: {result.score}%</span>
                                <span>
                                  {result.correctAnswers}/{result.totalQuestions} correct
                                </span>
                                <span>
                                  Time: {Math.floor(result.timeSpent / 60)}:
                                  {(result.timeSpent % 60).toString().padStart(2, "0")}
                                </span>
                                <span>Date: {new Date(result.completedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"
                                }
                              >
                                {result.score >= 80 ? "Excellent" : result.score >= 60 ? "Good" : "Needs Improvement"}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quizzes taken yet</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Start taking quizzes to track your progress and see your results here.
                    </p>
                    <Button asChild>
                      <Link href="/quiz/join">
                        <Plus className="mr-2 h-4 w-4" />
                        Take Your First Quiz
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="created" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Created Quizzes</h2>
                <Button asChild>
                  <Link href="/quiz/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Quiz
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {createdQuizzes.map((quiz) => (
                  <Card key={quiz.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                            <Badge variant={quiz.visibility === "public" ? "default" : "secondary"}>
                              {quiz.visibility}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <span>{quiz.questions} questions</span>
                            <span>{quiz.attempts} attempts</span>
                            <span>{quiz.avgScore}% avg score</span>
                            <span>Created: {quiz.created}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Discuss
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
