import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { LecturerUser } from './../models/lecturerUser.model';
import { catchError } from 'rxjs/operators';
import { Lecturer } from '../models/lecturer.model';
import { PaginatedResult } from './../../model/paginatedResult.model';
import { HttpOptions } from './../../model/httpOptions.model';

@Injectable({
  providedIn: 'root',
})
export class LecturerService {
  API_URL = `${environment.baseUrl}/lecturer`;
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'No-Auth': 'false',
    });
  }

  createLecturer(lecturer: LecturerUser): Observable<any> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.httpClient
      .post(this.API_URL, lecturer, options)
      .pipe(catchError(this.error.bind(this)));
  }

  getLecturers(
    page: number,
    limit: number
  ): Observable<PaginatedResult<Lecturer>> {
    let params = new HttpParams({});
    params = params.set('page', page - 1);
    params = params.set('limit', 20);

    const options: HttpOptions = {};
    options.headers = this.headers;
    options.params = params;
    return this.httpClient
      .get(this.API_URL, options)
      .pipe(catchError(this.error.bind(this)));
  }

  getLecturer(id: number): Observable<Lecturer> {
    const options: HttpOptions = {};
    options.headers = this.headers;

    return this.httpClient
      .get(`${this.API_URL}/${id}`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  getLecturerByName(name: string): Observable<Lecturer[]> {
    const options: HttpOptions = {};
    let params: HttpParams = new HttpParams();
    params = params.set('lastname', name);
    options.headers = this.headers;
    options.params = params;
    return this.httpClient
      .get(`${this.API_URL}/byname`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  deleteLecturer(id: number): Observable<any> {
    const options: HttpOptions = {};
    options.headers = this.headers;

    console.log(id);

    return this.httpClient
      .delete(`${this.API_URL}/${id}`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  editLecturer(lecturer: Lecturer): Observable<Lecturer> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    console.log(lecturer);
    return this.httpClient
      .put(`${this.API_URL}/${lecturer.id}`, lecturer, options)
      .pipe(catchError(this.error.bind(this)));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error.message) errorMessage = error.error.message;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
