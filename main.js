const urlBase = 'https://5ffb628063ea2f0017bdb0ef.mockapi.io/'

const getEmployees = () => {
    const tbody = document.getElementById('data-employees');
    tbody.innerHTML = '';

    fetch(urlBase + 'users')
        .then(response => response.json())
        .then(data => {
            const employees = data;
            for (const employee of employees) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td> ${employee.fullname} </td>
                <td> ${employee.address} </td>
                <td> ${employee.phone} </td>
                <td> ${employee.email} </td>
                
                <td> <button type='button' id="${employee.id}" class= "edit"> <i class="material-icons" title="Edit">&#xE254;</i></button>
                <button type='button' class= "delete" id="${employee.id}"> <i class="material-icons" title="Delete">&#xE872;</i></td></button>`;
                tbody.appendChild(tr);
            }
            btnListener('delete',deleteEmployee);
        }
        )
}


const btnAddEmployee = document.getElementById('btn-add')

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

btnAddEmployee.addEventListener('click', e => {
    e.preventDefault();
    addNewEmployee();
});

const deleteEmployee = (id) => {
    fetch( urlBase + 'users/'+id , {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => getEmployees());
}

//esta funcion recibe un className y una funcion, recorre un array de botones by classname 
//y ejecuta la funcion al sucederse el evento "click", enviando el id del boton clickeado a la funcion callback (delete)
 const btnListener = (className, callback)=>{
    const btnList = document.getElementsByClassName(className);
    for(let i = 0; i< btnList.length; i++){
    btnList[i].addEventListener('click', e =>{
        const id = btnList[i].id;
        console.log(id)
        callback(id);   
    })
 }
 }

const render = () => {
    getEmployees();
}

render();
