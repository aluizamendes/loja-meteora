const formNewsletter = document.querySelector("[data-newsletter-form]")
const helperTxtNewsletter = document.querySelector("[data-helper-text-newsletter]")

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
    const emailInput = document.getElementById("emailInput")

    const emailIsNotValid = emailInput.value == "" || emailInput.value.length < 6 || emailInput.value.includes("@") == false
     
    if (emailIsNotValid) {
        emailInput.style.borderColor = "red"
        helperTxtNewsletter.style.color = "red"
        helperTxtNewsletter.textContent = "Insira um email válido."

    } else {
        renderNewsletterModal()
        emailInput.style.borderColor = "#000000"
        emailInput.value = ""
        helperTxtNewsletter.textContent = ""

        const newsletterModal = document.querySelector("[data-modal-newsletter]")
        const closeNewsletterModalBtn = document.querySelector("[data-fechar-modal-newsletter-btn]")
    
        newsletterModal.showModal()
        closeNewsletterModalBtn.addEventListener("click", () => newsletterModal.close())
    }
}

formNewsletter.addEventListener("submit", submitNewsletterForm)