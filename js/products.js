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

products.forEach(product => renderCard(product))