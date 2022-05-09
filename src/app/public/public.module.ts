import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginModule } from './login/login.module';
import { PublicRoutingModule } from './public.routing.module';
import { SignUpModule } from './sign-up/sign-up.module';



@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    PublicRoutingModule,
    SignUpModule
  ]
})
export class PublicModule { }
