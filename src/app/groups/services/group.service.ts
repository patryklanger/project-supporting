import { NumberInput } from '@angular/cdk/coercion';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, QueryList } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { HttpOptions } from 'src/app/model/httpOptions.model';
import { PaginatedResult } from 'src/app/model/paginatedResult.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group.model';
import { GroupState } from 'src/app/groups/utils/groupState.model';
import { Meeting } from 'src/app/model/meeting.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  API_URL = `${environment.baseUrl}/group`;
  headers: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private dialogService: DialogService
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('No-Auth', 'false');
  }

  getGroups(
    semesterId: number,
    page: number,
    limit: number
  ): Observable<PaginatedResult<Group>> {
    let params = new HttpParams({});
    params = params.set('page', page - 1);
    params = params.set('limit', 20);
    let query = new QueryList();

    const options: HttpOptions = {};
    options.params = params;
    options.headers = this.headers;
    return this.httpClient
      .get(`${this.API_URL}/${semesterId}`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  getGroupById(id: number): Observable<Group> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.httpClient
      .get(`${this.API_URL}/info/${id}`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  changeGroupState(id: number, state: GroupState): Observable<Group> {
    const options: HttpOptions = {};
    options.headers = this.headers.append('Content-Type', 'text/plain');
    return this.httpClient
      .put(`${this.API_URL}/${id}`, state, options)
      .pipe(catchError(this.error.bind(this)));
  }

  addStudentsToGroup(id: number, studentIds: string[]): Observable<Group> {
    let params = new HttpParams();
    params = params.set('groupId', id);
    const options: HttpOptions = {};
    options.headers = this.headers;
    options.params = params;
    return this.httpClient
      .post(`${this.API_URL}/addStudents`, studentIds, options)
      .pipe(catchError(this.error.bind(this)));
  }

  createGroup(
    semesterId: number,
    topicId: number,
    maxSize: number
  ): Observable<Group> {
    const options: HttpOptions = {};
    options.headers = this.headers;

    return this.httpClient.post(
      `${this.API_URL}/${semesterId}/${topicId}/${maxSize}`,
      '',
      options
    ) as Observable<Group>;
  }

  changeMark(
    groupId: number,
    mark: number,
    studentId: string
  ): Observable<Group> {
    const options: HttpOptions = {};
    options.headers = this.headers;

    const payload = [
      {
        studentId: studentId,
        mark: mark,
      },
    ];

    return this.httpClient.put(
      `${this.API_URL}/marks/${groupId}`,
      payload,
      options
    ) as Observable<Group>;
  }

  generatePdf(groupId: number): Observable<Group> {
    const options: HttpOptions = {};
    options.headers = this.headers;

    return this.httpClient.post(
      `${this.API_URL}/${groupId}`,
      '',
      options
    ) as Observable<Group>;
  }

  downloadFileFromServer(groupId: number, filename: string) {
    this.httpClient
      .get(`${this.API_URL}/download/${groupId}/${filename}`, {
        responseType: 'arraybuffer',
        headers: this.headers.set('Content-Type', 'application/pdf'),
      })
      .subscribe((response) => this.downLoadFile(response, '', filename));
  }

  private downLoadFile(data: any, type: string, filename: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }

  upload(file: File, groupId: number): Observable<HttpEvent<any>> {
    console.log(file);
    const options: HttpOptions = {};
    options.headers = this.headers.set('No-Auth', 'file');
    const formData: FormData = new FormData();
    formData.append('fileName', file);
    console.log(formData);
    const req = new HttpRequest(
      'POST',
      `${this.API_URL}/upload/${groupId}`,
      formData,
      {
        headers: options.headers,
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.httpClient.request(req);
  }

  singUserToGroup(groupId: number) {
    const options: HttpOptions = {};
    options.headers = this.headers;

    return this.httpClient.post(
      `${this.API_URL}/signUp/${groupId}`,
      '',
      options
    ) as Observable<Group>;
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.error;
      this.dialogService.openErrorDialog(errorMessage);
    } else {
      errorMessage = error.error.message;
      this.dialogService.openErrorDialog(errorMessage);
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
