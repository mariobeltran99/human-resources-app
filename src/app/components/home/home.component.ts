import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	language = 'en';
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitazer: DomSanitizer,
		private breakpointObserver: BreakpointObserver,
		private translocoService: TranslocoService
	) {
		iconRegistry.addSvgIcon(
			'spain-flag',
			sanitazer.bypassSecurityTrustResourceUrl('./assets/icons/spain.svg')
		);
		iconRegistry.addSvgIcon(
			'united-kingdom-flag',
			sanitazer.bypassSecurityTrustResourceUrl(
				'./assets/icons/united-kingdom.svg'
			)
		);
	}

	ngOnInit(): void {
		this.translocoService.langChanges$.subscribe((lang: string) => {
			this.language = lang;
		});
	}

	setLanguage(lang: string): void {
		this.translocoService.setActiveLang(lang);
	}
}
