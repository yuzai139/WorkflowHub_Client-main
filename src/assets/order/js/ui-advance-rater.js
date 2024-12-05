import raterJs from "rater-js";

document.querySelector("#basic-rater") &&
  (basicRating = raterJs({
    starSize: 22,
    rating: 3,
    element: document.querySelector("#basic-rater"),
    rateCallback: function (e, t) {
      this.setRating(e), t();
    },
  })),
  document.querySelector("#rater-step") &&
  (starRatingStep = raterJs({
    starSize: 22,
    rating: 1.5,
    element: document.querySelector("#rater-step"),
    rateCallback: function (e, t) {
      this.setRating(e), t();
    },
  }));
var basicRating,
  starRatingStep,
  starRatingmessage,
  starRatingunlimited,
  starRatinghover,
  starRatingreset,
  messageDataService = {
    rate: function (e) {
      return {
        then: function (e) {
          setTimeout(function () {
            e(5 * Math.random());
          }, 1e3);
        },
      };
    },
  };
document.querySelector("#rater-message") &&
  (starRatingmessage = raterJs({
    isBusyText: "Rating in progress. Please wait...",
    starSize: 22,
    element: document.querySelector("#rater-message"),
    rateCallback: function (e, t) {
      starRatingmessage.setRating(e),
        messageDataService.rate().then(function (e) {
          starRatingmessage.setRating(e), t();
        });
    },
  })),
  document.querySelector("#rater-unlimitedstar") &&
  (starRatingunlimited = raterJs({
    starSize: 22,
    max: 5,
    readOnly: !0,
    rating: 3.5,
    element: document.querySelector("#rater-unlimitedstar"),
  })),
  document.querySelector("#rater-onhover") &&
  (starRatinghover = raterJs({
    starSize: 22,
    rating: 1,
    element: document.querySelector("#rater-onhover"),
    rateCallback: function (e, t) {
      this.setRating(e), t();
    },
    onHover: function (e, t) {
      document.querySelector(".ratingnum").textContent = e;
    },
    onLeave: function (e, t) {
      document.querySelector(".ratingnum").textContent = t;
    },
  })),
  document.querySelector("#raterreset") &&
  (starRatingreset = raterJs({
    starSize: 22,
    rating: 2,
    element: document.querySelector("#raterreset"),
    rateCallback: function (e, t) {
      this.setRating(e), t();
    },
  })),
  document.querySelector("#raterreset-button") &&
  document.querySelector("#raterreset-button").addEventListener(
    "click",
    function () {
      starRatingreset.clear();
    },
    !1,
  );
