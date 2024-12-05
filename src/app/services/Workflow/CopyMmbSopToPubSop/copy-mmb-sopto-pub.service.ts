import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TMmbSopCopyListDTO } from 'src/app/interfaces/Workflow/TMmbSopCopyListDTO';

@Injectable({
  providedIn: 'root'
})
export class CopyMmbSoptoPubService {

  private apiUrl = 'https://localhost:7146/api/TPubSopList'; // API 基本 URL
  private viewApiUrl = 'https://localhost:7151';

  constructor(private http: HttpClient) {}

  // 根據 memberId 呼叫 API 獲取 SOP 清單
  getSopsByMemberId(memberId: number): Observable<TMmbSopCopyListDTO[]> {
    const url = `${this.apiUrl}/MmbCopyList/${memberId}`;
    return this.http.get<TMmbSopCopyListDTO[]>(url);
  }

  copySop(sopId: number, publisherId: number): Observable<any> {
    const url = `${this.viewApiUrl}/api/SopPublisherApi/${sopId}/${publisherId}`;
    return this.http.post<any>(url, null); // POST 請求不需 body 所以傳入 null
  }
}
