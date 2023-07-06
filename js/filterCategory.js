async function filtrarCategoria(category) {
    const products = await getProducts()

    // array com os produtos filtrados pela categoria correspondente
    const productListFiltered = products.filter((produto) => produto.category == category)

    updateProductList(productListFiltered)
}

const btnsCategorias = document.querySelectorAll("[data-categoria-btn]")

// salvar o último btn ativo para remover a classe
let btnAtivo = null

btnsCategorias.forEach((btn) => {
    btn.addEventListener("click", async (e) => {

        const btnCategory = btn.id

        // se houver um btn ativo remove a classe antes de add no novo btn
        if (btnAtivo != null) {
            btnAtivo.classList.remove("active")
        }

        if (btnAtivo == btn) {
            btnAtivo.classList.remove("active")

            const products = await getProducts()
            updateProductList(products)
        }
        
        if (btnAtivo != btn) {
            btn.classList.add("active")
            filtrarCategoria(btnCategory)
        }

        btnAtivo = btn  
    })
})