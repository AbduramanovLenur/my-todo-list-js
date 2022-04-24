const todo = () => {
    const todoInput = document.querySelector('[data-js-todo-input]');
    const todoButton = document.querySelector('[data-js-todo-button]');
    const todoList = document.querySelector('[data-js-todo-list]');
    const todoDay = document.querySelector('[data-js-todo-day]');
    const todoTime = document.querySelector('[data-js-todo-time]');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let jsonRes = localStorage.getItem('todo');
    let todoItemElems = [];
    let todoArray = [];

    if (jsonRes) {
        todoArray = JSON.parse(jsonRes);
        todoStructure();
    }

    todoButton.addEventListener('click', (event) => {
        let date = new Date();
        let hour = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
        let minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
        let day = date.getDay();
        let time = `${hour}:${minutes}`;
        let inputVal = todoInput.value;
        let todoObj = {
            todoValue: inputVal,
            todoTimes: time,
            todoDay: day,
            completed: false
        }

        if (!inputVal == '') {
            todoArray.push(todoObj);
            todoUpdateLocal();
            todoStructure();
            todoInput.value = '';
        }
    });

    function todoStructure() {
        let displayTodo = '';
        todoArray.forEach((element, index) => {
            displayTodo += `
                <li class="todo__item ${element.completed ? 'checked' : ''}">
                    <div class="todo__item-box">
                        <input class="todo__checkbox" data-index="${index}" type="checkbox" ${element.completed ? 'checked' : ''}>
                        <p class="todo__item-text">
                            ${element.todoValue}
                        </p>
                        <p class="todo__item-day">
                            ${days[element.todoDay].substr(0, 3)}
                        </p>
                        <p class="todo__item-time">
                            ${element.todoTimes}
                        </p>
                        <i class="todo__delete fa-solid fa-trash-can" data-index="${index}"></i>
                    </div>
                </li>
                `;
        });

        todoList.innerHTML = displayTodo;
        todoItemElems = document.querySelectorAll('.todo__item');
    }

    document.addEventListener('click', (event) => {
        let target = event.target;

        if (target.closest('.todo__checkbox')) {
            let index = target.dataset.index;
            todoCompleted(index);
        }

        if (target.closest('.todo__delete')) {
            let index = target.dataset.index;
            todoDeleteElem(index);
        }
    })

    function todoCompleted(index) {
        todoArray[index].completed = !todoArray[index].completed;
        (todoArray[index].completed) ? todoItemElems[index].classList.add('checked') : todoItemElems[index].classList.remove('checked');
        todoUpdateLocal();
    }

    function todoDeleteElem(index) {
        console.log(index)
        todoArray.splice(index, 1);
        console.log(todoArray);
        todoUpdateLocal();
        todoStructure();
    }

    function todoUpdateLocal() {
        localStorage.setItem('todo', JSON.stringify(todoArray));
    }

    function todoTimeInner() {
        let date = new Date();
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

        todoTime.textContent = `${hour}:${minute}:${second}`;
        todoDay.textContent = days[date.getDay()];
    }

    setInterval(todoTimeInner, 1000);
};

export default todo;