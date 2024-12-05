import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TMemberPointDTO } from 'src/app/interfaces/Workflow/TMemberPointDTO';
import { TPointRecordDTO } from 'src/app/interfaces/Workflow/TPointRecordDTO';

@Injectable({
  providedIn: 'root'
})
export class PointRecordService {

  private serverAddress = 'https://localhost:7146'; // 設定 API 基本 URL
  private coreViewAddress = 'https://localhost:7151'; // 設定 API 基本 URL

  constructor(private httpClient: HttpClient) {}

  //==== 以下是Point方法 ====
  getTMemberPoint(memberId: number) {
    return this.httpClient.get<TMemberPointDTO>(
      `${this.serverAddress}/api/TMemberPoint/${memberId}`
    );
  }


  // 扣除點數的方法
  reducePoints(memberId: number, reducePoint: number): Observable<any> {
    return this.httpClient.put(`${this.serverAddress}/api/TMemberPoint/reduce/${memberId}/${reducePoint}`, {});
  }


  // 傳送 SOP ID 陣列來批次更新點數
  addPointsBySopIds(sopIds: number[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .post(`${this.serverAddress}/api/TMemberPoint/AddPointsBySopIds`, sopIds, { headers });
  }


  //=== 以下是PointRecord 方法===
  getTPointRecordList(memberId: number) {
    return this.httpClient.get<TPointRecordDTO[]>(
      `${this.serverAddress}/api/TPointRecords/${memberId}`
    );
  }

  deletePointRecord(pointRecordId: number): Observable<any> {
    // 發送 DELETE 請求到指定的 sopId URL(跟memberSop刪除共用同個方法)
    const url = `${this.serverAddress}/api/TPointRecords/${pointRecordId}`;
    return this.httpClient.delete<any>(url);
  }

  // ========新增方法：複製購買的 SOP 到會員的 SOP 列表中============
  copyPurchasedSops(memberId: number, sopIds: number[]): Observable<any> {
    return this.httpClient.post(`${this.coreViewAddress}/api/SopPublisherApi/CopyPurchasedSops/${memberId}`, sopIds);
  }

}
