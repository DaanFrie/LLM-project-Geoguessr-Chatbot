const form = document.getElementById("chatForm");
const chatfield = document.getElementById("chatfield");
const output = document.getElementById("response");

const storageKey = "GeoGuessrTipsChatHistory🗺️";

const systemPrompt = `You are a GeoGuessr expert who helps users identify countries based on visual clues from street view imagery. you only awsner with facts that you know 100% to be true, this is VERY IMPORTANT!
Use detailed information from the GeoGuessr hints document 'example.txt', focusing on these categories:

- Driving side (left or right)
- Climate and vegetation
- Roads (quality, presence of bike lanes, etc.)
- Road signs (language, style)
- Electricity poles (above ground, underground, style)

When providing tips, include relevant details from these categories to help the user identify the country accurately. awsner the user in order like 1), 2) etc.
When the user says a certain clue like 'left drive' or 'white roadlines', you will tell them the countries that could be in. 
in case of the user mentioning sun position, if the sun is north it means you are southern hemisphere and vice versa! so north sun is southern hemisphere and south sun is northern hemisphere.
if there is multiple options possible, think of things that can help the user distinguish the available options. DONT just ask for further clues, tell the user what to look for so they can tell you their findings and they narrow it doen even further.
als je kan helpen met het bepalen van waar in het land aan de hand van de clues, doe dat dan ook!

ONLY INCLUDE COUNTRIES THAT HAVE GOOGLE STREETVIEW AND ARE IN GEOGUESSR.

If asked about unrelated topics, politely explain that you specialize in GeoGuessr location identification and clues.`;



const converter = new showdown.Converter();

let messages = [["system", systemPrompt]];

form.addEventListener("submit", askQuestion);

async function askQuestion(event) {
    event.preventDefault();
    const prompt = chatfield.value.trim();
    if (!prompt) return;

    messages.push(["human", prompt]);
    chatfield.value = "";

    chatfield.disabled = true;
    output.innerHTML = "<em>Thinking...</em>";

    try {
        const response = await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages }),
        });

        if (!response.body) throw new Error("ReadableStream not supported");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiReply = "";
        output.innerHTML = "";

        let done = false;
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                const chunkText = decoder.decode(value, { stream: true });
                aiReply += chunkText;
                await typeText(chunkText);
            }
        }

        if (aiReply) {
            messages.push(["assistant", aiReply]);
            localStorage.setItem(storageKey, JSON.stringify(messages));
            output.innerHTML = converter.makeHtml(aiReply);
        }
    } catch (error) {
        output.innerHTML = "<strong>Something went wrong.</strong>";
        console.error(error);
    } finally {
        chatfield.disabled = false;
    }
}

async function typeText(text) {
    for (const char of text) {
        output.textContent += char;
        await new Promise((r) => setTimeout(r, 20));
    }
}

const logBtn = document.getElementById("logHistoryBtn");
logBtn.addEventListener("click", () => {
    console.log("Chatgeschiedenis:", messages);
});

