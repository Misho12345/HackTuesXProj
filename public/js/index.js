const textArea = document.querySelector('#essay');
const submitButton = document.querySelector('#submit-button');
const loaderContainer = document.querySelector('#loader-container')

function randStr(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const id = randStr(16);

submitButton.addEventListener('click', () => {
    if (textArea.value === "") return;

    loaderContainer.style.display = 'flex';

    fetch('/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: id, message: textArea.value})
    })
        .then(async response => response.json())
        .then(data => {
            loaderContainer.style.display = 'none';
            textArea.value = "";

            localStorage.setItem('response', JSON.stringify(data));
            window.location.href = 'response.html';
        })
        .catch(error => {
            console.error(error);
            loaderContainer.style.display = 'none';
        });
});