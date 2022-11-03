const { Router } = require('express');
const router = Router();
const fs = require('fs'); // para leer, modificar, etc archivos
const { v4: uuidv4 } = require('uuid'); // version 4

const json_tasks = fs.readFileSync('src/database.json', 'utf-8'); // para leer
let tasks = JSON.parse(json_tasks); // decodificar

router.get('/', (req, res) =>{
    // let jsonProducts = JSON.stringify(productos)
    res.render('index.ejs' , { tasks }) //pasamos la lista del json usado como DB
})
router.get('/nosotros', (req, res) => {
    res.render('nosotros');
})

// SAVE TASK
router.post('/saveTask', (req, res) => {
    let { task , description } = req.body 
    if (description == '') {
        description = 'Not description'
    }
    let jsonAux = {
        id: uuidv4(),
        task,
        description,
        estado: false
    }
    // add a new task to the array
    tasks.push(jsonAux);

    // saving the array in a file
    const json_tasks = JSON.stringify(tasks);
    fs.writeFileSync('src/database.json', json_tasks, 'utf-8');
    
    res.json(jsonAux);
})

// DELETE TASK
router.post('/deleteTask', (req, res) => {
    const idAux = req.body.id

    tasks = tasks.filter(task => task.id != idAux );
    // saving data
    const json_tasks = JSON.stringify(tasks);
    fs.writeFileSync('src/database.json', json_tasks, 'utf-8');

    res.json('eliminado')
})
  
// UPDATE TASK
router.post('/editTask', (req, res) => {
    let { id, task, description } = req.body

    if (description == '') {
        description = 'Not description'
    }

    tasks = tasks.filter(task => task.id != id ); //filtramos , eliminamos
    // volvemos a agregar
    let jsonAux = {
        id,
        task,
        description,
        estado: false
    }
    tasks.push(jsonAux)

    // saving data
    const json_tasks = JSON.stringify(tasks);
    fs.writeFileSync('src/database.json', json_tasks, 'utf-8');

    res.json(jsonAux)
})


module.exports = router;