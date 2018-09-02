import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  statusCode = {
    400: 'badRequest',
    401: 'unauthorized',
    404: 'notFound',
    500: 'internalServer'
  };

  errorMessages = {
    400: 'The inputs you provided resulted in a bad request. Please try again with valid data.',
    401: 'You are not authorized to view the requested URL. Please login first and try again.',
    404: `The resource that you requested does not exist on the server.
          You might have provided incorrect data. Please try again or contact technical support for help.`,
    500: 'There seems to be a problem processing your request. Please try again.'
  };

  constructor(private notifier: NotifierService,
    private router: Router) { }

  handleError(err) {
    const code: number = err.status || 500;
    this.notifier.addMessage('error', 'Error', this.errorMessages[code]);
    switch (code) {
      case 401:
        this.router.navigateByUrl(`/unauthorized`,
          { skipLocationChange: false });
        break;
      case 404:
        this.router.navigateByUrl(`/`,
          { skipLocationChange: false });
        break;
      default:
    }
  }
}

