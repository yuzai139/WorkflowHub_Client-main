import { Publisher } from 'src/app/interfaces/lecture-publisher/publisher';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMember } from 'src/app/interfaces/Member/IMember';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  private apiUrl = 'https://localhost:7146/api/Auth';

  saveMemberId(memberId: string) {
    localStorage.setItem("MemberId", memberId);
  }

  // 從 localStorage 取得 memberId，若無則自動跳轉至登入頁面
  getMemberId(): number | null {
    const memberIdStr = localStorage.getItem('MemberId');
    const memberId = memberIdStr ? parseInt(memberIdStr, 10) : null; // 將 memberId 字串轉為數字

    if (!memberId) {
      this.redirectToLogin(); // 若無 memberId，自動跳轉到登入頁面
    }

    return memberId;
  }

  // 確認是否已登入
  isLoggedIn(): boolean {
    return !!localStorage.getItem('MemberId'); // 檢查是否有 memberId
  }

  login(memberLogin: IMember): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, memberLogin)
  }

  savePubId(PubId: string) {
    localStorage.setItem("PublisherId", PubId);
  }
  // 請取用
  getPubId(): string | null {
    return localStorage.getItem("PublisherId");
  }

  // 導向登入頁面
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }


  // 清除 memberId，登出時可使用
  clearMemberId(): void {
    localStorage.removeItem('MemberId');
  }

}
