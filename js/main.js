const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("vercarrito")
const modalContainer = document.getElementById("modal-Container")
const bodyContent = document.getElementById("bodyContent")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito =  JSON.parse(localStorage.getItem("carrito")) || []


// cambiando productos.js a productos.json

const getProducts = async ()=> {
    const response = await fetch ("productos.json")
    const data = await response.json()

    data.forEach((product) => {
        let content = document.createElement("div")
        content.className = "card"
        content.innerHTML = 
                            `
                            <img src="${product.img}">
                            <h3> ${product.nombre}
                            <p class="price">$${product.precio}</p>
                            `
        shopContent.append(content)
    
        let comprar = document.createElement("button")
        comprar.innerText = "Comprar"
        comprar.className = "comprar"
        comprar.id = "buttoncomprar"
    
        content.append(comprar)
    
        comprar.addEventListener("click", () =>{
    
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
    
        if(repeat){
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++
                }
            })
        }else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad
                })
            }   
            carritoCounter()
            saveLocal()
            function agregarcompra(){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se agrego al carrito',
                    showConfirmButton: false,
                    timer: 1000,
                    width: `25%`,
                    backdrop: false
                })
            }
            agregarcompra()
        })
    })
}
getProducts()

// storage
const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito))
}
JSON.parse(localStorage.getItem("carrito"))

