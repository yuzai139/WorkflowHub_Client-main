import Swiper from "swiper";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";

function featured_categories() {
  new Swiper(".featured-categories", {
    modules: [Thumbs, FreeMode, Navigation],
    slidesPerView: 1,
    // spaceBetween: 18,
    // centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".featured-categories-next",
      prevEl: ".featured-categories-prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      375: { slidesPerView: 2, spaceBetween: 12 },
      475: { slidesPerView: 3, spaceBetween: 12 },
      576: { slidesPerView: 4, spaceBetween: 20 },
      768: { slidesPerView: 5, spaceBetween: 20 },
      1200: { slidesPerView: 6, spaceBetween: 20 },
      1440: { slidesPerView: 7, spaceBetween: 20 },
    },
  });
}
featured_categories();

function DiscountSwiper() {
  new Swiper("#discount-swiper", {
    modules: [Thumbs, FreeMode, Navigation],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: ".discount-swiper-next",
      prevEl: ".discount-swiper-prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      1200: { slidesPerView: 2, spaceBetween: 20 },
    },
  });
}

DiscountSwiper();

function homeProductSwiper() {
  new Swiper("#home-product-swiper", {
    modules: [Thumbs, FreeMode, Navigation],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: ".home-product-swiper-next",
      prevEl: ".home-product-swiper-prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 },
      1440: { slidesPerView: 5, spaceBetween: 20 },
    },
  });
}

homeProductSwiper();
