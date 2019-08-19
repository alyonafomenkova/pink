var competitionBtn = document.querySelector(".competition__btn");
var surnameInput = document.querySelector("#personality_surname");
var nameInput = document.querySelector("#personality_name");
var emailInput = document.querySelector("#contacts_email");
var popupSucces = document.querySelector(".popup__succes");
var popupFailure = document.querySelector(".popup__failure");

competitionBtn.addEventListener("click", function (evt) {
  var popupFailureBtn = popupFailure.querySelector(".popup__button--failure");
  var popupSuccesBtn = popupSucces.querySelector(".popup__button--succes");

  evt.preventDefault();

  if (!surnameInput.value || !nameInput.value || !emailInput.value) {
    popupFailure.classList.add("popup__show");
    popupFailureBtn.focus();
    popupFailureBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (popupFailure.classList.contains("popup__show")) {
        popupFailure.classList.remove("popup__show");
      }
    });
  }

  else {
    popupSucces.classList.add("popup__show");
    popupSuccesBtn.focus();
    popupSuccesBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (popupSucces.classList.contains("popup__show")) {
        popupSucces.classList.remove("popup__show");
      }
    });
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupSucces.classList.contains("popup__show")) {
      popupSucces.classList.remove("popup__show");
    }

    if (popupFailure.classList.contains("popup__show")) {
      popupFailure.classList.remove("popup__show");
    }
  }
});
