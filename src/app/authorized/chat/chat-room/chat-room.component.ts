import { ChatRoom } from './../../../models/chat-room';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatRoomService } from 'src/app/services/chat-room.service';
import { ComponentEvent } from 'src/app/models/class/component-event';
import { EmitterTypes } from 'src/app/models/enum/event-emitter-type.enum';
import { ChatRoomSignalRService } from 'src/app/services/signalR/chat-room.signalR.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  data: ChatRoom[] = [];
  unsub$ = new Subject();


  constructor(private _chatRoomService: ChatRoomService,
              private _signalRService: ChatRoomSignalRService) { }


  ngOnInit(): void {
    this.getAll();
    this._signalRService.getEvents()
          .pipe(takeUntil(this.unsub$))
          .subscribe(e => this.data.push(e));
    this._signalRService.startConnection();
    this._signalRService.addDataListener();
  }

  private getAll() {
    this._chatRoomService.getAll()
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => this.data = r);
  }

  select(chatRoom: ChatRoom){
    chatRoom.selected = true;
    this._chatRoomService.emitEvent(new ComponentEvent(EmitterTypes.Select, chatRoom));
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }

}
