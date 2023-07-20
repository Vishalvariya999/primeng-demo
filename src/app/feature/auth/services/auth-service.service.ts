import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iforget, IloginResponse, PostLogin, ResponseUser, Users } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = environment.baseUrl + `users/`;

  constructor(private http: HttpClient) { }

  postUserdata(data: Users): Observable<ResponseUser> {
    return this.http.post<ResponseUser>(this.url + 'SignUp', data)
  }

  logInPost(data: PostLogin): Observable<IloginResponse> {
    return this.http.post<IloginResponse>(this.url + 'Login', data)
  }

  postForgetPass(data: Iforget): Observable<Iforget> {
    return this.http.post<Iforget>(this.url + 'ForgotPassword', data)
  }
}
