import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TranslocoRootModule } from './transloco-root.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		TranslocoRootModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatTooltipModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
