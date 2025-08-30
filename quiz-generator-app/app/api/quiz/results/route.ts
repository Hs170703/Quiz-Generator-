import { type NextRequest, NextResponse } from "next/server"

// Mock database for storing quiz results
const quizResults: any[] = [
  {
    id: "1",
    userId: "user123",
    quizId: "1",
    quizTitle: "JavaScript Fundamentals",
    score: 85,
    totalQuestions: 15,
    correctAnswers: 13,
    timeSpent: 480,
    completedAt: "2024-01-07T14:30:00Z",
    category: "JavaScript",
  },
  {
    id: "2",
    userId: "user123",
    quizId: "2",
    quizTitle: "React Hooks",
    score: 92,
    totalQuestions: 20,
    correctAnswers: 18,
    timeSpent: 750,
    completedAt: "2024-01-06T15:15:00Z",
    category: "React",
  },
]

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId") || "user123" // Default user for demo

    // Filter results for the specific user
    const userResults = quizResults.filter((result) => result.userId === userId)

    return NextResponse.json({ results: userResults })
  } catch (error) {
    console.error("Error fetching quiz results:", error)
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const resultData = await request.json()

    // Validate required fields
    if (!resultData.quizId || !resultData.score === undefined || !resultData.totalQuestions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new result entry
    const newResult = {
      id: Date.now().toString(),
      userId: resultData.userId || "user123", // Default user for demo
      quizId: resultData.quizId,
      quizTitle: resultData.quizTitle || "Quiz",
      score: resultData.score,
      totalQuestions: resultData.totalQuestions,
      correctAnswers: resultData.correctAnswers,
      timeSpent: resultData.timeSpent || 0,
      completedAt: new Date().toISOString(),
      category: resultData.category || "General",
    }

    // Add to mock database
    quizResults.push(newResult)

    return NextResponse.json({
      success: true,
      result: newResult,
      message: "Quiz result saved successfully",
    })
  } catch (error) {
    console.error("Error saving quiz result:", error)
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 })
  }
}
