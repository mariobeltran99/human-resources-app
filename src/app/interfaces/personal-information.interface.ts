/* eslint-disable prettier/prettier */
import { Genre, MaritalStatus } from './person-form.interface';

export interface PersonalInformation {
	dui: number;
	name: string;
	surname: string;
	email: string;
	phone: number;
	birthday: Date;
	maritalStatus: MaritalStatus;
	genre: Genre;
	address: string | null;
}

export interface Person extends PersonalInformation {
	id: number;
}
