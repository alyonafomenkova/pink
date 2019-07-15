
var header = document.querySelector(".page-header");
var navMenu = header.querySelector(".main-nav");
var toggleNav = navMenu.querySelector(".main-nav__toggle-btn");

header.classList.add("page-header--transparent");
navMenu.classList.remove("main-nav--nojs");

toggleNav.addEventListener("click", function() {
  if (navMenu.classList.contains("main-nav--closed")) {
    navMenu.classList.remove("main-nav--closed");
    header.classList.remove("page-header--transparent");
    navMenu.classList.add("main-nav--opened");
  } else {
    header.classList.add("page-header--transparent");
    navMenu.classList.add("main-nav--closed");
    navMenu.classList.remove("main-nav--opened");
  }
});
