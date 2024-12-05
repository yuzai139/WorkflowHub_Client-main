import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router'; // 引入 Event 型別
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
