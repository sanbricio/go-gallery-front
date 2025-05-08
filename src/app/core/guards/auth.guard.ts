import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (authService.isLoggedIn) {
    return true;
  }

  // Navigate to login page
  toastService.show('Please login to access this page', 'info');
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};