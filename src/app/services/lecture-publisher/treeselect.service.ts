import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sopListDTO } from 'src/app/interfaces/lecture-publisher/home';
import { job, jobClass, jobItem } from 'src/app/interfaces/lecture-publisher/treeSelect';

@Injectable({
  providedIn: 'root'
})
export class TreeselectService {

  constructor(private HttpClient: HttpClient) { }

  getFirstLevelData() {
    return this.HttpClient.get<jobClass[]>("https://localhost:7146/api/TSopJobClasses")
  }

  getSecondLevelData(id: number) {
    return this.HttpClient.get<job[]>("https://localhost:7146/api/TSopJobs/" + id)
  }

  getThirdLevelData(id: number) {
    return this.HttpClient.get<jobItem[]>("https://localhost:7146/api/TSopJobItems/" + id)
  }

  getJobItemSop(id: number) {
    return this.HttpClient.get<sopListDTO[]>('https://localhost:7151/api/PrjSops/filterSop/' + id)
  }
}
