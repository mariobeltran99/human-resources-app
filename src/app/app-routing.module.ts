import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterPersonFormComponent } from './components/register-person-form/register-person-form.component';
import { ViewPeopleComponent } from './components/view-people/view-people.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'register-person',
		pathMatch: 'full',
	},
	{
		path: 'register-person',
		component: RegisterPersonFormComponent,
	},
	{
		path: 'person/edit/:id',
		component: RegisterPersonFormComponent,
	},
	{
		path: 'view-people',
		component: ViewPeopleComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
