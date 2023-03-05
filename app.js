import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from "./firestore.js";

const taskForm = document.querySelector('#task-form');
const taskContainer = document.querySelector('#task-container');
let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks((querySnapshot) => {

        taskContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            const task = doc.data();
            taskContainer.innerHTML += `
                    <div class="card card-body mb-2 border-primary">
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <div>
                            <button class='btn-delete btn btn-primary' data-id="${doc.id}">Delete</button>
                            <button class='btn-edit btn btn-secondary' data-id="${doc.id}">Edit</button>
                        </div>
                    </div>`
        });

        const btnDelete = taskContainer.querySelectorAll('.btn-delete');
         btnDelete.forEach (btn => {
            btn.addEventListener('click', ({target: {dataset}}) => deleteTask(dataset.id))
        })

        const btnEdit = taskContainer.querySelectorAll('.btn-edit');
        btnEdit.forEach (btn => {
            btn.addEventListener('click', async ({target: {dataset}}) => {
                const doc = await getTask(dataset.id)
                const task = doc.data();
                taskForm['todo-input'].value = task.title;
                taskForm['task-description'].value = task.description;
                editStatus = true;
                id = dataset.id;
                taskForm['btn-task-save'].innerText='Update';
            })
            
        })
   
    })
})


taskForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const titulo = taskForm['todo-input'].value;
    const description = taskForm['task-description'].value;
    if (!editStatus)
        saveTask(titulo, description);
     else {
        updateTask(id, {title: titulo, description: description});
        editStatus = false;
        taskForm['btn-task-save'].innerText='Enviar';
     }
    taskForm.reset();
})