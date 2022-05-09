import { ChatComponent } from './chat/chat.component';
import { AuthorizedComponent } from './authorized.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../resolvers/auth-guard';

const routes: Routes = [
  {
    path:'',
    component: AuthorizedComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: ChatComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizedRoutingModule {}
