import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomService } from 'src/app/services/chat-room.service';



@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    ChatRoomService
  ]
})
export class ChatModule { }
