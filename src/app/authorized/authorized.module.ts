import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './authorized.component';
import { AuthorizedRoutingModule } from './authorized.routing.module';
import { ChatModule } from './chat/chat.module';



@NgModule({
  declarations: [
    AuthorizedComponent
  ],
  imports: [
    CommonModule,
    AuthorizedRoutingModule,
    ChatModule
  ]
})
export class AuthorizedModule { }
