const productList = document.querySelector("[data-lista-produtos]")

// lista de produtos
const products =  [
    {
        id: "1",
        // colors: ["Azul claro", "Offwhite", "Preto", "Mescla"],
        colors: {
            "Mostarda": "#e69d1e",
            "Azul claro": "#6eaaff",
            "OffWhite": "#f0f2f5",
            "Preto": "#000",
            "Mescla": "#999999"
        },
        size: ["P", "PP", "M", "G", "GG"],
        imageURL: "assets/Desktop/Imagens Cards/Camiseta.png",
        title: "Camiseta Conforto",
        description: "Multicores e tamanhos. Tecido de algodão 100%, fresquinho para o verão. Modelagem unissex.",
        price: "70"    
    },
    {
        id: "2",
        colors: {
            "Caqui": "#fce7c2",
            "Azul escuro": "#1f0561",
            "OffWhite": "#f0f2f5",
            "Preto": "#000"
        },
        size: ["P", "PP", "M", "G", "GG"],
        imageURL: "assets/Desktop/Imagens Cards/Calca.png",
        title: "Calça Alfaiataria",
        description: "Modelo Wide Leg alfaiataria em linho. Uma peça pra vida toda!",
        price: "180"    
    },
    {
        id: "3",
        colors: {
            "Branco": "#FFF",
            "OffWhite": "#f0f2f5",
            "Preto": "#000"
        },
        size: ["34", "35", "36", "37", "38", "39", "40"],
        imageURL: "assets/Desktop/Imagens Cards/Tenis.png",
        title: "Tênis Chunky",
        description: "Snicker casual com solado mais alto e modelagem robusta. Modelo unissex.",
        price: "250"    
    },
    {
        id: "4",
        colors: {
            "Azul escuro": "#1f0561",
            "Azul claro": "#6eaaff",
            "Rosa": "#f587b6",
            "Preto": "#000"
        },
        size: ["P", "PP", "M", "G", "GG"],
        imageURL: "assets/Desktop/Imagens Cards/Jaqueta.png",
        title: "Jaqueta Jeans",
        description: "Modelo unissex oversized com gola de camurça. Atemporal e autêntica!",
        price: "150"    
    },
    {
        id: "5",
        colors: {
            "Dourado": "#c4ae08",
            "Marrom": "#78513e",
            "Prata": "#999999",
            "Preto": "#000"
        },
        size: ["Único"],
        imageURL: "assets/Desktop/Imagens Cards/oculos.png",
        title: "Óculos Redondo",
        description: "Armação metálica em grafite com lentes arredondadas. Sem erro!",
        price: "120"    
    },
    {
        id: "6",
        colors: ["Bege", "Rosa antigo", "Branco", "Preto"],
        colors: {
            "Bege": "#f7ab8b",
            "Rosa antigo": "#b3568a",
            "Branco": "#FFF",
            "Preto": "#000"
        },
        size: ["Único"],
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