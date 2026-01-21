import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.API_MODEL_KEY, //minimax/minimax-m2:free for advanced website design
        messages,
        stream: true,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL,
          "X-Title": "My Next.js App",
        },
        responseType: "stream",
      }
    );

    const stream = response.data;
    const encoder = new TextEncoder();
    let closed = false;

    const readable = new ReadableStream({
      async start(controller) {
        stream.on("data", (chunk: any) => {
          const payloads = chunk.toString().split("\n\n");

          for (const payload of payloads) {
            // ✅ Handle stream completion safely
            if (payload.includes("[DONE]")) {
              if (!closed) {
                closed = true;
                // Small delay allows any trailing chunks to finish
                setTimeout(() => {
                  try {
                    controller.close();
                  } catch (err) {
                    console.warn("Attempted to close an already closed stream");
                  }
                }, 50);
              }
              return;
            }

            // Handle normal stream data
            if (payload.startsWith("data:")) {
              const jsonStr = payload.replace("data:", "").trim();

              // Ignore empty or incomplete payloads
              if (
                !jsonStr ||
                !jsonStr.startsWith("{") ||
                !jsonStr.endsWith("}")
              ) {
                return;
              }

              try {
                const data = JSON.parse(jsonStr);
                const text = data.choices?.[0]?.delta?.content;

                if (text && !closed) {
                  try {
                    controller.enqueue(encoder.encode(text));
                  } catch (err: any) {
                    console.warn(
                      "Attempted to enqueue after close:",
                      err?.message
                    );
                  }
                }
              } catch (err: any) {
                console.warn("Skipping malformed JSON chunk:", jsonStr);
              }
            }
          }
        });

        // Handle natural stream end
        stream.on("end", () => {
          if (!closed) {
            closed = true;
            try {
              controller.close();
            } catch (err) {
              console.warn("Stream already closed on end");
            }
          }
        });

        // ✅ Handle stream errors
        stream.on("error", (err: any) => {
          console.error("Stream error:", err);
          if (!closed) {
            closed = true;
            try {
              controller.error(err);
            } catch (err2) {
              console.warn(
                "Attempted to enqueue after close:",
                (err as Error)?.message
              );
            }
          }
        });
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
