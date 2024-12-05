/*
Template Name: GreenCart - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import Pristine from "pristinejs/dist/pristine.min.js";

const valid_form = document.querySelectorAll(".valid-form");
if (null != valid_form)
  for (let e = 0; e < valid_form.length; e++) {
    const b = new Pristine(valid_form[e]);
    valid_form[e].addEventListener("submit", function (e) {
      e.preventDefault();
      b.validate();
    });
  }
