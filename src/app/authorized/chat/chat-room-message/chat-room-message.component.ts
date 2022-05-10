import { UserService } from './../../../services/user.service';
import { ChatRoomMessage } from './../../../models/chat-room-message';
import { ChatRoom } from './../../../models/chat-room';
import { pipe, Subject, takeUntil } from 'rxjs';
import { ChatRoomService } from './../../../services/chat-room.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatRoomMessageService } from 'src/app/services/chat-room-message.service';
import { ChatRoomMessageSignalRService } from 'src/app/services/signalR/chat-room-message.signalR.service';

@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.scss']
})
export class ChatRoomMessageComponent implements OnInit, OnDestroy {

  unsub$ = new Subject();
  chatRoom!: ChatRoom;
  chatMessages: ChatRoomMessage[] = [];
  newMessage = new ChatRoomMessage();

  constructor(private _chatRoomService: ChatRoomService,
              private _chatRoomMessageService: ChatRoomMessageService,
              private _signalRService: ChatRoomMessageSignalRService,
              private _userService: UserService) { }


  ngOnInit(): void {
    this.getEvents();

  }

  private getEvents() {
    this._chatRoomService.getEvents()
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => {
        this.chatRoom = r.data;
        this.getMessages(this.chatRoom.id);
        this._signalRService.getEvents()
          .pipe(takeUntil(this.unsub$))
          .subscribe(e => this.chatMessages.push(e));
        this._signalRService.startConnection();
        this._signalRService.addDataListener();
      });
  }

  addMessage(data: ChatRoomMessage){
    console.log(this.chatMessages);
    this.chatMessages.push(data);
    console.log(this.chatMessages);
  }

  getMessages(chatRoomId: string){
    this._chatRoomMessageService.getByChatRoomId(chatRoomId)
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => {
        this.chatMessages = r.data;
      })
  }

  send(){
    this.newMessage.chatRoomId = this.chatRoom.id;
    this._chatRoomMessageService.create(this.newMessage)
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => {
        console.log(r);
        this.newMessage = new ChatRoomMessage();
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }

}
