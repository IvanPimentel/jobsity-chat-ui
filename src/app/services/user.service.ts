import { Router } from '@angular/router';
import { User } from './../models/user/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models/user/create-user';
import { LoginResponse } from '../models/user/login-response';
import { Login } from '../models/user/login';
import { BaseResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl + '/user';
  tokenStorage = 'token';
  user: User = new User();

  constructor(private _http: HttpClient,
              private _router: Router){}

  create(model: CreateUser) : Observable<BaseResponse<any>>{
    return this._http.post<BaseResponse<any>>(this.url, model);
  }

  getCurrentUser() : Observable<BaseResponse<User>>{
    return this._http.get<BaseResponse<User>>(this.url);
  }

  login(model: Login) : Observable<BaseResponse<LoginResponse>>{
    return this._http.post<BaseResponse<LoginResponse>>(`${this.url}/login`, model);
  }

  setToken(token: string){
    sessionStorage.setItem(this.tokenStorage, token);
  }

  setUser(user: User){
    this.user = user;
  }

  getToken(){
    return sessionStorage.getItem(this.tokenStorage);
  }

  logout(){
    sessionStorage.removeItem(this.tokenStorage);
    this.user = new User();
    this._router.navigate(['/']);
  }

  isAuthenticated(){
    return !!this.getToken();
  }
}
