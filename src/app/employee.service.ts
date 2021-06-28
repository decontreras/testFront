import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private readonly http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/employee', {});
  }

  getEmployeeByID(id: string | undefined): Observable<any> {
    return this.http.get<any>('http://dummy.restapiexample.com/api/v1/employee/' + id, {});
  }
}
