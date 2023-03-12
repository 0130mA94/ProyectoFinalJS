localStorage.setItem("saludo", "Bienvenido a la cueva del comic!");
let saludo = localStorage.getItem("saludo");
console.log(saludo);


let comics = [];
let carrito = [];
comics = JSON.parse(localStorage.getItem("comics")) || [];

const Comics = "JSON/Comics.json";






fetch(Comics)
    .then(respuesta => respuesta.json())
    .then(data => {
        data.forEach(producto => {
            contenedorCarrito.innerHTML += `
            <div class="comic-desc">
            <img class = 'Comics-img' src="${producto.img} " alt="${producto.nombre}"> 
            
            <h5 class="comic-nombre">Nombre: ${producto.nombre} </h5>
            <p> Precio: ${producto.precio} </p> 
            <h5 class="comic-Editorial">${producto.editorial}</h5>
            <button id=${producto.id} class="btn-compra">Agregar al carrito</button>
            </div>`;
        });
        const btnComprar = document.querySelectorAll(".btn-compra");
        btnComprar.forEach(el => {
            console.log(el);
            el.addEventListener("click", (e) => {
                agregarAlCarrito(e.target.id);
                console.log("agregado al carrito!");
            });
        });


    })
    .catch(error => console.log(error))
    .finally(() => console.log("Proceso finalizado"));


const verCarrito = document.getElementById("VerCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");

        ComicsCont.innerHTML = ` 
    <div class = "card">
        <img src=${producto.img} class ="card-img-top imgProductos">
        <div class="card-body">
        <h5 class= "card-title"> ${producto.nombre} </h5>
        <p class class="card-text"> ${producto.precio}</p>
        <p class = "card-text> ${producto.cantidad}</p>
        <button class ="btn colorbtn" id= "eliminar${producto.id}"</button>
        <button class = "btn colorbtn" id= "aumentar${producto.id}"</button>
        <button class = "btn colorbtn" id = "disminuir${producto.id}"</button>
        </div>
    </div>
    `
        contenedorCarrito.appendChild(card);

        const eliminar = document.getElementById(`disminuir${producto.id}`);
        eliminar.addEventListener("click", () => {
            disminuirCantidad(producto.id);

        })
        const aumentar = document.getElementById(`aumentar${producto.id}`);
        aumentar.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
        const btn = document.getElementById(`eliminar${producto.id}`);
        btn.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
        
    });
}

const agregarAlCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id == id);
    let productoEnCarrito = {...producto, cantidad: 1}
    let indexCarrito = carrito.findIndex(producto => producto.id == id);
    if(indexCarrito == -1){
        carrito.push(productoEnCarrito);
    }
    else {
        carrito[indexCarrito].cantidad++
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carrito.push(producto);
    mostrarCarrito();
    console.log(id);
    console.log(carrito);
}
const disminuirCantidad = (id) => {
    const producto = carrito.find((producto) => producto.id == id);
    producto.cantidad--;
    if (producto.cantidad == 0) {
        eliminarDelCarrito(id);
    }
    else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    mostrarCarrito();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id == id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



function Comic(editorial, nombre, edición, precio, cantidad, disponibilidad) {
    this.editorial = editorial;
    this.nombre = nombre;
    this.edición = edición;
    this.precio = precio;
    this.cantidad = cantidad;
    this.disponibilidad = disponibilidad;

    this.informar = function () {
        console.log("El comic " + this.nombre + " esta disponible, no olvides de reservarlo!");
    }
}

const comic1 = new Comic("Marvel Comics", "Los Vengadores: Guerra Civil", "Must-Have", 25, 15, "si");
const comic2 = new Comic("Marvel Comics", "La muerte del Capitán América", "Integral", 35, 20, "si");
const comic3 = new Comic("Marvel Comics", "Spiderman: La última caería de Kraven", "Must Have", 9.99, 11, "si");
const comic4 = new Comic("DC", "Batman: Una muerte en la familia", "Deluxe", 12.50, 7, "si");
const comic5 = new Comic("DC", "Batman: año uno", "Black Label", 9.99, 5, "si");
const comic6 = new Comic("DC", "Batman: el regreso del caballero oscuro", 9.99, 8, "si");
const comic7 = new Comic("Dc", "Batman: Saga La corte de los búhos", 35, 2, "si");

comic2.informar();
comic1.informar();
comic5.informar();


const Comic1 = {
    nombre: "Crisis en tierras inifitas",
    Editorial: "DC",
    Precio: 45,
    cantidad: 30,
    disponibilidad: "si"
};
const Compra = {
    nombre: "Spiderman: La última cacería de Kraven",
    editorial: "Marvel Comics",
    edición: "Must Have",
    precio: 2.00,
    cantidad: 40,
    precioMinorista: 9.99,
}
const ComicsEnCarrito = JSON.parse(localStorage.getItem('Compra')) ?? [];
console.log(ComicsEnCarrito);
console.log("carro vacío");
console.log(ComicsEnCarrito);
const CompraJSON = JSON.stringify(Compra);
localStorage.setItem("Compra", CompraJSON);

const Comic1JSON = JSON.stringify(Comic1);
console.log(Comic1);

localStorage.setItem("Comic1", Comic1JSON);

const contenedorCarrito = document.getElementById("contenedorCarrito");




/*


const eliminar = document.getElementById(`disminuir${Comics.id}`);



    });
    


        

    });
}

mostrarComics(Comics);



*/
