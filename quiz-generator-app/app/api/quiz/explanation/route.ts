import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { question, options, correctAnswer, userAnswer } = await request.json()

    if (!question || !options || correctAnswer === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const prompt = `Generate a clear, educational explanation for this quiz question:

Question: ${question}
Options: ${options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${opt}`).join("\n")}
Correct Answer: ${String.fromCharCode(65 + correctAnswer)}. ${options[correctAnswer]}
${userAnswer !== undefined ? `User's Answer: ${String.fromCharCode(65 + userAnswer)}. ${options[userAnswer]}` : ""}

Please provide:
1. Why the correct answer is right
2. Why the other options are incorrect (if applicable)
3. Additional context or tips to remember this concept

Keep the explanation concise but thorough, suitable for learning.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert educator. Provide clear, helpful explanations that help students understand concepts better.",
    })

    return NextResponse.json({ explanation: text })
  } catch (error) {
    console.error("Explanation generation error:", error)
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 })
  }
}
