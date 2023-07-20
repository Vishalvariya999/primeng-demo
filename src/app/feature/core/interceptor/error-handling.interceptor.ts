import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(
    private toastrService: ToastrService,
    private messageService: MessageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
        return throwError(errorMsg)
      })
    )
  }
}
