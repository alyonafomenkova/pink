var navMenu = document.querySelector(".main-nav");
var toggleNav = navMenu.querySelector(".main-nav__toggle-btn");

navMenu.classList.remove("main-nav--nojs");

toggleNav.addEventListener("click", function() {
  if (navMenu.classList.contains("main-nav--closed")) {
    navMenu.classList.remove("main-nav--closed");
    navMenu.classList.add("main-nav--opened");
  } else {
    navMenu.classList.add("main-nav--closed");
    navMenu.classList.remove("main-nav--opened");
  }
});
