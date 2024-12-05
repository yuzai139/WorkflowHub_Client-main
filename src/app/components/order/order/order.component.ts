import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../../services/Order/order.service'; //ai 訂單服務
import { OrderDTO } from '../../../interfaces/Order/order.interface'; //ai 訂單介面
import { Router } from '@angular/router';
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import { OrderDetailService } from 'src/app/services/Order/orderdetail.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: OrderDTO[] = [];
  filteredOrders: OrderDTO[] = [];
  selectedOrder: OrderDTO | null = null;
  loading = false;
  error: string | null = null;
  memberId: number | null = null;
  // 用於儲存購買的 SOPID
  fSOPID: number[] = [];

  constructor(
    private orderService: OrderService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthGuardDemoService,
    private orderDetailService: OrderDetailService
  ) { }

  ngOnInit(): void {
    this.memberId = this.authService.getMemberId();
    if (this.memberId) {
      this.loadMemberOrders(this.memberId);
    } else {
      this.error = '請先登入';
    }
  }





  loadMemberOrders(memberId: number): void {
    this.loading = true;
    this.orderService.getOrders()
      .subscribe({
        next: (data) => {
          this.orders = data.filter(order => order.fMemberId === memberId);
          console.log('會員訂單:', this.orders);
          this.filteredOrders = [...this.orders];
          this.loading = false;
        },
        error: (error) => {
          this.error = '載入訂單失敗';
          this.loading = false;
          console.error('Error loading orders:', error);
        }
      });
  }

  viewOrderDetail(order: OrderDTO): void {
    if (order.fMemberId === this.memberId) {
      this.selectedOrder = order;
    } else {
      this.error = '無權限查看此訂單';
    }
  }

  searchOrder(orderId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.error = null;

    if (!orderId.trim()) {
      this.filteredOrders = [...this.orders];
      return;
    }

    if (!this.memberId) {
      this.error = '請先登入';
      return;
    }

    try {
      const cleanOrderId = orderId.replace('#', '').trim();

      this.filteredOrders = this.orders.filter(order =>
        order.fOrderId.toString().includes(cleanOrderId)
      );

      if (this.filteredOrders.length === 0) {
        this.error = '找不到符合的訂單';
      }
    } catch (error) {
      console.error('搜尋錯誤:', error);
      this.error = '搜尋時發生錯誤';
    }
  }

}
