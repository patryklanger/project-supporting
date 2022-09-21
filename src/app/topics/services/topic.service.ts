import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError, shareReplay } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Topic } from '../model/topic';
import { environment } from '../../../environments/environment';
import { DialogService } from '../../shared/services/dialog.service';
import { PaginatedResult } from './../../model/paginatedResult.model';
import { HttpOptions } from './../../model/httpOptions.model';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  API_URL = `${environment.baseUrl}/topic`;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private dialogService: DialogService) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('No-Auth', 'false');
  }

  //create
  createTopic(topic: Topic): Observable<any> {
    console.log('FETICHING');
    const options: HttpOptions = {};
    options.headers = this.headers;
    if (topic.topicName === null || topic.description === null)
      return throwError(() => {
        return 'Topic properites cannot be assigned to null';
      });
    return this.http
      .post(this.API_URL, topic, options)
      .pipe(catchError(this.error.bind(this)));
  }

  //get -- get all Topics
  getAllTopics(
    page: number,
    limit: number
  ): Observable<PaginatedResult<Topic>> {
    let params = new HttpParams({});
    params = params.set('page', page - 1);
    params = params.set('limit', 20);

    const options: HttpOptions = {};
    options.params = params;
    options.headers = this.headers;
    return this.http
      .get(this.API_URL, options)
      .pipe(catchError(this.error.bind(this)));
  }

  //get -- get topic by id

  getTopicById(id: number): Observable<Topic> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.http
      .get(`${this.API_URL}/${id}`, options)
      .pipe(catchError(this.error.bind(this)));
  }
  getTopicByName(name: string): Observable<Topic[]> {
    const options: HttpOptions = {};
    let params: HttpParams = new HttpParams();
    params = params.set('lastname', name);
    options.headers = this.headers;
    options.params = params;
    return this.http
      .get(`${this.API_URL}/byname`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  //delete
  deleteTopic(id: number | string): Observable<any> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.http
      .delete(`${this.API_URL}/${id}`, options)
      .pipe(catchError(this.error.bind(this)));
  }

  editTopic(topic: Topic): Observable<any> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    const id = topic.id;
    if (id === null || id === undefined)
      return throwError(() => {
        return 'Something went wrong';
      });
    return this.http
      .put(`${this.API_URL}/${id}`, topic, options)
      .pipe(catchError(this.error.bind(this)), shareReplay());
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
