import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { CreateUser } from './../../models/user/create-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  model: CreateUser = new CreateUser();
  unsub$ = new Subject();

  constructor(private _userService: UserService,
              private _toastrService: ToastrService,
              private _router: Router) { }


  ngOnInit(): void {
  }

  send(){
    if(this.model.password != this.model.passwordConfimation){
      this._toastrService.error("Password and Password Confirmation doesn't match");
      return;
    }
    this._userService.create(this.model)
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => {
        if(r.success){
          this._toastrService.success(r.message);
          this._router.navigate(['/']);
        }else
          this._toastrService.error(r.message);
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }

}
