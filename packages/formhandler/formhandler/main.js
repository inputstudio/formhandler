async function main(event, _) {
    const { http, __ow_headers, __ow_method, __ow_path, ...args } = event

    if (http.method !== "POST") {
        return {
            statusCode: 400,
            body: { error: "Expected POST" }
        }
    }

    if (Object.keys(args).lenght < 1) {
        return {
            statusCode: 400,
            body: { error: "Please add at least one field" }
        }
    }

    const { BOT_API_KEY, CHAT_ID } = process.env;

    if (!BOT_API_KEY || !CHAT_ID) {
        return {
            statusCode: 500,
            body: { error: "Missing environment variables" }
        }
    }

    try {
        const data = {
            chat_id: CHAT_ID,
            text: 'We received a message !\n' + Object.keys(args).reduce((str, key) => str += key + ': ' + args[key] + '\n', ""),
        };

        await fetch(`https://api.telegram.org/bot${BOT_API_KEY}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return { body: { message: "Message sended successfully !" } }
    } catch (error) {
        return {
            statusCode: 500,
            body: { message: "An error occured, please try later." },
        }
    }
}
