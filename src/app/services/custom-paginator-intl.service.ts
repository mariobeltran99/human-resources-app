import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomPaginatorIntlService implements MatPaginatorIntl {
	changes = new Subject<void>();

	constructor(private translocoService: TranslocoService) {}

	firstPageLabel = this.translocoService.translate(
		'paginator.firstPageLabel'
	);
	itemsPerPageLabel = this.translocoService.translate(
		'paginator.itemsPerPageLabel'
	);
	lastPageLabel = this.translocoService.translate('paginator.lastPageLabel');
	nextPageLabel = this.translocoService.translate('paginator.nextPageLabel');
	previousPageLabel = this.translocoService.translate(
		'paginator.previousPageLabel'
	);

	getRangeLabel(page: number, pageSize: number, length: number): string {
		if (length === 0) {
			return this.translocoService.translate('paginator.noRange');
		}
		const amountPages = Math.ceil(length / pageSize);
		return this.translocoService.translate('paginator.range', {
			page: page + 1,
			amountPages,
		});
	}
}
