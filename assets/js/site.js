// TrainsCoding docs: mobile menu and the "On this page" list built from the headings.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var toc = document.querySelector(".toc[data-auto]");
  var doc = document.querySelector(".doc");
  if (!toc || !doc) return;

  function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  var list = document.createElement("ol");
  var current = null;
  doc.querySelectorAll("h2, h3").forEach(function (h) {
    if (h.closest(".block, .card")) return;
    if (!h.id) h.id = slug(h.textContent);
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.dataset.toc || h.textContent;
    li.appendChild(a);
    if (h.tagName === "H2") {
      list.appendChild(li);
      current = li;
    } else if (current) {
      var sub = current.querySelector("ol") || current.appendChild(document.createElement("ol"));
      sub.appendChild(li);
    }
  });
  var title = document.createElement("h4");
  title.textContent = "On this page";
  toc.appendChild(title);
  toc.appendChild(list);
})();
