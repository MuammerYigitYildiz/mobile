import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OgrenimDurumuService {
  constructor(private http: HttpClient) {
  }

  findAllOgrenimDurumlari(): Observable<any> {
    const url = `${environment.apiUrl}/referanslar/ogrenimDurumlari`;
    return this.http.get(url);
  }
}
