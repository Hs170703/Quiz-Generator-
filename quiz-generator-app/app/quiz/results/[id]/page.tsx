"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Download, TrendingUp, Users, Clock, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data
const mockQuiz = {
  title: "JavaScript Fundamentals",
  code: "ABC123",
  totalQuestions: 15,
}

const scoreDistribution = [
  { range: "0-20%", count: 2 },
  { range: "21-40%", count: 5 },
  { range: "41-60%", count: 12 },
  { range: "61-80%", count: 18 },
  { range: "81-100%", count: 8 },
]

const timeDistribution = [
  { range: "0-3 min", count: 3 },
  { range: "3-6 min", count: 8 },
  { range: "6-9 min", count: 15 },
  { range: "9-12 min", count: 12 },
  { range: "12+ min", count: 7 },
]

const questionAnalysis = [
  {
    id: 1,
    question: "What is the correct way to declare a variable in JavaScript?",
    correctRate: 85,
    avgTime: 45,
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "Which method is used to add an element to the end of an array?",
    correctRate: 72,
    avgTime: 38,
    difficulty: "Medium",
  },
  {
    id: 3,
    question: 'What does "===" operator do in JavaScript?',
    correctRate: 68,
    avgTime: 52,
    difficulty: "Medium",
  },
  {
    id: 4,
    question: "How do you create a closure in JavaScript?",
    correctRate: 45,
    avgTime: 78,
    difficulty: "Hard",
  },
  {
    id: 5,
    question: "What is the difference between let and var?",
    correctRate: 58,
    avgTime: 65,
    difficulty: "Medium",
  },
]

const performanceOverTime = [
  { date: "2024-01-01", avgScore: 65, participants: 5 },
  { date: "2024-01-02", avgScore: 72, participants: 8 },
  { date: "2024-01-03", avgScore: 78, participants: 12 },
  { date: "2024-01-04", avgScore: 75, participants: 15 },
  { date: "2024-01-05", avgScore: 82, participants: 18 },
  { date: "2024-01-06", avgScore: 79, participants: 22 },
  { date: "2024-01-07", avgScore: 85, participants: 25 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const stats = {
    totalParticipants: 45,
    avgScore: 78,
    avgTime: 485, // 8:05
    completionRate: 89,
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quiz Management
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Results & Analytics</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {mockQuiz.title} (Code: {mockQuiz.code})
                </p>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Participants</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalParticipants}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgScore}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Time</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatTime(stats.avgTime)}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="questions">Question Analysis</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Score Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                    <CardDescription>How participants performed overall</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={scoreDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Time Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Time Distribution</CardTitle>
                    <CardDescription>How long participants took to complete</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={timeDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ range, count }) => `${range}: ${count}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {timeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Question Performance Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of how each question performed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questionAnalysis.map((question) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Q{question.id}: {question.question}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                              <span>Avg Time: {question.avgTime}s</span>
                              <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {question.correctRate}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Correct Rate</div>
                          </div>
                        </div>
                        <Progress value={question.correctRate} className="w-full" />
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          {question.correctRate >= 80
                            ? "✅ Easy question"
                            : question.correctRate >= 60
                              ? "⚠️ Moderate difficulty"
                              : "❌ Challenging question - consider review"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>Track how quiz performance has changed over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={performanceOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="avgScore"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Average Score (%)"
                      />
                      <Line
                        type="monotone"
                        dataKey="participants"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Participants"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Strong Performance</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          78% average score indicates good quiz difficulty balance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Question 4 Needs Review</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Only 45% correct rate - consider simplifying or adding hints
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Good Engagement</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          89% completion rate shows participants are engaged
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Add More Hard Questions</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Consider adding 2-3 more challenging questions for advanced learners
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Optimize Time Limit</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Most participants finish in 8 minutes - current 10-minute limit is appropriate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Improve Explanations</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Add detailed explanations for questions with low correct rates
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
