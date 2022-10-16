/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpEvent,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadInterceptor implements HttpInterceptor {
	constructor(private loader: LoadingService) {}

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		this.loader.show();
		return next.handle(req).pipe(
			finalize(() => {
				this.loader.hide();
			})
		);
	}
}
