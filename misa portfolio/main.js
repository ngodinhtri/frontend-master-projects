//  ------- showScrollTop -----------
function showScrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // console.log(window.scrollY);

  if (!scrollTop) return;

  if (this.scrollY >= 560) scrollTop.classList.add("show");
  else scrollTop.classList.remove("show");
}

window.addEventListener("scroll", showScrollTop);

//  ------- toggle Lists -----------
const toggle = document.getElementById("nav__toggle");
const lists = document.getElementById("nav__lists");

function toggleLists(toggle, lists) {
  if (!(toggle && lists)) return;

  toggle.addEventListener("click", function showLists() {
    lists.classList.toggle("show");
    toggle.classList.toggle("open");
  });
}

toggleLists(toggle, lists);

//  ------- remove Lists -----------
const navLinks = [...document.getElementsByClassName("nav__link")];

function removeLists() {
  if (!lists) {
    return;
  } else {
    lists.classList.remove("show");
    toggle.classList.add("open");
  }
}

navLinks.forEach((navLink) => navLink.addEventListener("click", removeLists));

//
