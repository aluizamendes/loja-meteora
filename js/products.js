const productList = document.querySelector("[data-lista-produtos]")

async function getProducts() {
    try {
        const request = await fetch("../loja-meteora/data/products.json")
        const data = await request.json()
        const products = data.products
        //console.log(products)
        return products
    }
    catch(error) {
        console.log(`Falha na requisicao. Tente novamente.\nErro: ${error}`)
    }
    finally {
        console.log(`Operacao concluida`)
    }
}

// função pra atualizar a lista, o parametro é o array com os produtos
// renderiza na lista e renderiza o modal de cada produto
function updateProductList(products) {

    productList.innerHTML = ""
    products.forEach((product) => renderCard(product))

    const productBtn = document.querySelectorAll("[data-btn-produto]")

    // seleciona os btns de `ver mais` e renderiza o modal do produto
    productBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
    
            const cardId = e.target.closest(".produtos__card").id
            let productSelected = ""
    
            products.forEach((product) => {
                if (product.id == cardId) {
                    productSelected = product
                }
            })
            showProductModal(productSelected)
        })
    })
}

function renderCard(product) {
    const id = product.id
    const category = product.category
    const image = product.imageURL
    const title = product.title
    const description = product.description
    const price = Number(product.price).toFixed(2).replace(".", ",")

    productList.innerHTML += `
        <article class="produtos__card" id="${id}" data-category="${category}" data-card-produto>
            <div class="produtos__card__image">
                <img src="${image}" alt="${title}">
            </div>
            <div class="produtos__card__content">
                <h4 class="produtos__card__content-title">${title}</h4>
                <span class="produtos__card__content-description">${description}</span>
                <span class="produtos__card__content-price">R$ ${price}</span>
                <button data-btn-produto>Ver mais</button>
            </div>
        </article>
    `
}

function renderProductModal(product) {
    const colors = product.colors
    const sizes = product.size
    const image = product.imageURL
    const title = product.title
    const description = product.description
    const price = Number(product.price).toFixed(2).replace(".", ",")

    // salvar nome das cores em um array
    const colorNames = Object.keys(colors)

    // iterar o colorNames para retornar um array de objetos com o nome da cor e o valor hex dela
    const colorMap = colorNames.map((colorName) => {
        return {
            name: colorName,
            colorValue: colors[colorName]
        }
    })

    // div pra colcar o dialog dentro
    const div = document.querySelector(".modal-produto")

    div.innerHTML = `
        <dialog class="modalProduto" data-modal-produto>
            <header>
                <div class="modal__icon"><img src="assets/Desktop/Ícones/check-circle.svg" alt="Icone de check"></div>
                <div class="modal__title"><h2>Confira detalhes sobre o produto</h2></div>
                <button aria-label="Fechar modal" data-fechar-modal-produto-btn><img src="assets/Desktop/Ícones/icon-x.svg" alt="Icone fechar modal"></button>
            </header>
            <section>
                <div class="modal__wrapper">
                    <div class="product__image">
                        <img src="${image}" alt="${title}">
                    </div>
                    <form class="product__content">
                        <div class="product__content__top">
                            <span class="product__content__top-title">${title}</span>
                            <span class="product__content__top-description">${description}</span>
                            <span class="product__content__top-price">R$ ${price}</span>
                            <span class="product__content__top-seller">Vendido e entregue por Riachuelo</span>
                        </div>
                        <hr>
                        <div class="product__content__middle">
                            <span class="product__content__middle-title">Cores:</span>
                            <div class="product__content__middle-wrapper">
                                ${
                                    colorMap.map((color) => {
                                        return `
                                        <div class="radio-field">
                                            <input type="radio" required name="cor" value="${ color.name }" id="${ color.name.split(" ").join("") }" style="background-color: ${ color.colorValue };">
                                            <label for="${ color.name.split(" ").join("") }">${ color.name }</label>
                                        </div>
                                        `
                                    }).join("")
                                }                               
                            </div>
                        </div>
                        <hr>
                        <div class="product__content__bottom">
                            <span class="product__content__bottom-title">Tamanho:</span>
                            <div class="product__content__middle-wrapper">
                                ${
                                    sizes.map((size) => {
                                        return`
                                        <div class="radio-field">
                                            <input type="radio" required name="tamanho" value="${ size }" id="${size}">
                                            <label for="${size}">${size}</label>
                                        </div>
                                        `
                                    }).join("")
                                }
                            </div>

                            <div class="product__content__footer">
                                <div class="product__content__bottom-helper" data-info-text-modal></div>
                                <button type="submit" data-add-to-cart-btn>
                                    <img src="./assets/Desktop/Ícones/Add_shopping_cart.svg" alt="Ícone adicionar ao carrinho de compras"> 
                                    <span>Adicionar à sacola</span>
                                </button>                  
                            </div>
                        </div>
                        

                    </form>
                </div>
            </section>
        </dialog>
    `
}

function showProductModal(product) {
    renderProductModal(product)

    // seleciona elementos
    const productModal = document.querySelector("[data-modal-produto]")
    const closeProductModalBtn = document.querySelector("[data-fechar-modal-produto-btn]")
    const addToCartBtn = document.querySelector("[data-add-to-cart-btn]")
    const inputsRadioElements = document.querySelectorAll(".radio-field input")
    const inputsRadio = [...inputsRadioElements]

    // abrir modal
    productModal.showModal()

    // fechar modal
    closeProductModalBtn.addEventListener("click", () => productModal.close())

    // separar os tipos de input
    let inputsColor = []
    let inputsSize = []

    inputsRadio.forEach((input) => {
        if (input.name == "cor") {
            inputsColor.push(input)
        } else {
            inputsSize.push(input)
        }
    })
    
    // implementa a adição do produto no carrinho
    addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const infoText = document.querySelector("[data-info-text-modal]")

        let inputsColorAreEmpty = inputsColor.every((input) => input.checked == false)
        let inputsSizeAreEmpty = inputsSize.every((input) => input.checked == false)

        if (inputsColorAreEmpty || inputsSizeAreEmpty) {
            // não adiciona
            infoText.style.color = "red"
            infoText.innerText = "É necessário escolher cor e tamanho."
        
        } else {
            // add no carrinho
            let colorSelected
            let sizeSelected
            const novoID = shoppingCartList[shoppingCartList.length - 1] ? parseInt((shoppingCartList[shoppingCartList.length - 1]).novoID) + 1 : 0

            inputsColor.forEach((input) => input.checked ? colorSelected = input.value : "")
            inputsSize.forEach((input) => input.checked ? sizeSelected = input.value : "")

            const item = { ...product, colorSelected, sizeSelected, novoID: novoID.toString() }
            shoppingCartList.push(item)

            updateShoppingCart()
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartList))

            // fechar modal e abrir carrinho
            productModal.close()
            setTimeout(openShoppingCart, 0)
        }        
    })
}

// quando a janela é carregada
window.addEventListener("load", async() => {

    // pega os produtos
    const products = await getProducts()

    // renderiza
    updateProductList(products)
    updateShoppingCart()
})