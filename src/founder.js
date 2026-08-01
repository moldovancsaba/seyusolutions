/* Tom "Vechy" Vecsernyes — founder page interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle with persistence
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored) root.setAttribute("data-theme", stored);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Project filtering
  var chips = document.querySelectorAll(".chip");
  var projects = document.querySelectorAll(".project");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var filter = chip.getAttribute("data-filter");
      projects.forEach(function (p) {
        var show = filter === "all" || p.getAttribute("data-cat") === filter;
        p.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Timeline "show full" toggle
  var ftl = document.getElementById("fullTimeline");
  var timelineToggle = document.getElementById("timelineToggle");
  if (ftl && timelineToggle) {
    timelineToggle.addEventListener("click", function () {
      var open = ftl.classList.toggle("is-open");
      timelineToggle.setAttribute("aria-expanded", open ? "true" : "false");
      timelineToggle.textContent = open ? "Show less" : "Show full timeline";
    });
  }

  // Gallery "show all" toggle
  var gallery = document.getElementById("gallery");
  var galleryToggle = document.getElementById("galleryToggle");
  if (gallery && galleryToggle) {
    var extraCount = gallery.querySelectorAll(".gallery__item--extra").length;
    galleryToggle.addEventListener("click", function () {
      var open = gallery.classList.toggle("is-open");
      galleryToggle.setAttribute("aria-expanded", open ? "true" : "false");
      galleryToggle.textContent = open ? "Show fewer photos" : "Show all photos";
    });
  }

  // Scroll reveal
  if ("IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".section");
    targets.forEach(function (t) { t.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }
})();
