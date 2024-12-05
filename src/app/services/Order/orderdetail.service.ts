import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetailDTO } from '../../interfaces/Order/orderdetail.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = 'https://localhost:7146/api/TOrdersDetails'; //訂單明細API
  private coreViewAddress = 'https://localhost:7151'; // 設定 API 基本 URL

  constructor(private http: HttpClient) { } //注入HttpClient

  // 根據訂單ID獲取訂單詳情
  getOrderDetails(orderId: number) {
    console.log(orderId); //印出訂單ID
    return this.http.get<any>(`https://localhost:7146/api/TOrderDetails/${orderId}`); //獲取訂單明細
    // return this.http.get<OrderDetailDTO[]>(`${this.apiUrl}/${orderId}`);
  }
    // ========新增方法：複製購買的 SOP 到會員的 SOP 列表中============
  copyPurchasedSops(memberId: number, sopIds: number[]): Observable<any> {
    return this.http.post(`${this.coreViewAddress}/api/SopPublisherApi/CopyPurchasedSops/${memberId}`, sopIds); //複製購買的 SOP 到會員的 SOP 列表中
  }

 // ========新增方法：複製購買的 SOP 到會員的 SOP 列表中============
  // copyPurchasedSops(memberId: number, sopIds: number[]): Observable<any> {
  //   const requestBody = {
  //     memberId: memberId,
  //     sopIds: sopIds
  //   };
  //   console.log('發送請求到:', `${this.coreViewAddress}/api/SopPublisherApi/CopyPurchasedSops`);
  //   console.log('請求內容:', requestBody);
  //   // 修改 API 呼叫方式
  //   return this.http.post(
  //     `${this.coreViewAddress}/api/SopPublisherApi/CopyPurchasedSops`,
  //     requestBody,
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json'
  //       })
  //     }
  //   );
  }


  // 根據明細ID獲取單筆訂單明細
  // getOrderDetail(id: number): Observable<OrderDetailDTO> {
  //   return this.http.get<OrderDetailDTO>(`${this.apiUrl}/${id}`);
  // }
// }
