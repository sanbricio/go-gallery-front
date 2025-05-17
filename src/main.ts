import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { environment } from './environments/environment';

async function loadEnvConfig() {
  try {
    const res = await fetch('/assets/env.json');
    if (!res.ok) throw new Error('env.json not found');
    const env = await res.json();
    environment.apiUrl = env.apiUrl;
  } catch {
    environment.apiUrl = 'http://localhost:3000/api';
  }
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
