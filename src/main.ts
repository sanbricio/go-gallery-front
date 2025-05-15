import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { environment } from './environments/environment';

function loadEnvConfig() {
  return fetch('/assets/env.json')
    .then((res) => {
      if (!res.ok) throw new Error('env.json not found');
      return res.json();
    })
    .then((env) => {
      environment.apiUrl = env.apiUrl;
      environment.withCredentials = env.withCredentials === 'true';
    })
    .catch(() => {
      environment.apiUrl = 'http://localhost:3000/api';
      environment.withCredentials = true;
    });
}

loadEnvConfig().then(() =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(
        withInterceptors([authInterceptor]),
        withXsrfConfiguration({ cookieName: 'auth_token' })
      )
    ]
  })
);
