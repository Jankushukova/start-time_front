import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SimpleAuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {catchError, finalize, retry} from 'rxjs/operators';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';
import {HttpStateService} from '../services/HttpStateService.service';
import {HttpProgressState} from '../enum/http-progress-state.enum';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private authService: SimpleAuthService,
              private userService: UserService,
              private router: Router,
              private translator: TranslateService,
              private httpStateService: HttpStateService,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.checkAvailability()) {
      request = request.clone({
        setHeaders: {
          Authorization: environment.tokenPrefix + this.authService.getToken(),
        }
      });
    }
    this.httpStateService.state.next({
      url: request.url,
      state: HttpProgressState.start
    });
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if ( error.status === 401 ) {
            this.translator.get('login_error').subscribe(perf => {
              this.openSnackBar(perf, 'Close', 'style-error');
            });

            this.userService.logout();
          }
          return throwError(error);
        }),
      finalize(() => {
          this.httpStateService.state.next({
            url: request.url,
            state: HttpProgressState.end
          });
    }));
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }

}
