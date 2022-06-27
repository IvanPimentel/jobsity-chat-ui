import { ChatRoomMessage } from './../../models/chat-room-message';
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { ChatRoom } from 'src/app/models/chat-room';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomMessageSignalRService {

  private newMessageEmitter = new EventEmitter<ChatRoomMessage>();

  private hubConnection!: signalR.HubConnection
    public startConnection = (chatRoom: ChatRoom) => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('http://localhost:5000/ChatRoomMessageNotify')
                              .build();
      this.hubConnection
        .start()
        .then(() => {
          this.join(chatRoom);
        })
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    join(chatRoom: ChatRoom){
      this.hubConnection.invoke('Join', chatRoom.id)
        .then();
    }

    closeConection(){
      if(this.hubConnection)
        this.hubConnection.stop()
          .then();
    }

    leave(chatRoom: ChatRoom){
      this.hubConnection.invoke('Leave', chatRoom.id)
        .then();
    }

    public addDataListener(){
      this.hubConnection.on('NewChatMessage', (data) => {
        this.newMessageEmitter.emit(data);
      });
    }



    public getEvents(){
      return this.newMessageEmitter;
    }
}
