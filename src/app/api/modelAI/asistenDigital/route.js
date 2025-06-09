import fs from "fs/promises";
import "dotenv/config";
import Groq from "groq-sdk";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let conversationHistory = [];

export async function POST(req) {
  try {
    const body = await req.json();
    const userQuestion = body.question;

    if (!userQuestion) {
      return new Response(
        JSON.stringify({ error: "User question can't be empty!" }),
        { status: 400 }
      );
    }

    const systemPrompt = await fs.readFile(
      path.resolve("src", "data", "prompt.txt"),
      "utf-8"
    );

    const companyData = await fs.readFile(
      path.resolve("src", "data", "data.txt"),
      "utf-8"
    );

    conversationHistory.push({
      role: "user",
      content: userQuestion,
    });

    const messages = [
      {
        role: "system",
        content: `${systemPrompt}\n\n${companyData}`,
      },
      ...conversationHistory,
    ];

    const modelList = [
      "meta-llama/llama-4-maverick-17b-128e-instruct",
      "meta-llama/llama-4-scout-17b-16e-instruct", // ini versi lebih ringan & stabil
    ];

    let completion;
    let modelUsed = null;
    let errorMessage = null;

    for (const model of modelList) {
      try {
        modelUsed = model;
        completion = await groq.chat.completions.create({
          model,
          messages,
          temperature: 1.3,
          seed: 100,
          max_completion_tokens: 5000,
          top_p: 0.93,
        });
        break;
      } catch (error) {
        console.warn(`⚠️ Model ${model} gagal:`, error.message);
        errorMessage = error.message;
        continue;
      }
    }

    if (!completion) {
      throw new Error("Semua model gagal diakses. Mohon coba lagi nanti.");
    }

    const modelReply = completion.choices[0].message.content;
    const reply = modelReply;

    conversationHistory.push({
      role: "assistant",
      content: reply,
    });

    return Response.json({
      reply: reply,
      modelUsed: completion.model,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ERROR:", error);
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan sistem",
        details: process.env.NODE_ENV === 'development' ? error.message : "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 })
    );
  }
}
