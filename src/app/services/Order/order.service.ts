import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from '../../interfaces/Order/order.interface';
import { OrderDetailDTO } from '../../interfaces/Order/orderdetail.interface';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7146/api/TOrders'; // 根據你的API路徑調整

  constructor(private http: HttpClient) { } //注入HttpClient

  //獲取訂單
  getOrders(): Observable<OrderDTO []> {
    return this.http.get<OrderDTO[]>(this.apiUrl);
  }

  //獲取訂單
  getOrder(orderId: number): Observable<OrderDTO> {
    return this.http.get<OrderDTO>(`${this.apiUrl}/${orderId}`);
  }

  //新增訂單
  createOrder(order: OrderDTO): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(this.apiUrl, order);
  }

  //新增訂單明細
  createOrderDetails(orderDetails: OrderDetailDTO[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/details`, orderDetails);
  }

  //更新訂單
  updateOrder(orderId: number, order: OrderDTO): Observable<OrderDTO> {
    return this.http.put<OrderDTO>(`${this.apiUrl}/${orderId}`, order);
  }

  //刪除訂單
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`);
  }

  //新增訂單&明細
  createOrderWithDetails(order: OrderDTO, orderDetails: OrderDetailDTO[]): Observable<any> {
    const payload = {
      order: {
        fOrderId: 0, //訂單ID
        fMemberId: order.fMemberId, //會員ID
        fTotalPrice: order.fTotalPrice, //總金額
        fOrderDate: order.fOrderDate, //訂單日期
        orderDateDisplay: order.orderDateDisplay, //訂單日期顯示
        fOrderStatus: order.fOrderStatus, //訂單狀態
        fPayment: order.fPayment //付款方式
      },
      orderDetails: orderDetails.map(detail => ({
        fOrderId: 0, //訂單ID
        flsCopy: false, //是否複製
        fSubtotal: detail.fSubtotal, //小計
        fSOPID: detail.fSOPID //商品ID
      }))
    };

    return this.http.post<any>(`${this.apiUrl}/createWithDetails`, payload); //新增訂單明細
  }
}
