document.addEventListener('DOMContentLoaded', () => {
    const responseOutputDiv = document.querySelector('#response-output');
    const response = JSON.parse(localStorage.getItem('response'));

    responseOutputDiv.innerText = response ? response.response : "No response available.";

    localStorage.removeItem('response');
});
