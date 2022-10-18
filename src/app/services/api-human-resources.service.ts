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
		return this.http.get<Person[]>(`${environment.api}/users`);
	}

	getPerson(id: number): Observable<Person> {
		return this.http.get<Person>(`${environment.api}/users/${id}`);
	}

	registerPerson(person: PersonalInformation): Observable<Person> {
		return this.http.post<Person>(`${environment.api}/users`, person);
	}

	updatePerson(id: number, person: PersonalInformation): Observable<Person> {
		return this.http.put<Person>(`${environment.api}/users/${id}`, person);
	}

	deletePerson(id: number): Observable<{}> {
		return this.http.delete<{}>(`${environment.api}/users/${id}`);
	}
}
