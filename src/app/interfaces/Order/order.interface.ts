import { DatePipe } from "@angular/common";


export interface OrderDTO {
  fId?: number; //訂單ID
  fOrderId: number; //訂單ID
  fMemberId: number; //會員ID
  fTotalPrice: number; //總金額
  fOrderDate: Date; //訂單日期
  orderDateDisplay?: string; //訂單日期顯示
  fOrderStatus: boolean; //訂單狀態
    fPayment: string; //付款方式

  // 根據您的資料庫欄位增加其他需要的屬性
}
