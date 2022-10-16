import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
	Person,
	PersonalInformation,
} from '../interfaces/personal-information.interface';

@Injectable({
	providedIn: 'root',
})
export class ApiHumanResourcesService {
	constructor(private http: HttpClient) {}

	getPeople(): Observable<Person[]> {
		return this.http.get<Person[]>(`${environment.api}/people`);
	}

	getPerson(id: number): Observable<Person> {
		return this.http.get<Person>(`${environment.api}/person/${id}`);
	}

	registerPerson(person: PersonalInformation): Observable<any> {
		return this.http.post(`${environment.api}/person`, person);
	}

	updatePerson(id: number, person: PersonalInformation): Observable<any> {
		return this.http.put(`${environment.api}/person/${id}`, person);
	}

	deletePerson(id: number): Observable<any> {
		return this.http.get(`${environment.api}/person/${id}`);
	}
}
