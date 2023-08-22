//primero traer la info del local Storage
let productosCarrito = localStorage.getItem("productos-carrito");
//Si esto viene vacio devuelve NULL
productosCarrito = JSON.parse(productosCarrito); 

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoOperaciones = document.querySelector("#carrito-operacion");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll("#carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-operacion-vaciar");
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-operacion-comprar")

function cargarProductosCarrito (){
    if (!productosCarrito) {
        productosCarrito = []; // Inicializar como un arreglo vacío
    }

    if (productosCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoOperaciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");  
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>${producto.cantidad}</small>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
        
            contenedorCarritoProductos.append(div);
        });
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoOperaciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    // Mover estas llamadas al final de la función
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito(); //carga todos los productos que hay en el LocalStorage



botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosCarrito.length = 0; 
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoOperaciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}