import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';
import {
	DATA_MARITAL_STATUS,
	MaritalStatus,
	PersonForm,
	SelectionMaritalStatus,
} from 'src/app/interfaces/person-form.interface';
import { PersonalInformation } from 'src/app/interfaces/personal-information.interface';
import { ApiHumanResourcesService } from 'src/app/services/api-human-resources.service';
import {
	PATTERN_DUI,
	PATTERN_NAME,
	PATTERN_PHONE,
} from 'src/app/utils/patternts.utils';

@Component({
	selector: 'app-register-person-form',
	templateUrl: './register-person-form.component.html',
	styleUrls: ['./register-person-form.component.scss'],
})
export class RegisterPersonFormComponent implements OnInit {
	personForm: FormGroup;
	selectedStatusMarital: MaritalStatus = 'S';
	maritalStatusData: SelectionMaritalStatus[] = DATA_MARITAL_STATUS;
	maxDate: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
	minDate: Date = new Date(1900, 1, 1);
	editMode: boolean = false;
	id: number = 0;
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private apiService: ApiHumanResourcesService,
		private snackBar: MatSnackBar,
		private serviceTransloco: TranslocoService
	) {
		this.personForm = new FormGroup<PersonForm>({
			dui: new FormControl(null, {
				nonNullable: false,
				validators: [
					Validators.required,
					Validators.maxLength(9),
					Validators.pattern(PATTERN_DUI),
				],
			}),
			name: new FormControl('', {
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
					Validators.pattern(PATTERN_NAME),
				],
			}),
			surname: new FormControl('', {
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
					Validators.pattern(PATTERN_NAME),
				],
			}),
			email: new FormControl('', {
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.maxLength(100),
					Validators.email,
				],
			}),
			phone: new FormControl(null, {
				nonNullable: false,
				validators: [
					Validators.required,
					Validators.maxLength(8),
					Validators.pattern(PATTERN_PHONE),
				],
			}),
			birthday: new FormControl(this.maxDate, {
				nonNullable: true,
				validators: Validators.required,
			}),
			maritalStatus: new FormControl('S', {
				nonNullable: true,
				validators: Validators.required,
			}),
			gender: new FormControl('M', {
				nonNullable: true,
				validators: Validators.required,
			}),
			address: new FormControl('', {
				nonNullable: false,
				validators: Validators.maxLength(300),
			}),
		});
	}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			const id: number = +params['id'];
			if (!isNaN(id)) {
				this.editMode = true;
				this.id = id;
				this.loadPerson(id);
			}
		});
	}

	loadPerson(id: number): void {
		this.apiService.getPerson(id).subscribe({
			next: response => {
				if (response) {
					this.personForm.patchValue({
						...response,
					});
					this.personForm.get('dui')?.disable();
				}
			},
			error: () => this.router.navigate(['/view-people']),
		});
	}

	save(): void {
		if (this.personForm.valid) {
			if (this.editMode) {
				this.apiService
					.updatePerson(
						this.id,
						this.personForm.value as PersonalInformation
					)
					.subscribe(() => {
						this.snackBar.open(
							this.serviceTransloco.translate<string>(
								'successUpdate'
							),
							undefined,
							{
								verticalPosition: 'top',
								horizontalPosition: 'center',
								duration: 5000,
							}
						);
						this.router.navigate(['/view-people']);
					});
			} else {
				this.apiService
					.registerPerson(
						this.personForm.value as PersonalInformation
					)
					.subscribe(() => {
						this.snackBar.open(
							this.serviceTransloco.translate<string>(
								'successRegister'
							),
							undefined,
							{
								verticalPosition: 'top',
								horizontalPosition: 'center',
								duration: 5000,
							}
						);
						this.personForm.reset();
						this.personForm.updateValueAndValidity();
					});
			}
		}
	}

	control(field: string): AbstractControl {
		return this.personForm.controls[field];
	}
}
