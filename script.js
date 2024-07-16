const addBtn = document.querySelector('.addbtn');
const todoTask = document.querySelector('.tasks');
const textValue = document.querySelector('.todotext');

let getDataFromLocalStorage = ()=>{
    const localData = JSON.parse(localStorage.getItem('tasks'));
    return localData;
}

let localArray = getDataFromLocalStorage() || [];

const createDiv = (val)=>{
    const createdDiv = document.createElement('div');
    createdDiv.classList.add('savedtasks');
    createdDiv.innerHTML = `<p>${val}</p> <button class="donebtn">Mark as Done</button>`;
    todoTask.insertBefore(createdDiv,todoTask.childNodes[0]);
}

let createChild = ()=>{
    const trimmedValue = textValue.value.trim();
    localArray.push(trimmedValue);
    console.log(localArray);
    localStorage.setItem('tasks',JSON.stringify(localArray));
    createDiv(textValue.value);
}

addBtn.addEventListener('click',()=>{
    if(textValue.value === ''){
        alert('Please enter a task');
    }
    else{
        createChild();
        textValue.value = '';
    }
})

const showToDoItems=()=>{
    localArray.forEach((element)=>{
        createDiv(element);
    })
}

showToDoItems();

const removeTodoElement = (e)=>{
    const removeTodoList = e.target;
    // console.log(removeTodoList);
    const listContent = removeTodoList.previousElementSibling;
    //console.log(listContent.innerText);
    const delParent = removeTodoList.parentElement;
    localArray = localArray.filter((item)=>{
        return item !== listContent.innerText;
    })
    localStorage.setItem('tasks',JSON.stringify(localArray));
    delParent.remove();
}

todoTask.addEventListener('click',(e)=>{
    if(e.target.classList.contains('donebtn')){
        removeTodoElement(e);
    }
})