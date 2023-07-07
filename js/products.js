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
        console.log(`Falha na requisicao.\nErro: ${error}`)
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
                    <div class="product__content">
                        <div class=product__content__top>
                            <span class=product__content__top-title>${title}</span>
                            <span class=product__content__top-description>${description}</span>
                            <span class=product__content__top-price>R$ ${price}</span>
                            <span class=product__content__top-seller>Vendido e entregue por Riachuelo</span>
                        </div>
                        <hr>
                        <div class=product__content__middle>
                            <span class=product__content__middle-title>Cores:</span>
                            <div>
                                ${
                                    colorMap.map((color) => {
                                        return `
                                        <div class="radio-field">
                                            <input type="radio" name="cor" id="${ color.name.split(" ").join("") }" style="background-color: ${ color.colorValue };">
                                            <label for="${ color.name.split(" ").join("") }">${ color.name }</label>
                                        </div>
                                        `
                                    }).join("")
                                }                               
                            </div>
                        </div>
                        <hr>
                        <div class=product__content__bottom>
                            <span class=product__content__bottom-title>Tamanho:</span>
                            <div>
                                ${
                                    sizes.map((size) => {
                                        return`
                                        <div class="radio-field">
                                            <input type="radio" name="tamanho" id="${size}">
                                            <label for="${size}">${size}</label>
                                        </div>
                                        `
                                    }).join("")
                                }
                            </div>                                
                        </div>
                        <button>Adicionar à sacola</button>
                    </div>
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

    // abrir modal
    productModal.showModal()

    // fechar modal
    closeProductModalBtn.addEventListener("click", () => productModal.close())    
}

// quando a janela é carregada
window.addEventListener("load", async() => {

    // pega os produtos
    const products = await getProducts()

    // renderiza
    updateProductList(products)
})