  import { Groq } from "groq-sdk";
  import path from "path";
  import "dotenv/config";
  import fs from "fs/promises";

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  export async function POST(req) {
    try {
      const body = await req.json();
      const { answers, metadata } = body; 

      if (!Array.isArray(answers) || !metadata?.name) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid data structure" }),
          { status: 400 }
        );
      }

          const systemPrompt = await fs.readFile(
            path.resolve("src", "data", "prompt-form.txt"),
            "utf-8"
          );


          
            const formattedAnswers = answers.map(
              (answer) => `Pertanyaan: ${answer.question}\nJawaban: ${answer.answer}\npertanyaan layanan: ${answer.category}
              \ntipe: ${answer.type}`
            ).join('\n\n');
          
          const systemFinalPrompt = systemPrompt
            .replace('${formattedAnswers}', formattedAnswers)
            .replace('${metadata.name}', metadata.name)



      const userPrompt = `
      Susun data ini menjadi brief project dalam bahasa Indonesia  yang profesional tapi tetap mudah dipahami! jangan ubah kata katanya tapi susunn sesuai susunan yang  udah di tetapkan di prompt system jangan ubah jawaban sedikitpun kecuali pertanyaan agar terlihat lebih nyambung sama jawaban!

      ini datanya ${formattedAnswers}
  `;



      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemFinalPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        model: "meta-llama/llama-4-maverick-17b-128e-instruct", // ✅ ganti model agar valid
        temperature: 0.7,
        max_tokens: 5000,
        top_p: 1,
      });

      const analysis = completion.choices[0]?.message?.content || "Tidak dapat menghasilkan analisis";

      return new Response(JSON.stringify({
        success: true,
        data: {
          analysis,
          metadata
        }
      }), { status: 200 });

    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message || "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
