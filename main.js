const urlBase = 'https://5ffb628063ea2f0017bdb0ef.mockapi.io/'
const btnAddEmployee = document.getElementById('btn-add-employee');
const btnAddInForm = document.getElementById('btn-add');
const btnEdit = document.getElementById('btn-edit')
const btnCancel = document.getElementById('btn-cancel');

//Esta funcion realiza un GET de todos los empleados 

const getEmployees = () => {
    fetch(urlBase + 'users')
        .then(response => response.json())
        .then(data => renderTable(data))
}

//Esta funcion recibe la lista de empleados y la renderiza en una tabla

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
    }
}


const createEmployee = () => {//capturo los valores de los inputs del form y retorno un nuevo employee
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
   
    if(validaciones() === true){
    return {
        fullname: name,
        address: address,
        phone: phone,
        email: email
    }
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

//Esta funcion esconde el modal y resetea el form
const formReset = () => {
    const modal = document.getElementById('modal-add-employee');
    const m = bootstrap.Modal.getInstance(modal);
    m.hide();
    form.reset();
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
        if(validaciones() === true){
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
    
    btnEdit.addEventListener('click', e =>{
        e.preventDefault();
        if(validaciones() === true){
        const user = createEmployee();
        updateEmployee(id,user)
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
