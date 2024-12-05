import { Publisher } from 'src/app/interfaces/lecture-publisher/publisher';
import { ActivatedRoute, Route } from '@angular/router';
import { HomeService } from './../../../services/lecture-publisher/home.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/Order/cart.service';
import Swal from 'sweetalert2';
import { CartItem } from 'src/app/interfaces/Order/cart.interface';
import { Router } from '@angular/router';
import { sopProdDTO } from 'src/app/interfaces/lecture-publisher/workFlowProd';
import { sopListDTO } from 'src/app/interfaces/lecture-publisher/home';
import { PublisherService } from 'src/app/services/lecture-publisher/publisher.service';
import { switchMap } from 'rxjs';

//假定資料類別，詳情去
// interface Product {
//   productId: number;
//   fProductName: string;
//   fPrice: number;
//   fPoint: number;
//   imageUrl: string;
//   description: string;
// }
interface cartProd {
  fSOPID: number; //商品ID
  fSopName: string; //商品名稱
  fPrice: number; //商品價格
  fSalePoints: number; //商品點數
  fPubSopImagePath: string; //商品圖片路徑
  fSopDescription: string; //商品描述
  fPoint: number; //商品點數
}



@Component({
  selector: 'app-wkflowmarket-product',
  templateUrl: './wkflowmarket-product.component.html'
})
export class WkflowmarketProductComponent implements OnInit {
  //寫死假資料，詳細的商品，尚未篩選cart要存的欄位，真正的欄位在interface/publisher/workFlowProd裡的sopProdDTO
  // products: Product[] = [];

  // 用於顯示在購物車的商品資料
  products: cartProd[] = [];

  //填入假資料
  // currentProduct: Product = {
  //   productId: 1,
  //   fProductName: '網頁開發守則',
  //   fPrice: 500,
  //   imageUrl: '../../../../assets/lecture-publisher/work001.jpg',
  //   description: '前端網頁開發專注於建立網站和網頁應用程式的視覺和互動層面'
  // };


  constructor(private cartService: CartService, //購物車service
    private HomeService: HomeService, //homeService
    private route: ActivatedRoute, //獲取路由參數
    private router: Router, //路由 導航用
    private PublisherService: PublisherService
  ) { }

  //加入購物車
  addToCart(): void {
    //如果prod是空的，就顯示錯誤 (檢查是否有商品)
    if (!this.prod) {
      console.error('商品資料不存在');
      return;
    }

    console.log('準備加入購物車的商品:', this.prod);

    // 檢查購物車中是否已存在此商品
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const isItemExist = existingCart.some((item: any) => item.fSOPID === this.prod.fSOPID);

    if (isItemExist) {
      // 商品已存在，顯示警告訊息
      Swal.fire({
        icon: 'warning',
        title: '商品已在購物車中',
        text: '每個商品限購一件',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    //將商品資料轉換成CartItem類型，並存入購物車
    const cartItem: CartItem = {
      fSOPID: this.prod.fSOPID,
      fSopName: this.prod.fSopName,
      fPrice: this.prod.fPrice,
      fSalePoints: this.prod.fSalePoints,
      fPubSopImagePath: this.prod.fPubSopImageUrl,
      fSopDescription: this.prod.fSopDescription,
      quantity: 1 //固定數量1 只能買一件
    };

    try {
      this.cartService.addToCart(cartItem);
      console.log('成功加入購物車');

      //顯示成功加入購物車的提示
      Swal.fire({
        icon: 'success',
        title: '已加入購物車',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('加入購物車失敗:', error);

      //顯示加入購物車失敗的提示
      Swal.fire({
        icon: 'error',
        title: '加入購物車失敗',
        text: '請稍後再試',
        showConfirmButton: true
      });
    }
  }

  //立即購買
  buyNow(): void {
    if (!this.prod) {
      console.error('商品資料不存在');
      return;
    }

    //將商品資料轉換成CartItem類型，並存入購物車
    const cartItem: CartItem = {
      fSOPID: this.prod.fSOPID,
      fSopName: this.prod.fSopName,
      fPrice: this.prod.fPrice,
      fSalePoints: this.prod.fSalePoints,
      fPubSopImagePath: this.prod.fPubSopImagePath,
      fSopDescription: this.prod.fSopDescription,
      quantity: 1
    };

    try {
      // 加入購物車並導航到購物車頁面
      this.cartService.addToCart(cartItem);
      setTimeout(() => {
        this.router.navigate(['/order/cart']);
      }, 100);
    } catch (error) {

      // 錯誤處理
      console.error('加入購物車失敗:', error);
      Swal.fire({
        icon: 'error',
        title: '處理失敗',
        text: '請稍後再試',
        showConfirmButton: true
      });
    }
  }
  //------------------------------------------
  // prod: sopProdDTO[] = []
  //因為回傳資料只有單筆，故不是陣列是單個物件，所以不能像之前那樣宣告陣列，會取不到資料就算打[0]也一樣
  //宣告單個物件，!是代表強制不會null
  //單筆商品資料
  prod: sopProdDTO = null!

  //四筆商品資料
  sopList: sopListDTO[] = [];

  Publisher: Publisher = null!;

  // ngOnInit(): void {
  //   //將路由參數存進sopId，+號是讓string轉型，!是代表強制不會null
  //   const sopId: number = +this.route.snapshot.paramMap.get('sopId')!
  //   console.log(sopId) //ok
  //   // 用sopId呼叫service裡的拿單筆api
  //   this.HomeService.getSopFromApi(sopId).subscribe((data) => {
  //     this.prod = data
  //     console.log(this.prod)
  //     //發布者資訊
  //     this.PublisherService.getApiPublisher(data.fPubId).subscribe((pubData) => {
  //       this.Publisher = pubData
  //     })
  //     //把資料丟給購物車，資料欄位類別參考interface/publisher/workFlowProd裡的sopProdDTO
  //     //this.cartService.addToCart(data);

  //   })
  //   //下面的推薦
  //   this.HomeService.getApiSopList().subscribe((datas) => {
  //     //取四筆出來
  //     this.sopList = datas.slice(4, 8)
  //   })
  // }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const sopId: number = +this.route.snapshot.paramMap.get('sopId')! // 假設這是你要查詢的 sopId

    this.HomeService.getSopFromApi(sopId).pipe(
      switchMap((sopData) => {
        this.prod = sopData; // 處理第一個 API 的數據
        console.log(this.prod);

        // 獲取發布者資訊，這裡使用 sopData.fPubId
        return this.PublisherService.getApiPublisher(sopData.fPubId);
      })
    ).subscribe({
      next: (pubData) => {
        this.Publisher = pubData; // 處理第二個 API 的數據
        console.log(this.Publisher);
      },
      error: (err) => {
        console.error('Error occurred:', err); // 錯誤處理
      }
    });
    //下面的推薦
    this.HomeService.getApiSopList().subscribe((datas) => {
      //取四筆出來
      this.sopList = datas.slice(4, 8)
    })
  }
  // ngOnInit(): void {
  //   // 使用 "+" 將 id 轉換為 number，若無法轉換則設為 NaN
  //   const idParam = this.route.snapshot.paramMap.get('sopId');
  //   const sopId: number = idParam ? +idParam : NaN;

  //   if (!isNaN(sopId)) {
  //     // 若 sopId 是有效數字，則調用 service 方法
  //     this.HomeService.getSopFromApi(sopId).subscribe(
  //       prod => this.prod = prod,
  //       error => console.error("Failed to fetch product:", error)
  //     );
  //   } else {
  //     console.warn("Invalid or missing 'id' parameter in route.");
  //     // 其他處理方式，例如導航至錯誤頁或設置預設值
  //   }
  // }
}
