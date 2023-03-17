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
                    color: "black",
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
        cantidad: producto.cantidad,
    }
    const existe = carrito.some(p => p.id === id);
    if (existe) {
        const indice = carrito.findIndex(p => p.id === id);
        carrito[indice].cantidad++;
    }

    else {
        carrito.push(comicEnCarrito);
    }
    calcularTotal();
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
    totalCompra = Number.isNaN(totalCompra) ? 0 : totalCompra;
    console.log(carrito);
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `€ ${totalCompra}`;
    console.log(totalCompra);
    console.log(typeof producto.cantidad);
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




















































