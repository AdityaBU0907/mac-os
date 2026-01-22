import { ADITYA_SYSTEM_PROMPT } from "./prompts";

const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const TELEGRAM_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

// Helper function to send logs to Telegram
async function logToTelegram(userMsg, botReply) {
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;

    const text = `🔔 *Portfolio Alert*\n\n👤 *User:* ${userMsg}\n🤖 *Bot:* ${botReply}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });
    } catch (err) {
        console.error("Telegram Log Failed:", err);
    }
}

export async function getRoastResponse(userMessage, history = []) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-4b-it:generateContent?key=${API_KEY}`;

    try {
        const previousMessages = history
            .filter(msg => msg.text && !msg.isError)
            .map(msg => ({
                role: msg.sender === "user" ? "user" : "model",
                parts: [{ text: msg.text }]
            }));

        // ✅ Inject the imported prompt
        if (previousMessages.length > 0) {
            previousMessages[0].parts[0].text = ADITYA_SYSTEM_PROMPT + "\n\n" + previousMessages[0].parts[0].text;
        } else {
            userMessage = ADITYA_SYSTEM_PROMPT + "\n\n" + userMessage;
        }

        const contents = [
            ...previousMessages,
            { role: "user", parts: [{ text: userMessage }] }
        ];

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: contents })
        });

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        const botReply = data.candidates[0].content.parts[0].text;

        logToTelegram(userMessage, botReply);

        return botReply;

    } catch (error) {
        console.error(error);
        return "I am currently experiencing high traffic. Please try again in a moment. 💻";
    }
}