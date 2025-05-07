import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);
  
  // No need to add Authorization header since we're using HttpOnly cookies
  // The browser will automatically include cookies in the request
  
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // If unauthorized, clear local storage and redirect to login
        sessionStorage.removeItem('user');
        toastService.show('Your session has expired. Please login again.', 'error');
        router.navigate(['/login']);
      }
      
      // Show error message
      const errorMessage = error.error?.message ?? 'An unexpected error occurred';
      toastService.show(errorMessage, 'error');
      
      return throwError(() => error);
    })
  );
};