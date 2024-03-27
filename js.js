const todos = ["Lavar el auto", "Sacar al perro"]


function borrar(){
    var cerrar = document.getElementsByClassName("cerrar").value;
    var i = 0
    for (let i = 0; i < todos.length; i++) {
        if(todos[i] = cerrar){
            todos[i].pop();
        }   
    }
}
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    todos.pop=todos[i];
  }
}

function AgregarTarea(){
    var entrada = document.getElementById("entrada").value;
    if(entrada === ""){
        alert("Escribe algo para agregar")
    }
    else{
        todos.push(entrada);
    }
    document.getElementById("entrada").value = "";
    ListarTareas();
}

function ListarTareas(){
    var li = document.createElement("li");
    var t;
    var simbolo;
    var txt;

    todos.forEach(todo => {
        li = document.createElement("li");
        t = document.createTextNode(todo);
        txt = document.createTextNode("\u00D7");
        simbolo = document.createElement("SPAN");
        li.appendChild(t);
        document.getElementById("lista").appendChild(li);
        simbolo.className = "cerrar";
        simbolo.onclickevent=borrar();
        simbolo.appendChild(txt);
        li.appendChild(simbolo);
    });
}