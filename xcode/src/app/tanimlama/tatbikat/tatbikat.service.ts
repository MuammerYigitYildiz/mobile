import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TatbikatService {

  constructor(private http: HttpClient) { }


  get(uuid: string): Observable<any> {
    const url = `${environment.apiUrl}/gonullu-tatbikat/gonullu/${uuid}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
