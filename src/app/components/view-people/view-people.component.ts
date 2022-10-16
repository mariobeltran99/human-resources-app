import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/personal-information.interface';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-view-people',
	templateUrl: './view-people.component.html',
	styleUrls: ['./view-people.component.scss'],
})
export class ViewPeopleComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
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
			genre: 'M',
			address: 'Soya',
		},
		{
			id: 2,
			dui: 841655227,
			name: 'Mario',
			surname: 'Beltran',
			email: 'carl@gmail.com',
			phone: 67465457,
			birthday: new Date(1999, 6, 6),
			maritalStatus: 'D',
			genre: 'M',
			address: 'Soya',
		},
		{
			id: 3,
			dui: 841655227,
			name: 'Mario',
			surname: 'Beltran',
			email: 'carl@gmail.com',
			phone: 67465457,
			birthday: new Date(1999, 6, 6),
			maritalStatus: 'D',
			genre: 'M',
			address: 'Soya',
		},
	];
	dataSource = new MatTableDataSource<Person>(this.dataPeople);

	constructor(private router: Router, private dialog: MatDialog) {}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	editPerson(id: number) {
		this.router.navigate(['person/edit', id]);
	}

	deletePerson(id: number) {
		const dialogRef = this.dialog.open(DeleteDialogComponent);

		dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
			if (result) {
				this.dataSource.data = this.dataSource.data.filter(
					(item: Person) => item.id !== id
				);
				console.log(this.dataPeople, this.dataSource);
			}
		});
	}
}
