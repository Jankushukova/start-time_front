import {HttpProgressState} from '../enum/http-progress-state.enum';

export interface IHttpState {
  url: string;
  state: HttpProgressState;
}
