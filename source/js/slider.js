var reviewsBlock = document.querySelector(".reviews");
var reviewSlides = reviewsBlock.querySelectorAll(".slider__item");
var reviewCurrentSlide = reviewsBlock.querySelector(".slider__item--current");
var reviewToggles = reviewsBlock.querySelectorAll(".slider__toggle");
var reviewCurrentToggle = reviewsBlock.querySelector(".slider__toggle--current");
var tariffsBlock = document.querySelector(".tariffs");
var tariffsTable = tariffsBlock.querySelector(".tariffs__table");
var tariffToggles = tariffsBlock.querySelectorAll(".slider__toggle");
var tariffCurrentToggle = tariffsBlock.querySelector(".slider__toggle--current");

TODO: // rewrite dotsSlider and arrowSlider using classes

reviewsBlock.classList.remove("reviews--nojs");
reviewsBlock.classList.add("reviews--js");

for (var i = 0; i < reviewToggles.length; i++) {
  reviewToggles[i].addEventListener("click", function (evt) {
    evt.preventDefault();

    if (!this.classList.contains("slider__toggle--current")) {
      reviewCurrentToggle.classList.remove("slider__toggle--current");
      reviewCurrentToggle = this;
      this.classList.add("slider__toggle--current");

      for (var j = 0; j < reviewSlides.length; j++) {
        if (reviewToggles[j].classList.contains("slider__toggle--current")) {
          reviewCurrentSlide.classList.remove("slider__item--current");
          reviewSlides[j].classList.add("slider__item--current");
          reviewCurrentSlide = reviewSlides[j];
        }
      }
    }
  })
}

function showTariffs() {
  for (var i = 0; i < tariffToggles.length; i++) {
    tariffToggles[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      if (!evt.target.classList.contains("slider__toggle--current")) {
        tariffCurrentToggle.classList.remove("slider__toggle--current");
        tariffCurrentToggle = evt.target;
        evt.target.classList.add("slider__toggle--current");

        if (evt.target.classList.contains("slider__toggle--first")) {
          tariffsTable.style.transform = "translateX(20px)";
        } else if (evt.target.classList.contains("slider__toggle--second")) {
          tariffsTable.style.transform = "translateX(-260px)";
        } else if (evt.target.classList.contains("slider__toggle--third")) {
          tariffsTable.style.transform = "translateX(-540px)";
        }
      }
    });
  }
};

showTariffs();
