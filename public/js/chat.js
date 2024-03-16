const inputField = document.querySelector('#input');
const submitBtn = document.querySelector('#submit');
const popup = document.querySelector("#popup")
const form = document.querySelector('#riasec-form');

const messagesContainer = document.querySelector('#messages-container');
const historyContainer = document.querySelector('#history-container');

let cookie = getCookie("userId");

let threads = [];
let chats = [];
let currentChat = 0;


function calculateRIASEC() {
    const categories = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const inputs = form.querySelectorAll('input:checked');
    inputs.forEach(input => {
        if(input.value !== '0') {
            categories[input.value]++;
        }
    });
    console.log(categories);
    return JSON.stringify(categories);
}

function makePopupPage2() {
    const questions = [
        { text: "Обичам да работя по автомобили", category: "R" },
        { text: "Обичам да редя пъзели", category: "I" },
        { text: "Умея да работя самостоятелно", category: "A" },
        { text: "Обичам да работя в екип", category: "S" },
        { text: "Аз съм амбициозен човек, поставям си цели", category: "E" },
        { text: "Обичам да подреждам нещата (файлове, бюра/офиси)", category: "C" },
        { text: "Обичам да строя неща", category: "R" },
        { text: "Обичам да чета за изкуство и музика", category: "A" },
        { text: "Харесва ми да имам ясни инструкции, които да следвам", category: "C" },
        { text: "Обичам да се опитвам да влияя на хората или да ги убеждавам", category: "E" },
        { text: "Обичам да правя експерименти", category: "I" },
        { text: "Обичам да преподавам или обучавам хора", category: "S" },
        { text: "Харесва ми да помагам на хората и да решавам проблемите им", category: "S" },
        { text: "Обичам да се грижа за животни", category: "R" },
        { text: "Не бих имал нищо против да работя по 8 часа на ден в офис", category: "C" },
        { text: "Харесва ми да продавам неща", category: "E" },
        { text: "Харесва ми творческото писане", category: "A" },
        { text: "Харесва ми науката", category: "I" },
        { text: "Бързо поемам нови отговорности", category: "E" },
        { text: "Интересувам се от лекуване на хора", category: "S" },
        { text: "Харесва ми да се опитвам да разбера как работят нещата", category: "I" },
        { text: "Харесва ми да сглобявам или да сглобявам неща", category: "R" },
        { text: "Аз съм творческа личност", category: "A" },
        { text: "Обръщам внимание на детайлите", category: "C" },
        { text: "Обичам да подавам документи или да пиша на машина", category: "C" },
        { text: "Обичам да анализирам нещата (проблеми/ситуации)", category: "I" },
        { text: "Обичам да свиря на инструменти или да пея", category: "A" },
        { text: "Харесва ми да научавам за други култури", category: "S" },
        { text: "Бих искал да започна собствен бизнес", category: "E" },
        { text: "Обичам да готвя", category: "R" },
        { text: "Обичам да играя в пиеси", category: "A" },
        { text: "Аз съм практичен човек", category: "R" },
        { text: "Обичам да работя с числа или графики", category: "I" },
        { text: "Обичам да дискутирам по въпроси", category: "S" },
        { text: "Умея да водя документация за работата си", category: "C" },
        { text: "Обичам да ръководя", category: "E" },
        { text: "Обичам да работя на открито", category: "R" },
        { text: "Бих искал да работя в офис", category: "C" },
        { text: "Добър съм в математиката", category: "I" },
        { text: "Харесва ми да помагам на хората", category: "S" },
        { text: "Обичам да рисувам", category: "A" },
        { text: "Обичам да изнасям речи", category: "E" },
    ];

    questions.forEach((question, index) => {
        form.innerHTML +=
            `<div class="question-container">
                <input class="question-input" name="a" type="checkbox" id="checkbox_${index}" name="${question.text}" value="${question.category}" hidden>
                <label class="question-label" for="checkbox_${index}">
                    <span class="custom-checkbox"></span>${question.text}
                </label>
            </div>`;
    });
}


function randStr(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function addMessage(message) {
    messagesContainer.innerHTML +=
        `<div class="message ${message.role === "user" ? "user" : "bot"}-message">
            <div class="message-text">${message.content}</div>
        </div>`;

}

function getCookie(n) {
    const name = n + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}


function start() {
    if (cookie !== "") {
        setupUser(getCookie("popupData"), false);
        return;
    }

    document.cookie = cookie = `userId=${randStr(16)}`;

    popup.style.display = "block";
    document.getElementById("overlay").style.display = "block";

    document.querySelector("#next").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("page-1").style.display = "none";
        makePopupPage2();
        document.getElementById("page-2").style.display = "block";

        document.querySelector("#submit-form").addEventListener("click", e => {
            e.preventDefault();
            popup.style.display = "none";
            document.getElementById("overlay").style.display = "none";

            const age = document.querySelector("#age").value;
            const country = document.querySelector("#country").value;
            const livingAbroad = document.querySelector("#study_abroad_yes").value;
            const skills = document.querySelector("#skills").value;
            const studies = document.querySelector("#studies").value;
            const moreInfo = document.querySelector("#about").value;

            const message = JSON.stringify({
                age,
                country,
                livingAbroad,
                skills,
                studies,
                moreInfo
            });

            const riasec = calculateRIASEC();

            document.cookie = `popupData=${[message, riasec]}`;
            setupUser([message, riasec]);
        });
    });
}


function setupUser(data, begin=true) {
    fetch("/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cookie: cookie})
    })
        .then(async response => response.json())
        .then(data => threads = data.threads)
        .then(async _ => {
            threads.reverse().forEach((thread, index) => {
                historyContainer.innerHTML += `<div class="history-panel" onclick="switchChat(${index})">Chat-Name</div>`;
            });

            await switchChat(currentChat);
            if (begin) {
                sendMessage("дай експертното си мнение за тези данни: " + JSON.stringify(data));
            }
        })
        .catch(error => console.error(error));
}

function sendMessage(msg) {
    const value = msg ?? inputField.value;
    if (!/\S/.test(value)) return;

    if (!msg) {
        addMessage({role: 'user', content: value});
        inputField.value = "";
    }

    fetch('/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            cookie: cookie,
            threadId: threads[currentChat].id,
            message: value
        })
    })
        .then(async response => response.json())
        .then(addMessage)
        .catch(error => console.error(error));
}

async function switchChat(index) {
    messagesContainer.innerHTML = "";
    currentChat = index;

    return fetch("/chat-content", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({threadId: threads[currentChat].id})
    })
        .then(async response => response.json())
        .then(data => {
            chats = data.messages.reverse();
            chats.forEach(message => addMessage(message));
        });
}

function makeNewChat() {
    fetch("/new-chat", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cookie: cookie})
    })
        .then(async response => response.json())
        .then(data => threads.push(data.threads[0]))
        .then(async _ => {
            historyContainer.innerHTML = "";
            threads.reverse().forEach((thread, index) => {
                historyContainer.innerHTML += `<div class="history-panel" onclick="switchChat(${index})">SUS</div>`;
            });

            await switchChat(0);
        })
        .catch(error => console.error(error));
}

submitBtn.addEventListener('click', _ => sendMessage());
inputField.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

start();