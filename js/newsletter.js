const formNewsletter = document.querySelector("[data-newsletter-form]")

function renderNewsletterModal() {
    const div = document.querySelector(".modal-newsletter")
    div.innerHTML = `
        <dialog class="modalNewsletter" data-modal-newsletter>
            <header>
                <div class="modal__icon"><img src="assets/Desktop/Ícones/check-circle.svg" alt="Icone de check"></div>
                <div class="modal__title"><h2>E-mail cadastrado com sucesso!</h2></div>
                <button data-fechar-modal-newsletter-btn><img src="assets/Desktop/Ícones/icon-x.svg" alt="Icone fechar modal"></button>
            </header>
            <section>
                <div class="modal__wrapper">
                    <p>Em breve você receberá novidades exclusivas da Meteora.</p>
                </div>
            </section>
        </dialog>
    `
}

function submitNewsletterForm(e) {
    e.preventDefault()
    console.log("FORM DE NEWSLETTER ENVIADO")

    renderNewsletterModal()
    const newsletterModal = document.querySelector("[data-modal-newsletter]")
    const closeNewsletterModalBtn = document.querySelector("[data-fechar-modal-newsletter-btn]")

    newsletterModal.showModal()
    closeNewsletterModalBtn.addEventListener("click", () => newsletterModal.close())

}

formNewsletter.addEventListener("submit", submitNewsletterForm)