import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { 
  User, 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  UpdateUserRequest,
  DeleteUserRequest,
  MessageResponse
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.checkAuthStatus();
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private checkAuthStatus(): void {
    // Since we're using HttpOnly cookies, we can't directly check for the token
    // Instead we'll check if we have user info in sessionStorage
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (e) {
        sessionStorage.removeItem('user');
        this.currentUserSubject.next(null);
      }
    }
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          const user: User = {
            username: response.username,
            email: response.email,
            firstname: response.name.split(' ')[0] || '', //TODO Mirar lo que devuelve el login por que nos interesa???
            lastname: response.name.split(' ')[1] || ''
          };
          sessionStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  register(registerData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, registerData)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          sessionStorage.removeItem('user');
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          // Even if the server request fails, we want to clear local state
          sessionStorage.removeItem('user');
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
          return throwError(() => error);
        })
      );
  }

  updateUser(userData: UpdateUserRequest): Observable<RegisterResponse> {
    return this.http.put<RegisterResponse>(`${this.apiUrl}/update`, userData)
      .pipe(
        tap(response => {
          // Update the stored user info
          const currentUser = this.currentUserSubject.value;
          if (currentUser) {
            const updatedUser: User = {
              ...currentUser,
              firstname: userData.firstname ?? currentUser.firstname,
              lastname: userData.lastname ?? currentUser.lastname,
              email: userData.email ?? currentUser.email
            };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
          }
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  requestDeleteAccount(): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/request-delete`, {})
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  deleteAccount(deleteData: DeleteUserRequest): Observable<RegisterResponse> {
    return this.http.delete<RegisterResponse>(`${this.apiUrl}/delete`, { body: deleteData })
      .pipe(
        tap(() => {
          sessionStorage.removeItem('user');
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }
}