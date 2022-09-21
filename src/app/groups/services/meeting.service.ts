import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpOptions } from 'src/app/model/httpOptions.model';
import { Meeting } from 'src/app/model/meeting.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { environment } from 'src/environments/environment';
import { PresenceChangeRequest } from './../model/presenceChangeRequest';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  API_URL = `${environment.baseUrl}/meeting`;
  headers: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private dialogService: DialogService
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('No-Auth', 'false');
  }
  createMeetingForGroup(groupId: number, date: string): Observable<Meeting> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.httpClient
      .post(`${this.API_URL}/${groupId}`, date, options)
      .pipe(catchError(this.error.bind(this)));
  }

  changePresensceStateForMeeting(
    data: PresenceChangeRequest[],
    meetingId: number
  ): Observable<Meeting> {
    const options: HttpOptions = {};
    options.headers = this.headers;
    return this.httpClient.put(
      `${this.API_URL}/${meetingId}`,
      data,
      options
    ) as Observable<Meeting>;
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
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
