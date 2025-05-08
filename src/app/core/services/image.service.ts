import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { 
  Image, 
  Thumbnail, 
  ThumbnailCursor, 
  ImageUpdateRequest, 
  ImageUpdateResponse,
  ImageDeleteRequest
} from '../models/image.model';
import { MessageResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = `${environment.apiUrl}/image`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Image>(`${this.apiUrl}/uploadImage`, formData)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  getImage(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/getImage/${id}`)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  getThumbnails(lastID?: string, pageSize: number = 10): Observable<ThumbnailCursor> {
    let params = new HttpParams();
    
    if (lastID) {
      params = params.set('lastID', lastID);
    }
    
    params = params.set('pageSize', pageSize.toString());

    return this.http.get<ThumbnailCursor>(`${this.apiUrl}/getThumbnailImages`, { params })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  updateImage(updateData: ImageUpdateRequest): Observable<ImageUpdateResponse> {
    return this.http.put<ImageUpdateResponse>(`${this.apiUrl}/updateImage`, updateData)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  deleteImage(deleteData: ImageDeleteRequest): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/deleteImage`, { body: deleteData })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  // Helper method to download an image
  downloadImage(image: Image): void {
    // Convert base64 to blob
    const byteCharacters = atob(image.content_file);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: `image/${image.extension.replace('.', '')}` });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and click it to download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${image.name}${image.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}