import { FormsModule } from '@angular/forms';
import { ChatRoomComponent } from './chat-room.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomFormComponent } from './chat-room-form/chat-room-form.component';



@NgModule({
  declarations: [
    ChatRoomComponent,
    ChatRoomFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ChatRoomComponent
  ]
})
export class ChatRoomModule { }
