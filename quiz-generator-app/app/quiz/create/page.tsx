"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { Brain, Plus, Trash2, Save, Sparkles, Share2, AlertCircle, Info, CheckCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export default function CreateQuizPage() {
  const [activeTab, setActiveTab] = useState("manual")
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [explanation, setExplanation] = useState("")
  const [aiTopic, setAiTopic] = useState("")
  const [aiDifficulty, setAiDifficulty] = useState("")
  const [aiQuestionCount, setAiQuestionCount] = useState("5")
  const [loading, setLoading] = useState(false)
  const [generationStatus, setGenerationStatus] = useState<{
    type: "none" | "ai" | "fallback" | "quota_exceeded" | "rate_limit" | "auth_error" | "no_api_key" | "network_error"
    message?: string
  }>({ type: "none" })
  const { toast } = useToast()
  const router = useRouter()

  const addQuestion = () => {
    if (!currentQuestion.trim() || currentOptions.some((opt) => !opt.trim())) {
      toast({
        title: "Incomplete question",
        description: "Please fill in the question and all options.",
        variant: "destructive",
      })
      return
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion,
      options: [...currentOptions],
      correctAnswer,
      explanation: explanation.trim() || undefined,
    }

    setQuestions([...questions, newQuestion])
    setCurrentQuestion("")
    setCurrentOptions(["", "", "", ""])
    setCorrectAnswer(0)
    setExplanation("")

    toast({
      title: "Question added",
      description: "Your question has been added to the quiz.",
    })
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const generateAIQuiz = async () => {
    if (!aiTopic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for question generation.",
        variant: "destructive",
      })
      return
    }

    if (!aiDifficulty) {
      toast({
        title: "Difficulty required",
        description: "Please select a difficulty level.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setGenerationStatus({ type: "none" })

    try {
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: aiTopic,
          difficulty: aiDifficulty,
          questionCount: Number.parseInt(aiQuestionCount),
        }),
      })

      const data = await response.json()

      // Handle both success and fallback responses
      if (response.ok && data.questions && Array.isArray(data.questions)) {
        // Transform the API response to match our Question interface
        const generatedQuestions: Question[] = data.questions.map((q: any, index: number) => ({
          id: `generated-${Date.now()}-${index}`,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        }))

        setQuestions(generatedQuestions)

        // Determine generation status
        if (data.fallback) {
          setGenerationStatus({
            type: data.errorType || "fallback",
            message: data.message,
          })

          // Show appropriate toast based on error type
          switch (data.errorType) {
            case "quota_exceeded":
              toast({
                title: "OpenAI Quota Exceeded",
                description: `Generated ${aiQuestionCount} curated questions about ${aiTopic}. Check your OpenAI billing to restore AI generation.`,
              })
              break
            case "rate_limit":
              toast({
                title: "Rate Limit Reached",
                description: `Generated ${aiQuestionCount} curated questions about ${aiTopic}. Try again in a few minutes for AI generation.`,
              })
              break
            case "no_api_key":
              toast({
                title: "Using Curated Questions",
                description: `Generated ${aiQuestionCount} curated questions about ${aiTopic}. Configure OpenAI API key for AI generation.`,
              })
              break
            default:
              toast({
                title: "Using Curated Questions",
                description: `Generated ${aiQuestionCount} curated questions about ${aiTopic}.`,
              })
          }
        } else {
          setGenerationStatus({ type: "ai" })
          toast({
            title: "AI Questions Generated!",
            description: `${aiQuestionCount} AI-powered questions have been generated about ${aiTopic}.`,
          })
        }
      } else {
        throw new Error(data.error || "Invalid response format")
      }
    } catch (error) {
      console.error("Quiz generation request failed:", error)
      setGenerationStatus({ type: "fallback", message: "Generation request failed" })
      toast({
        title: "Generation failed",
        description: "Unable to generate questions. Please try again or create questions manually.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveQuiz = async () => {
    if (!quizTitle.trim() || questions.length === 0) {
      toast({
        title: "Quiz incomplete",
        description: "Please add a title and at least one question.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Quiz saved!",
        description: "Your quiz has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const publishQuiz = async () => {
    if (!quizTitle.trim() || questions.length === 0) {
      toast({
        title: "Quiz incomplete",
        description: "Please add a title and at least one question.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const quizCode = Math.random().toString(36).substring(2, 8).toUpperCase()

      toast({
        title: "Quiz published!",
        description: `Your quiz is now live with code: ${quizCode}`,
      })

      router.push(`/quiz/manage?code=${quizCode}`)
    } catch (error) {
      toast({
        title: "Publish failed",
        description: "Failed to publish quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusAlert = () => {
    switch (generationStatus.type) {
      case "ai":
        return (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <strong>AI-Powered Questions Generated!</strong> These questions were created using advanced AI technology
              for optimal learning.
            </AlertDescription>
          </Alert>
        )
      case "quota_exceeded":
        return (
          <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <strong>OpenAI Quota Exceeded:</strong> Using high-quality curated questions instead. Check your OpenAI
              billing to restore AI generation.
              <a
                href="https://platform.openai.com/account/billing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline ml-2 hover:text-orange-800"
              >
                View Billing <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </AlertDescription>
          </Alert>
        )
      case "rate_limit":
        return (
          <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription>
              <strong>Rate Limit Reached:</strong> Using curated questions for now. Try again in a few minutes for AI
              generation.
            </AlertDescription>
          </Alert>
        )
      case "no_api_key":
        return (
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <strong>No API Key Configured:</strong> Using curated questions. Add your OpenAI API key to enable AI
              generation.
            </AlertDescription>
          </Alert>
        )
      case "network_error":
        return (
          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              <strong>Network Error:</strong> Unable to connect to AI service. Using curated questions instead.
            </AlertDescription>
          </Alert>
        )
      case "fallback":
        return (
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <strong>Curated Questions:</strong> Using high-quality pre-written questions for {aiTopic}. These are
              educational and topic-specific.
            </AlertDescription>
          </Alert>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Quiz</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Build your quiz manually or generate questions automatically
            </p>
          </div>

          {/* Quiz Details */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  placeholder="Enter quiz title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Enter quiz description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quiz Creation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual" className="text-xs sm:text-sm">
                Manual Creation
              </TabsTrigger>
              <TabsTrigger value="ai" className="text-xs sm:text-sm">
                Generate Questions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Add Question</CardTitle>
                  <CardDescription className="text-sm">
                    Create questions manually with options and explanations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      placeholder="Enter your question"
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentOptions.map((option, index) => (
                      <div key={index}>
                        <Label htmlFor={`option-${index}`} className="flex items-center gap-2">
                          Option {String.fromCharCode(65 + index)}
                          {correctAnswer === index && (
                            <Badge variant="secondary" className="text-xs">
                              Correct
                            </Badge>
                          )}
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id={`option-${index}`}
                            placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...currentOptions]
                              newOptions[index] = e.target.value
                              setCurrentOptions(newOptions)
                            }}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant={correctAnswer === index ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCorrectAnswer(index)}
                            className="px-3"
                          >
                            ✓
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="explanation">Explanation (Optional)</Label>
                    <Textarea
                      id="explanation"
                      placeholder="Explain why this answer is correct"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button onClick={addQuestion} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
                    Question Generation
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Generate questions using AI or curated content for popular topics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ai-topic">Topic</Label>
                    <Input
                      id="ai-topic"
                      placeholder="e.g., JavaScript, React, Python, CSS, History, Science"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Popular topics (JavaScript, React, Python, CSS) have curated questions available
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select value={aiDifficulty} onValueChange={setAiDifficulty}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="question-count">Number of Questions</Label>
                      <Select value={aiQuestionCount} onValueChange={setAiQuestionCount}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Questions</SelectItem>
                          <SelectItem value="10">10 Questions</SelectItem>
                          <SelectItem value="15">15 Questions</SelectItem>
                          <SelectItem value="20">20 Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={generateAIQuiz} className="w-full" disabled={loading}>
                    <Brain className="mr-2 h-4 w-4" />
                    {loading ? "Generating..." : "Generate Questions"}
                  </Button>
                </CardContent>
              </Card>

              {/* Status Alert */}
              {generationStatus.type !== "none" && getStatusAlert()}
            </TabsContent>
          </Tabs>

          {/* Questions Preview */}
          {questions.length > 0 && (
            <Card className="mt-4 sm:mt-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Questions Preview ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm sm:text-base flex-1 pr-2">
                        {index + 1}. {question.question}
                      </h4>
                      <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-2 rounded text-xs sm:text-sm ${
                            optIndex === question.correctAnswer
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Save and Publish Quiz */}
          {questions.length > 0 && (
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button onClick={saveQuiz} disabled={loading} variant="outline" size="lg" className="flex-1 sm:flex-none">
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Draft"}
              </Button>
              <Button
                onClick={publishQuiz}
                disabled={loading}
                size="lg"
                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
              >
                <Share2 className="mr-2 h-4 w-4" />
                {loading ? "Publishing..." : "Publish Quiz"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
