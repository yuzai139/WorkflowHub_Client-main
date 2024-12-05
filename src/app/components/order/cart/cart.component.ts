import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/Order/cart.service';
import { CartItem } from '../../../interfaces/Order/cart.interface';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import { HomeService } from '../../../services/lecture-publisher/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //購物車商品資料
  cartItems: CartItem[] = [];
  //載入狀態
  loading = false;
  //錯誤訊息
  error = '';
  //總金額
  total = 0;
  //商品ID
  fSOPID: number[] = [];
  //會員ID
  memberId: number | null = null; //用於儲存取得會員

  constructor(
    private cartService: CartService, //購物車service
    public router: Router, //路由
    private location: Location, //位置
    private authService: AuthGuardDemoService, //會員service
    private homeService: HomeService //homeService
  ) {}

  ngOnInit(): void {
    this.loadCartItems(); //載入購物車商品資料
    this.memberId = this.authService.getMemberId(); //獲取會員ID
    console.log('目前的 memberId:', this.memberId);
    console.log('目前的 sopid:', this.cartItems);
    //如果會員ID是空的，就顯示未登入會員
    if (!this.memberId) {
      console.log('未登入會員');
    } else {
      console.log('已登入會員，ID為:', this.memberId);
    }

    // 如果需要轉換為數字類型進行運算，可以這樣做：
    const memberIdNumber = this.memberId ? Number(this.memberId) : null;
  }
  //將會員ID轉換為數字類型
  yournumber = (Number(this.memberId));

  //載入購物車商品資料
  loadCartItems(): void {
    this.loading = true;
    try {
      this.cartItems = this.cartService.getCartItems(); //獲取購物車商品資料
      let loadedItems = 0; //載入商品數量

      //如果購物車商品資料是空的，就顯示0
      if (this.cartItems.length === 0) {
        this.total = 0; //總金額0
        this.loading = false; //載入狀態false
        return; //結束
      }

      this.cartItems.forEach(item => { //遍歷購物車商品資料
        this.homeService.getSopFromApi(item.fSOPID).subscribe( //呼叫service裡的拿單筆api
          (productData) => {
            const index = this.cartItems.findIndex(cartItem => cartItem.fSOPID === item.fSOPID);
            if (index !== -1) {
              this.cartItems[index] = {
                ...this.cartItems[index],
                fPubSopImagePath: productData.fPubSopImageUrl
              };
            }
            loadedItems++;

            // 當所有商品都載入完成後才計算總金額
            if (loadedItems === this.cartItems.length) {
              this.calculateTotal();
            }
          },
          (error) => {
            console.error(`無法載入商品 ${item.fSOPID} 的資訊:`, error); //錯誤訊息
            loadedItems++; //載入商品數量+1
            if (loadedItems === this.cartItems.length) { //如果載入商品數量等於購物車商品資料長度
              this.calculateTotal();
            }
          }
        );
      });
    } catch (err) {
      this.error = '載入購物車時發生錯誤'; //錯誤訊息
      this.loading = false; //載入狀態false
    }
  }

  // 計算購物車總金額
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => {
      const price = Number(item.fPrice) || 0; //將商品價格轉換為數字類型
      return sum + price; //總金額加上商品價格
    }, 0);

    // 四捨五入到小數點後兩位
    this.total = Math.round(this.total * 100) / 100;
  }
  //獲取總金額
  getTotal(): number {
    this.calculateTotal(); // 每次獲取總額時重新計算
    return this.total;
  }

  //更新商品數量
  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity > 0) { //如果商品數量大於0
      this.cartService.updateQuantity(productId, newQuantity); //更新商品數量
      this.loadCartItems();
    }
  }

  //移除商品
  removeItem(productId: number): void {
    this.cartService.removeItem(productId); //移除商品
    this.loadCartItems(); //重新載入購物車商品資料
  }

  // proceedToCheckout(): void {
  //   this.router.navigate(['/order-backup']);
  // }

  //前往訂單頁面
  proceedToCheckout(): void {
    if (this.cartItems.length > 0) { //如果購物車商品資料長度大於0
      this.router.navigate(['/order/backup']); //導航到訂單頁面
    }
  }

  //返回上一頁
  goBack(): void {
    this.location.back();
  }
}
