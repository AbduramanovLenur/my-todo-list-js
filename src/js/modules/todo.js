const todo = () => {
    const inputElement = document.querySelector('[data-js-todo-input]');
    const buttonElement = document.querySelector('[data-js-todo-button]');
    const listElement = document.querySelector('[data-js-todo-list]');
    const dayElement = document.querySelector('[data-js-todo-day]');
    const timeElement = document.querySelector('[data-js-todo-time]');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const jsonResult = localStorage.getItem('todo');
    let todoItemElems = [];
    let todoArray = [];

    if (jsonResult) {
        todoArray = JSON.parse(jsonResult);
        todoStructure();
    }

    const add = (event) => {
        event.preventDefault();

        const date = new Date();
        const getHour = date.getHours();
        const getMinute = date.getMinutes();
        const day = date.getDay();
        const hour = `${getHour < 10 ? '0' : ''}${getHour}`;
        const minute = `${getMinute < 10 ? '0' : ''}${getMinute}`;
        const time = `${hour}:${minute}`;
        const inputValue = inputElement.value.trim();
        const todoInfo = {
            todoValue: inputValue,
            todoTimes: time,
            todoDay: day,
            isCompleted: false
        }

        if (inputValue) {
            todoArray.push(todoInfo);
            todoUpdateLocal();
            todoStructure();
            inputElement.value = '';
        }
    }

    function todoStructure() {
        let displayTodo = '';

        todoArray.forEach((element, index) => {
            const {todoValue, todoTimes, todoDay, isCompleted} = element;

            displayTodo += `
                <li class="todo__item ${isCompleted ? 'is-checked' : ''}">
                    <div class="todo__item-box">
                        <input class="todo__checkbox" data-index="${index}" type="checkbox" ${isCompleted ? 'checked' : ''}>
                        <div class="todo__item-text">${todoValue}</div>
                        <div class="todo__item-day">${days[todoDay].substring(0, 3)}</div>
                        <div class="todo__item-time">${todoTimes}</div>
                        <button class="todo__delete-button" data-index="${index}" type="button">
                            <i class="todo__delete-ico fa-solid fa-trash-can" data-index="${index}"></i>
                        </button>
                    </div>
                </li>
                `;
        });

        listElement.innerHTML = displayTodo;
        todoItemElems = [...document.querySelectorAll('.todo__item')];
    }

    todoStructure();

    document.addEventListener('click', (event) => {
        const {target} = event;

        if (target.closest('.todo__checkbox')) {
            let index = target.dataset.index;
            todoCompleted(index);
        }

        if (target.closest('.todo__delete-button' || '.todo__delete-ico')) {
            let index = target.dataset.index;
            todoDeleteElem(index);
        }
    })

    function todoCompleted(index) {
        const arrayElement = todoArray[index];
        const arrayItemElement = todoItemElems[index];

        arrayElement.isCompleted = !arrayElement.isCompleted;

        if (arrayElement.isCompleted) {
            arrayItemElement.classList.add('is-checked');
        } else {
            arrayItemElement.classList.remove('is-checked');
        }

        todoUpdateLocal();
    }

    function todoDeleteElem(index) {
        todoArray.splice(index, 1);
        todoUpdateLocal();
        todoStructure();
    }

    function todoUpdateLocal() {
        localStorage.setItem('todo', JSON.stringify(todoArray));
    }

    function todoTimeInner() {
        const date = new Date();

        const getHour = date.getHours();
        const getMinute = date.getMinutes();
        const getSecond = date.getSeconds();
        const getDay = date.getDay();

        const hour = `${getHour < 10 ? '0' : ''}${getHour}`;
        const minute = `${getMinute < 10 ? '0' : ''}${getMinute}`;
        const second = `${getSecond < 10 ? '0' : ''}${getSecond}`;

        timeElement.textContent = `${hour}:${minute}:${second}`;
        dayElement.textContent = days[getDay];
    }

    setInterval(todoTimeInner, 1000);

    buttonElement.addEventListener('click', add);
    // document.addEventListener('keydown', (event) => {
    //     if (event.code === 'Enter') {
    //         add();
    //     }
    // });
};

export default todo;