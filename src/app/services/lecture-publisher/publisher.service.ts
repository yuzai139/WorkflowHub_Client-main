import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forCreatePublisher, Publisher } from 'src/app/interfaces/lecture-publisher/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  //新增一個behaviorSubject的物件為publisher的資料
  sliderbarList = new BehaviorSubject<Publisher[]>([]);

  constructor(private httpClient: HttpClient) { }

  //預計取得slidebar下拉選單的發布者列表，需要會員Id選出該會員的發布者，get<>為回傳型別，dataType定義在Interface
  getApiPublisherList(id: number): Observable<Publisher[]> {
    return this.httpClient.get<Publisher[]>("https://localhost:7146/api/TPublishers/" + id);
  }
  //將新增後的發布者列表，get來的資料傳給上面behaviorSubject，使其知道有變動
  createDataReturnSlidebar(id: number) {
    this.httpClient.get<Publisher[]>("https://localhost:7146/api/TPublishers/" + id)
      .subscribe({
        next: (data) => {
          this.sliderbarList.next(data)
        }
      })
  }

  //取得右邊profile頁的發布者資訊
  getApiPublisher(id: number) {
    return this.httpClient.get<Publisher>("https://localhost:7146/api/TPublishers/GetTPublisher/" + id);
  }
  //新增pub資料
  createPubDataByPost(formData: FormData) {
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.httpClient.post<forCreatePublisher>("https://localhost:7146/api/TPublishers", formData)
  }
  //修改pub資料
  editPubDataByPut(Publisher: FormData, id: number) {

    return this.httpClient.put<Publisher>("https://localhost:7146/api/TPublishers/" + id, Publisher);
  }
  // postApiPublisher(id: number) {

  //   const headers = { 'Content-Type': 'application/json' }

  //   return this.httpClient.post<Publisher>("https://localhost:7146/api/TPublishers", { Id: id, Name: 'Derek' }, { headers });
  // }

  //從slideBar存pubId
  savePubIdFromSlideBar(PubId: string) {
    localStorage.setItem("PublisherId", PubId);
  }

  getPubIdFormService(): string | null {
    return localStorage.getItem("PublisherId");
  }

  //rxjs 跨component傳值，預設啟動pubId = 1
  pubIdSubject = new BehaviorSubject(0);

}
