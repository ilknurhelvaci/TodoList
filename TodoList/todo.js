// Tüm elementleri seçme 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group"); //ul elementi
const firstCardBody = document.querySelectorAll(".card-body")[0]; //alert oluştuğunda paranti card body seçmek için
const secondCardBody = document.querySelectorAll(".card-body")[1]; //alert oluştuğunda paranti card body seçmek için
const filter = document.getElementById("filter");
const clearButton = document.querySelector("#clear-todos"); //Tüm taskları temizleyin butonu


addEventListeners();

function addEventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(){
    if(confirm("Silmek istediğinizden emin misiniz?")){
        //Arayüzden todoları temizleme
        // todoList.innerHTML = "";   yavaş olan yöntem
        while(todoList.firstElementChild =! null){
            todoList.removeChild(todoList.firstElementChild);

        }
       localStorage.removeItem("todos");
    }
}
function filterTodos(e){
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function(listItem){
    const text = listItem.textContent.toLowerCase();

    if(text.indexOf(filterValue) === -1){
        //Bulamadı
        //Ekranda göstermemiz gerekiyor
        listItem.setAttribute("style","display : none !important") //CSS de geçerli olan özelliğini silmiş oluyoruz.

    }
    else{
        listItem.setAttribute("style","display : block !important")
    }

  });
}
function deleteTodo(e){
       if(e.target.className === "fa fa-remove" ){
             e.target.parentElement.parentElement.remove();
             deleteFromToStorage(e.target.parentElement.parentElement.textContent);
             showAlert("success","Element başarıyla silindi");
     }
}
function deleteFromToStorage(Deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
             if(todo === Deletetodo){
                  todos.splice(index,1); // Arrayin değerini silme
             }
    });
     localStorage.setItem("todos",JSON.stringify(todos));


}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach( function(todo){
             addTodoToUI(todo);
    }
        
    );
}
function addTodo(e){
    const newTodo = todoInput.value.trim(); //Boşlukları atıyor

    if(newTodo ===""){
       showAlert("danger","Lütfen bir todo girin...");
    }
    else{
        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarı ile eklendi");
    }


   e.preventDefault();

}
function getTodosFromStorage(){ // Storage dan tüm todoları alıyor
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = []; 
    }
    else{
        todos =  JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}
function addTodoToStorage(newTodo){
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    //setTimeOut - alert mesajını ekranda tutacağımız süre
    setTimeout(function(){
        alert.remove();
    },2000);

}
function addTodoToUI(newTodo){ //String değerini list item olarak eklemek 
    // <!-- <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li> -->


    //List Item Oluşturma 

    const listItem = document.createElement("li"); 
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    listItem.className = "list-group-item d-flex justify-content-between";

    //TextNode ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);    

    //TodoListe List Itemi ekleme 
    todoList.appendChild(listItem);
    todoInput.value = "";

}