import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from '../../../services/Order/orderdetail.service';
import { OrderDetailDTO } from '../../../interfaces/Order/orderdetail.interface';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';



@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  OrderDetails: OrderDetailDTO[] = []; //訂單明細
  selectedOrderDetails: OrderDetailDTO | null = null; //選擇的訂單明細
  loading = false; //載入中
  memberId:number | null = null; //會員ID
  error = ''; //錯誤訊息
  detail:OrderDetailDTO=
  {
    fOrderId: 0,
    fSOPID:0 ,
    fSubtotal: 0,

  }; // 使用 ! 告訴 TypeScript 這個變數稍後會被賦值


  constructor(
    private orderDetailService: OrderDetailService, //訂單明細service
    private route: ActivatedRoute,
    private http: HttpClient, //http
    private location: Location, //位置

  ) {

  }

  ngOnInit() {
    // 可以在這裡添加初始化邏輯
    // this.searchOrder('1003');
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('orderId'); //獲取訂單ID
      console.log('Received orderId:', orderId); // 除錯用

      if (orderId) {

        this.loadOrderDetails(parseInt(orderId)); //載入訂單明細

      }
    });
    // this.loadFSopProducts();
  }

  //載入訂單明細
  loadOrderDetails(orderId: number) {
    this.loading = true; //載入中
    this.error = ''; //錯誤訊息

    this.orderDetailService.getOrderDetails(orderId).subscribe({
      next: (details) => {
        console.log('傳回的訂單明細:', details); //印出訂單明細

        // 方法1：直接使用回傳的資料，不進行過濾
        this.OrderDetails = details;

        // 或者方法2：如果真的需要過濾重複項目，只根據 fSopid 來過濾
        // this.OrderDetails = details.filter((detail: OrderDetailDTO, index: number, self: OrderDetailDTO[]) =>
        //   index === self.findIndex((d) => d.fSOPID === detail.fSOPID)
        // );

        // 加入除錯訊息
        console.log('處理後的訂單明細:', this.OrderDetails); //印出處理後的訂單明細
        console.log('訂單金額:', this.OrderDetails.reduce((sum, detail) => sum + detail.fSubtotal, 0)); //印出訂單金額

        this.loading = false; //載入完成

        if (this.OrderDetails.length === 0) {
          this.error = '找不到該訂單資料'; //找不到訂單資料
        }
      },
      error: (error) => {
        console.error('API錯誤:', error); //印出API錯誤
        this.error = error.status === 404
          ? `找不到訂單 ${orderId} 的資料`
          : `獲取訂單資料失敗: ${error.message || '未知錯誤'}`;
        this.loading = false;
        this.OrderDetails = [];
      }
    });
  }

  // loadFSopProducts() {
  //   // 假設您有訂單ID
  //   const orderId = this.detail.FOrderId;
  //   this.fSopProductService.getFSopProductsByOrderId(orderId).subscribe({
  //     next: (products) => {
  //       this.fSopProducts = products;
  //       // 更新顯示的FSopid
  //       if (this.fSopProducts.length > 0) {
  //         this.detail.FSopid = this.fSopProducts[0].fSopId;
  //       }
  //     },
  //     error: (error) => {
  //       this.error = '無法載入工作流程資料';
  //       console.error('Error loading FSopProducts:', error);
  //     }
  //   });
  // }

  //返回上一頁
  goBack(): void {
    this.location.back();
  }

  //取得唯一訂單明細
  getUniqueOrderDetails() {
    const uniqueMap = new Map(); //建立唯一Map

    this.OrderDetails.forEach(detail => {
      const key = `${detail.fSOPID}_${detail.fSubtotal}`;  // 使用 SOPID 和金額組合作為唯一鍵
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, detail); //設定唯一Map
      }
  });

    return Array.from(uniqueMap.values()); //將唯一Map轉換為陣列
  }


}
