import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LogService } from '../services/Logger/log.service';
import { SnackBarService } from '../services/Snack-Bar/snack-bar.service';
import { HomeService } from 'src/app/features/home/services/home.service';
@Injectable({
  providedIn: 'root'
})
/* jkkjklj */
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private snackbar: SnackBarService, private logger: LogService, private homeService: HomeService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // if (event['status']) {

        // }
      //   console.log('I AM HERE ...!!!', event);
      //   let storageValSuccess = {
      //     Info: this.logger.info(JSON.stringify(event))
      //   };
      // sessionStorage.setItem('Info', JSON.stringify(event));
        return event;
      }),
      catchError((error: any) => {
        const storageVal = {
          // warning: this.logger.warn(error),
          // information: this.logger.info(error),
          id: Math.random(),
          log: this.logger.error(error),
          // fatal: this.logger.fatal(error),
          // logger: this.logger.log(error)
        };

        this.homeService.updateLogs(storageVal);
        // sessionStorage.setItem('Error Logger', JSON.stringify(storageVal));
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
          // this.snackbar.error(errorMessage);
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          // this.snackbar.error(errorMessage);
        }

        return throwError(errorMessage);
      })
    );
  }
}
