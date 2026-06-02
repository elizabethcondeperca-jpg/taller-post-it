let notas = [];

// Cargar notas al abrir la página
window.onload = function(){

    let guardadas = localStorage.getItem("notas");

    if(guardadas){

        notas = JSON.parse(guardadas);

        mostrarNotas();
    }

};

function agregar(){

    let titulo = document.getElementById("titulo_post").value;
    let descripcion = document.getElementById("descripcion_post").value;
    let importante = document.getElementById("importante").checked;

    if(titulo === "" || descripcion === ""){

        alert("Debe completar todos los campos");
        return;

    }

    notas.push({
        titulo,
        descripcion,
        importante
    });

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

    mostrarNotas();

    document.getElementById("titulo_post").value = "";
    document.getElementById("descripcion_post").value = "";
    document.getElementById("importante").checked = false;
}

function mostrarNotas(){

    let contenedor =
        document.getElementById("contenedor-postits");

    contenedor.innerHTML = "";

    notas.forEach((nota, indice) => {

        let claseNota =
            nota.importante
            ? "postit importante"    /* el ? y : es como un if mas simplificado */
            : "postit";

        contenedor.innerHTML += `
            <div class="${claseNota}">

                <div class="encabezado">

                    <h3>${nota.titulo}</h3>

                    <button
                        class="btn-eliminar"
                        onclick="eliminar(${indice})">
                        X
                    </button>

                </div>

                <p>${nota.descripcion}</p>

            </div>
        `;
    });
}

function eliminar(indice){

    notas.splice(indice, 1);

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

    mostrarNotas();
}