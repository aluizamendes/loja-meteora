const shoppingCartBtn = document.querySelector("[data-shopping-cart-btn]")
const cartListSection = document.querySelector("[data-shopping-cart-list-section]")
const cartList = document.querySelector("[data-shopping-cart-list]")
const closeCartListBtn = document.querySelector("[data-close-shopping-cart-list]")
const carrinhoBottomEl = document.querySelector("[data-minicart-bottom]")
const miniCartTotalItemsEl = document.querySelector("[data-cart-list-items]")
const miniCartTotalPriceEl = document.querySelector("[data-cart-list-items-total-price]")
const overlay = document.querySelector("#overlay")

const shoppingCartList = JSON.parse(localStorage.getItem("shoppingCart"))  || []

let listWidth = 430
carrinhoBottomEl.style.width = listWidth + "px"

function updateTotalItems() {
    miniCartTotalItemsEl.textContent = `${shoppingCartList.length} ${shoppingCartList.length == 1 ? "item" : "itens"}`
}

function updateTotalPrice() {
    let miniCartTotalPrice = 0

    for (let i = 0; i < shoppingCartList.length; i++) {
        miniCartTotalPrice += parseFloat(shoppingCartList[i].price)
    }
    miniCartTotalPriceEl.textContent = `R$ ${miniCartTotalPrice},00`
}

// abre lista
function openShoppingCart() {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    if (windowWidth < 500) listWidth = 320

    cartListSection.style.width = listWidth + "px"
    cartListSection.style.setProperty("transform", "translateX(0px)")
    cartListSection.style.boxShadow = "-2px 0px 24px 4px #0c15207c"
    cartList.style.height =  (windowHeight - 200) + "px"
    overlay.classList.add("active")
    carrinhoBottomEl.style.width = listWidth + "px"
    document.body.style.overflow = 'hidden';
}

// fecha a lista
function closeShoppingCart() {
    cartListSection.style.boxShadow = "-2px 0px 24px 4px transparent"
    overlay.classList.remove("active")
    cartListSection.style.setProperty("transform", `translateX(${listWidth}px)`)
    document.body.style.overflow = 'visible';
}

document.addEventListener("click", (e) => {
    const windowWidth = window.innerWidth
    let listSpace = parseFloat(windowWidth - listWidth)

    if (e.pageX < listSpace) {
      closeShoppingCart()
    }
})

function renderShoppingCartListItem(item) {
    const { novoID, title, imageURL, price, colorSelected, sizeSelected } = item

    cartList.innerHTML += `
        <div class="minicart__content-card" data-id="${novoID}">
            <div class="image">
                <img src="${imageURL}">
            </div>
            <div class="infos">
                <h4>${title}</h4>
                <span>Cor: ${colorSelected}</span>
                <span>Tamanho: ${sizeSelected}</span>
                <span>R$ ${price}</span>
            </div>
            <button class="remove-from-cart-btn" data-remove-from-cart-btn>X</button>
        </div>
    `
}

// atualiza
function updateShoppingCart() {
    cartList.innerHTML = ""

    //renderiza
    shoppingCartList.forEach((item) => renderShoppingCartListItem(item))
    updateTotalPrice()
    updateTotalItems()

    const removeItemBtn = document.querySelectorAll("[data-remove-from-cart-btn]")

    // evento para remover um item da lista ao clicar no botao
    removeItemBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            // deletar item
            const idItemSelected = btn.closest(".minicart__content-card").dataset.id

            const findItemArray = shoppingCartList.findIndex((item) => item.novoID == idItemSelected)
            shoppingCartList.splice(findItemArray, 1)
            
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartList))
            updateShoppingCart()
        })
    })
}

shoppingCartBtn.addEventListener("click", openShoppingCart)
closeCartListBtn.addEventListener("click", closeShoppingCart)
