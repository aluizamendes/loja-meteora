const btnsCategorias = document.querySelectorAll("[data-categoria-btn]")

console.log(btnsCategorias)

async function filtrarCategoria(category) {
    console.log(category)

    const products = await getProducts()

    // array com os produtos filtrados pela categoria correspondente
    const productsFilter = products.filter((produto) => produto.category == category)

    productList.innerHTML = ""
    productsFilter.forEach((product) => renderCard(product))

    // click dos botoes dos cards
    const productBtn = document.querySelectorAll("[data-btn-produto]")

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

btnsCategorias.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const btnCategory = btn.id

        //console.log(btn.id)

        filtrarCategoria(btnCategory)
    })
})