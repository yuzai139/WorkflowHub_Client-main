import Swal from "sweetalert2";
import colors, { red } from "tailwindcss/colors";

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var SweetAlert = function () { };

  // Basic
  document.getElementById("sa-basic").addEventListener("click", function () {
    Swal.fire({
      title: "Any fool can use a computer",
      confirmButtonColor: colors.blue[500],
    });
  });

  // A title with a text under
  document.getElementById("sa-title").addEventListener("click", function () {
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question",
      confirmButtonColor: colors.blue[500],
    });
  });

  // Success Message
  document.getElementById("sa-success").addEventListener("click", function () {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: colors.blue[500],
      cancelButtonColor: colors.red[500],
    });
  });

  // Warning Message
  document.getElementById("sa-warning").addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.emerald[500],
      cancelButtonColor: colors.red[500],
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "cancel",
    }).then(function (result) {
      if (result.value) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  });

  // Parameter
  document.getElementById("sa-params").addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-danger ms-2 mt-2",
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: colors.emerald[500],
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
  });

  // Custom Image
  document.getElementById("sa-image").addEventListener("click", function () {
    Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: "assets/images/logo-dark.png",
      imageHeight: 38,
      confirmButtonColor: colors.blue[500],
      animation: false,
    });
  });

  // Auto Close Timer
  document.getElementById("sa-close").addEventListener("click", function () {
    var timerInterval;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <strong></strong> seconds.",
      timer: 2000,
      confirmButtonColor: colors.blue[500],
      onBeforeOpen: function () {
        Swal.showLoading();
        timerInterval = setInterval(function () {
          Swal.getContent().querySelector("strong").textContent =
            Swal.getTimerLeft();
        }, 100);
      },
      onClose: function () {
        clearInterval(timerInterval);
      },
    }).then(function (result) {
      if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log("I was closed by the timer");
      }
    });
  });

  // Custom HTML alert
  document
    .getElementById("custom-html-alert")
    .addEventListener("click", function () {
      Swal.fire({
        title: "<i>HTML</i> <u>example</u>",
        icon: "info",
        html:
          "You can use <b>bold text</b>, " +
          '<a href="//Themesbrand.in/">links</a> ' +
          "and other HTML tags",
        showCloseButton: true,
        showCancelButton: true,
        // confirmButtonClass: 'btn btn-success',
        // cancelButtonClass: 'btn btn-danger ms-1',
        confirmButtonColor: colors.emerald[500],
        cancelButtonColor: colors.red[500],
        confirmButtonText: '<i class="ti ti-thumb-up me-1"></i> Great!',
        cancelButtonText: '<i class="ti ti-thumb-down"></i>',
      });
    });

  // Position
  document.getElementById("sa-position").addEventListener("click", function () {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  });

  // Custom width padding
  // document.getElementById('custom-padding-width-alert').addEventListener('click', function () {
  //     Swal.fire({
  //         title: 'Custom width, padding, background.',
  //         width: 600,
  //         padding: 100,
  //         confirmButtonColor: colors.blue[500],
  //         background: '#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)'
  //     });
  // });

  // Ajax
  document.getElementById("ajax-alert").addEventListener("click", function () {
    Swal.fire({
      title: "Submit email to run ajax request",
      input: "email",
      customClass: {
        input:
          "!py-2 !px-4 !h-12 block bg-white !border-default-200 rounded-md text-sm dark:bg-default-50 text-default-800",
      },
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      confirmButtonColor: colors.blue[500],
      cancelButtonColor: colors.red[500],
      preConfirm: function (email) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (email === "taken@example.com") {
              reject("This email is already taken.");
            } else {
              resolve();
            }
          }, 2000);
        });
      },
      allowOutsideClick: false,
    }).then(function (email) {
      Swal.fire({
        icon: "success",
        title: "Ajax request finished!",
        confirmButtonColor: colors.emerald[500],
        html: "Submitted email: " + email,
      });
    });
  });

  // Chaining modal alert
  // document.getElementById('chaining-alert').addEventListener('click', function () {
  //     Swal.mixin({
  //         input: 'text',
  //         confirmButtonText: 'Next &rarr;',
  //         inputPlaceholder: "Enter your Question",
  //         showCancelButton: true,
  //         confirmButtonColor: colors.blue[500],
  //         cancelButtonColor: "#74788d",
  //         progressSteps: ['1', '2', '3']
  //     }).queue([
  //         {
  //             title: 'Question 1',
  //             text: 'Chaining swal2 modals is easy'
  //         },
  //         'Question 2',
  //         'Question 3'
  //     ]).then(function (result) {
  //         if (result.value) {
  //             Swal.fire({
  //                 title: 'All done!',
  //                 html:
  //                     'Your answers: <pre><code>' +
  //                     JSON.stringify(result.value) +
  //                     '</code></pre>',
  //                 confirmButtonText: 'Lovely!',
  //                 confirmButtonColor: colors.emerald[500],
  //             });
  //         }
  //     });
  // });

  // Danger
  // document.getElementById('dynamic-alert').addEventListener('click', function () {
  //     swal.queue([{
  //         title: 'Your public IP',
  //         confirmButtonColor: colors.blue[500],
  //         confirmButtonText: 'Show my public IP',
  //         text: 'Your public IP will be received ' +
  //             'via AJAX request',
  //         showLoaderOnConfirm: true,
  //         preConfirm: function () {
  //             return new Promise(function (resolve) {
  //                 $.get('https://api.ipify.org?format=json')
  //                     .done(function (data) {
  //                         swal.insertQueueStep(data.ip);
  //                         resolve();
  //                     });
  //             });
  //         }
  //     }]).catch(swal.noop);
  // });
});
