/*
Template Name: GreenCart - Tailwind CSS Grocery Landing Page Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
File: flatpickr js File
*/

import flatpickr from "flatpickr";

import Dropzone from "dropzone";

flatpickr("#datepicker-basic", {
  defaultDate: new Date(),
  dateFormat: "d-m-Y",
});

flatpickr("#end-date", {
  defaultDate: new Date(),
  dateFormat: "d-m-Y",
});

flatpickr("#e-start-date", {
  defaultDate: "2023-04-12",
  dateFormat: "d-m-Y",
});

flatpickr("#e-end-date", {
  defaultDate: "2023-04-20",
  dateFormat: "d-m-Y",
});

flatpickr("#invoice-date", {
  defaultDate: "12-03-2023",
  dateFormat: "d-m-Y",
});

flatpickr("#due-date-selected", {
  defaultDate: "12-04-2023",
  dateFormat: "d-m-Y",
});

flatpickr("#joining-date", {
  defaultDate: "2005-04-12",
  dateFormat: "d-m-Y",
});

document.addEventListener("DOMContentLoaded", () => {
  const myDropzone = new Dropzone("#my-dropzone", {
    // Your Dropzone options here
  });
});
