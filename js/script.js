const navbaContent = document.getElementById('navbar-content');
const menuBtns = document.getElementsByClassName('btn-bottom');

// PAGES
const profilePage = document.getElementById('profile-page');
const listPage = document.getElementById('list-page');
const contactsPage = document.getElementById('contacts-page');
const settingsPage = document.getElementById('settings-page');

// PROFILE
const profileCard = document.getElementById('card-profile');
const profileForm = document.getElementById('profile-form');
const btnRedactProfile = document.getElementById('btn-redact-profile');
const btnSaveProfile = document.getElementById('btn-save-profile');
const profileName = document.getElementById('profile-name');
const profileDescription = document.getElementById('profile-description');

// CONTACTS
const contactsList = document.getElementById('contacts-list');
const searchContactsForm = document.getElementById('contacts-search-form');
const btnAddContact = document.getElementById('btn-add-contact');
const addContactForm = document.getElementById('add-contact-form');

//TASKS
const tasksList = document.getElementById('task-list');
const editTaskForm = document.getElementById('add-task-form');
const modalEditTask = document.getElementById('modal-edit-task');

// SETTINGS
const btnClearStore = document.getElementById('btn-clear-store');
const switchTheme = document.getElementById('switch-theme');

// INITIAL OBJECTS
const user = {
    name: "Билл Гейтс",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content."
}

let contacts = [
    { name: "Стив Джобс", mobile: "8979873498732" },
    { name: "Стив Возняк", mobile: "3675423475" },
    { name: "Балмер", mobile: "765467253467" }
];

let tasks = [
    {task: "task 1", date: "2020-06-17"},
    {task: "task 2", date: "2020-06-18"},
    {task: "task 3", date: "2020-06-19"},
    {task: "task 4", date: "2020-06-20"},
    {task: "task 5", date: "2020-06-21"}
];

function createTaskItem(task, id) {
    return`
        <li class="list-group-item task-head">
            <div class="task-body">
                <p>${task.task}</p>
                <span>${task.date}</span>
            </div>
            <div class="task-edit" data-id="${id}" data-toggle="modal" data-target="#modal-edit-task">
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </div>
        </li>
    `
}

function renderTasksList(tasks) {
    tasksList.innerText = '';

    for(let i=0; i < tasks.length; i++){
        const currentTask= tasks[i];
        tasksList.innerHTML += createTaskItem(currentTask, i);
    }
    taskEditBtnsBind();
}
function taskEditBtnsBind (){
    const taskEditBtns = document.getElementsByClassName('task-edit');
    for(let i=0; i < taskEditBtns.length; i++){
        const btn = taskEditBtns[i];
        const id = btn.getAttribute('data-id');
        btn.addEventListener('click',function () {
            editTaskForm.setAttribute('data-task-id', id);
            editTaskForm.innerHTML = '';
            editTaskForm.innerHTML += `
                <div class="form-group">
                    <input type="text" class="form-control" name="task" placeholder="${tasks[i].task}" autocomplete="off">
                </div>
                <div class="form-group">
                    <input type="date" class="form-control" name="date" value="${tasks[i].date}" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-primary">Изменить</button>
            `;
        })
    }
}

function createContactItem(contact) {
    return `
        <li class="list-group-item">
            ${contact.name}
            <div>
                <small>${contact.mobile}</small>
            </div>
        </li>
    `
}

function renderContacts(contacts) {
    contactsList.innerHTML = '';

    for(let i = 0; i < contacts.length; i++) {
        const currentContact = contacts[i];
        contactsList.innerHTML += createContactItem(currentContact);
    }
}

function changeNavbarContent(value) {
    navbaContent.innerText = value;
}

function changeProfileContent(name, description) {
    profileName.innerText = name;
    profileDescription.innerText = description;
}

function initialApp() {
    const savedName = localStorage.getItem('name');
    const savedDescription = localStorage.getItem('description');
    const savedContacts = localStorage.getItem('contacts');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
        switchTheme.classList.add('switch-active');
        switchTheme.setAttribute('data-checked', "1");
    }

    // Проверка на сохранённые имя и описание
    if (savedName) {
        user.name = savedName;
    }

    if (savedDescription) {
        user.description = savedDescription;
    }

    // Проверка сохраннённых контактов
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
    }

    profilePage.style.display = "none";
    settingsPage.style.display = "block";
    listPage.style.display = "none";
    contactsPage.style.display = "none";

    profileForm.style.display = "none";

    changeNavbarContent('Настройки');
    changeProfileContent(user.name, user.description);
    renderContacts(contacts);
    renderTasksList(tasks);

    profileForm['name'].value = user.name;
    profileForm['description'].value = user.description;
}

initialApp();

function menuBtnsBindEvent() {
    for (let i = 0; i < menuBtns.length; i++) {
        const btn = menuBtns[i];

        btn.addEventListener('click', function() {
            const pageName = btn.getAttribute('data-pagename');
            const path = btn.getAttribute('data-path');

            changeNavbarContent(pageName);
            switchPage(path);
        })
    }
}

function switchPage(activePage) {
    switch(activePage) {
        case "profile":
            profilePage.style.display = "block";
            settingsPage.style.display = "none";
            listPage.style.display = "none";
            contactsPage.style.display = "none";
            break;

        case "list":
            profilePage.style.display = "none";
            listPage.style.display = "block";
            contactsPage.style.display = "none";
            settingsPage.style.display = "none";
            break;

        case "contacts":
            profilePage.style.display = "none";
            listPage.style.display = "none";
            contactsPage.style.display = "block";
            settingsPage.style.display = "none";
            break;

        case "settings":
            profilePage.style.display = "none";
            listPage.style.display = "none";
            contactsPage.style.display = "none";
            settingsPage.style.display = "block";
            break;
    }
}

function switchProfileForm(showProfileForm) {
    if (showProfileForm) {
        profileForm.style.display = 'block';
        profileCard.style.display = "none";
        showProfileForm = false;
        return;
    }

    profileForm.style.display = 'none';
    profileCard.style.display = "block";
    showProfileForm = true;
    return;
}

btnRedactProfile.addEventListener('click', function() {
    switchProfileForm(true);
})

profileForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Сохраняем изменные данные
    // F12 -> Application -> storage
    localStorage.setItem('name', profileForm['name'].value);
    localStorage.setItem('description', profileForm['description'].value);

    changeProfileContent(
        profileForm['name'].value, 
        profileForm['description'].value
    )
    switchProfileForm(false);
})

searchContactsForm['search-query-contacts'].addEventListener('input', function() {
    const query = searchContactsForm['search-query-contacts'].value;
    const filtredContacts = contacts.filter(function(contact) {
        return contact.name.includes(query);
    })

    renderContacts(filtredContacts);
})

addContactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = addContactForm['name'].value;
    const mobile = addContactForm['mobile'].value;

    if (name.length && mobile.length) {
        // const contact = { name: name, mobile: mobile };
        contacts.unshift({ name, mobile });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts(contacts);

        addContactForm['name'].value = '';
        addContactForm['mobile'].value = '';
    }

})

editTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const id = editTaskForm.getAttribute('data-task-id');
    if(editTaskForm['task'].value){
        tasks[id].task = editTaskForm['task'].value;
    }
    if(editTaskForm['date'].value){
        tasks[id].date = editTaskForm['date'].value;
    }

    renderTasksList(tasks);

})

btnClearStore.addEventListener('click', function() {
    if (localStorage.length > 0) {
        const userAnswer = confirm('Вы уверены что хотите очистить localstorage?');
    
        if (userAnswer) {
            localStorage.clear();
        }
    }
})

switchTheme.addEventListener('click', function() {
    const checked = switchTheme.getAttribute('data-checked');
    switchTheme.classList.toggle('switch-active');
    document.body.classList.toggle('theme-dark');

    if (checked === '0') {
        switchTheme.setAttribute('data-checked', '1');
        localStorage.setItem('theme', 'dark');
    } else {
        switchTheme.setAttribute('data-checked', '0');
        localStorage.setItem('theme', 'light');
    }
})

menuBtnsBindEvent();