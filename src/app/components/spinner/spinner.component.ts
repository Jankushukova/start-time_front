import {Component, Input, OnInit} from '@angular/core';
import {HttpStateService} from '../../services/HttpStateService.service';
import {HttpProgressState} from '../../enum/http-progress-state.enum';
import {IHttpState} from "../../interface/ihttp-state";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  public loading = false;
  @Input() public filterBy: string | null = null;
  constructor(private httpStateService: HttpStateService) { }

  /**
   * receives all HTTP requests and filters them by the filterBy
   * values provided
   */
  ngOnInit() {
    this.httpStateService.state.subscribe((progress: IHttpState) => {
      if (progress && progress.url) {
        if (!this.filterBy) {
          this.loading = (progress.state === HttpProgressState.start);
        } else if (progress.url.indexOf(this.filterBy) !== -1) {
          this.loading = (progress.state === HttpProgressState.start);
        }
      }
    });
  }
}
