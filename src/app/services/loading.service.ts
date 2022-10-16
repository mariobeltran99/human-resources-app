import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	private _load = new BehaviorSubject<boolean>(false);
	readonly loading$ = this._load.asObservable();

	show() {
		this._load.next(true);
	}

	hide() {
		this._load.next(false);
	}
}
