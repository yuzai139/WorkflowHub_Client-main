import { LinePayService } from './../../../services/Order/linepay.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/Order/order.service';
import { Router } from '@angular/router';
import { OrderDTO } from '../../../interfaces/Order/order.interface';
import { OrderDetailDTO } from '../../../interfaces/Order/orderdetail.interface';
import { Location } from '@angular/common';
import { CartService } from '../../../services/Order/cart.service';
import Swal from 'sweetalert2';  // 引入 SweetAlert2
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import { CartItem } from 'src/app/interfaces/Order/cart.interface';
import { OrderDetailService } from 'src/app/services/Order/orderdetail.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/linepay-environment';
import * as CryptoJS from 'crypto-js';
import { HomeService } from 'src/app/services/lecture-publisher/home.service';


@Component({
  selector: 'app-order-backup',
  templateUrl: './order-backup.component.html'
})
export class OrderBackupComponent implements OnInit {
  cartItems: CartItem[] = [];
  orders: OrderDTO[] = [];  // 儲存訂單資料的陣列
  orderDetails: OrderDetailDTO[] = [];  // 儲存訂單明細的陣列
  fSOPID: number[] = []; // 購買的 SOP ID 陣列
  totalAmount: number = 0;
  totalQuantity: number = 0;
  // 新增付款表單模型
  paymentForm = {
    cardHolderName: '',
    cardNumber: '',
    billingAddress: '',
    expirationDate: '',
    cvv: '',
    saveInfo: false
  };
  selectedPaymentMethod: string = 'credit_card';

  memberId: number | null = null; //用於儲存取得會員
//linepay相關
  private readonly LINE_PAY_CHANNEL_ID = environment.linePay.channelId;
  private readonly LINE_PAY_CHANNEL_SECRET = environment.linePay.channelSecret;
  private readonly LINE_PAY_API_URL = environment.linePay.paymentRequestUrl;

  // 預設信用卡支付

  // 測試資料
  demoData = {
    cardHolderName: '小八',
    cardNumber: '0000111122223333',
    billingAddress: '106台北市大安區復興南路一段390號2樓',
    expirationDate: '06/01', //到期日
    cvv: '100' //安全碼
  };

  constructor(
    private orderService: OrderService, //訂單service
    private cartService: CartService, //購物車service
    private router: Router, //路由
    private location: Location, //位置
    private authService: AuthGuardDemoService, //會員service
    private orderDetailService: OrderDetailService, //訂單明細service
    private http: HttpClient, //http
    private linePayService: LinePayService, //linepay service
    private homeService: HomeService //home service
  ) {}

  ngOnInit() {
    // 從 localStorage 獲取購物車資料
    const cartData = localStorage.getItem('cartItems'); //獲取購物車資料
    this.cartItems = cartData ? JSON.parse(cartData) : []; //解析購物車資料

    this.fSOPID = this.cartItems.map(item => item.fSOPID);

    // 獲取現有訂單資料（如果有的話）
    const orderData = localStorage.getItem('orders'); //獲取訂單資料
    this.orders = orderData ? JSON.parse(orderData) : []; //解析訂單資料

    // this.loadCartItems();
    this.calculateTotals(); //計算總金額

    this.memberId = this.authService.getMemberId(); //獲取會員ID
    console.log('目前的 memberId:', this.memberId); //印出會員ID
    console.log('目前的 sopid:', this.cartItems); //印出購物車資料

    if (!this.memberId) {
      console.log('未登入會員'); //未登入會員
    } else {
      console.log('已登入會員，ID為:', this.memberId); //已登入會員，印出會員ID
    }

    console.log('當前支付方式:', this.selectedPaymentMethod); // 用於偵錯

    // 載入每個商品的圖片
    this.cartItems.forEach(item => {
      this.homeService.getSopFromApi(item.fSOPID).subscribe(
        (productData) => {
          const index = this.cartItems.findIndex(cartItem => cartItem.fSOPID === item.fSOPID);
          if (index !== -1) {
            this.cartItems[index] = {
              ...this.cartItems[index],
              // 使用 fPubSopImageUrl 替代 fPubSopImagePath
              fPubSopImagePath: productData.fPubSopImageUrl
            };
          }
        },
        error => console.error(`無法載入商品 ${item.fSOPID} 的資訊:`, error)
      );
    });
  }

  yournumber =(Number(this.memberId)); //將會員ID轉換為數字

  //計算總金額
  calculateTotals() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.fPrice, 0);
    this.totalQuantity = this.cartItems.length; // 直接使用購物車項目數量
  }

  /**
   * 提交訂單
   */
  submitOrder(): void {
    console.log('submitOrder called');
    console.log('Form data:', this.paymentForm); //印出表單資料
    console.log('Form valid:', this.isFormValid()); //印出表單是否有效

    if (!this.isFormValid()) {
      Swal.fire({
        icon: 'error', //錯誤圖示
        title: '請填寫完整的付款資訊', //錯誤訊息
        text: '所有欄位都是必填的', //錯誤訊息
        confirmButtonText: '確定' //確定按鈕文字
      });
      return;
    }

    const order: OrderDTO = {
      fOrderId: 0,  // 讓後端自動生成
      fMemberId: this.memberId || 0,
      fTotalPrice: this.calculateTotal(),
      fOrderDate: new Date(),
      orderDateDisplay: new Date().toLocaleDateString(),
        fOrderStatus: true,
      fPayment: "信用卡"
      };

    const orderDetails: OrderDetailDTO[] = this.cartItems.map(item => ({
      fOrderId: 0,  // 讓後端自動生成
      fSOPID: item.fSOPID,
      fSubtotal: item.fPrice * item.quantity,
      fIsCopy: false
    }));

    // 同時儲存到 localStorage 和後端
    this.saveOrder(order);
    this.saveOrderDetails(orderDetails);

    this.orderService.createOrderWithDetails(order, orderDetails).subscribe({
      next: (response) => {
      this.cartService.clearCart();

      this.copyPurchasedSops();

      Swal.fire({
        icon: 'success',
        title: '訂單建立成功！',
        text: '感謝您的購買', //成功訊息
        confirmButtonText: '確定' //確定按鈕文字
        }).then(() => {
          this.router.navigate(['/order/order']); //導航到訂單頁面
      });
      },
      error: (error) => {
        console.error('建立訂單失敗:', error); //印出建立訂單失敗
      Swal.fire({
        icon: 'error', //錯誤圖示
        title: '訂單建立失敗', //錯誤訊息
        text: '請稍後再試', //錯誤訊息
        confirmButtonText: '確定' //確定按鈕文字
      });
    }
    });
  }

  /**
   * 儲存訂單到 localStorage
   */
  private saveOrder(order: OrderDTO): void {
    // 獲取現有訂單
    const orders = localStorage.getItem('orders'); //獲取訂單資料
    const orderList = orders ? JSON.parse(orders) : []; //解析訂單資料

    // 新增訂單
    orderList.push(order); //新增訂單

    // 儲存回 localStorage
    localStorage.setItem('orders', JSON.stringify(orderList)); //儲存訂單資料
  }

  /**
   * 儲存訂單明細到 localStorage
   */
  private saveOrderDetails(details: OrderDetailDTO[]): void {
    // 不需要獲取現有訂單明細，直接儲存新的訂單明細
    localStorage.setItem('orderDetails', JSON.stringify(details)); //儲存訂單明細資料
  }

  /**
   * 生成唯一訂單ID
   */
  private generateOrderId(): number {
    return Date.now() + Math.floor(Math.random() * 1000); //生成唯一訂單ID
  }

  /**
   * 計算總金額
   */
  private calculateTotal(): number {
    console.log('計算總金額:', this.cartItems); //印出購物車資料
    //商品數量固定一個
    return this.cartItems.reduce((total, item) => total + item.fPrice, 0); //計算總金額
  }

  /**
   * 返回上一頁
   */
  goBack(): void {
    this.location.back(); //返回上一頁
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems(); //獲取購物車資料
  }

  // 表單驗證方法
  isFormValid(): boolean {
    return (
      !!this.paymentForm.cardHolderName &&
      !!this.paymentForm.cardNumber &&
      !!this.paymentForm.billingAddress &&
      !!this.paymentForm.expirationDate &&
      !!this.paymentForm.cvv
    );
  }
  private copyPurchasedSops(): void {
    if (!this.memberId) return; //如果會員ID不存在，則返回
    console.log('要複製的sopIds:', this.fSOPID); //印出要複製的sopIds
    console.log('cartItems:', this.cartItems); //印出購物車資料
    console.log('cartItems:', this.cartItems[0].fSOPID); //印出購物車資料
    this.orderDetailService.copyPurchasedSops(this.memberId, this.fSOPID).subscribe({
      next: (response) => console.log('SOP 複製成功:', response), //印出SOP複製成功
      error: (error) => console.error('SOP 複製失敗:', error), //印出SOP複製失敗
    });
  }



  // LINE Pay 支付方法
  initiateLinePay() {
    const orderData = {
      amount: this.totalAmount, //總金額
      address: this.paymentForm.billingAddress //地址
    };

    // 先準備訂單資料
    const order: OrderDTO = {
      fOrderId: 0, //讓後端自動生成
      fMemberId: this.memberId || 0, //會員ID
      fTotalPrice: this.calculateTotal(), //總金額
      fOrderDate: new Date(), //訂單日期
      orderDateDisplay: new Date().toLocaleDateString(), //訂單日期顯示
      fOrderStatus: true, //訂單狀態
      fPayment: "LINE Pay"  // 修改支付方式為 LINE Pay
    };

    // 訂單明細
    const orderDetails: OrderDetailDTO[] = this.cartItems.map(item => ({
      fOrderId: 0, //讓後端自動生成
      fSOPID: item.fSOPID, //SOP ID
      fSubtotal: item.fPrice * item.quantity, //小計
      fIsCopy: false //是否複製
    }));

    // LINE Pay 初始化
    this.linePayService.initiatePayment(orderData).subscribe({
      next: (response: any) => {
        console.log('LINE Pay 回應:', response); //印出LINE Pay 回應
        if (response.returnCode === '0000') {
          // 儲存訂單資訊到 localStorage
          localStorage.setItem('pendingOrder', JSON.stringify({
            order: order, //訂單資料
            orderDetails: orderDetails, //訂單明細資料
            amount: this.totalAmount, //總金額
            items: this.cartItems //購物車資料
          }));

          // 建立訂單
          this.orderService.createOrderWithDetails(order, orderDetails).subscribe({
            next: (orderResponse) => {
              console.log('訂單建立成功:', orderResponse); //印出訂單建立成功

              // 複製購買的 SOP
              this.copyPurchasedSops();

              // 清空購物車
              this.cartService.clearCart();

              // 重定向到 LINE Pay 付款頁面
              window.location.href = response.info.paymentUrl.web;
            },
            error: (error) => {
              console.error('建立訂單失敗:', error); //印出建立訂單失敗
              Swal.fire({
                icon: 'error', //錯誤圖示
                title: '訂單建立失敗', //錯誤訊息
                text: '請稍後再試' //錯誤訊息
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '付款初始化失敗', //錯誤訊息
              text: response.returnMessage || '請稍後再試' //錯誤訊息
          });
        }
      },
      error: (error) => {
        console.error('LINE Pay 請求失敗:', error); //印出LINE Pay 請求失敗
        Swal.fire({
          icon: 'error', //錯誤圖示
          title: '付款初始化失敗', //錯誤訊息
          text: '請檢查網路連接或稍後再試' //錯誤訊息
        });
      }
    });
  }

  // 生成隨機 nonce
  private generateNonce(): string {
    return Math.random().toString(36).substring(2, 15); //生成隨機 nonce
  }

  // 創建 LINE Pay 請求標頭
  private createLinePayHeaders(body: any, nonce: string): HttpHeaders {
    const requestUrl = '/v3/payments/request'; //請求URL
    const channelSecret = environment.linePay.channelSecret; //通道密鑰
    const data = `${channelSecret}${requestUrl}${JSON.stringify(body)}${nonce}`; //資料
     // 簽章生成
    const signature = CryptoJS.HmacSHA256(data, channelSecret).toString(CryptoJS.enc.Base64); //簽章

    // 驗證各欄位是否正確
    console.log("Request URL:", requestUrl); //印出請求URL
    console.log("Signature data:", data); //印出簽章資料
    console.log("Signature:", signature); //印出簽章
    console.log("Nonce:", nonce); //印出nonce

    return new HttpHeaders({
      'Content-Type': 'application/json', //內容類型
      'X-LINE-ChannelId': environment.linePay.channelId, //通道ID
      'X-LINE-Authorization-Nonce': nonce, //nonce
      'X-LINE-Authorization': signature //簽章
    });
  }

  // 可以添加一個方法來監控支付方式的變更
  onPaymentMethodChange() {
    console.log('支付方式變更為:', this.selectedPaymentMethod); //印出支付方式變更
  }

  // 填入測試資料的方法
  fillDemoData() {
    this.paymentForm = { //填入測試資料
      ...this.paymentForm, //填入表單資料
      ...this.demoData //填入測試資料
    };
  }

}

