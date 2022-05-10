import { ChatRoomMessage } from './../../models/chat-room-message';
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class ChatRoomMessageSignalRService {

  private newMessageEmitter = new EventEmitter<ChatRoomMessage>();

  private hubConnection!: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('http://localhost:5000/ChatRoomMessageNotify')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    public addDataListener(){
      this.hubConnection.on('NewChatMessage', (data) => {
        console.log(data);
        this.newMessageEmitter.emit(data);
      });
    }

    public getEvents(){
      return this.newMessageEmitter;
    }
}
