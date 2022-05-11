import { BaseResponse } from './../models/base-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatRoomMessage } from '../models/chat-room-message';
import { BaseService } from './base/base.service';

@Injectable()
export class ChatRoomMessageService extends BaseService<ChatRoomMessage, string> {
  constructor(_http: HttpClient){
    super(_http, '/ChatRoomMessage');
  }

  getByChatRoomId(chatRoomId: string){
    return this._http.get<BaseResponse<ChatRoomMessage[]>>(`${this.url}/GetByChatRoomId/${chatRoomId}`);
  }
}
