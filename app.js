// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Lista para guardar los nombres
let amigos = [];

// Cargar amigos guardados en localStorage al iniciar
window.onload = function () {
    const guardados = localStorage.getItem("amigos");
    if (guardados) {
        amigos = JSON.parse(guardados);
        mostrarLista();
    }

    // Detectar Enter en el input
    document.getElementById("amigo").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita que se recargue la página
            agregarAmigo();
        }
    });
};

// Función para agregar un amigo
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    // Validar que no esté vacío
    if (nombre === "") {
        alert("Por favor, escribe un nombre válido.");
        return;
    }

    // Evitar nombres duplicados
    if (amigos.includes(nombre)) {
        alert("Ese nombre ya está en la lista.");
        return;
    }

    // Agregar a la lista
    amigos.push(nombre);
    guardarEnLocalStorage();
    mostrarLista();
    input.value = "";
}

// Función para mostrar la lista en pantalla
function mostrarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach(function (amigo, index) {
        let li = document.createElement("li");
        li.textContent = amigo;

        // Botón para eliminar un nombre
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.onclick = function () {
            eliminarAmigo(index);
        };

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    guardarEnLocalStorage();
    mostrarLista();
}

// Función para guardar en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem("amigos", JSON.stringify(amigos));
}

// Función para sortear un amigo aleatorio
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("No hay amigos en la lista para sortear.");
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceAleatorio];

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<li>🎉 El amigo secreto es: <strong>${amigoSorteado}</strong></li>`;
}
