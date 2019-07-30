var isEnableJS = document.querySelector(".contacts__map");
var myMap;
var myPlacemark;

if (isEnableJS) {
  isEnableJS.classList.remove("contacts__map-nojs");
  isEnableJS.classList.add("contacts__map-js");

  if (ymaps) {
    ymaps.ready(init);
  }
}

function init() {
  myMap = new ymaps.Map("map", {
    center: [59.938631, 30.323055],
    zoom: 16
  });

  myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
    iconLayout: "default#image",
    iconImageHref: "img/icon-map-marker.svg",
    iconImageSize: [36, 35],
    iconImageOffset: [-10, -10]
  });

  myMap.geoObjects.add(myPlacemark);
}
