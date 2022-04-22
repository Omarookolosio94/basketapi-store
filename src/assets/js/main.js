document.addEventListener("DOMContentLoaded", function () {
  //GET FOOTER DATE
  document.querySelector(".footer-year").innerHTML = new Date().getFullYear();

  var box = document.getElementById("side-nav");

  document.addEventListener("click", function (event) {
    if (
      event.target.closest("#side-nav") ||
      event.target.closest("#toggle-nav")
    )
      return;
    box.classList.remove("open");
  });

  //THEME TOGGLE
  var storedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  if (storedTheme)
    document.documentElement.setAttribute("data-theme", storedTheme);


});

function scrollTopAnimated() {
  $("html, body").animate({ scrollTop: "0" });
}
//SIDE NAV FUNCTIONS
function openNav() {
  document.getElementById("side-nav").classList.add("open");
}

function closeNav() {
  document.getElementById("side-nav").classList.remove("open");
}

function ToggleTheme() {
  var currentTheme = document.documentElement.getAttribute("data-theme");

  var toggleText = document.getElementById("toggle-text");

  var targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
    toggleText.innerText = "Deactivate Dark Mode";
  } else {
    toggleText.innerText = "Activate Dark Mode";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
}

var modal;

function openModal(modalId) {
  modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(e, modalId) {
  e.preventDefault();
  modal = document.getElementById(modalId);
  modal.style.display = "none";
  modal = "";
}

function RedirectToShipping(e) {
  e.preventDefault();
  window.location.href = "./Shipping.html";
}

function Redirect(e, path) {
  e.preventDefault();
  window.location.href = "./" + path;
}

function AddToCart(e) {
  e.preventDefault();
  var cart_count = document.getElementById("cart-count");
  var cart = document.getElementsByClassName("cart-icon");
  cart_count.innerHTML = +cart_count.innerText + 1;
  cart[0].style.display = "block";

  setAlert("Item Added To Cart", "alert-success");
}

function setAlert(msg, type) {
  var alert = document.getElementById("alert-box");
  var text = document.getElementById("alert-msg");

  text.innerText = msg;
  alert.classList.add(type);
  alert.classList.add("show");

  setTimeout(function () {
    alert.classList.remove(type);
    alert.classList.remove("show");
  }, 3000);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal = "";
  }
};

function openProductAccordion(e, modalId) {
  e.preventDefault();
  var modal = document.getElementById(modalId);
  if ($(window).width() < 600) {
    modal.classList.toggle("active");
    var panel = modal.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.style.padding = 0;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 500 + "px";
      panel.style.padding = "1.5rem";
    }
  }
}
