import { map } from 'rxjs';
import { BaseResponse } from './../../models/base-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ComponentEvent } from 'src/app/models/class/component-event';
import { EventEmitter } from '@angular/core';

export abstract class BaseService<TModel, TId> {
  protected url: string;

  private eventEmitter: EventEmitter<ComponentEvent> = new EventEmitter<ComponentEvent>();

  constructor(protected _http: HttpClient, path: string){
    this.url = environment.apiUrl + path;
  }

  create(model: TModel) : Observable<BaseResponse<TModel>>{
    return this._http.post<BaseResponse<TModel>>(this.url, model);
  }

  delete(id: TId) : Observable<BaseResponse<TModel>>{
    return this._http.delete<BaseResponse<TModel>>(this.url + `/${id}`, id);
  }

  getAll() : Observable<TModel[]>{
    return this._http.get<BaseResponse<TModel[]>>(this.url)
      .pipe(map(r => r.data));
  }

  getById(id: TId) : Observable<BaseResponse<TModel>>{
    return this._http.get<BaseResponse<TModel>>(this.url+ `/${id}`);
  }

  update(model: TModel) : Observable<BaseResponse<TModel>>{
    return this._http.put<BaseResponse<TModel>>(this.url, model);
  }

  emitEvent(componentEvent: ComponentEvent){
    this.eventEmitter.emit(componentEvent);
  }

  getEvents(){
    return this.eventEmitter;
  }

}
