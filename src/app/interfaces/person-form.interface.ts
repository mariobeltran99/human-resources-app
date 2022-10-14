/* eslint-disable prettier/prettier */
import { FormControl } from '@angular/forms';

export interface PersonForm {
	dui: FormControl<number | null>;
	name: FormControl<string>;
	surname: FormControl<string>;
	email: FormControl<string>;
	phone: FormControl<number | null>;
	birthday: FormControl<Date>;
	maritalStatus: FormControl<MaritalStatus>;
	genre: FormControl<Genre>;
	address: FormControl<string | null>;
}

export interface SelectionMaritalStatus {
	value: MaritalStatus;
	viewStatus: string;
}

export type MaritalStatus = 'S' | 'C' | 'D' | 'V' | 'U';

export type Genre = 'M' | 'F';

export const DATA_MARITAL_STATUS: SelectionMaritalStatus[] = [
	{ value: 'S', viewStatus: 'optionStatus1' },
	{ value: 'C', viewStatus: 'optionStatus2' },
	{ value: 'D', viewStatus: 'optionStatus3' },
	{ value: 'V', viewStatus: 'optionStatus4' },
	{ value: 'U', viewStatus: 'optionStatus5' },
];
