const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const mongoose = require('mongoose');
const UserData = require('./models/UserData');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_LINK, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(bodyParser.json())
app.use(express.static("public"));

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

app.post('/login', async (req, res) => {
    const { cookie } = req.body;
    const data = await UserData.findOne({cookie: cookie});

    if (data) {
        res.status(200).json({threads: data.threads});
    } else {
        const defaultThread = await openai.beta.threads.create();

        const newData = new UserData({cookie: cookie, threads: [defaultThread]});
        await newData.save();

        res.status(200).json({threads: [defaultThread]});
    }
});

app.post('/new-chat', async (req, res) => {
    const { cookie } = req.body;
    const data = await UserData.findOne({cookie: cookie});

    if (!data) {
        res.status(400).json({error: "User not found."});
        return;
    }

    const newThread = await openai.beta.threads.create();
    data.threads.push(newThread);
    await data.save();
    res.status(200).json({threads: [newThread]});
});

app.post('/chat-content', async (req, res) => {
    const { threadId } = req.body;
    const messages = await openai.beta.threads.messages.list(threadId);

    let objs = [];
    messages.data.forEach((d, i) => {
        objs[i] = {
            role: d.role,
            content: d.content[0].text.value
        }
    });

    res.status(200).json({messages: objs});
});

app.post('/api', async (req, res) => {
    const assistantId = process.env.ASSISTANT_ID;
    const assistant = await openai.beta.assistants.retrieve(assistantId);

    const {cookie, threadId, message} = req.body;
    const data = await UserData.findOne({cookie: cookie});

    if (!data.threads.find(obj => obj.id === threadId)) {
        res.status(400).json({error: "Thread not found."});
        return;
    }

    await openai.beta.threads.messages.create(
       threadId,
        {
            role: 'user',
            content: message
        }
    );


    let run = await openai.beta.threads.runs.create(threadId, {assistant_id: assistant.id});

    while (1) {
        run = await openai.beta.threads.runs.retrieve(threadId, run.id);

        if (run.status === "completed") {
            const messages = await openai.beta.threads.messages.list(threadId);
            res.status(200).json({
                role: messages.data[0].role,
                content: messages.data[0].content[0].text.value
            });
            return;
        }

        if (run.status === "failed") {
            res.status(500).json(run.last_error);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});