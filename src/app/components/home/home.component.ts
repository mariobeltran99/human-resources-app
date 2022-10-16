import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	language = 'en';
	currentYear: number = new Date().getFullYear();
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	loader$: Observable<boolean>;
	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitazer: DomSanitizer,
		private breakpointObserver: BreakpointObserver,
		private translocoService: TranslocoService,
		private loader: LoadingService
	) {
		this.loader$ = loader.loading$;
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
