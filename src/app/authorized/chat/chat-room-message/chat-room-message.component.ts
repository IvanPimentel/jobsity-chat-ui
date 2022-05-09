import { ChatRoomMessage } from './../../../models/chat-room-message';
import { ChatRoom } from './../../../models/chat-room';
import { pipe, Subject, takeUntil } from 'rxjs';
import { ChatRoomService } from './../../../services/chat-room.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatRoomMessageService } from 'src/app/services/chat-room-message.service';

@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.scss']
})
export class ChatRoomMessageComponent implements OnInit, OnDestroy {

  unsub$ = new Subject();
  chatRoom!: ChatRoom;
  chatMessages: ChatRoomMessage[] = [];

  constructor(private _chatRoomService: ChatRoomService,
              private _chatRoomMessageService: ChatRoomMessageService) { }


  ngOnInit(): void {
    this._chatRoomService.getEvents()
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => {
        this.chatRoom = r.data;
        this.getMessages(this.chatRoom.id);
      });
  }

  getMessages(chatRoomId: string){
    this._chatRoomMessageService.getByChatRoomId(chatRoomId)
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => {
        this.chatMessages = r.data;
      })
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }

}
