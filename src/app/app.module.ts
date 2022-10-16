import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TranslocoRootModule } from './transloco-root.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {
	MatRadioModule,
	MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {
	MatPaginatorIntl,
	MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//components
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { RegisterPersonFormComponent } from './components/register-person-form/register-person-form.component';
import { ViewPeopleComponent } from './components/view-people/view-people.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
//services
import { CustomPaginatorIntlService } from './services/custom-paginator-intl.service';
import { LoadingService } from './services/loading.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { LoadInterceptor } from './interceptors/loading.interceptor';
import { ApiHumanResourcesService } from './services/api-human-resources.service';

const THEME = [
	MatCardModule,
	MatMenuModule,
	MatIconModule,
	MatButtonModule,
	LayoutModule,
	MatToolbarModule,
	MatSidenavModule,
	MatListModule,
	MatTooltipModule,
	MatProgressBarModule,
	MatDividerModule,
	MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatRadioModule,
	MatSelectModule,
	MatTableModule,
	MatDialogModule,
	MatPaginatorModule,
	MatSnackBarModule,
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		RegisterPersonFormComponent,
		ViewPeopleComponent,
		NotFoundComponent,
		DeleteDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		TranslocoRootModule,
		...THEME,
	],
	providers: [
		LoadingService,
		ApiHumanResourcesService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
		},
		{ provide: HTTP_INTERCEPTORS, useClass: LoadInterceptor, multi: true },
		{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntlService },
		{ provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
		{ provide: MAT_DATE_LOCALE, useValue: 'es-mx' },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
