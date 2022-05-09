import { User } from './../models/user/user';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit {

  user!: User;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.user = this._userService.user;
  }

}
