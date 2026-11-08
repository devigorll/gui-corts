/* Tema claro/escuro. Prioridade: escolha salva > preferência do sistema > claro. */
(function () {
  var KEY = "guicorts-theme";
  var root = document.documentElement;

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function initial() {
    var s = saved();
    if (s === "light" || s === "dark") return s;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#0f0f11" : "#f4f1ec";
  }

  apply(initial()); // imediato, antes da renderização

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme")); // atualiza a meta theme-color
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
    // Habilita as transições só depois do primeiro carregamento
    requestAnimationFrame(function () { document.body.classList.add("theme-ready"); });
  });
})();
