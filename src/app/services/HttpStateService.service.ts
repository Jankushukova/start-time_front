import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IHttpState} from "../interface/ihttp-state";

@Injectable({
  providedIn: 'root'
})
export class HttpStateService {
  public state = new BehaviorSubject<IHttpState>({} as IHttpState);

  constructor() { }
}