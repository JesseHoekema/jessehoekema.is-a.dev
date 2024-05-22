const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = e => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#about" ?
  card.classList.add("is-active") :
  card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach(s => s.classList.remove("is-active"));
  buttons.forEach(b => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach(btn => {
  btn.addEventListener("click", handleButtonClick);
});
function bc() {
    window.location.href = "mailto:me@jessehoekema.com";
}




document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.sticky-header');
    var headerHeight = header.clientHeight;
  
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY || window.pageYOffset;
  
      if (scrollY > headerHeight) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    });
  });