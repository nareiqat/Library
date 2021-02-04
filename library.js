// assign const by getting ids


let myLibrary = []

const form = document.getElementById("form");
const alert = document.querySelector('.alert');
const title = document.getElementById("title");
const author  = document.getElementById("author");
const isbn = document.getElementById("isbn");
const submitBtn = document.querySelector('.btn');
const tbodyList = document.querySelector('.book-list');
const table = document.querySelector('.table-list');
const clearBtn = document.querySelector(".clear-btn");
const tableHead = document.querySelector('.table_head');

// edit option

let editTitle;
let editAuthor;
let editIsbn;
let editFlag = false;
let editID = '';
let isRead = false;

//submit form

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click",clearItems)

//load items
window.addEventListener('DOMContentLoaded', setupItems)

//functions

function addItem(e){
    e.preventDefault();
    const titleVal  = title.value;
    const authorVal = author.value;
    const isbnVal = isbn.value;
    const id = new Date().getTime().toString();
    
    if(titleVal && authorVal && isbnVal && !editFlag){
        createListItem(id, titleVal, authorVal, isbnVal,isRead)
        displayAlert('item added to list','success');
        //show container
        tableHead.classList.add('show-container')
        //add to local storage
        addToLocalStorage(id,titleVal,authorVal,isbnVal,isRead);
        //set back to default
        setBackToDefault();
    }
    else if(titleVal && authorVal && isbnVal && editFlag){
        editTitle.innerHTML = titleVal;
        editAuthor.innerHTML = authorVal;
        editIsbn.innerHTML = isbnVal;
        displayAlert('value changed','success')
        editLocalStorage(editID, titleVal,authorVal,isbnVal,isRead);
        setBackToDefault();
    }
    else{
        displayAlert('please enter value!','danger')
    }
    
}

//display alert

function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert after a certain time
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1000)
}


//clear form
function clearItems(){
    const items = document.querySelectorAll('.book-item');

    if(items.length > 0){
        items.forEach(function(item){
            tbodyList.removeChild(item);
        });
    }
    
    tbodyList.classList.remove('show-container');
    displayAlert('empty list','danger');
    setBackToDefault();
    localStorage.removeItem('list')
}

//Delete item
function deleteItem(e){
    
    const element = e.currentTarget.parentElement.parentElement;

    const id = element.dataset.id;
    tbodyList.removeChild(element);
   if(tbodyList.children.length === 0){
       tbodyList.classList.remove('show-container')
   }
   displayAlert('item removed', 'danger');
   setBackToDefault();
   //remove from local storage
   removeFromLocalStorage(id)
}

// //edit item
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editAuthor = document.querySelector('.current');
    console.log(element)
    editIsbn = editAuthor.nextElementSibling;
    editTitle = editAuthor.previousElementSibling;
   
    title.value = editTitle.innerHTML;
    author.value = editAuthor.innerHTML;
    isbn.value = editIsbn.innerHTML
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

//read status

function readStatus(e){
    const element = e.currentTarget;
    // console.log(element);
    let readSt = element.checked ? true: isRead;
    console.log(readSt)
    
    
}
//set back to default

function setBackToDefault(){
    title.value = ''
    author.value = ''
    isbn.value = ''
    
    isRead = false;
    editFlag = false
    editID = '';
    submitBtn.textContent = "submit"
}
// ****** LOCAL STORAGE **********

function addToLocalStorage(id, titleVal, authorVal, isbnVal, isRead){
    const grocery = {id,titleVal,authorVal, isbnVal,isRead}
    let items = getLocalStorage();
    
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));

}
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, titleVal, authorVal, isbnVal,isReadVal){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id===id){
            item.titleVal = titleVal;
            item.authorVal = authorVal;
            item.isbnVal = isbnVal;
            item.isRead = isReadVal
        }
        return item;
    })
    localStorage.setItem('list', JSON.stringify(items));
}

function editReadLocalStorage(id,isReadVal){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(readStatus===true){
            isReadVal= true;
        }else{isRead}
    })
    localStorage.setItem('list', JSON.stringify(items));
}


function getLocalStorage(){
    return  localStorage.getItem("list") ? 
        JSON.parse(localStorage.getItem('list'))
        :[];
}

// // ****** SETUP ITEMS **********

function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id,item.titleVal,item.authorVal,item.isbnVal,item.isRead)
        })
        tbodyList.classList.add('show-container');
    }
}

function createListItem(id, titleVal, authorVal, isbnVal, isRead){
    const element = document.createElement('tr');
    //add class
    element.classList.add('book-item');
    //add id
    const attr = document.createAttribute('data-id');
    attr.value  = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<td >${titleVal}</td>
        <td class="current">${authorVal}</td>
        <td>${isbnVal}</td>
        <td> <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button></td>
        <td><label class="switch"><input id="checkBox" type="checkbox"><span class="slider round"></span></label></td>
    `;

    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click',editItem);
    const readSwitch = element.querySelector('#checkBox');
    readSwitch.addEventListener('click',readStatus);
    //append child
    tbodyList.appendChild(element);
}

