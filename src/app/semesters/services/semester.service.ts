import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpOptions } from './../../model/httpOptions.model';
import { Semester } from 'src/app/model/semester.model';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  API_URL = `${environment.baseUrl}/semester`;
  headers: HttpHeaders;
  constructor(private http: HttpClient, private dialogService: DialogService) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('No-Auth', 'false');
  }

  getSemesters(): Observable<Semester[]> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.http
      .get(this.API_URL, options)
      .pipe(catchError(this.error.bind(this)));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      this.dialogService.openErrorDialog(errorMessage);
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.dialogService.openErrorDialog(errorMessage);
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
