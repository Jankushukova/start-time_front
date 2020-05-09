import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ProjectService} from "../../../../services/project/project.service";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../models/user/user";

@Component({
  selector: 'app-auth-user-profile',
  templateUrl: './auth-user-profile.component.html',
  styleUrls: ['./auth-user-profile.component.css']
})
export class AuthUserProfileComponent implements OnInit {
  user:User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
         this.userService.findById(parseInt(route.snapshot.paramMap.get('id'))).subscribe(perf =>{
            this.user = perf;
            console.log(this.user);
         });
      }
    })
  }

  ngOnInit(): void {
  }

  onActivate(componentReference){
    componentReference.someFunction(this.user);
  }

}
