var reviewsBlock = document.querySelector(".reviews");
var slides = document.querySelectorAll(".slider__item");
var currentSlide = document.querySelector(".slider__item--current");
var sliderToggles = document.querySelectorAll(".slider__toggle");
var currentSliderToggle = document.querySelector(".slider__toggle--current");

 TODO: // rewrite dotsSlider and arrowSlider using classes

reviewsBlock.classList.remove("reviews--nojs");
reviewsBlock.classList.add("reviews--js");

for (var i = 0; i < sliderToggles.length; i++) {
  sliderToggles[i].addEventListener("click", function(evt) {
    evt.preventDefault();

    if (!this.classList.contains("slider__toggle--current")) {
      currentSliderToggle.classList.remove("slider__toggle--current");
      currentSliderToggle = this;
      this.classList.add("slider__toggle--current");

      for (var j = 0; j < slides.length; j++) {
        if (sliderToggles[j].classList.contains("slider__toggle--current")) {
          currentSlide.classList.remove("slider__item--current");
          slides[j].classList.add("slider__item--current");
          currentSlide = slides[j];
        }
      }
    }
  })
}
