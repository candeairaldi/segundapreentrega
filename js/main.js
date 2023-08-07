// objeto con la info de los productos
const productos = [
    { id:"emilia-zuela", titulo: "Emilia Zuela", imagen: "./assets/img/mujer5.jpg", precio: 34800,  },
    { id:"beryn-negro", titulo: "Beryn Negro", imagen: "./assets/img/mujer6.jpg", precio: 34800,  },
    { id:"zasha-blanco", titulo: "Zasha Blanco", imagen:"./assets/img/mujer7.jpg", precio: 27600,  },
    { id:"jana-suela", titulo: "Jana Suela", imagen:"./assets/img/mujer8.jpg", precio: 35800,  },
    { id:"camila-negro", titulo: "Camila Negro", imagen:"./assets/img/produc1.jpg", precio: 33800,  },
    { id:"juno-bronce", titulo: "Juno Bronce", imagen:"./assets/img/produc2.jpg", precio: 34600,  },
    { id:"renata-camel", titulo: "Renata Camel", imagen:"./assets/img/produc3.jpg", precio: 38500,  },
    { id:"caro-blanco", titulo: "Caro Blanco", imagen:"./assets/img/produc4.jpg", precio: 38700,  },
];

//Todo lo que voy a llamar del DOM
const contenedorProductos = document.querySelector("#contenedor-productos"); //Para llamar al ID
let agregarProducto = document.querySelectorAll(".agregar-carrito");
const numeroCarrito = document.querySelector("#numero-carrito");

//forEach para recorrer los productos y mostrarlos en el DOM
function cargarProductos () {
  

    productos.forEach(producto => {

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
})
    actualizarAgregarProducto();
  
}
cargarProductos(productos);


function actualizarAgregarProducto() {
      agregarProducto = document.querySelectorAll(".agregar-carrito");  //se trae del Dom

      agregarProducto.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); //EventListener que llama a la funcion agregarAlCarrito
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
  }

function actualizarNumeroCarrito() {
  let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numeroCarrito.innerText = nuevoNumero;
}







