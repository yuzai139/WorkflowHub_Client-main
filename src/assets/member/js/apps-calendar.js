/*
Template Name: GreenCart - Responsive Admin Dashboard
Author: CoderThemes
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Calendar js
*/
import { Calendar } from "fullcalendar";
import { Draggable } from "@fullcalendar/interaction";

class Fullcalendar {
  constructor() {
    this.body = document.body;
    this.calendar = document.getElementById("calendar");
    this.formEvent = document.getElementById("forms-event");
    this.btnNewEvent = document.getElementById("btn-new-event");
    this.btnDeleteEvent = document.getElementById("btn-delete-event");
    this.btnSaveEvent = document.getElementById("btn-save-event");
    this.calendarObj = null;
    this.selectedEvent = null;
    this.newEventData = null;
  }

  onEventClick(info) {
    this.formEvent?.reset();
    this.formEvent.classList.remove("was-validated");
    this.newEventData = null;
    this.btnDeleteEvent.style.display = "block";
    this.selectedEvent = info.event;
    document.getElementById("event-title").value = this.selectedEvent.title;
    document.getElementById("event-category").value =
      this.selectedEvent.classNames[0];
  }

  init() {
    /*  Initialize the calendar  */
    const today = new Date();
    const self = this;
    const externalEventContainerEl = document.getElementById("external-events");

    new Draggable(externalEventContainerEl, {
      itemSelector: ".external-event",
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
          classNames: eventEl.getAttribute("data-class"),
        };
      },
    });

    const defaultEvents = [
      {
        title: "Classic Event",
        start: today,
        end: today,
        className: "bg-primary-500",
      },
      {
        title: "12th Grocery Event",
        start: new Date(Date.now() + 13000000),
        end: today,
        className: "bg-amber-500",
      },
      {
        title: "Meeting with Event Manger",
        start: new Date(Date.now() + 308000000),
        end: new Date(Date.now() + 338000000),
        className: "bg-cyan-500",
      },
      {
        title: "Fresher Event",
        start: new Date(Date.now() + 60570000),
        end: new Date(Date.now() + 153000000),
        className: "bg-gray-500",
      },
      {
        title: "Teacher's Event",
        start: new Date(Date.now() + 168000000),
        className: "bg-teal-500",
      },
    ];

    // cal - init
    self.calendarObj = new Calendar(self.calendar, {
      plugins: [],
      slotDuration:
        "00:30:00" /* If we want to split day time each 15minutes */,
      slotMinTime: "07:00:00",
      slotMaxTime: "19:00:00",
      themeSystem: "default",
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List",
        prev: "Prev",
        next: "Next",
      },
      initialView: "dayGridMonth",
      handleWindowResize: true,
      height: window.innerHeight - 285,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      },
      initialEvents: defaultEvents,
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar !!!
      // dayMaxEventRows: false, // allow "more" link when too many events
      selectable: true,

      eventClick: function (info) {
        self.onEventClick(info);
      },
    });

    self.calendarObj.render();
  }
}
document.addEventListener("DOMContentLoaded", function (e) {
  new Fullcalendar().init();
});
