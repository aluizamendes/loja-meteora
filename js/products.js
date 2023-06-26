const productList = document.querySelector("[data-lista-produtos]")

// lista de produtos
const products =  [
    {
        id: "1",
        imageURL: "assets/Desktop/Imagens Cards/Camiseta.png",
        title: "Camiseta Conforto",
        description: "Multicores e tamanhos. Tecido de algodão 100%, fresquinho para o verão. Modelagem unissex.",
        price: "70"    
    },
    {
        id: "2",
        imageURL: "assets/Desktop/Imagens Cards/Calca.png",
        title: "Calça Alfaiataria",
        description: "Modelo Wide Leg alfaiataria em linho. Uma peça pra vida toda!",
        price: "180"    
    },
    {
        id: "3",
        imageURL: "assets/Desktop/Imagens Cards/Tenis.png",
        title: "Tênis Chunky",
        description: "Snicker casual com solado mais alto e modelagem robusta. Modelo unissex.",
        price: "250"    
    },
    {
        id: "4",
        imageURL: "assets/Desktop/Imagens Cards/Jaqueta.png",
        title: "Jaqueta Jeans",
        description: "Modelo unissex oversized com gola de camurça. Atemporal e autêntica!",
        price: "150"    
    },
    {
        id: "5",
        imageURL: "assets/Desktop/Imagens Cards/oculos.png",
        title: "Óculos Redondo",
        description: "Armação metálica em grafite com lentes arredondadas. Sem erro!",
        price: "120"    
    },
    {
        id: "6",
        imageURL: "assets/Desktop/Imagens Cards/Bolsa.png",
        title: "Bolsa coringa",
        description: "Bolsa camel em couro sintético de alta duração. Ideal para acompanhar você por uma vida!",
        price: "120"    
    }
]

function renderCard(product) {
    const id = product.id
    const image = product.imageURL
    const title = product.title
    const description = product.description
    const price = Number(product.price).toFixed(2).replace(".", ",")

    productList.innerHTML += `
        <article class="produtos__card" id="${id}">
            <div class="produtos__card__image">
                <img src="${image}">
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
    const image = product.imageURL
    const title = product.title
    const description = product.description
    const price = Number(product.price).toFixed(2).replace(".", ",")

    const div = document.querySelector(".modal-produto")

    div.innerHTML = `
        <dialog class="modalProduto" data-modal-produto>
            <header>
                <div class="modal__icon"><img src="assets/Desktop/Ícones/check-circle.svg" alt="Icone de check"></div>
                <div class="modal__title"><h2>Confira detalhes sobre o produto</h2></div>
                <button data-fechar-modal-produto-btn><img src="assets/Desktop/Ícones/icon-x.svg" alt="Icone fechar modal"></button>
            </header>
            <section>
                <div class="modal__wrapper">
                    <div class="product__image">
                        <img src="${image}" alt="">
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
                                <div class="radio-field">
                                    <input type="radio" name="cor" id="azulClaro">
                                    <label for="azulClaro">Azul claro</label>
                                </div>
                                <div class="radio-field">
                                    <input type="radio" name="cor" id="offWhite">
                                    <label for="offWhite">Off-white</label>
                                </div>
                                <div class="radio-field">
                                    <input type="radio" name="cor" id="preto">
                                    <label for="preto">Preto</label>
                                </div>
                            </div>

                            
                        </div>
                        <hr>
                        <div class=product__content__bottom>
                            <span class=product__content__bottom-title>Tamanho:</span>
                            <div>
                                <div class="radio-field">
                                    <input type="radio" name="tamanho" id="p">
                                    <label for="p">P</label>
                                </div>
                                <div class="radio-field">
                                    <input type="radio" name="tamanho" id="pp">
                                    <label for="pp">PP</label>
                                </div>
                                <div class="radio-field">
                                    <input type="radio" name="tamanho" id="m">
                                    <label for="m">M</label>
                                </div>
                                <div class="radio-field">
                                    <input type="radio" name="tamanho" id="g">
                                    <label for="g">G</label>
                                </div>
                                <div class="radio-field">
                                    <input type="radio" name="tamanho" id="gg">
                                    <label for="gg">GG</label>
                                </div>
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

// renderizar os cards
products.forEach(product => renderCard(product))

// click dos botoes dos cards
const productBtn = document.querySelectorAll("[data-btn-produto]")

productBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const cardId = e.target.closest(".produtos__card").id
        let productSelected = ""

        // console.log(cardId)

        products.forEach((product) => {
            if (product.id == cardId) {
                productSelected = product
            }
        })

        showProductModal(productSelected)
    })
})