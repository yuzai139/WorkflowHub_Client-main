import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from 'src/app/interfaces/Member/IMember';
import { IMemberSetting } from 'src/app/interfaces/Member/IMemberSetting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl = 'https://localhost:7146/api/Settings';

  constructor(private http: HttpClient) {}

  // 取得會員資料
  getMemberById(memberId: number): Observable<IMemberSetting> {
    return this.http.get<IMemberSetting>(`${this.apiUrl}/${memberId}`);
  }
 // 更新會員資料
  updateMember(iMemberSetting: IMemberSetting): Observable<IMemberSetting> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IMemberSetting>(`${this.apiUrl}/${iMemberSetting.fMemberID}`, iMemberSetting, { headers });
  }


}
