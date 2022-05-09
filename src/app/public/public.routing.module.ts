import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginGuard } from '../resolvers/login-guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [LoginGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
