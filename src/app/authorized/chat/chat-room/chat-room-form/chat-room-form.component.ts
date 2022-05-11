import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ChatRoom } from './../../../../models/chat-room';
import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from 'src/app/services/chat-room.service';
declare var $ : any;

@Component({
  selector: 'app-chat-room-form',
  templateUrl: './chat-room-form.component.html',
  styleUrls: ['./chat-room-form.component.scss']
})
export class ChatRoomFormComponent implements OnInit {

  chatRoom: ChatRoom = new ChatRoom();
  unsub$ = new Subject();

  constructor(private _chatRoomService: ChatRoomService,
              private _toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  send(){
    this._chatRoomService.create(this.chatRoom)
      .pipe(takeUntil(this.unsub$))
      .subscribe(r => {
        if(r.success){
          this._toastrService.success('Chat Room created with success');
          this.chatRoom = new ChatRoom();
          this.closeModal();
        }else{
          this._toastrService.error(r.message);
        }
      })

  }


  private closeModal() {
    $('#closeModal').click();
  }
}
