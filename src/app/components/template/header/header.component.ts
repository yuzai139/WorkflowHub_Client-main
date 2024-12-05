import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private httpClient: HttpClient, private router: Router) { }

  logout(): void {
    // 清除 token
    // localStorage.removeItem('token');
    localStorage.removeItem("MemberId");
    // 導向到登入頁面
    this.router.navigate(['/login']);
  }


  // 用於檢查使用者是否已登入
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
