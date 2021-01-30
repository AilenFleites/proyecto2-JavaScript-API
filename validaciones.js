//VALIDACIONES
//Espero poder acortar esto
const form = document.getElementsByTagName('form')[0];
const nameField = document.getElementById('name');
const nameError = document.querySelector('#name + span.error');

nameField.addEventListener('blur', () => {
    if (nameField.value.length >= nameField.minLength || nameField.value.length <= 50) {
        nameError.innerHTML = '';
        nameError.className = 'error';
    } else {
        showErrorName();
    }
});

const showErrorName = () => {
    console.log('errorName');
    nameError.className = 'error active';
    if (nameField.validity.valueMissing) {
        nameError.innerHTML = 'Debería introducir un nombre';
    } else if (nameField.validity.tooShort) {
        nameError.innerHTML = `El nombre debe tener mínimo ${nameField.minLength} caracteres`;
    } else if (nameField.value.length > 50) {
        nameError.innerHTML = 'El nombre debe tener menos de 50 caracteres';
    }
}

const addressField = document.getElementById('address');
const addressError = document.querySelector('#address + span.error');

addressField.addEventListener('blur', () => {
    if (addressField.value.length >= addressField.minLength || addressField.value.length <= 60) {
        addressError.innerHTML = '';
        addressError.className = 'error';
    } else {
        showErrorAddress();
    }
});

const showErrorAddress = () => {
    console.log('errorAddress');
    addressError.className = 'error active';
    if (addressField.validity.valueMissing) {
        addressError.innerHTML = 'Debería introducir una dirección';
    } else if (addressField.validity.tooShort) {
        addressError.innerHTML = `La dirección debe tener mínimo ${addressField.minLength} caracteres`;
    } else if (addressField.value.length > 60) {
        addressError.innerHTML = 'La dirección debe tener menos de 60 caracteres';
    }
}

const phoneField = document.getElementById('phone');
const regExPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const phoneError = document.querySelector('#phone + span.error');

phoneField.addEventListener('blur', () => {
    if (regExPhone.test(phoneField.value)) {
        phoneError.innerHTML = '';
        phoneError.className = 'error';
    } else {
        showErrorPhone();
    }
});

const showErrorPhone = () => {
    console.log('errorPhone');
    phoneError.className = 'error active';
    if (phoneField.validity.valueMissing) {
        phoneError.innerHTML = 'Debería introducir un teléfono';
    } else if (!regExPhone.test(phoneField.value)) {
        phoneError.innerHTML = 'El dato ingresado no parece ser un teléfono';
    }
}

const emailField = document.getElementById('email');
const regExEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const emailError = document.querySelector('#email + span.error');

emailField.addEventListener('blur', () => {
    if (regExEmail.test(emailField.value)) {
        emailError.innerHTML = '';
        emailError.className = 'error';
    } else {
        showErrorEmail();
    }
});

const showErrorEmail = () => {
    console.log('errorEmail');
    emailError.className = 'error active';
    if (emailField.validity.valueMissing) {
        emailError.innerHTML = 'Debería introducir un correo';
    } else if (!regExEmail.test(emailField.value)) {
        emailError.innerHTML = 'El dato ingresado no parece ser un correo electrónico';
    }
}

form.addEventListener('submit', (e) => {
    if (nameField.validity.valid || nameField.value.length <= 50) {
        console.log(nameField.value);
        nameError.innerHTML = '';
        nameError.className = 'error';
    } else {
        showErrorName();
        e.preventDefault();
    }
    if (addressField.validity.valid || addressField.value.length <= 60) {
        addressError.innerHTML = '';
        addressError.className = 'error';
    } else {
        showErrorAdress();
        e.preventDefault();
    }
    if (regExPhone.test(phoneField.value)) {
        phoneError.innerHTML = '';
        phoneError.className = 'error';
    } else {
        showErrorPhone();
        e.preventDefault();
    }
    if (regExEmail.test(emailField.value)) {
        emailError.innerHTML = '';
        emailError.className = 'error';
    } else {
        showErrorEmail();
        e.preventDefault();
    }
});

/// Hasta aquí validaciones O_O

const validaciones = () =>{
    if ((nameField.validity.valid && nameField.value.length <= 50) && (addressField.validity.valid && addressField.value.length <= 60) && (regExPhone.test(phoneField.value) && (regExEmail.test(emailField.value)))) {
        console.log('todo OK');
        return true;
    } else {
        console.log('no pasará');
        if (nameField.validity.valueMissing || !nameField.validity.valid || nameField.value.length > 50) {
            showErrorName();
        }
        if (addressField.validity.valueMissing || !addressField.validity.valid || addressField.value.length > 60) {
            showErrorAddress();
        }
        if (phoneField.validity.valueMissing || !regExPhone.test(phoneField.value)) {
            showErrorPhone();
        }
        if (emailField.validity.valueMissing || !regExEmail.test(emailField.value)) {
            showErrorEmail();
        }
    }
    return false;

}