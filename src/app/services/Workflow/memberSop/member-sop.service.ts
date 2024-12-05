import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TMembSopList } from 'src/app/interfaces/Workflow/TMembSopList';
import { TMemberSopDTO } from 'src/app/interfaces/Workflow/TMemberSopDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberSopService {
  private serverAddress = 'https://localhost:7146'; // 設定 API 基本 URL
  private coreViewAddress = 'https://localhost:7151'; // 設定 API 基本 URL

  constructor(private httpClient: HttpClient) {}

  getApiTMemberSopList(memberId: number) {
    // 使用路徑參數傳遞 memberId
    return this.httpClient.get<TMembSopList[]>(
      `${this.serverAddress}/api/TMmbSopsList/${memberId}`
    );
  }

  createSop(memberId: number): Observable<TMemberSopDTO> {
    const url = `${this.serverAddress}/api/TMmbSopCreate/${memberId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<TMemberSopDTO>(url, {}, { headers });
  }

  deleteSop(sopId: number): Observable<any> {
    // 發送 DELETE 請求到指定的 sopId URL
    const url = `${this.coreViewAddress}/api/SopMemberApi/${sopId}`;
    return this.httpClient.delete<any>(url);
  }

}

