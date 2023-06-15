let menu = [
    {
        id: 1,
        nombre: "hamburguesa simple",
        precio: 800,
        imagen: "./images/hamburguesasimple.jpg",
        disponible: true
    },
    {
        id: 2,
        nombre: "pancho",
        precio: 300,
        imagen: "./images/pancho.jpg",
        disponible: true
    },
    {
        id: 3,
        nombre: "pizza muzza",
        precio: 1200,
        imagen: "./images/pizzamuzza.jpg",
        disponible: true
    },
    {
        id: 4,
        nombre: "pizza napo",
        precio: 1500,
        imagen: "./images/pizzanapo.jpg",
        disponible: true
    },
    {
        id: 5,
        nombre: "hamburguesa doble",
        precio: 1500,
        imagen: "./images/hamburguesadoble.jpg",
        disponible: true
    },
    {
        id: 6,
        nombre: "hamburguesa doble completa",
        precio: 1900,
        imagen: "./images/hamburguesadoblecompleta.jpg",
        disponible: true
    },
    {
        id: 7,
        nombre: "empanadas media docena",
        precio: 800,
        imagen: "./images/empanadamediadocena.jpg",
        disponible: true
    },
    {
        id: 8,
        nombre: "empanadas docena",
        precio: 1500,
        imagen: "./images/empanadadocena.jpg",
        disponible: true
    },
    {
        id: 9,
        nombre: "sandwiche de milanesa completa",
        precio: 1500,
        imagen: "./images/sandwichdemila.jpg",
        disponible: true
    },
    {
        id: 10,
        nombre: "coca cola 500mL",
        precio: 300,
        imagen: "./images/cocacola500ml.jpg",
        disponible: true
    },
    {
        id: 11,
        nombre: "coca cola 2.25L",
        precio: 800,
        imagen: "./images/cocacola1l.jpg",
        disponible: true
    },
    {
        id: 12,
        nombre: "sprite 500mL",
        precio: 300,
        imagen: "./images/spritechiquita.jpg",
        disponible: true
    },
    {
        id: 13,
        nombre: "fanta 500mL",
        precio: 300,
        imagen: "./images/fanta500ml.jpg",
        disponible: true
    },
    {
        id: 14,
        nombre: "cerveza brahma 500mL",
        precio: 500,
        imagen: "./images/brahma500ml.jpg",
        disponible: true
    },
    {
        id: 15,
        nombre: "cerveza brahma 1L",
        precio: 900,
        imagen: "./images/cervezabrahmabotella.jpg",
        disponible: true
    },
    {
        id: 16,
        nombre: "cerveza patagonia 475mL",
        precio: 900,
        imagen: "./images/cervezapatagonia.jpg",
        disponible: true
    },
    {
        id: 17,
        nombre: "agua 500mL",
        precio: 200,
        imagen: "./images/aguachiquita.jpg",
        disponible: true
    },
    {
        id: 18,
        nombre: "agua 2.25mL",
        precio: 500,
        imagen: "./images/aguagrande.jpg",
        disponible: true
    },



]


const menuStr = JSON.stringify(menu)

const container = document.getElementById(contenedorCards);
contenedorCards.innerHTML = "";
menu.forEach((menu, indice) => {
    let card = document.createElement("div");
    card.classList.add("card", "col-sm-12", "col-lg-3", "col-md-4", "col-6", "mb-1", "mt-1");
    let html = `
    <img src="${menu.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
<h5 class="card-title">${menu.nombre}</h5>
<p class="card-text">${menu.precio}</p>
<a href="#cart" class="btn btn-danger" onClick="agregarAlCarrito(${indice})">Comprar</a>
    </div>
`
    card.innerHTML = html;
    contenedorCards.appendChild(card);
})

const carrito = []
carritoTraidoJSON = localStorage.getItem("carritoLS")
carrito.push(...((JSON.parse(carritoTraidoJSON))))
console.log(carrito)

function crearCarrito() {
    const listaVacia = document.querySelector(".carritoVacio")
    listaVacia.innerHTML = ""
    carrito.forEach((menu, indice) => {
        let filaCarrito = document.createElement("tr");
        filaCarrito.classList.add("w-100")
        filaCarrito.innerHTML = `
    <td scope="row" class="filaCarrito">${menu.nombre}</td>
    <td class="filaCarrito">Precio: ${menu.precio}</td>
    <td class="filaCarrito">Cantidad: ${menu.cantidad}</td>
    <td class="filaCarrito">Subtotal: $ ${menu.precio * menu.cantidad}</td>
    <td class="filaCarrito">
        <button type="button" class="btn btn-dark" onClick="eliminarDelCarrito(${indice})">Eliminar</button>
    </td>
    `;
        listaVacia.appendChild(filaCarrito)
    })
    const totalCarro = document.querySelector(".totalCompra")
    totalCarro.innerHTML = ""
    let contenedorTotal = document.createElement("div")
    contenedorTotal.classList.add("text-center")
    let total = 0
    carrito.forEach((menu, indice) => {
        let subtotal = menu.precio * menu.cantidad
        total = total + subtotal
    })
    contenedorTotal.innerHTML = `Total carrito: $ ${total}`
    totalCarro.appendChild(contenedorTotal)
    const finalizar = document.querySelector(".botonFinalizar")
    let botonFinalizar = document.createElement("div")
    botonFinalizar.innerHTML = `
    <button type="button" class="btn btn-dark" onClick="finalizarCompra()">Finalizar Compra</button>
    `;
    contenedorTotal.appendChild(botonFinalizar)
    filaCarrito.innerHTML = `
  <td scope="row" class="filaCarrito">${menu.nombre}</td>
  <td class="filaCarrito">Precio: ${menu.precio}</td>
  <td class="filaCarrito">Cantidad: ${menu.cantidad}</td>
  <td class="filaCarrito">Subtotal: $ ${menu.precio * menu.cantidad}</td>
  <td class="filaCarrito">
    <select class="form-select" onchange="cambiarMetodoPago(${indice}, this.value)">
    <option value="">Seleccionar método de pago</option>
    <option value="efectivo">Efectivo</option>
    <option value="tarjeta">Tarjeta</option>
    <option value="mercadopago">MercadoPago</option>
    </select>
</td>
<td class="filaCarrito">
    <button type="button" class="btn btn-dark" onClick="eliminarDelCarrito(${indice})">Eliminar</button>
</td>
`;

function cambiarMetodoPago(indice, metodoPago) {
    carrito[indice].metodoPago = metodoPago;
    // Update the cart in localStorage
    const carritoActualizado = JSON.stringify(carrito);
    localStorage.setItem("carritoLS", carritoActualizado);
}

}

crearCarrito()

menuAgregado.metodoPago = ""; // 

function agregarAlCarrito(indice) {
    const productoClickeado = menu[indice]
    const flor = carrito.findIndex((elemento) => {
        return elemento.id === menu[indice].id
    })
    if (flor === -1) {
        const menuAgregado = menu[indice]
        menuAgregado.cantidad = 1
        carrito.push(menuAgregado)
        console.log(carrito)
        crearCarrito()
    }
    else {
        carrito[flor].cantidad += 1;
        crearCarrito()
    }
    const carritoActualizado = JSON.stringify(carrito)
    localStorage.setItem("carritoLS", carritoActualizado)
}
function eliminarDelCarrito(indice) {
    const productoAeliminar = carrito.splice(indice, 1)
    console.log(carrito)
    carritoActualizado = JSON.stringify(carrito)
    localStorage.setItem("carritoLS", carritoActualizado)
    crearCarrito()

}

function vaciarCarrito() {
    console.log(carrito)
    carrito.length = 0
    console.log(carrito)
    carritoActualizado = JSON.stringify(carrito)
    localStorage.setItem("carritoLS", carritoActualizado)

}

function finalizarCompra() {
    (async () => {

        const { value: numero } = await Swal.fire({
            title: 'Ingresá tu numero de telefono',
            input: 'telefono',
            inputPlaceholder: 'Enter you phone'
        })

        if (numero) {
            Swal.fire({
                title: `¡Gracias por tu compra!`,
                text: `Te enviaremos un mensaje a ${numero}`
            })
        }
    })()


        vaciarCarrito();
        crearCarrito();
    }







