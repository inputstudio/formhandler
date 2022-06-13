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
      return new Response(env, { status: 500 });
      // return new Response("Missing environment variables", { status: 500 });
    }

    const text = `We received a message from : ${fullname} (${email})`;

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${BOT_API_KEY}/sendMessage?chat_id=${CHAT_ID}&text=${text}`
      );

      return new Response("Message sended successfully !");
    } catch (error) {
      return new Response("An error occured, please try later.", {
        status: 500,
      });
    }
  },
};
