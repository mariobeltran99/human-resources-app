import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
	protected destroy$: Subject<boolean> = new Subject<boolean>();
	loader$: Observable<boolean>;
	language = 'en';
	currentYear: number = new Date().getFullYear();
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	state: boolean = false;
	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitazer: DomSanitizer,
		private breakpointObserver: BreakpointObserver,
		private translocoService: TranslocoService,
		private loader: LoadingService,
		private cd: ChangeDetectorRef
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
		this.loader$
			.pipe(takeUntil(this.destroy$))
			.subscribe((status: boolean) => {
				this.state = status;
				this.cd.detectChanges();
			});
		this.translocoService.langChanges$
			.pipe(takeUntil(this.destroy$))
			.subscribe((lang: string) => {
				this.language = lang;
			});
	}

	ngAfterViewInit(): void {
		this.state = false;
		this.cd.detectChanges();
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	setLanguage(lang: string): void {
		this.translocoService.setActiveLang(lang);
	}
}
