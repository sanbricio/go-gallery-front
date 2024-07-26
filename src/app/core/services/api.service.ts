import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Image } from '../../interfaces/Image';
import { ResponseException } from '../commons/response.exception';

const CREDENTIALS_OPTIONS = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  //TODO poner variables de entorno para url
  find(id: string): Observable<Image> {
    return this.http.get<Image>(`http://localhost:3000/getImage/${id}`);
  }

  insert(body: FormData): Observable<Image> {
    return this.http.post<Image>("http://localhost:3000/uploadImage", body)
    .pipe(
      catchError(this.handleError)
    )
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: '${error.error}'`);
    }
    return throwError(() => new ResponseException(error.status, error.message, error.error));
  }
}
