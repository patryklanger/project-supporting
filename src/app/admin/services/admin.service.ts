import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { CreateAdminUser } from './../model/createAdminUser.model';
import { HttpOptions } from './../../model/httpOptions.model';
import { catchError, throwError, Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/model/paginatedResult.model';
import { AdminDto } from './../model/adminDto.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  API_URL = `${environment.baseUrl}/admin`;
  header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({
      'No-Auth': 'false',
    });
  }

  createAdmin(admin: CreateAdminUser): Observable<AdminDto> {
    const options: HttpOptions = {};
    options.headers = this.header;
    return this.httpClient.post(
      this.API_URL,
      admin,
      options
    ) as Observable<AdminDto>;
  }

  getAdmins(
    page: number,
    limit: number
  ): Observable<PaginatedResult<AdminDto>> {
    let params = new HttpParams({});
    params = params.set('page', page - 1);
    params = params.set('limit', 20);

    const options: HttpOptions = {};
    options.headers = this.header;
    options.params = params;

    return this.httpClient.get(this.API_URL, options) as Observable<
      PaginatedResult<AdminDto>
    >;
  }

  deleteAdmin(id: number): Observable<any> {
    const options: HttpOptions = {};
    options.headers = this.header;
    return this.httpClient.delete(`${this.API_URL}/${id}`, options);
  }
}
