/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpEvent,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private snackBar: MatSnackBar) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next
			.handle(req)
			.pipe(catchError(error => this.errorHandler(error)));
	}

	private errorHandler(error: HttpErrorResponse): Observable<never> {
		let errorMessageConsole = '';
		let errorMessageToast = '';
		if (error instanceof HttpErrorResponse) {
			if (error.error instanceof ErrorEvent) {
				errorMessageToast = error.message;
			} else {
				switch (error.status) {
					case 400:
						errorMessageToast =
							'Bad Request: The server could not interpret the request given invalid syntax';
						break;
					case 403:
						errorMessageToast =
							'The client does not have the necessary permissions for certain content';
						break;
					case 404:
						errorMessageToast =
							'The server could not find the requested content';
						break;
				}
			}
			errorMessageConsole = `Client Error -> Code: ${error.status} - ${error.message}`;
		} else {
			errorMessageConsole = `Server Error ${
				(error as HttpErrorResponse).status
			}`;
			errorMessageToast = 'Server Error';
		}
		this.snackBar.open(errorMessageToast, `Error ${error.status}`, {
			verticalPosition: 'top',
			horizontalPosition: 'center',
			duration: 5000,
		});
		return throwError(() => errorMessageConsole);
	}
}
