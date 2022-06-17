const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers"
      ),
    };
    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
}

export default {
  async fetch(request, env) {
    let response;

    if (request.method === "OPTIONS") {
      return handleOptions(request);
    } else if (request.method !== "POST") {
      response = new Response("Expected POST", { status: 500 });
    } else {
      const { name, email, subject, message } = await request.json();

      if (!name || !email || !subject || !message) {
        response = new Response("Please fill requiered fields ", {
          status: 400,
        });
      }

      const { BOT_API_KEY, CHAT_ID } = env;

      if (!BOT_API_KEY || !CHAT_ID) {
        response = new Response("Missing environment variables", {
          status: 500,
        });
      }

      try {
        const data = {
          chat_id: CHAT_ID,
          text: `We received a message from : ${name} (${email})
Subject: ${subject}
Message: ${message}`,
        };
        await fetch(`https://api.telegram.org/bot${BOT_API_KEY}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        response = new Response("Message sended successfully !");
      } catch (error) {
        response = new Response("An error occured, please try later.", {
          status: 500,
        });
      }
    }

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    return response;
  },
};
