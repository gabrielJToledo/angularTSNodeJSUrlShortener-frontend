import { IUrl } from './../url.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = ''

  constructor(private http: HttpClient) { }

  setUrlShortener(url: string): Observable<IUrl> {
    return this.http.post<IUrl>(`${this.baseUrl}`, { url: url})
  }
}
