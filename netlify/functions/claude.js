exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key not configured" }) };
  }
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    if (!body.messages || !Array.isArray(body.messages)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing messages field" }) };
    }
    // Use haiku - 3x faster than sonnet, fits easily in 10s timeout
    body.model = "claude-haiku-4-5-20251001";
    body.max_tokens = Math.min(body.max_tokens || 4000, 4000);
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    try {
      JSON.parse(text); // validate
    } catch(e) {
      return { statusCode: 500, body: JSON.stringify({ error: "Truncated response", raw: text.slice(0,300) }) };
    }
    return {
      statusCode: response.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: text,
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
