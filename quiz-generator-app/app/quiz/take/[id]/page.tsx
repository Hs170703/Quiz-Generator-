"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

const sampleQuiz = {
  id: "1",
  title: "JavaScript Fundamentals",
  description: "Test your knowledge of JavaScript basics",
  questions: [
    {
      id: "1",
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
      correctAnswer: 0,
      explanation:
        'The "var" keyword is used to declare variables in JavaScript, though "let" and "const" are preferred in modern JavaScript.',
    },
    {
      id: "2",
      question: "Which method is used to add an element to the end of an array?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
      explanation:
        "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
    },
    {
      id: "3",
      question: 'What does "=== " operator do in JavaScript?',
      options: ["Assignment", "Equality without type checking", "Strict equality with type checking", "Not equal"],
      correctAnswer: 2,
      explanation: "The === operator checks for strict equality, meaning both value and type must be the same.",
    },
  ],
  timeLimit: 600, // 10 minutes
  difficulty: "Medium",
}

export default function TakeQuizPage({ params }: { params: { id: string } }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [timeLeft, setTimeLeft] = useState(sampleQuiz.timeLimit)
  const [startTime] = useState(Date.now())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const currentQuestion = sampleQuiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / sampleQuiz.questions.length) * 100

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: Number.parseInt(value),
    })
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < sampleQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    sampleQuiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: sampleQuiz.questions.length,
      percentage: Math.round((correct / sampleQuiz.questions.length) * 100),
    }
  }

  const saveQuizResult = async (score: any) => {
    setIsSaving(true)
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)

      const resultData = {
        quizId: sampleQuiz.id,
        quizTitle: sampleQuiz.title,
        score: score.percentage,
        totalQuestions: score.total,
        correctAnswers: score.correct,
        timeSpent,
        category: "JavaScript", // Extract from quiz or topic
        userId: "user123", // In real app, get from auth context
      }

      const response = await fetch("/api/quiz/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      })

      if (!response.ok) {
        throw new Error("Failed to save result")
      }

      const data = await response.json()
      console.log("Quiz result saved:", data)
    } catch (error) {
      console.error("Error saving quiz result:", error)
      toast({
        title: "Warning",
        description: "Quiz completed but result may not be saved to dashboard.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitted(true)
    const score = calculateScore()

    // Save the result to the backend
    await saveQuizResult(score)

    setShowResults(true)
    toast({
      title: "Quiz submitted!",
      description: "Your answers have been recorded and saved to your dashboard.",
    })
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                </div>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>Here are your results for "{sampleQuiz.title}"</CardDescription>
                {isSaving && <p className="text-sm text-blue-600">Saving to your dashboard...</p>}
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{score.percentage}%</div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {score.correct} out of {score.total} questions correct
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{score.correct}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{score.total - score.correct}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Incorrect</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatTime(sampleQuiz.timeLimit - timeLeft)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Time Taken</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Review */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Question Review</h2>
              {sampleQuiz.questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <Card key={question.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {index + 1}. {question.question}
                        </h3>
                        <Badge variant={isCorrect ? "default" : "destructive"}>
                          {isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optIndex) => {
                          let className = "p-3 rounded-lg border "
                          if (optIndex === question.correctAnswer) {
                            className +=
                              "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                          } else if (optIndex === userAnswer && !isCorrect) {
                            className +=
                              "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
                          } else {
                            className += "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                          }

                          return (
                            <div key={optIndex} className={className}>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                                {option}
                                {optIndex === question.correctAnswer && <CheckCircle className="ml-auto h-4 w-4" />}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {question.explanation && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Explanation:</h4>
                          <p className="text-blue-800 dark:text-blue-300 text-sm">{question.explanation}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <Button onClick={() => router.push("/dashboard")}>View Dashboard</Button>
              <Button variant="outline" onClick={() => router.push("/quiz/join")}>
                Take Another Quiz
              </Button>
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
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{sampleQuiz.title}</CardTitle>
                  <CardDescription>{sampleQuiz.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    <Clock className="mr-1 h-4 w-4" />
                    {formatTime(timeLeft)}
                  </Badge>
                  <Badge>{sampleQuiz.difficulty}</Badge>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>
                    Question {currentQuestionIndex + 1} of {sampleQuiz.questions.length}
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </CardHeader>
          </Card>

          {/* Current Question */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentQuestionIndex === sampleQuiz.questions.length - 1 ? (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700" disabled={isSubmitted}>
                  <Flag className="mr-2 h-4 w-4" />
                  {isSubmitted ? "Submitting..." : "Submit Quiz"}
                </Button>
              ) : (
                <Button onClick={goToNextQuestion}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
