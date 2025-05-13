import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "../services/toast.service";
import { environment } from "../../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);

  // Clone the request and add withCredentials option
  const authReq = req.clone({
    withCredentials: environment.withCredentials,
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // If unauthorized, clear local storage and redirect to login
        sessionStorage.removeItem("user");

        // Only show toast and redirect if not already on login page
        if (!router.url.includes("/login")) {
          toastService.show(
            "Your session has expired. Please login again.",
            "error"
          );
          router.navigate(["/login"]);
        }
      } else {
        const errorMessage =
          error.error?.message ?? "An unexpected error occurred";

        if (![404, 204].includes(error.status)) {
          toastService.show(errorMessage, "error");
        }
      }

      return throwError(() => error);
    })
  );
};
