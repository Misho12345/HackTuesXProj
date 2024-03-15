const form = document.querySelector('#riasec-form');

document.addEventListener('DOMContentLoaded', () => {
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
            `<div class="col-md-6 question-container">
                <div class="form-check question-check">
                    <input class="form-check-input question-input" type="checkbox" id="checkbox_${index}" name="${question.text}" value="${question.category}" hidden>
                    <label class="form-check-label question-label" for="checkbox_${index}">
                        <span class="custom-checkbox"></span>${question.text}
                    </label>
                </div>
            </div>`;
    });
});

function calculateRIASEC() {
    const categories = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const form = document.getElementById('riasec-form');
    const inputs = form.querySelectorAll('input[type="radio"]:checked');
    inputs.forEach(input => {
        if(input.value !== '0') {
            categories[input.value]++;
        }
        window.localStorage.setItem('riasec', JSON.stringify(categories));
    });
    console.log(categories);
}
