/* Carrossel: swipe nativo (scroll-snap) + setas + indicadores. */
(function () {
  var root = document.getElementById("carousel");
  if (!root) return;
  var track = root.querySelector(".carousel__track");
  var slides = Array.prototype.slice.call(track.children);
  var dotsBox = root.querySelector(".carousel__dots");
  var dots = [];

  function step() { return slides[0].getBoundingClientRect().width + 16; } // largura + gap

  slides.forEach(function (_, i) {
    var d = document.createElement("button");
    d.type = "button";
    d.className = "carousel__dot";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", "Ir para a foto " + (i + 1));
    d.addEventListener("click", function () { track.scrollTo({ left: i * step(), behavior: "smooth" }); });
    dotsBox.appendChild(d);
    dots.push(d);
  });

  function current() {
    var max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 4) return slides.length - 1;
    return Math.round(track.scrollLeft / step());
  }
  function update() {
    var c = current();
    dots.forEach(function (d, i) { d.setAttribute("aria-selected", String(i === c)); });
  }

  root.querySelector(".carousel__btn--prev").addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
  root.querySelector(".carousel__btn--next").addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  track.addEventListener("scroll", function () { window.requestAnimationFrame(update); }, { passive: true });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") track.scrollBy({ left: step(), behavior: "smooth" });
    if (e.key === "ArrowLeft") track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  window.addEventListener("resize", update);
  update();
})();
