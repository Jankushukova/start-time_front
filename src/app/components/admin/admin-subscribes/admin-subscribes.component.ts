import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "../../../models/user/subscription";
import {SubscriberService} from "../../../services/user/subscriber.service";
import {Project} from "../../../models/project/project";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import {User} from "../../../models/user/user";

@Component({
  selector: 'app-admin-subscribes',
  templateUrl: './admin-subscribes.component.html',
  styleUrls: ['./admin-subscribes.component.css']
})
export class AdminSubscribesComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  subscribers: Subscription[];
  page = 1;
  perPageCount = 12;
  totalSubscribersCount: number;
  inputText = '';
  constructor(
    private subscriberService: SubscriberService
  ) { }

  ngOnInit(): void {
    this.changeSubscribers();
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          const searchText = this.input.nativeElement.value;
          this.page = 1;
          this.filterSubscribers(searchText);
        })
      )
      .subscribe();
  }

  changeActiveStatus(subscriber: Subscription) {
    this.subscriberService.changeActiveStatus(subscriber).subscribe(perf => {
      (subscriber.active === 0) ? subscriber.active = 1 : subscriber.active = 0;

    });
  }
  changeSubscribers() {
    this.subscribers = null;
    this.subscriberService.getSubscribers(this.perPageCount, this.page).subscribe((perf: any) => {
       this.mapSubscribers(perf);
        }
      );
  }
  changePage(event) {
    this.page = event;
    if (this.inputText !== '') {
      this.filterSubscribers(this.inputText);
    } else {
      this.changeSubscribers();
    }
  }

  removeFilters() {
    this.inputText = '';
    this.changeSubscribers();
  }
  mapSubscribers(perf: any) {
    this.totalSubscribersCount = perf.total;
    this.subscribers = perf.data.map(data => new Subscription().deserialize(data));
  }
  filterSubscribers(searchText) {
    this.subscriberService.filterSubscribers('name', searchText, this.perPageCount, this.page).subscribe((perf: any) => {
      this.mapSubscribers(perf);
    });
  }
}
