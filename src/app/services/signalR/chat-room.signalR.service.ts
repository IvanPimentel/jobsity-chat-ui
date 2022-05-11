import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { ChatRoom } from 'src/app/models/chat-room';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomSignalRService {

  private newChatRoomEmitter = new EventEmitter<ChatRoom>();

  private hubConnection!: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('http://localhost:5000/ChatRoomNotify')
                              .build();
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started');
        })
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    closeConection(){
      if(this.hubConnection)
        this.hubConnection.stop()
          .then(r => console.log(r));
    }

    public addDataListener(){
      this.hubConnection.on('NewChatRoom', (data) => {
        console.log(data);
        this.newChatRoomEmitter.emit(data);
      });
    }

    public getEvents(){
      return this.newChatRoomEmitter;
    }
}
