import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from 'src/app/services/chat-room.service';

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

}
