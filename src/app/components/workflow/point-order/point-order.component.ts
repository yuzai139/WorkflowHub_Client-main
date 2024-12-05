import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 引入 Angular Router
import { CartItem } from 'src/app/interfaces/Order/cart.interface';
import { TMemberPointDTO } from 'src/app/interfaces/Workflow/TMemberPointDTO';
import { CartService } from 'src/app/services/Order/cart.service';
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import { PointRecordService } from 'src/app/services/Workflow/point-record/point-record.service';
import Swal from 'sweetalert2';  // 引入 SweetAlert2

@Component({
  selector: 'app-point-order',
  templateUrl: './point-order.component.html',
  styleUrls: ['./point-order.component.css']
})
export class PointOrderComponent {
    //這個元件當作購物車中的[點數購買]小元件

  totalPoint:number = 0; //總點數
  cartItems:CartItem[] | null = null; //購物車
  fproductIds:number[] = []; //fsopId 陣列
  // tempSopIds:number[] = [310,321];//用於測試購買商品的sop陣列
  memberId:number | null = null;
  isPointEnough: boolean = false; // 用來檢查點數是否足夠支付
  memberPoint: number | null= null;

  constructor(private pointsService: PointRecordService,
              private cartService: CartService,
              private authGuardService: AuthGuardDemoService,
              private router: Router, // 注入 Router
  ) {}

ngOnInit(){
    this.totalPoint = this.loadCartPoint(); //取得購物車內所有點數加總
    this.getAllSopIdInCart(); //取得所有sopId
    this.memberId = this.authGuardService.getMemberId();
    this.getMemberPoint();
    this.checkPointEnough(); // 檢查點數是否足夠
}

getMemberPoint(): void{
  this.pointsService.getTMemberPoint(Number(this.memberId)).subscribe({
    next: (data) => {
      console.log('成功呼叫 API，獲得會員點數資料:', data);
      this.memberPoint = Number(data.FMemberPoints); // 將資料賦值
    },
    error: (error) => {
      console.error('呼叫會員點數 API 時發生錯誤:', error);
    }
  });
}

  //取得購物車內所有點數加總
  loadCartPoint():number {
    //取得購物車
    this.cartItems = this.cartService.getCartItems();
    console.log("購物車內的商品:",this.cartItems)
    // 累加所有商品的 fPoint 值
    return this.cartItems.reduce((total, item) => total + (item.fSalePoints || 0), 0); // 預設值為 0，防止有商品沒有點數
  }

  //取得所有sopId的方法
  getAllSopIdInCart(){
    //取得購物車
    this.cartItems = this.cartService.getCartItems();
    // 使用 map 方法提取 fproductId
    this.fproductIds = this.cartItems.map(item => item.fSOPID);
    console.log(`購物車內的商品ID:${this.fproductIds}`);
  }


  // 更新點數至發布者帳戶
  private addPointsToPublishers(): void {
    this.pointsService.addPointsBySopIds(this.fproductIds).subscribe({
      next: (response) => console.log('新增點數給發佈者帳戶成功：', response),
      error: (error) => console.error('新增點數給發佈者帳戶失敗：', error),
    });
  }


  // 檢查會員點數是否足夠
  checkPointEnough() {
    if (this.memberId) {
      this.pointsService.getTMemberPoint(this.memberId).subscribe(
        (points: TMemberPointDTO) => {
          this.isPointEnough = (points?.FMemberPoints || 0) >= this.totalPoint;
        }
      );
    } else {
      this.isPointEnough = false;
    }
  }


  // 複製購買的 SOP 到會員的 SOP 列表
  private copyPurchasedSops(): void {
    if (!this.memberId) return;

    this.pointsService.copyPurchasedSops(this.memberId, this.fproductIds).subscribe({
      next: (response) => console.log('SOP 複製成功:', response),
      error: (error) => console.error('SOP 複製失敗:', error),
    });
  }


  // 點數不足時的提示
  private showInsufficientPointsAlert(): void {
    Swal.fire({
      icon: 'warning',
      title: '點數不足',
      text: '您的點數不足以支付此訂單。',
    });
  }


  // 訂單完成時的提示
  private showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: '訂單建立成功！',
      text: '感謝您的購買，返回「我的工作流程」查看購買的商品',
      confirmButtonText: '確定'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/workflow/memberworkflow-index']);
      }
    });
  }


  // 扣除會員點數並更新點數記錄
  reduceMemberPoints(): void {
    if (!this.memberId) return;

    this.pointsService.reducePoints(this.memberId, this.totalPoint).subscribe({
      next: (response) => {
        console.log('點數扣除成功：', response);
        this.addPointsToPublishers();
        this.copyPurchasedSops()
        this.showSuccessAlert();
      },
      error: (error) => {
        console.error('點數扣除失敗：', error);
        this.showInsufficientPointsAlert();
      }
    });
  }



  // opensweetalert(){
  //     // 顯示成功提示視窗
  //     Swal.fire({
  //       icon: 'success',
  //       title: '訂單建立成功！',
  //       text: '感謝您的購買，返回「我的工作流程」查看購買的商品',
  //       confirmButtonText: '確定'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // 可以選擇是否要導向其他頁面
  //         this.router.navigate(['/workflow/memberworkflow-index']);
  //       }
  //     });
  // }
}
