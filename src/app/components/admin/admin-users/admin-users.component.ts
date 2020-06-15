import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user/user.service";
import {Project} from "../../../models/project/project";
import {ProjectEditComponent} from "../admin-projects/project-edit/project-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {AdminEditUserComponent} from "./admin-edit-user/admin-edit-user.component";
import {Role} from "../../../models/user/role";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  users: User[] = [];
  page = 1;
  perPageCount = 12;
  totalUsersCount: number;
  inputText = '';
  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.users$.subscribe(perf => this.users = perf);
    this.changeUsers();
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          const searchText = this.input.nativeElement.value;
          console.log(searchText);
          this.page = 1;
          this.filterUsers(searchText);
        })
      )
      .subscribe();
  }
  changeUsers() {
    this.users = null;
    this.userService.getAll(this.perPageCount, this.page).subscribe((perf: any) => {
     this.mapUsers(perf);
    });
  }
  changePage(event) {
    this.page = event;
    if (this.inputText !== '') {
      this.filterUsers(this.inputText);
    } else {
      this.changeUsers();
    }
  }

  changeRole(user: User, role: number) {
    if (user.role_id !== role) {
      user.role_id = role;
      user.role = new Role().deserialize(role);
      this.userService.adminUpdate(user).subscribe(perf => {
        user = new User().deserialize(perf);
      });
      console.log(user);
      console.log(this.users);
      this.users = this.users.map(data => {
        if (data.id === user.id) {
          return user;
        }
        return data;
      });
      console.log(this.users);
      this.userService.changeUsers(this.users);
    }
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(AdminEditUserComponent, {
      data: {
        userId: user.id,
      },
      width: '60%'
    });
  }
  filterUsers(searchText) {
    this.userService.filterUsers('name', searchText, this.perPageCount, this.page).subscribe((perf: any) => {
      this.mapUsers(perf);
    });
  }

  removeFilters() {
    this.inputText = '';
    this.changeUsers();
  }
  mapUsers(users: any) {
    this.totalUsersCount = users.total;
    this.userService.changeUsers(users.data.map(data => new User().deserialize(data)));
  }
}
