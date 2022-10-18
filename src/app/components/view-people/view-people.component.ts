import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Person } from 'src/app/interfaces/personal-information.interface';
import { ApiHumanResourcesService } from 'src/app/services/api-human-resources.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-view-people',
	templateUrl: './view-people.component.html',
	styleUrls: ['./view-people.component.scss'],
})
export class ViewPeopleComponent implements OnInit {
	displayedColumns: string[] = [
		'dui',
		'name',
		'surname',
		'email',
		'phone',
		'birthday',
		'maritalStatus',
		'genre',
		'address',
		'action',
	];
	dataPeople: Person[] = [
		{
			id: 1,
			dui: 841655227,
			name: 'Mario',
			surname: 'Beltran',
			email: 'carl@gmail.com',
			phone: 67465457,
			birthday: new Date(1999, 6, 6),
			maritalStatus: 'D',
			gender: 'M',
			address: 'Soya',
		},
	];
	dataSource!: MatTableDataSource<Person>;

	constructor(
		private router: Router,
		private dialog: MatDialog,
		private apiService: ApiHumanResourcesService,
		private snackBar: MatSnackBar,
		private serviceTransloco: TranslocoService
	) {}

	ngOnInit(): void {
		this.apiService.getPeople().subscribe({
			next: response => {
				this.dataPeople = response;
				this.dataSource = new MatTableDataSource<Person>(response);
			},
			error: () => {
				this.dataPeople = [];
				this.dataSource = new MatTableDataSource<Person>([]);
			},
		});
	}

	editPerson(id: number) {
		this.router.navigate(['person/edit', id]);
	}

	deletePerson(id: number) {
		const dialogRef = this.dialog.open(DeleteDialogComponent);
		dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
			if (result) {
				this.apiService.deletePerson(id).subscribe(() => {
					this.dataSource.data = this.dataSource.data.filter(
						(item: Person) => item.id !== id
					);
				});
				this.snackBar.open(
					this.serviceTransloco.translate<string>('successDelete'),
					undefined,
					{
						verticalPosition: 'top',
						horizontalPosition: 'center',
						duration: 5000,
					}
				);
			}
		});
	}
}
