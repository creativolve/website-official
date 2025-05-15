  import fs from "fs/promises";
  import "dotenv/config";
  import Groq from "groq-sdk";
  import path from "path";

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  let conversationHistory = [];

  export async function POST(req) {
    try {
      const body = await req.json();
      const userQuestion = body.question; // Pastikan key yang sama digunakan

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

      const isFirstInteraction = conversationHistory.length === 1;

      const completion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-maverick-17b-128e-instruct",
        messages,
        temperature: 1,
        max_completion_tokens: 500,
        top_p: 0.9,
      });

      const modelReply = completion.choices[0].message.content;

      const reply = modelReply

      conversationHistory.push({
        role: "assistant",
        content: reply,
      });

      return new Response(JSON.stringify({ reply }), { status: 200 });
    } catch (error) {
      console.error("❌ERROR:", error);
      return new Response(
        JSON.stringify({
          error: "Terjadi kesalahan pada server",
          message: error.message,
        }),
        { status: 500 }
      );
    }
  }
