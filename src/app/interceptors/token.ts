import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {catchError, map, retry} from "rxjs/operators";
import {UserService} from "../services/user/user.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
  ) {
    this.authService = authService;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.checkAvailability()) {
      request = request.clone({
        setHeaders: {
          Authorization: environment.tokenPrefix + this.authService.getToken()
        }
      });
    }

    // @ts-ignore
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse)=>{
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
         if(error.status===400){
           this.userService.logout();
           this.router.navigateByUrl('/');

         }
          return throwError(errorMessage);
        })
      );
  }
}
