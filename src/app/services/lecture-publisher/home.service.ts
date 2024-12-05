import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sopListDTO } from 'src/app/interfaces/lecture-publisher/home';
import { sopProdDTO } from 'src/app/interfaces/lecture-publisher/workFlowProd';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }
  //取已發布SOPprod
  getApiSopList() {
    return this.httpClient.get<sopListDTO[]>("https://localhost:7151/api/PrjSops");//prj專案
    // return this.httpClient.get<sopListDTO[]>("https://localhost:7146/api/TSops");//api專案
  }

  //取得單一筆SOPprod資訊
  getSopFromApi(id: number) {
    return this.httpClient.get<sopProdDTO>('https://localhost:7151/api/PrjSops/' + id)
    // return this.httpClient.get<sopProdDTO>('https://localhost:7146/api/TSops/' + id)//api專案
  }

  //取得發布者所發布的sop列表
  getPubList(id: number) {
    return this.httpClient.get<sopListDTO[]>('https://localhost:7151/api/PrjSops/GetPubSop/' + id)
  }

  //主頁搜尋
  getSerch(key: string) {
    return this.httpClient.get<sopListDTO[]>('https://localhost:7151/api/PrjSops/serchSop/' + key)
  }



  //變數的資料型別註解。它表示 homeId 可以是 string 或 null。這在 TypeScript 中稱為「聯合型別」，
  //允許這個變數可以存放兩種型別的資料，避免在初始化時沒有指定值或在沒有設定 id 時引發錯誤。
  // private sopId: number | null = null
  private sopId: number = 0

  //從component取得id，將id存進sopId，測試有成功傳進來
  setSopId(id: number) {
    this.sopId = id
    console.log(id)
  }
  //給id
  getSopId(): number {
    return this.sopId;
  }

}

