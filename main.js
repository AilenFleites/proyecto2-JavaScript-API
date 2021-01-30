const urlBase = 'https://5ffb628063ea2f0017bdb0ef.mockapi.io/'
const btnAddEmployee = document.getElementById('btn-add-employee');
const btnAddInForm = document.getElementById('btn-add');
const btnEdit = document.getElementById('btn-edit')
const btnCancel = document.getElementById('btn-cancel');
const form = document.getElementsByTagName('form')[0];
form.reset();
//Esta funcion realiza un GET de todos los empleados 

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
        <td> <button type='button' onclick="showEmployee(${employee.id})" id="edit"> <i class="material-icons" title="Edit">&#xE254;</i></button>
        <button type="button" data-bs-toggle="modal" data-bs-target="#modalDelete" id="delete" onclick="deleteEmployee(${employee.id})">
        <i class="material-icons" title="Delete">&#xE872;</i></td></button>`;
        tbody.appendChild(tr);
        //btnListener('delete', deleteEmployee);
    }
}

btnAddEmployee.addEventListener('click', (e) => {
    e.preventDefault();
    btnEdit.setAttribute('class', 'hide-btn')
    const btnAddInForm = document.getElementById('btn-add')
    btnAddInForm.setAttribute('class', 'btn btn-success');
    form.reset();
})

//VALIDACIONES

const nameField = document.getElementById('name');
const nameError = document.querySelector('#name + span.error');

const addressField = document.getElementById('address');
const addressError = document.querySelector('#address + span.error');

const phoneField = document.getElementById('phone');
const regExPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const phoneError = document.querySelector('#phone + span.error');

const emailField = document.getElementById('email');
const regExEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const emailError = document.querySelector('#email + span.error');

const employee = {//Objeto employee
    //Para validar con set
    _fullname: nameField.value,
    _address: addressField.value,
    _phone: phoneField.value,
    _email: emailField.value,
    //Accesors set para validar cada prop
    set fullname(value) {
        if (nameField.validity.valueMissing || !nameField.validity.valid || value.length > 50) {
            showError(nameField);
        } else {
            console.log('savedName ' + value);
            nameError.innerHTML = '';
            nameError.className = 'error'
            this.value = fullName;
            return fullname;
        }
    },

    get fullname() {
        return this._fullname;
    },

    set address(value) {
        if (addressField.validity.valueMissing || !addressField.validity.valid || value.length > 60) {
            showError(addressField);
        } else {
            console.log('savedAddress ' + value);
            addressError.innerHTML = '';
            addressError.className = 'error'
            this.value = address;
        }
    },

    set phone(value) {

        if (phoneField.validity.valueMissing || !regExPhone.test(value)) {
            showError(phoneField);
        } else {
            console.log('savedPhone ' + value);
            phoneError.innerHTML = '';
            phoneError.className = 'error';
            const numberPhone = parseInt(value);
            this.phone = numberPhone;
        }
    },

    set email(value) {
        if (emailField.validity.valueMissing || !regExEmail.test(value)) {
            showError(emailField);
        } else {
            console.log('savedEmail ' + value);
            emailError.innerHTML = '';
            emailError.className = 'error';
            this.value = email;
        }
    },
}

const showError = (field) => {
    if (field === nameField) {
        console.log('errorName ' + employee._fullname);
        nameError.className = 'error active';
        if (nameField.validity.valueMissing) {
            nameError.innerHTML = 'Debería introducir un nombre';
        } else if (nameField.validity.tooShort) {
            nameError.innerHTML = `El nombre debe tener mínimo ${nameField.minLength} caracteres`;
        } else if (employee._fullname.length > 50) {
            nameError.innerHTML = 'El nombre debe tener menos de 50 caracteres';
        }
    } else if (field === addressField) {
        console.log('errorAddress ' + employee._address);
        addressError.className = 'error active';
        if (addressField.validity.valueMissing) {
            addressError.innerHTML = 'Debería introducir una dirección';
        } else if (addressField.validity.tooShort) {
            addressError.innerHTML = `La dirección debe tener mínimo ${addressField.minLength} caracteres`;
        } else if (employee._address.length > 60) {
            addressError.innerHTML = 'La dirección debe tener menos de 60 caracteres';
        }
    } else if (field === phoneField) {
        console.log('errorPhone ' + employee._phone);
        phoneError.className = 'error active';
        if (phoneField.validity.valueMissing) {
            phoneError.innerHTML = 'Debería introducir un teléfono';
        } else if (!regExPhone.test(employee._phone)) {
            phoneError.innerHTML = 'El dato ingresado no parece ser un teléfono';
        }
    } else if (field === emailField) {
        console.log('errorEmail ' + employee._email);
        emailError.className = 'error active';
        if (emailField.validity.valueMissing) {
            emailError.innerHTML = 'Debería introducir un correo';
        } else if (!regExEmail.test(employee._email)) {
            emailError.innerHTML = 'El dato ingresado no parece ser un correo electrónico';
        }
    }
}

const checkName = () => {
    employee.fullname = employee._fullname;
}

const checkAddress = () => {
    employee.address = employee._address;
}

const checkPhone = () => {
    employee.phone = employee._phone;
}

const checkEmail = () => {
    employee.email = employee._email;
}

nameField.addEventListener('blur', () => {
    console.log('checking name');
    checkName()
});
addressField.addEventListener('blur', () => {
    checkAddress()
});
phoneField.addEventListener('blur', () => {
    checkPhone()
});
emailField.addEventListener('blur', () => {
    console.log('checking email');
    checkEmail()
});

const checkFields = () => {
    console.log('checkFields');
    checkName();
    checkAddress();
    checkPhone();
    checkEmail();
}

form.addEventListener('input', checkFields());

/// Hasta aquí validaciones O_O

//Esta funcion esconde el modal y resetea el form
const formReset = () => {
    const modal = document.getElementById('modal-add-employee');
    const m = bootstrap.Modal.getInstance(modal);
    m.hide();
    form.reset();
}

btnCancel.addEventListener('click', () => {
    formReset();
});

btnAddInForm.addEventListener('click', (e) => {
    form.addEventListener('submit', checkFields()); //chequeando todos los campos al hacer click
    if (employee.fullname && employee.address && employee.phone && employee.email) {
        employee = { fullname, address, phone, email };
        console.log(employee);
        addNewEmployee(employee);
        formReset();
    } else {
        e.preventDefault();
    }
})

const addNewEmployee = (object) => {
    fetch(urlBase + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(object)
    })
        .then(data => {
            console.log(data);
            getEmployees();
        })
        .catch(error => {
            console.error(error)
        })
}

//Este evento oculta el boton edit del modal, muestra el boton add
// y resetea el form cada vez que se quiere agregar empleado

btnAddEmployee.addEventListener('click', (e) => {
    e.preventDefault();
    btnEdit.setAttribute('class', 'hide-btn')
    const btnAddInForm = document.getElementById('btn-add')
    btnAddInForm.setAttribute('class', 'btn btn-success');
    form.reset();
})
//Este evento ejecuta la funcion de agregar empleado al hacer click en el boton add
btnAddInForm.addEventListener('click', e => {
    e.preventDefault();
    if (employee.fullname && employee.address && employee.phone && employee.email) {
        addNewEmployee();
        formReset();
    }
})

//Este evento resetea el modal al hacer click en boton cancel
btnCancel.addEventListener('click', () => {
    formReset();
});


//función del botón delete, se ejecuta con un 'onclick()' 
//en el boton delete de cada tr en la tabla

const deleteEmployee = (id) => {
    const btnConfirmDelete = document.getElementById('btn-confirm-delete')
    btnConfirmDelete.onclick = () => {
        fetch(urlBase + 'users/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => getEmployees(data))
    }
}

// //Esta función está asociada al botón "edit", hace un pequeño GET por cada empleado, usando su ID
const showEmployee = (id) => {
    fetch(urlBase + '/users/' + id, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => fillForm(data, id))
};
//Esta función carga los datos que me traje del API de UN empleado y los carga en el form, 
// oculta el boton add, muestra el boton update y sobre este ejecuta updateEmployee
const fillForm = (data, id) => {
    const modal = document.getElementById('modal-add-employee');
    const m = new bootstrap.Modal(modal);
    m.show();
    const btnAddInForm = document.getElementById('btn-add')
    btnAddInForm.setAttribute('class', 'hide-btn');
    btnEdit.setAttribute('class', 'btn btn-success');
    nameField.value = data.fullname,
        addressField.value = data.address,
        phoneField.value = data.phone,
        emailField.value = data.email

    btnEdit.addEventListener('click', e => {
        e.preventDefault();
        if (employee.fullname && employee.address && employee.phone && employee.email) {
            const user = createEmployee();
            updateEmployee(id, user)
        }
    })
}
//Esta funcion edita los datos del empleado
const updateEmployee = (id, user) => {
    const editEmployee = user;
    fetch(`${urlBase}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEmployee),
    })
        .then(response => response.json())
        .then(data => console.log("se editó correctamente"))
        .then(data => getEmployees(data))
}
//Funcion filter
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
