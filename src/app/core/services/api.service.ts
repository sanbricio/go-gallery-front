import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../../interfaces/Image';

const CREDENTIALS_OPTIONS = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  //TODO poner variables de entorno para url
  find(id: string): Observable<Image> {
    return this.http.get <Image> (`http://localhost:3000/getImage/${id}`);
  }

}
