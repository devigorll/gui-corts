/* Menu responsivo: abre/fecha, fecha ao clicar num link ou apertar Esc. */
(function () {
  var btn = document.getElementById("menu-toggle");
  var nav = document.getElementById("menu");
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("nav--open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
})();
