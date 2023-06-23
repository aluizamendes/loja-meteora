const menuMobileBtn = document.querySelector("[data-open-menu-btn]")
const closeMenuBtn = document.querySelector("[data-close-menu-btn]")
const menuLinks = document.querySelector("[data-menu-links]")

function openMenuMobile(e) {
    menuLinks.classList.add("active")
}

function closeMenuMobile() {
    menuLinks.classList.remove("active")
}

menuMobileBtn.addEventListener("click", openMenuMobile)
closeMenuBtn.addEventListener("click", closeMenuMobile)