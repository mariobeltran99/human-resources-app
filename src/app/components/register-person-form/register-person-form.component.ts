import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	DATA_MARITAL_STATUS,
	MaritalStatus,
	PersonForm,
	SelectionMaritalStatus,
} from 'src/app/interfaces/person-form.interface';
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
export class RegisterPersonFormComponent {
	personForm: FormGroup;
	selectedStatusMarital: MaritalStatus = 'S';
	maritalStatusData: SelectionMaritalStatus[] = DATA_MARITAL_STATUS;
	maxDate: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
	minDate: Date = new Date(1900, 1, 1);
	editMode: boolean = false;
	constructor() {
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
			genre: new FormControl('M', {
				nonNullable: true,
				validators: Validators.required,
			}),
			address: new FormControl('', {
				nonNullable: false,
				validators: Validators.maxLength(300),
			}),
		});
	}

	save(): void {
		console.log(this.personForm.value);
	}
}
