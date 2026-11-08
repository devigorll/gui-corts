/* Inicialização geral: links, lista de serviços, ano e animações de entrada. */
(function () {
  var cfg = window.GUI;

  // Links externos (nova aba + atributos de segurança)
  function setLinks(selector, url) {
    document.querySelectorAll(selector).forEach(function (a) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }
  setLinks("[data-whatsapp]", cfg.whatsappUrl);
  setLinks("[data-instagram]", cfg.instagramUrl);

  // Serviços
  var list = document.getElementById("services-list");
  var money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  cfg.services.forEach(function (s) {
    var li = document.createElement("li");
    li.className = "service";
    li.innerHTML =
      '<span class="service__icon"><svg class="i" aria-hidden="true"><use href="#i-' + s.icon + '"/></svg></span>' +
      '<div class="service__info"><h3 class="service__name"></h3><p class="service__desc"></p></div>' +
      '<span class="service__price"></span>';
    li.querySelector(".service__name").textContent = s.name;
    li.querySelector(".service__desc").textContent = s.desc || "";
    li.querySelector(".service__price").textContent = money.format(s.price);
    list.appendChild(li);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Animação de entrada ao rolar
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (e) { e.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (e) { io.observe(e); });
})();
