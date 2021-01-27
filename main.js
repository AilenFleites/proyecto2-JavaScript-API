const urlBase = 'https://5ffb628063ea2f0017bdb0ef.mockapi.io/'


const getEmployees = () => {
    fetch(urlBase + 'users')
        .then(response => response.json())
        .then(data => renderTable(data))
}


const renderTable = (data) => {
    const tbody = document.getElementById('data-employees');
    tbody.innerHTML = '';
    const employees = data;
    for (const employee of employees) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td> ${employee.fullname} </td>
        <td> ${employee.address} </td>
        <td> ${employee.phone} </td>
        <td> ${employee.email} </td>
        <td> <button type='button' onclick="showEmployee(${employee.id})" class= "edit" id="${employee.id}"> <i class="material-icons" title="Edit">&#xE254;</i></button>
        <button type='button' onclick="deleteEmployee(${employee.id})" class= "delete" id="${employee.id}"> <i class="material-icons" title="Delete">&#xE872;</i></td></button>`;
        tbody.appendChild(tr);
        //btnListener('delete', deleteEmployee);
    }
}

const form = document.getElementsByTagName('form')[0];

const btnAddEmployee = document.getElementById('btn-add-employee');

btnAddEmployee.addEventListener('click', (e) => {//Resetea el form cada vez que se quiere agregar empleado
    e.preventDefault();
    form.reset();
})

//VALIDACIONES
//Espero poder acortar esto

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

const createEmployee = () => {//capturo los valores de los inputs del form y retorno un nuevo employee
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;


    return {
        fullname: name,
        address: address,
        phone: phone,
        email: email
    }
}

const addNewEmployee = () => {
    const newEmployee = createEmployee();
    console.log(newEmployee);

    fetch(urlBase + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(newEmployee)
    })
        .then(data => {
            console.log(data);
            getEmployees();
        })
        .catch(error => {
            console.error(error)
        })
}

const formReset = () => {
    const modal = document.getElementById('modal-add-employee');
    const m = bootstrap.Modal.getInstance(modal);
    m.hide();
    form.reset();
}

const btnCancel = document.getElementById('btn-cancel');
btnCancel.addEventListener('click', () => {
    formReset();
});

const btnAddInForm = document.getElementById('btn-add');
btnAddInForm.addEventListener('click', e => {
    if ((nameField.validity.valid && nameField.value.length <= 50) && (addressField.validity.valid && addressField.value.length <= 60) && (regExPhone.test(phoneField.value) && (regExEmail.test(emailField.value)))) {
        console.log('todo OK');
        addNewEmployee();
        formReset();
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
        e.preventDefault();
    }
});

//función del botón delete

const deleteEmployee = (id) => {
    fetch(urlBase + 'users/' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => getEmployees());
}

//esta funcion recibe un className y una funcion, recorre un array de botones by classname 
//y ejecuta la funcion al sucederse el evento "click", enviando el id del boton clickeado a la funcion callback (delete)
/*const btnListener = (className, callback) => {
   const btnList = document.getElementsByClassName(className);
   for (let i = 0; i < btnList.length; i++) {
       btnList[i].addEventListener('click', e => {
           const id = btnList[i].id;
           console.log(id)
           callback(id);
       })
   }
}*/

// FUNCION UPDATE
const showEmployee = (id) => { //Esta función está asociada al botón "edit", hace un pequeño GET por cada empleado, usando su ID
    fetch(urlBase + '/users/' + id, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => fillForm(data));
};

const fillForm = (data) => {//Esta función carga los datos que me traje del API de UN empleado y los carga en el form, dato a dato
    const modal = document.getElementById('modal-add-employee');
    const m = new bootstrap.Modal(modal);
    m.show();
    btnAddInForm.setAttribute('class', 'btn btn-success edit');
    btnAddInForm.innerHTML = 'Update';
    nameField.value = data.fullname,
        addressField.value = data.address,
        phoneField.value = data.phone,
        emailField.value = data.email
}

function updateForm(id, fullname, address, phone, email) {
    this.id = id,
        this.fullname = fullname;
    this.address = address;
    this.phone = phone;
    this.email = email;
}

const editForm = () => {
    form.addEventListener('submit', () => {
        new updateForm(id, fullname, address, phone, email)
    });
}


const updateEmployee = (id) => {
    const fullname = nameField.value;
    const address = addressField.value;
    const phone = phoneField.value;
    const email = emailField.value;

    const editEmployee = new updateForm(id, fullname, address, phone, email);
    console.log(editEmployee);
    fetch(urlBase + '/users/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Aplication/json'
        },
        body: JSON.stringify(editEmployee)
    })
        .then(response => {
            return response.json();
        })
        .then(data => getEmployees())
        .catch(error => console.log(error))
}

btnAddInForm.addEventListener('click', updateEmployee());



const filter = () => {
    const filterEmployee = document.getElementById('search');
    //aca capturo el input filter y le pongo un addEventListener con el evento keypress
    filterEmployee.addEventListener('keypress', e => {
        if (e.key === "Enter") { // cuando el input recibe un "Enter" 
            fetch(`${urlBase}/users?search=${e.target.value}`)// realizo un fetch con el valor ingresado por input
                .then(response => response.json()) // me trae todos los employees que contengan esos caracteres
                .then(data => renderTable(data))// renderizo la tabla con esos
        }
    })
}

const renderPage = () => {
    getEmployees();
    filter();
}

renderPage();
