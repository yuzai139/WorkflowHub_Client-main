import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent {
  constructor(private router: Router) {}

  // 返回首頁或購物車
  onReturn() {
    this.router.navigate(['/']);  // 或返回購物車 '/cart'
  }
}
