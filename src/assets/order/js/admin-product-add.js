/*
Template Name: GreenCart - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import Dropzone from "dropzone";
import Quill from "quill";
import flatpickr from "flatpickr";

document.addEventListener("DOMContentLoaded", () => {
  const addProductImage = new Dropzone(".product-dropzone", {});
  const addAdditionalImages = new Dropzone(".additional-dropzone", {});
});

new Quill("#editor", {
  theme: "snow",
});

flatpickr("#datepicker-basic", { defaultDate: new Date() });

flatpickr("#timepicker", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  defaultDate: "13:45",
});
