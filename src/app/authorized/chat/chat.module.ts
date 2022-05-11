import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomService } from 'src/app/services/chat-room.service';
import { ChatRoomMessageComponent } from './chat-room-message/chat-room-message.component';
import { ChatRoomMessageService } from 'src/app/services/chat-room-message.service';
import { ChatRoomModule } from './chat-room/chat-room.module';



@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoomModule
  ],
  providers:[
    ChatRoomService,
    ChatRoomMessageService
  ]
})
export class ChatModule { }
