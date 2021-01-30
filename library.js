// assign const by getting ids


let myLibrary = []


// class Book {
//   constructor(title,author, isbn) {
//   this.title = title;
//   this.author = author;
//   this.isbn = isbn;
//   }
// }


var selectedRow = null;
function onEdit(td){
    selectedRow = td.parentElement.parentElement
    document.getElementById("title").value = selectedRow.cells[0].innerHTML
    document.getElementById("author").value = selectedRow.cells[1].innerHTML
    document.getElementById("isbn").value = selectedRow.cells[2].innerHTML
}

var selectedRow = 0;

function onFormSubmit(){
    var book = readFormData(isNewBook)
    if(selectedRow===null){
        insertNewBook(book)
       
        
        // pushToArray(myLibrary,book);
    }else{
        // console.log("hello")
        // for( var i =0;i<myLibrary.length;i++){
        //     if(selectedRow.cells[0]===myLibrary[i].title){
        //         myLibrary[i].title = selectedRow.cells[0]
        //         myLibrary[i].author = selectedRow.cells[1]
        //         myLibrary[i].isbn = selectedRow.cells[2]
        //     }
          updateRecord(book)
    }
      
    myLibrary.push(book) 
        // myLibrary.filter(item=> item!==book);
    
    resetForm();
   
    console.log(myLibrary)
}

function pushToArray ( arr, obj ) {
 const index = arr.findIndex((e) => e.id === obj.id);

    if (index === -1) {
        arr.push(obj);
    } else {
        arr[index] = obj;
    }
};

let isNewBook = true;

function readFormData(){
    var book = {}
    // for(var i =0;i<;i++){
    //     book["id"] = i+1;

    // }
    book["title"] = document.getElementById('title').value;
    book["author"] = document.getElementById('author').value;
    book["isbn"] = document.getElementById('isbn').value;
    
    
    
    return book;
    
    
}

function insertNewBook(data){
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length)
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.title;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.author;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.isbn;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<i onClick="onDelete(this)" class="fas fa-trash"></i>
                         <i onClick="onEdit(this)" class="fas fa-edit"></i>`;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                        </label>`;
     

}

function resetForm(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
    var selectedRow = null;
    
}


function updateRecord(book){
    
    // for(var i =0;i<myLibrary.length;i++){
    //     if()
    // }
    selectedRow.cells[0].innerHTML = book.title;
    selectedRow.cells[1].innerHTML = book.author
    selectedRow.cells[2].innerHTML = book.isbn
    // myLibrary.filter((book)=> book.id===obj)

}


function onDelete(td){
    if(confirm('Do you want to delete this book?')){
    row = td.parentElement;
    document.getElementById("tbody").deleteRow(row.Index);
    resetForm();
    }
}