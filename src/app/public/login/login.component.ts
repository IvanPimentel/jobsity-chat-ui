import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/user/login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: Login = new Login();

  constructor(private _userService: UserService,
              private _toastrService: ToastrService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  send(){
    this._userService.login(this.loginModel)
      .subscribe(r => {
        if(r.success){
          this._userService.setToken(r.data.token);
          this._router.navigate(['/home']);
        }else{
          this._toastrService.error(r.message);
        }
      });
  }

}
