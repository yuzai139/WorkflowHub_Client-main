import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinePayService } from '../../../services/Order/linepay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html'
})
export class PaymentConfirmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private linePayService: LinePayService
  ) {}

  ngOnInit() {
    // 從 URL 參數中獲取 transactionId
    this.route.queryParams.subscribe(params => { //訂單ID
      const transactionId = params['transactionId']; //訂單ID
      const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder') || '{}'); //訂單資料

      if (transactionId && pendingOrder.amount) { //確認訂單ID和金額
        this.confirmPayment(transactionId, pendingOrder.amount); //確認付款
      }
    });
  }

  //確認付款
  private confirmPayment(transactionId: string, amount: number) {
    this.linePayService.confirmPayment(transactionId, amount).subscribe({ //確認付款
      next: (response: any) => {
        if (response.returnCode === '0000') { //確認付款成功
            // 清除暫存的訂單資訊
          localStorage.removeItem('pendingOrder');

          Swal.fire({
            icon: 'success',
            title: '付款成功！',
            text: '感謝您的購買'
          }).then(() => {
            this.router.navigate(['/order/order']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '付款確認失敗',
            text: response.returnMessage || '請聯繫客服'
          });
        }
      },
      error: (error) => {
        console.error('付款確認失敗:', error);
        Swal.fire({
          icon: 'error',
          title: '付款確認失敗',
          text: '請聯繫客服處理'
        });
      }
    });
  }

  //付款成功
  onPaymentSuccess() {
    // 在這裡處理付款成功的邏輯
    console.log('付款成功');
  }
}
