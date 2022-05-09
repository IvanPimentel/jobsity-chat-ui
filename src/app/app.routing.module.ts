import { AuthorizedModule } from './authorized/authorized.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './resolvers/auth-guard';
import { LoginGuard } from './resolvers/login-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
