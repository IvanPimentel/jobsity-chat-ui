import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatRoom } from '../models/chat-room';
import { BaseService } from './base/base.service';

@Injectable()
export class ChatRoomService extends BaseService<ChatRoom, string> {

  constructor(_http: HttpClient){
    super(_http, '/chatRoom');
  }

}
