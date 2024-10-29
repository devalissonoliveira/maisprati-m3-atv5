let formNewTask = document.getElementById('formNewTask');
let responsible = document.getElementById('responsible');
let description = document.getElementById('description');
let statusNewTask = document.getElementById('statusNewTask');
let btnAdd = document.getElementById('btnAdd');
let btnsUpdCancContainer = document.getElementById('btnsUpdCancContainer');
let btnUpd = document.getElementById('btnUpd');
let btnCanc = document.getElementById('btnCanc');
let toDoList = document.getElementById('toDoList');



formNewTask.addEventListener('submit', (e) =>{
    e.preventDefault();

    const newId = getItemAll('tasks').length;
    const newResponsible = responsible.value;
    const newDescription = description.value;
    const newStatusTask = statusNewTask.value;

    const newTask = createdTask(newId, newResponsible, newDescription, newStatusTask);
    
    toDoList.appendChild(newTask)
    setItem(newId, newResponsible, newDescription, newStatusTask);

    formNewTask.reset();
})



const showTasks = () => {
    let tasks = getItemAll('tasks');
    

    for(let task of tasks){
        let newTask = createdTask(task.id, task.responsible, task.description, task.status, task.date)

        toDoList.appendChild(newTask)
    }
    
}



let createdTask = (id, responsible, description, status, date) =>{
    const article = document.createElement('article');
    article.id = `containerTask${id}`
    article.classList.add('text-center', 'p-3', 'mb-3','task-container');
    

    const idTask = document.createElement('p');
    idTask.classList.add('id-task');
    idTask.id = `idTask${id}`;
    idTask.textContent = `Tarefa #${id}`

    const responsibleTask = document.createElement('h1');
    responsibleTask.classList.add('responsible-task')
    responsibleTask.id = `responsibleTask${id}`;
    responsibleTask.textContent = responsible;

    const descriptionTask = document.createElement('p');
    descriptionTask.classList.add('description-task');
    descriptionTask.id = `descriptionTask${id}`;
    descriptionTask.textContent = description;

    const sectionBtns = document.createElement('section');
    sectionBtns.classList.add('btns', 'd-flex', 'gap-2', 'flex-wrap', 'justify-content-center', 'mb-3')

    const btnCompleted= document.createElement('button');
    btnCompleted.type = 'button';
    btnCompleted.classList.add('btn', 'btn-success');
    btnCompleted.textContent = 'Concluir';
    btnCompleted.setAttribute('onclick',`doneTask('concluida', ${id})`)

    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.classList.add('btn', 'btn-warning');
    btnEdit.textContent = 'Editar';
    btnEdit.setAttribute('onclick', `editTask(${id})`)

    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.classList.add('btn', 'btn-danger');
    btnDelete.textContent = 'Deletar'
    btnDelete.setAttribute('onclick',`deleteTask(event, 'containerTask${id}')`)

    const statusTask = document.createElement('p');
    statusTask.classList.add('status-task');
    statusTask.id = `statusTask${id}`;
    statusTask.textContent = `Status: ${status}`;

    const dateTask = document.createElement('p');
    dateTask.classList.add('date-task');
    dateTask.id = `dateTask${id}`;
    let dateFormatted = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    dateTask.textContent = date ?? dateFormatted;

    sectionBtns.appendChild(btnCompleted);
    sectionBtns.appendChild(btnEdit);
    sectionBtns.appendChild(btnDelete);

    if(status === 'concluida'){
        article.classList.add('opacity-done-task');
        responsibleTask.classList.add('line-done-task')
        descriptionTask.classList.add('line-done-task')
    }


    article.appendChild(idTask);
    article.appendChild(responsibleTask);
    article.appendChild(descriptionTask);
    article.appendChild(sectionBtns);
    article.appendChild(statusTask);
    article.appendChild(dateTask);
    
    return article;
}



const editTask = (id) =>{
    let containerTask = document.querySelector(`#containerTask${id}`);
    let responsibleTask = document.querySelector(`#responsibleTask${id}`);
    let descriptionTask = document.querySelector(`#descriptionTask${id}`);
    let statusTask = document.querySelector(`#statusTask${id}`);
    let dateTask = document.querySelector(`#dateTask${id}`);

    btnAdd.classList.add('d-none');
    btnsUpdCancContainer.classList.remove('d-none')    

    let tasks = getItemAll('tasks');  

    for(let idTask of tasks){        
        if(idTask.id === id){            
            responsible.value = idTask.responsible;            
            description.value = idTask.description;
            statusNewTask.value = idTask.status;          
            
                            
            responsible.addEventListener('input', e =>{
                idTask.responsible = e.target.value;
            })
                                             

            description.addEventListener('input', e =>{
                idTask.description = e.target.value;
            })
            

            statusNewTask.addEventListener('input', e =>{
                idTask.status = e.target.value;
            })
        }
    }  



    btnUpd.onclick = () =>{
        let dateFormatted = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

        for(let idTask of tasks){        
            if(idTask.id === id){            
               idTask.date = dateFormatted;
            }
        }

        localStorage.setItem('tasks', JSON.stringify(tasks))

        responsibleTask.textContent = responsible.value;        
        descriptionTask.textContent = description.value;
        statusTask.textContent = `Status: ${statusNewTask.value}`;
        dateTask.textContent = dateFormatted;

        if(statusNewTask.value === 'concluida'){
            containerTask.classList.add('opacity-done-task');
            responsibleTask.classList.add('line-done-task')
            descriptionTask.classList.add('line-done-task')
        } else {
            containerTask.classList.remove('opacity-done-task');
            responsibleTask.classList.remove('line-done-task')
            descriptionTask.classList.remove('line-done-task')
        } 


        btnsUpdCancContainer.classList.add('d-none');
        btnAdd.classList.remove('d-none')
        formNewTask.reset();
    }
}



const CancUpdateTask = () =>{
    btnsUpdCancContainer.classList.add('d-none');
    btnAdd.classList.remove('d-none')
    formNewTask.reset();
}



const doneTask = (status, id) =>{
    let containerTask = document.querySelector(`#containerTask${id}`);    
    let responsibleTask = document.querySelector(`#responsibleTask${id}`);
    let descriptionTask = document.querySelector(`#descriptionTask${id}`);
    let statusTask = document.querySelector(`#statusTask${id}`);
    let dateTask = document.querySelector(`#dateTask${id}`);

    let dateFormatted = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

    if(status === 'concluida'){   
        containerTask.classList.add('opacity-done-task');
        responsibleTask.classList.add('line-done-task');
        descriptionTask.classList.add('line-done-task');

        statusTask.textContent = 'Status: concluida';

        let tasks = getItemAll('tasks');

        for(let idTask of tasks){        
            if(idTask.id === id){
                idTask.status = 'concluida';
                idTask.date = dateFormatted;
            }
        }  

        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    dateTask.textContent = dateFormatted;
}



const deleteTask = (e, idTaskContainer) => {
    let taskContainer = e.target.closest(`#${idTaskContainer}`);

    taskContainer ? taskContainer.remove() : '';

    let idNumber = Number(idTaskContainer.replace(/[^0-9]/g,''))

    deleteItemById(idNumber)
}



// -------------------- LOCAL STORAGE --------------------
const getItemAll = (key) =>{
    let keyString = localStorage.getItem(`${key}`)

    let keyJSON = keyString ? JSON.parse(keyString) : [];

    return keyJSON
}



const setItem = (newId, newResponsible, newDescription, newStatusTask) =>{    
    let newTask = {
        id: newId,
        responsible: newResponsible,
        description: newDescription,
        status: newStatusTask,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    }

    let tasks = getItemAll('tasks');

    tasks.push(newTask)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}



const deleteItemById = (id) =>{
    let tasks = getItemAll('tasks');

    for(let idTask of tasks){        
        if(idTask.id === id){
            let index = tasks.indexOf(idTask);
            tasks.splice(index, 1)
            
        }
    }  

    localStorage.setItem('tasks', JSON.stringify(tasks))
}



showTasks();