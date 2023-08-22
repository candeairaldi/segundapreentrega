// Todo lo que voy a llamar del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
let agregarProducto = document.querySelectorAll(".agregar-carrito");
const numeroCarrito = document.querySelector("#numero-carrito");

// Cargamos los productos usando fetch y un archivo JSON local
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        cargarProductos(data);
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });

function cargarProductos(productosData) {
    productosData.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="zapa1" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h4 class="producto-titulo">${producto.titulo}</h4>
                <h4 class="producto-precio">$${producto.precio}</h4>
                <button class="agregar-carrito" id="${producto.id}">AGREGAR</button>
            </div>
        `;

        contenedorProductos.append(div);
    });

    actualizarAgregarProducto();
}

function actualizarAgregarProducto() {
    agregarProducto = document.querySelectorAll(".agregar-carrito");

    agregarProducto.forEach(boton => {
        boton.addEventListener("click", () =>{ 
            console.log ("click");
            agregarAlCarrito();
        });
    });
}

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-carrito");

if (productosCarritoLS){
    productosCarrito = JSON.parse(productosCarritoLS);
    actualizarNumeroCarrito();
} else {
    productosCarrito = [];
}

function agregarAlCarrito(e) {
    console.log("agregarAlCarrito");
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    
    
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #8B4513, #FFD700)",
        }
    }).showToast(); 
}

function actualizarNumeroCarrito() {
    let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumero;
}
