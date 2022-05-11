import { EmitterTypes } from "../enum/event-emitter-type.enum";

export class ComponentEvent{
  type: EmitterTypes;
  data: any;

  constructor(type: EmitterTypes, data: any){
    this.data = data;
    this.type = type;
  }
}
