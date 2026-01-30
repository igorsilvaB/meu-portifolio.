const toggleThemeBtn = document.getElementById("toggle-theme");
const iconTheme = document.querySelector(".icon-theme");

toggleThemeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  
  if (document.body.classList.contains("dark")) {
    iconTheme.textContent = "☀";
  } else {
    iconTheme.textContent = "🌙";
  }
};

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const toggleLang = document.getElementById("toggle-lang");
let isPT = true;

toggleLang.onclick = () => {
  isPT = !isPT;

  document.querySelectorAll("[data-pt]").forEach(el => {
    el.innerText = isPT ? el.dataset.pt : el.dataset.en;
  });

  toggleLang.innerText = isPT ? "EN" : "PT";
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});