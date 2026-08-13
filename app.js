const mainLeftArrow = document.getElementById("main-left-arrow");
const mainRightArrow = document.getElementById("main-right-arrow");
const lightboxLeftArrow = document.getElementById("lightbox-left-arrow");
const lightboxRightArrow = document.getElementById("lightbox-right-arrow");
const quantityNumber = document.getElementById("quantity-number");
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const cartContainer = document.getElementById("cart-container");
const btnCart = document.getElementById("btn-cart");
const cartMessage = document.querySelector(".cart-message-container");
const cartItem = document.getElementById("cart-item");
const discountedPrice = document.querySelector(".discounted-price");
const cartItemTotal = document.querySelector(".cart-item-total");
const cartItemPrice = document.querySelector(".cart-item-price");
const cartItemName = document.querySelector(".cart-item-name");
const productTitle = document.querySelector(".product-title");
const btnDelete = document.getElementById("btn-delete");
const btnAddToCart = document.getElementById("btn-add-to-cart");
const btnCheckout = document.getElementById("btn-checkout");
const cartItemCount = document.querySelector(".cart-item-count");
const cartImg = document.querySelector(".cart-img");
const btnOpenMenu = document.getElementById("open-menu");
const btnCloseMenu = document.getElementById("close-menu");
const mobileNavbar = document.getElementById("mobile-navbar");
const main = document.getElementById("main");
const overlay = document.getElementById("overlay");
const header = document.querySelector(".header");
const productImage = document.querySelector(".product-image");
const lightboxMainImage = document.querySelector(".lightbox-main-img");
const thumbnailImages = document.querySelector(".thumbnail-images");
const navigationArrows = document.querySelector(".navigation-arrows");
const lightboxArrows = document.querySelector(".lightbox-arrows");
const desktopMenu = document.getElementById("desktop-menu");
const mainThumbnails = document.querySelectorAll(
  ".thumbnail-images .thumbnail",
);
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox-thumbnail-container .thumbnail",
);
const lightbox = document.querySelector(".lightbox");
const closeLightboxBtn = document.getElementById("close-lightbox");

const productImages = [
  { src: "./images/image-product-1.jpg", tabletPosition: "center -200px" },
  { src: "./images/image-product-2.jpg", tabletPosition: "center 0" },
  { src: "./images/image-product-3.jpg", tabletPosition: "center -20px" },
  { src: "./images/image-product-4.jpg", tabletPosition: "center -90px" },
];

let currentThumbnail = 0;
mainThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentImage = index;
    currentThumbnail = index;

    updateImage();
    updateLightboxImage();
  });
});

productImage.addEventListener("click", () => {
  if (window.innerWidth > 950) {
    overlay.classList.remove("hidden");
    lightbox.classList.remove("hidden");
    header.setAttribute("inert", "");
    main.setAttribute("inert", "");
    stopCarousel();
    updateLightboxImage();
  }
});

lightboxThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentThumbnail = index;
    updateLightboxImage();
  });
});

function updateLightboxImage() {
  const image = productImages[currentThumbnail];

  lightboxMainImage.style.backgroundImage = `url(${image.src})`;

  lightboxThumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("thumbnail-selected");
  });
  lightboxThumbnails[currentThumbnail].classList.add("thumbnail-selected");
}

closeLightboxBtn.addEventListener("click", () => {
  closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.add("hidden");
  overlay.classList.add("hidden");
  header.removeAttribute("inert");
  main.removeAttribute("inert");
  startCarousel();
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 950 && !lightbox.classList.contains("hidden")) {
    closeLightbox();
  }
});

function updateImage() {
  const image = productImages[currentImage];

  mainThumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("thumbnail-selected");
  });
  mainThumbnails[currentImage].classList.add("thumbnail-selected");
  productImage.style.backgroundImage = `url(${image.src})`;

  if (window.innerWidth >= 600 && window.innerWidth < 950) {
    // Tablet
    productImage.style.backgroundPosition = image.tabletPosition;
  } else {
    // Mobile and desktop
    productImage.style.backgroundPosition = "center";
  }
}

window.addEventListener("resize", updateImage);

let currentImage = 0;

updateImage();

function changeImage(e) {
  currentImage += e;
  if (currentImage >= productImages.length) {
    currentImage = 0;
  }
  if (currentImage < 0) {
    currentImage = productImages.length - 1;
  }
  updateImage();
}

function changeLightboxThumbnail(e) {
  currentThumbnail += e;
  if (currentThumbnail >= productImages.length) {
    currentThumbnail = 0;
  }
  if (currentThumbnail < 0) {
    currentThumbnail = productImages.length - 1;
  }
  updateLightboxImage();
}
mainRightArrow.addEventListener("click", () => {
  changeImage(1);
  resetCarousel();
});
mainLeftArrow.addEventListener("click", () => {
  changeImage(-1);
  resetCarousel();
});

lightboxRightArrow.addEventListener("click", () => {
  changeLightboxThumbnail(1);
});
lightboxLeftArrow.addEventListener("click", () => {
  changeLightboxThumbnail(-1);
});

//carousel;
let carouselTimer;

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    changeImage(1);
  }, 6000);
}

function stopCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = null;
}

function resetCarousel() {
  stopCarousel();
  startCarousel();
}
startCarousel();

let quantity = Number(quantityNumber.textContent);
let cartQuantity = 0;
btnPlus.addEventListener("click", function () {
  quantity++;
  quantityNumber.textContent = quantity;
});
btnMinus.addEventListener("click", function () {
  if (quantity > 0) {
    quantity--;
    quantityNumber.textContent = quantity;
  }
});

btnCart.addEventListener("click", function () {
  if (cartContainer.classList.contains("hidden")) {
    cartContainer.classList.remove("hidden");
  } else closeCart();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cartContainer.classList.contains("hidden")) {
    closeCart();
  }
});

document.addEventListener("click", function (event) {
  if (!cartContainer.classList.contains("hidden")) {
    if (
      !cartContainer.contains(event.target) &&
      !btnCart.contains(event.target)
    ) {
      closeCart();
    }
  }
});

function closeCart() {
  cartContainer.classList.add("hidden");
}

function updateCart() {
  cartQuantity += quantity;
  if (cartQuantity < 1) {
    cartMessage.classList.remove("hidden");
    cartItem.classList.add("hidden");
    cartImg.classList.remove("active-cart");
  } else {
    cartMessage.classList.add("hidden");
    cartItem.classList.remove("hidden");
    cartItemName.innerHTML = productTitle.innerHTML;
    cartImg.classList.add("active-cart");
    updatePrice();
  }
}

function updatePrice() {
  let price = discountedPrice.textContent;
  cartItemPrice.innerHTML = `${price} X ${cartQuantity}`;
  let priceNumber = Number(price.slice(1));
  cartItemTotal.innerHTML = `$${(priceNumber * cartQuantity).toFixed(2)}`;
}

btnDelete.addEventListener("click", () => {
  cartMessage.classList.remove("hidden");
  cartItem.classList.add("hidden");
  cartItemCount.classList.add("hidden");
  cartImg.classList.remove("active-cart");
  cartQuantity = 0;
});

btnAddToCart.addEventListener("click", () => {
  updateCart();
  if (quantity > 0) {
    cartItemCount.classList.remove("hidden");
    cartItemCount.innerHTML = cartQuantity;
  }
});

btnCheckout.addEventListener("click", () => {
  location.reload(); //reloads page
});

btnOpenMenu.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  mobileNavbar.classList.remove("hidden");
  header.setAttribute("inert", "");
  main.setAttribute("inert", "");
  stopCarousel();
});
btnCloseMenu.addEventListener("click", function () {
  overlay.classList.add("hidden");
  mobileNavbar.classList.add("hidden");
  header.removeAttribute("inert");
  main.removeAttribute("inert");
  startCarousel();
});

function showThumbnails() {
  if (window.innerWidth > 950) {
    thumbnailImages.classList.remove("hidden");
  } else thumbnailImages.classList.add("hidden");
}
function showArrows() {
  if (window.innerWidth < 950) {
    navigationArrows.classList.remove("hidden");
  } else navigationArrows.classList.add("hidden");
}
function showBtnOpenMenu() {
  if (window.innerWidth < 950) {
    btnOpenMenu.classList.remove("hidden");
  } else btnOpenMenu.classList.add("hidden");
}
function showDesktopMenu() {
  if (window.innerWidth > 950) {
    desktopMenu.classList.remove("hidden");
  } else desktopMenu.classList.add("hidden");
}
window.addEventListener("resize", showThumbnails);
window.addEventListener("resize", showArrows);
window.addEventListener("resize", showBtnOpenMenu);
window.addEventListener("resize", showDesktopMenu);

showThumbnails();
showArrows();
showBtnOpenMenu();
showDesktopMenu();
