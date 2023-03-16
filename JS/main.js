let comics = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const Comics = "/JSON/Comics.json";

fetch(Comics)
    .then(response => response.json())
    .then(data => {
        producto = data;
        importarProductos(data);
    })
    .catch(error => console.log(error));

const ComicsCont = document.getElementById("ComicsCont");

function importarProductos(productos) {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML =
            `
            <div class="comic-desc">
            <img class = 'Comics-img' src="${producto.img} " alt="${producto.nombre}">
            
            <h5 class="comic-nombre">Nombre: ${producto.nombre} </h5>
            <p> Precio: ${producto.precio} </p> 
            <h5 class="comic-Editorial">${producto.editorial}</h5>
            <button id=boton${producto.id} class="btn-compra">Agregar al carrito</button>
            </div>
            `
        ComicsCont.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(productos, producto.id);
            Toastify({
                text: "Agregado al carrito!",
                duration: 2500,
                gravity: "top",
                position: "right",
                style: {
                    background: "yellow",
                    color: "black"
                }
            }).showToast();
        })
    })
}
const agregarAlCarrito = (productos, idProducto) => {
    const id = idProducto;
    const producto = productos.find((producto) => producto.id === idProducto);
    const comicEnCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        img: producto.img,
        cantidad: producto.cantidad
    }
    const existe = carrito.some(p => p.id === id);
    if (existe) {
        const indice = carrito.findIndex(p => p.id === id);
        carrito[indice].cantidad++;
    }

    else {
        carrito.push(comicEnCarrito);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(producto);
}
const contenedorCarrito = document.getElementById("contenedorCarrito");
const VerCarrito = document.getElementById("verCarrito");

VerCarrito.addEventListener("click", () => {
    mostrarCarrito();
});


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML =
            `
<div class = "card rounded-4>"
        <img src = "${producto.img}" class = "card-img-top imgComics" alt= "${producto.nombre}">
    <div class="cont-desc">
        <h2 class="text"> ${producto.nombre}</h2>
        <p class="text"> ${producto.precio}</p>
        <p class="text"> ${producto.cantidad}</p>
        <button class="btnCarrito" id="eliminar${producto.id}"> Eliminar </button>
        <div class="btnCarrito">
        <button class="btnCarrito" id="aumentar${producto.id}"> + </button>
        <button class="btnCarrito" id="disminuir${producto.id}"> - </button>
        </div>
    </div>    
</div>
    `
        contenedorCarrito.appendChild(card);

        const aumentar = document.getElementById(`aumentar${producto.id}`)
        aumentar.addEventListener("click", () => {
            aumentarProducto(producto.id);
        })

        const disminuir = document.getElementById(`disminuir${producto.id}`)
        disminuir.addEventListener("click", () => {
            disminuirProducto(producto.id);
        })

        const eliminar = document.getElementById(`eliminar${producto.id}`)
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        })
    })
    calcularTotal();

}

const aumentarProducto = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

const disminuirProducto = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad--;
    if (producto.cantidad === 0) {
        eliminarProducto(id);
        producto.cantidad = 0;
    } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    mostrarCarrito();


}

const eliminarProducto = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    producto.cantidad = 1;
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = total;
    totalCompra = Number.parseInt(totalCompra.textContent);
    totalCompra=Number.isNaN(totalCompra) ? 0 : totalCompra;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `€ ${totalCompra}`;
    console.log(totalCompra)
}

const vaciarCarritoBtn = document.getElementById("vaciarCarrito");

const vaciarCarrito = () => {
    carrito = [];
    localStorage.clear();
    mostrarCarrito();
}

vaciarCarritoBtn.addEventListener("click", () => {
    swal.fire({
        title: "¿Esta seguro que desea vaciar el carrito?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            swal.fire({
                title: "Ya se vació tu carrito",
                icon: "success",
                confirmButtonText: "Ok"
            });
        }
    });
});

const finalizarCompraBtn = document.getElementById("finalizarCompra");
const finalizarCompra= () => {
    carrito = [];
    localStorage.clear();
    mostrarCarrito();
}

finalizarCompraBtn.addEventListener("click", () => {
    swal.fire({
        title: "¿Esta seguro que desea confirmar este pedido?",
        icon: "warning",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            finalizarCompra();
            swal.fire({
                title: "Ya estamos armando su envío!",
                icon: "success",
                confirmButtonText: "OK"
            });
        }
    });
});




















































/*fetch(Comics)
    .then(respuesta => respuesta.json())
    .then(data => {
        data.forEach(producto => {
            contenedorCarrito.innerHTML += ;
        });
        const arrayProductos = [];
        const contenedorProductos = document.getElementById("Productos");
        contenedorProductos.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-compra")) {
                agregarAlCarrito(e.target.id);
            }
        /*const btnComprar = document.querySelectorAll(".btn-compra");
        btnComprar.forEach(el => {
            console.log(el);
            el.addEventListener("click", (e) => {
                agregarAlCarrito(e.target.id);
                
            });

        });
        mostrarCarrito();

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
    const producto = carrito.findIndex((producto) => producto.id == id);
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
    const producto = carrito.findIndex((producto) => producto.id == id);
    let productoEnCarrito = {...producto, cantidad: 1}
    let indexCarrito = carrito.findIndex(producto => producto.id == id);
    if(indexCarrito == -1){
        carrito.push(productoEnCarrito);
    }
    else {
        carrito[indexCarrito].cantidad--
    }
    if (producto.cantidad == 0) {
        eliminarDelCarrito(id);
    }
    else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    mostrarCarrito();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.findIndex((producto) => producto.id == id);
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

const contenedorCarrito = document.getElementById("contenedorCarrito");*/




/*


const eliminar = document.getElementById(`disminuir${Comics.id}`);



    });
    


        

    });
}

mostrarComics(Comics);



*/
