const extractJson = async (text) => {
  try {
    if (!text) return null;

    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      console.log("JSON not found in response");
      return null;
    }

    const jsonString = cleaned.slice(firstBrace, lastBrace + 1);

    try {
      return JSON.parse(jsonString);
    } catch (err) {
      console.log("JSON parse error:", err.message);
      console.log("RAW JSON STRING:", jsonString);
      return null;
    }

  } catch (err) {
    console.log("extractJson error:", err);
    return null;
  }
};

export default extractJson;