const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

export const generateResponse = async (prompt) => {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is missing in .env");
    }

    const res = await fetch(openRouterUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You must return ONLY valid raw JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.log("OPENROUTER RAW ERROR:", err);
      throw new Error(`OpenRouter error: ${err}`);
    }

    const data = await res.json();

    if (!data?.choices?.[0]?.message?.content) {
      console.log("OPENROUTER INVALID RESPONSE:", data);
      throw new Error("Invalid response from OpenRouter");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.log("GENERATE RESPONSE ERROR:", error);
    throw error;
  }
};