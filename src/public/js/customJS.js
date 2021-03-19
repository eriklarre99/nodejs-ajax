console.log('script ok');

// consulta GET
// document.getElementById('btnGetProducts').addEventListener('click', () => getProducts() );
const getProducts = async () => {
    try {
        const res = await fetch('/products')
        const getData = await res.json();
        console.log(getData);
    } catch (error) {
        console.log(error);
    }
}

// consulta POST
// document.getElementById('btnPostProducts').addEventListener('click', () => postProducts() );
const postProducts = async () => {
    let dataJson = {
        id : 1,
        apellido : 'larre kirecito desde post fetch'
    } // en nodejs no utilizamos el FormData

    try {
        const res = await fetch('/products' , {
            method: 'POST',
            body: JSON.stringify(dataJson),
            headers: { 'Content-Type': 'application/json' } // necesario para nodejs no asi para php
        })
        const getData = await res.json();
        // const getData = await res.text(); // en caso de que recibamos resp de tipo text
        console.log(getData);
    } catch (error) {
        console.log(error);
    }
}


// Form Tasks submit event
const form_task = document.getElementById('form_task')
form_task.addEventListener('submit', e => {
    e.preventDefault();
    if ( form_task.querySelectorAll('button')[0].textContent == 'Save') {
        saveTask()    
    } else {
        editTask()
    }
    form_task.reset()
})

// btn Reset
document.querySelector('.btnReset').addEventListener('click', ()=>  { btnRESET() } )
function btnRESET() {
    form_task.querySelector('input').value = ''
    form_task.querySelector('textarea').value = ''

    form_task.querySelectorAll('div')[0].textContent = 'New Task'
    form_task.querySelectorAll('button')[0].textContent = 'Save'
    form_task.querySelectorAll('button')[0].classList.replace('btn-outline-success', 'btn-outline-info')
}

// save task
const saveTask = async () => {
    let task = document.getElementById('task-input').value
    let description = document.getElementById('description-input').value
    let jsonPost = { task, description }
    try {
        const res = await fetch('/saveTask', {
            method: 'POST',
            body: JSON.stringify(jsonPost),
            headers: { 'content-type': 'aPplication/json' }
        })
        const getData = await res.json()
        console.log(getData)
        drawTask(getData) //dibujar las tareas en el DOM
    } catch (error) {
        console.log('error desde saveTask: ', error);
    }
}

// draw Task
const drawTask = getData => {
    try {
        const { id, task, description, estado } = getData 
        let template = `
        <tr>
            <td> ${task} </th>
            <td>  ${description} </td>
            <td class="text-center"> 
                <i class="fas fa-edit fa-green fa-2x text-success btnEditar" data-id="${id}" role="button"></i>
                <i class="fas fa-minus-circle fa-red fa-2x text-danger mx-1 btnEliminar" data-id="${id}" role="button"></i>
            </td>
        </tr>
        `
        let listaTareas = document.getElementById('listaTareas')
        listaTareas.innerHTML += template
    } catch (error) {
        console.log('error desde drawTask: ', error);
    }
}

// table
const tablaTask = document.getElementById('tablaTask')

tablaTask.addEventListener('click', e => {
    if (e.target.classList.contains('btnEliminar')) {
        deleteTask(e)
    } else {
        if (e.target.classList.contains('btnEditar')) {
            let id = [e.target.dataset][0].id
            form_task.querySelectorAll('input')[1].value = id

            let element = e.target.parentElement.parentElement
            form_task.querySelector('input').value  = element.querySelectorAll('td')[0].textContent
            form_task.querySelector('textarea').value  = element.querySelectorAll('td')[1].textContent

            form_task.querySelectorAll('div')[0].textContent  = 'Edit Task'
            form_task.querySelectorAll('button')[0].textContent  = 'Update Task'
            form_task.querySelectorAll('button')[0].classList.replace('btn-outline-info', 'btn-outline-success') 
    
        }
    }
    e.stopPropagation()
})

// delete
const deleteTask = async (e) => {
    let id = [e.target.dataset][0].id
    console.log(`id: ${id}`);
    try {
        const res = await fetch('/deleteTask', {
            method: 'POST',
            body: JSON.stringify( { id } ) , //necesario que sea de tipo json
            headers: { 'content-type' : 'application/json' }
        })
        const getData = await res.json()

        if (getData === 'eliminado') {
            let element = e.target.parentElement.parentElement //escalar dos niveles
            element.remove()
        }

    } catch (error) {
        console.log("error desde deleteTask:" , error);
    }
}

// edit task
const editTask = async () => {
    const id = document.getElementById('idEDIT').value
    const task = form_task.querySelectorAll('input')[0].value
    const description = form_task.querySelectorAll('textarea')[0].value
    try {
        const res = await fetch('/editTask', {
            method: 'POST',
            body: JSON.stringify( { id , task , description } ) , 
            headers: { 'content-type' : 'application/json' }
        })
        const getData = await res.json()

        setTimeout( () => {
            location.reload();
        }, 0)

    } catch (error) {
        console.log("error desde editTask:" , error);
    }
}