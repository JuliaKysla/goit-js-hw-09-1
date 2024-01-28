import throttle from 'lodash.throttle';

const refs = {
   contactFormEl: document.querySelector('.feedback-form'),
   email: document.querySelector('[name="email"]'),
   message: document.querySelector('[name="message"]'),
   localStorageKey: "feedback-form-state",
};

refs.contactFormEl.addEventListener('input', throttle(saveToLocalStorage, 500));

function saveToLocalStorage () {
        const key = refs.localStorageKey;
        const data = {
        email: refs.email.value,
        message: refs.message.value,
    };
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
};




function loadFromLS () {
    const savedData = JSON.parse(localStorage.getItem(refs.localStorageKey));
if (savedData === null){
    return;
}
for (const key in savedData) {
    if (savedData.hasOwnProperty(key)){
    refs.contactFormEl.elements[key].value = savedData[key];
}
// refs.contactFormEl.elements.email.value = savedData.email;
// refs.contactFormEl.elements.message.value = savedData.message;
// console.log(savedData);
// console.log(refs.contactFormEl.elements);
   
};
};
loadFromLS ();

refs.contactFormEl.addEventListener("submit", onContactFormElSubmit);

function onContactFormElSubmit (event) {
    event.preventDefault();
    const userData = {
        email: refs.email.value,
        message: refs.message.value,
    };

    refs.contactFormEl.reset();
    localStorage.removeItem(refs.localStorageKey);
    console.log(userData);
};