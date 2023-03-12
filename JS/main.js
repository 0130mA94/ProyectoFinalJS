localStorage.setItem("saludo","Bienvenido a la cueva del comic!");
let saludo = localStorage.getItem("saludo");
console.log(saludo);

const ComicsCont = document.querySelector('#ComicsCont');

console.log(ComicsCont);

const Comics = "JSON/Comics.json";

const carrito = [];


fetch(Comics)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        datos.forEach( producto => {
            ComicsCont.innerHTML += `
            <div class="comic-desc">
            <img class = 'Comics-img' src="${producto.img} " alt="${producto.nombre}"> 
            
            <h5 class="comic-nombre">Nombre: ${producto.nombre} </h5>
            <p> Precio: ${producto.precio} </p> 
            <h5 class="comic-Editorial">${producto.editorial}</h5>
            <button class="btn-compra">Agregar al carrito</button>
            </div>`;
        })
    
    })
    .catch(error => console.log(error))
    .finally( () => console.log("Proceso finalizado"));

    const btnComprar = document.querySelectorAll(".btn-compra");
    btnComprar.forEach(el => {
        el.addEventListener("click",(e) => {
        agregarAlCarrito(e.target.id);
        console.log("agregado al carrito!");
        }); 
    });
const agregarAlCarrito = (id) => {
    const ComicsEnCarrito = carrito.find(Com => Com.id === id);
        if(ComicsEnCarrito){
            ComicsEnCarrito.cantidad++;
        } else{
            const Com = Comics.find(Com => Com.id == id);
            carrito.push(Comics);
        }
}


console.log(carrito);


function Comic(editorial, nombre,edición,precio,cantidad,disponibilidad){
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
const comic3 = new Comic("Marvel Comics", "Spiderman: La última caería de Kraven", "Must Have", 9.99, 11,"si" );
const comic4 = new Comic("DC", "Batman: Una muerte en la familia","Deluxe" ,12.50, 7,"si" );
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
localStorage.setItem("Compra",CompraJSON);

const Comic1JSON = JSON.stringify(Comic1);
console.log(Comic1);

localStorage.setItem("Comic1",Comic1JSON);






/*


const eliminar = document.getElementById(`disminuir${Comics.id}`);



    });
    


        

    });
}

mostrarComics(Comics);



*/

