import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { DialogService } from './../../shared/services/dialog.service';
import { throwError, Observable } from 'rxjs';
import { HttpOptions } from './../../model/httpOptions.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL = `${environment.baseUrl}/user`;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private dialogService: DialogService) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('No-Auth', 'false');
  }

  getAllUsers(page: number, limit: number) {
    const params = new HttpParams();
    params.set('page', page);
    params.set('limit', limit);
    let httpOptions: HttpOptions = { params: params, headers: this.headers };
    return this.http
      .get(this.API_URL, httpOptions)
      .pipe(catchError(this.error.bind(this)));
  }

  deleteUser(id: string): Observable<any> {
    let httpOptions: HttpOptions = { headers: this.headers };

    return this.http.delete(`${this.API_URL}/${id}`, httpOptions);
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
