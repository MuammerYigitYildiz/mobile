import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class KanGrubuService {
  constructor(private http: HttpClient) {
  }

  findAllKanGruplari(): Observable<any> {
    const url = `${environment.apiUrl}/referanslar/kanGruplari`;
    return this.http.get(url);
  }
}
