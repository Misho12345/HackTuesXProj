const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

require('dotenv').config();

const app = express();
app.use(bodyParser.json())
app.use(express.static("public"));

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

let threadByUser = {};

app.post('/api', async (req, res) => {
    const assistantId = process.env.ASSISTANT_ID;
    const assistant = await openai.beta.assistants.retrieve(assistantId);

    const userId = req.body.userId;
    const userMessage = req.body.message;

    if (!threadByUser[userId]) {
        const thread = await openai.beta.threads.create();
        threadByUser[userId] = thread.id;
    }

    const threadMessage = await openai.beta.threads.messages.create(
        threadByUser[userId],
        {
            role: 'user',
            content: userMessage
        }
    );

    let run = await openai.beta.threads.runs.create(threadByUser[userId], {assistant_id: assistant.id});

    while (1) {
        run = await openai.beta.threads.runs.retrieve(threadByUser[userId], run.id);

        if (run.status === "completed") {
            const messages = await openai.beta.threads.messages.list(threadByUser[userId]);
            res.status(200).json({response: messages.data[0].content[0].text.value});

            console.log("User: ", threadMessage.content[0].text.value);
            console.log("Assistant: ", messages.data[0].content[0].text.value);

            break;
        }

        if (run.status === "failed") {
            res.status(500).json(run.last_error);
            break;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});