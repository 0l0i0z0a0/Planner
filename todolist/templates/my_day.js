let addNote =  document.querySelector('.add__text'),
addButton = document.querySelector('.btn__add_note'),
todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function(){

    let newToDo = {
        todo: addNote.value,
        checked: false,
        important: false
    };
    todoList.push(newToDo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addNote.value = ""
});

function displayMessages(){
    let displayMessage = '';
    todoList.forEach(function(item, i){ 
        displayMessage += `
        <li>
            <input type='checkbox' class='custom_checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}></input>
            <label for='item_${i}' class="${item.important ? 'important': ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let which = idInput.toString().split("_")[1];
    todoList[parseInt(which, 10)].checked = !todoList[parseInt(which, 10)].checked;
    localStorage.setItem('todo', JSON.stringify(todoList));
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if (item.todo === event.target.innerHTML){
            if (event.ctrlKey){
                todoList.splice(i, 1);
            }
            else{
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

let text_goal_link;

let goal_textMain = document.querySelector(".goal_textMain");
let circularProgressMain = document.querySelector('.circular-progress_main');
let progressValueMain = document.querySelectorAll('.progress-value_main');
let k_done_subpoint = 5;

function main_circle(){
    // в следующую строку надо передать число последнего кружочка 
    // в целях сколько процентов там выполнено в виде числа без 
    // знака процента
    // пока для примера тут высчитывается Math.ceil(k_done_subpoint*100/10)
    text_goal_link = Math.ceil(k_done_subpoint*100/10); 
    // сюда мы передаем название последней цели из бд в виде строки
    if (/* массив из целей не пустой, то есть цели есть */ 2 === 3){
        goal_textMain.innerHTML = ""; //строке из бд
        progressValueMain[0].innerHTML = `${text_goal_link}%`;
        circularProgressMain.style.background = `conic-gradient(#7d2ae8, ${text_goal_link * 3.6}deg, #ededed 0deg)`;
        if (progressValueMain[0].innerHTML === "100%"){
            progressValueMain[0].innerHTML = "DONE!";
        }    
    }
    else{
        goal_textMain.innerHTML = "Тут пока пусто"; //строке из бд
        progressValueMain[0].innerHTML = `0%`;
        circularProgressMain.style.background = `conic-gradient(#7d2ae8, ${0 * 3.6}deg, #ededed 0deg)`;
    }
}

main_circle();


let text_note_link = "Тут пока пусто";
let note_textMain = document.querySelector(".note_textMain");
function main_notes(){
    $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        delo: item.todo,
                        importance: item.important,
                        action: 'notes',
                        user_id: ID,
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        kol = data.kol;
                        note = data.note
                    },
                    error: function (data) {
                        console.log("it isnt deleted");
                    }
    });
    if (kol!==0){
        note_textMain.innerHTML = ""; //строке из бд
    }
    else{
        note_textMain.innerHTML.innerHTML = "Тут пока пусто"; //строке из бд
    }
}

main_notes();