import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMember } from 'src/app/interfaces/Member/IMember';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private apiUrl = 'https://localhost:7146/api/Signin'; // 設定你的 API URL

  constructor(private http: HttpClient) { }

  register(member: IMember): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, member);
  }
}
