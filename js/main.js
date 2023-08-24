//Todo lo que voy a llamar del DOM
const contenedorProductos = document.querySelector("#contenedor-productos"); //Para llamar al ID
let agregarProducto = document.querySelectorAll(".agregar-carrito");
const numeroCarrito = document.querySelector("#numero-carrito");
let productos;

function cargarProductos(productosData) {
    const agregarProducto = document.querySelectorAll(".agregar-carrito");

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
    const agregarProducto = document.querySelectorAll(".agregar-carrito");
    
    agregarProducto.forEach(boton => {
        boton.addEventListener("click", (e) => {
            console.log("click");
            agregarAlCarrito(e);
        });
    });
}

let productosCarritoLS = localStorage.getItem("productos-carrito");

if (productosCarritoLS) {
    productosCarrito = JSON.parse(productosCarritoLS);
    actualizarNumeroCarrito();
} else {
    productosCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productoAgregado) {
        const productoEnCarrito = productosCarrito.find(producto => producto.id === idBoton);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            productosCarrito.push({ ...productoAgregado, cantidad: 1 });
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
}

function actualizarNumeroCarrito() {
    let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumero;
}

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(data);
        console.log("Productos cargados:", productos); 
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });