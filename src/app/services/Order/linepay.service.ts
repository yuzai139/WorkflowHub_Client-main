import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/linepay-environment';

@Injectable({
  providedIn: 'root'
})
export class LinePayService {

  constructor(private http: HttpClient) {} //注入HttpClient

  //發起付款
  initiatePayment(orderData: any) {
      const body = {
      price: orderData.amount, //金額
      amount: orderData.amount, //金額
      address: orderData.address || '', //地址
      couponId: null //優惠券ID
    };

    const url = `${environment.apiUrl}/api/LinePay/linepay/request`; //發起付款URL
    return this.http.post(url, orderData); //發起付款
  }

  //確認付款
  confirmPayment(transactionId: string, amount: number) {
    const url = `${environment.apiUrl}/api/LinePay/linepay/confirm/${transactionId}`; //確認付款URL
    return this.http.post(url, { amount }); //確認付款
  }

  //發起付款
  requestPayment(orderData: any) {
    const url = `${environment.apiUrl}/api/LinePay/linepay/request`; //發起付款URL
    return this.http.post(url, orderData); //發起付款
  }
}
