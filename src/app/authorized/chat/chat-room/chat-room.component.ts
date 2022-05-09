import { ChatRoom } from './../../../models/chat-room';
import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from 'src/app/services/chat-room.service';
import { ComponentEvent } from 'src/app/models/class/component-event';
import { EmitterTypes } from 'src/app/models/enum/event-emitter-type.enum';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  data$: any;



  constructor(private _chatRoomService: ChatRoomService) { }

  ngOnInit(): void {
    this.data$ = this._chatRoomService.getAll();
  }

  select(chatRoom: ChatRoom){
    chatRoom.selected = true;
    this._chatRoomService.emitEvent(new ComponentEvent(EmitterTypes.Select, chatRoom));
  }

}
