import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TMembSopListDTO } from 'src/app/interfaces/Workflow/TPublisherSopListDTO';

@Injectable({
  providedIn: 'root'
})
export class PublisherSopService {

  private serverAddress = 'https://localhost:7146'; // 設定 API 基本 URL
  private coreViewAddress = 'https://localhost:7151'; // 設定 API 基本 URL

  constructor(private httpClient: HttpClient) {}

  //舊版只用publisherId查
  // getTPublisherSopList(publisherId: number) {
  //   return this.httpClient.get<TMembSopListDTO[]>(
  //     `${this.serverAddress}/api/TPubSopList/${publisherId}`
  //   );
  // }


  // 根據 publisherId 和 keyword 查詢 SOP
  // publisher-sop.service.ts
  getPublisherSops(publisherId: number, keyword: string = ''): Observable<any[]> {
  let params = new HttpParams().set('keyword', keyword); // 始終設置 keyword
  return this.httpClient.get<any[]>(`${this.serverAddress}/api/TPubSopList/${publisherId}`, { params });
}



  deleteSop(sopId: number): Observable<any> {
    // 發送 DELETE 請求到指定的 sopId URL(跟memberSop刪除共用同個方法)
    const url = `${this.coreViewAddress}/api/SopMemberApi/${sopId}`;
    return this.httpClient.delete<any>(url);
  }


}
