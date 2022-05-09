import { BaseModel } from "./base/base.model";
import { ChatRoom } from "./chat-room";

export class ChatRoomMessage extends BaseModel {
  content!: string;
  userId!: string;
  chatRoomId!: string;
  chatRoom!: ChatRoom;
}
