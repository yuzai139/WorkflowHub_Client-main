import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  ngOnInit(): void {
this.initBacktoTop()

  }

   initBacktoTop() {
    const mybutton = document.querySelector('[data-toggle="back-to-top"]');

    window.addEventListener("scroll", function () {
      if (mybutton) {
        if (window.pageYOffset > 72) {
          mybutton.classList.remove("opacity-0");
        } else {
          mybutton.classList.add("opacity-0");
        }
      }
    });

    if (mybutton) {
      mybutton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

}
