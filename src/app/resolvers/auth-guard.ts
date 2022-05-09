import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService){}


  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      return this._userService.getCurrentUser().pipe(
          map((result) => {
              if(!result.success)
                  this._userService.logout();
              else{
                this._userService.setUser(result.data);
              }
              return result.success;
          })
      ).pipe(catchError(error => {
        this._userService.logout();
        return of(false);
      }));
  }
}
