const urlBase = 'https://5ffb628063ea2f0017bdb0ef.mockapi.io/'

const getEmployees = () => {
    const tbody = document.getElementById('data-employees');

    fetch(urlBase + 'users')
        .then(response => response.json())
        .then(data => {
            const employees = data;
             for (const employee of employees) {
                const tr = document.createElement('tr');
                tr.innerHTML= `
                <td> ${employee.fullname} </td>
                <td> ${employee.address} </td>
                <td> ${employee.phone} </td>
                <td> ${employee.email} </td>
                <td><i class="material-icons" id="${employee.id}"  title="Edit">&#xE254;</i>
                <i class="material-icons" id="${employee.id}" title="Delete">&#xE872;</i></td>`;
                tbody.appendChild(tr);
             }
        }
    );
}
getEmployees();

