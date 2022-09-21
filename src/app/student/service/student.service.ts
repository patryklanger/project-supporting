import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { StudentUser } from './../model/studentUser.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpOptions } from './../../model/httpOptions.model';
import { PaginatedResult } from 'src/app/model/paginatedResult.model';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  API_URL = `${environment.baseUrl}/student`;
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'No-Auth': 'false',
    });
  }

  createStudent(student: StudentUser): Observable<any> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    let semester = student.studentSemesterIdList[0];
    let studentToAdd: Student = {
      ...student,
      studentSemesterIdList: undefined,
    };
    console.log(`${this.API_URL}/semester/${semester}`);
    return this.httpClient.post(
      `${this.API_URL}/semester/${semester}`,
      studentToAdd,
      options
    );
  }

  getStudents(
    page: number,
    limit: number
  ): Observable<PaginatedResult<Student>> {
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

  getStudentByName(name: string): Observable<Student[]> {
    const options: HttpOptions = {};
    let params: HttpParams = new HttpParams();
    params = params.set('lastname', name);
    options.headers = this.headers;
    options.params = params;
    return this.httpClient
      .get(`${this.API_URL}/byname`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  getStudent(id: number): Observable<Student> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.httpClient
      .get(`${this.API_URL}/${id}`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  deleteStudent(id: string): Observable<any> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.httpClient.delete(`${this.API_URL}/${id}`, options);
  }

  editStudent(student: Student): Observable<Student> {
    console.log(student);
    var studentId = student.id;

    var studentToEdit: Student = {
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate,
    };

    const options: HttpOptions = { headers: this.headers };

    return this.httpClient.put(
      `${this.API_URL}/${studentId}`,
      studentToEdit,
      options
    ) as Observable<Student>;
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
