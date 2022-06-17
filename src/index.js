export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Expected POST", { status: 500 });
    }

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return new Response("Please fill requiered fields ", { status: 400 });
    }

    const { BOT_API_KEY, CHAT_ID } = env;

    if (!BOT_API_KEY || !CHAT_ID) {
      return new Response("Missing environment variables", { status: 500 });
    }

    try {
      const data = {
        chat_id: CHAT_ID,
        text: `We received a message from : ${name} (${email})
Subject: ${subject}
Message: ${message}`,
      };
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_API_KEY}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      return new Response("Message sended successfully !");
    } catch (error) {
      return new Response("An error occured, please try later.", {
        status: 500,
      });
    }
  },
};
