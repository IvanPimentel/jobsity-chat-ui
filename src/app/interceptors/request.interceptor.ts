import { UserService } from './../services/user.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor{

  constructor(private _userService: UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this._userService.getToken();

        if (authToken)
            req = req.clone({
                setHeaders: {
                Authorization: 'Bearer ' + authToken
                }
            });
        return next.handle(req);
  }

}
