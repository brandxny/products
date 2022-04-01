const openMobileMenuBtn = document.querySelector(".bx-device-menu");
const headerMenu = document.querySelector(".bx-header-nav");

openMobileMenuBtn.addEventListener("click", () => {
  if(openMobileMenuBtn.classList.contains("open")) {
    openMobileMenuBtn.classList.remove("open");
    headerMenu.classList.remove("active");
  } else {
    headerMenu.classList.add("active");
    openMobileMenuBtn.classList.add("open");
  }
})
