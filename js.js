var todos = []; // Ahora el array de tareas está vacío inicialmente

function AgregarTarea() {
    var entrada = document.getElementById("entrada").value.trim();
    if (entrada === "") {
        alert("Escribe algo para agregar");
        return;
    }
    var tarea = {
        descripcion: entrada, // Nombre de la tarea
        fecha_creacion: new Date().getTime(), // Timestamp de la fecha actual
        fecha_completado: null, // Inicialmente establecemos la fecha de completado como null
        completado: false // Estado de completado inicialmente false
    };
    todos.push(tarea);
    document.getElementById("entrada").value = "";
    ListarTareas();
}

// Toma el valor del timestamp del array y lo vacia o completa en base a su estado
function toggleCompletado(index) {
    todos[index].completado = !todos[index].completado; // Invierte el estado de la variable completado
    if (todos[index].completado) {
        todos[index].fecha_completado = new Date().getTime(); // Agrega la fecha en la que se completo
    } else {
        todos[index].fecha_completado = null; // Elimina la fecha en que se completo ya que se reinicia la tarea
    }
    ListarTareas();
}

// Usa splice y un index creado e inicializado mediante el uso de dom y la funcion onclick
function borrar(index) {
    todos.splice(index, 1);
    ListarTareas();
}

// Borra todas las tareas :|
function BorrarTodas() {
    todos = [];
    ListarTareas();
}

// Compara todas las fechas de creacion con sus fechas de complecion para poder determinar la tarea mas rapida, exceptuando las incompletas
function TareaMasRapida() {
    var tareaMasRapida = null;
    var tiempoMasRapido = Infinity; // Utiliza infinity para poder determinar la primer tarea comparada como la mas rapida e iniciar el ForEach

    todos.forEach(todo => {
        if (todo.fecha_completado !== null) {
            var tiempoTarea = todo.fecha_completado - todo.fecha_creacion;
            if (tiempoTarea < tiempoMasRapido) {
                tiempoMasRapido = tiempoTarea;
                tareaMasRapida = todo;
            }
        }
    });

    return tareaMasRapida;
}

// Llama a la funcion TareaMasRapida y mediante la informacion resultante la incalca en un p en el html
function TareaMasRapidaInfo() {
    var tareaMasRapida = TareaMasRapida();
    var infoElement = document.getElementById("tareaMasRapidaInfo");
    if (tareaMasRapida !== null) {
        var tiempoTranscurrido = tareaMasRapida.fecha_completado - tareaMasRapida.fecha_creacion;
        infoElement.textContent = "La tarea completada más rápida fue: " + tareaMasRapida.descripcion + " Tiempo transcurrido: " + tiempoTranscurrido/1000 + " segundos.";
    } else {
        infoElement.textContent = "No hay tareas completadas en la lista.";
    }
}

// Lista las tareas borrando la lista antes de efectuar cambios, como deseado en la consigna, y carga la informacion nuevamente. Esta funcion se utiliza demasiadas veces ya que se debe de utilizar cada vez que se fomra un cambio en la informacion
function ListarTareas() {
    var lista = document.getElementById("lista");
    lista.innerHTML = ""; // Limpia la lista antes de volver a llenarla

    todos.forEach((tarea, index) => {
        var li = document.createElement("li");
        var descripcion = document.createElement("span");
        descripcion.textContent = tarea.descripcion + " (Creada: " + new Date(tarea.fecha_creacion).toLocaleString() + ", Completada: " + (tarea.fecha_completado ? new Date(tarea.fecha_completado).toLocaleString() : "Pendiente") + ")"; // Indica la fecha de creacion de la tarea y si esta fue completada o no
        if (tarea.completado) {
            descripcion.style.textDecoration = "line-through"; // Tacha la tarea si está completada
        }

        // Evento onclick que llama a la funcion de toggle para poder guardar el dato por si la tarea fue completada
        descripcion.onclick = function() {
            toggleCompletado(index);
        };

        // truquito de internet para poder hacer una "x" como texto
        var simbolo = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");

        // Le agrega a la "x" una clase cerrar para el css y agrega un onclick para poder llamar a la tarea por si se quiere borrar la tarea
        simbolo.className = "cerrar";
        simbolo.onclick = function() {
            borrar(index);
        };

        // Serie de appends para formalizar la informacion dentro de los tags html necesarios
        li.appendChild(descripcion);
        li.appendChild(simbolo);
        lista.appendChild(li);
        simbolo.appendChild(txt);
    });
}

// Inicialización de la lista al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    ListarTareas();
});