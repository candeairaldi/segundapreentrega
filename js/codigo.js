// objeto con la información de los productos
const productos = [
    { nombre: "Emilia Zuela", precio: 34800, stock: 10 },
    { nombre: "Beryn Negro", precio: 34800, stock: 15 },
    { nombre: "Zasha Blanco", precio: 27600, stock: 8 },
    { nombre: "Jana Suela", precio: 35800, stock: 5 },
    { nombre: "Camila Negro", precio: 33800, stock: 12 },
    { nombre: "Juno Bronce", precio: 34600, stock: 20 },
    { nombre: "Renata Camel", precio: 38500, stock: 7 },
    { nombre: "Caro Blanco", precio: 38700, stock: 3 },
];

  // Función para elegir el producto seleccionado por el usuario
    function elegirProducto(nombreProducto) {
        return productos.find((producto) => producto.nombre === nombreProducto);
    }

  // Función para realizar la compra
function comprarProducto(producto, cantidadDeseada) {
    if (cantidadDeseada <= producto.stock) {
      const costoTotal = producto.precio * cantidadDeseada;
        producto.stock -= cantidadDeseada;
        console.log(`¡Compra exitosa! Ha comprado ${cantidadDeseada} ${producto.nombre}(s) por $${costoTotal}.`);
        console.log(`Quedan ${producto.stock} unidades de ${producto.nombre} en stock.`);

      // Agregar compra al array de compras realizadas
    comprasRealizadas.push({ nombre: producto.nombre, cantidad: cantidadDeseada, costoTotal });
        } else {
        console.log(`Lo sentimos, no hay suficiente stock para comprar ${cantidadDeseada} ${producto.nombre}(s).`);
        }
    }

  // Array para guardar las compras realizadas
const comprasRealizadas = [];

  // Ciclo while para permitir varias compras hasta que el usuario decida salir
let continuarComprando = true;

    while (continuarComprando) {
    // Pedir al usuario que ingrese el nombre del producto y la cantidad
    const nombreProducto = prompt("Ingrese el nombre del producto o escriba 'salir' para finalizar:");
    
    // Comprobar si el usuario desea finalizar la compra
    if (nombreProducto.toLowerCase() === "salir") {
        continuarComprando = false;
        console.log("Gracias visitar Calzados Karla ¡Hasta luego!");
        } else {
        const cantidadDeseada = parseInt(prompt("Ingrese la cantidad deseada:"));
        const productoSeleccionado = elegirProducto(nombreProducto);
        
        if (productoSeleccionado) {
        comprarProducto(productoSeleccionado, cantidadDeseada);
        } else {
        console.log("El producto ingresado no se encuentra disponible.");
        }
        }
    }

  // Mostrar compras realizadas al final
    console.log("Compras realizadas:");
    console.log(comprasRealizadas);