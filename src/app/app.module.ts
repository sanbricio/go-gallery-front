import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { GalleryComponent } from './features/gallery/gallery/gallery.component';
import { ProfileComponent } from './features/profile/profile/profile.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ImageCardComponent } from './shared/components/image-card/image-card.component';
import { UploadComponent } from './features/gallery/upload/upload.component';
import { ImageDetailComponent } from './features/gallery/image-detail/image-detail.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GalleryComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    ImageCardComponent,
    UploadComponent,
    ImageDetailComponent,
    LoadingSpinnerComponent,
    ToastComponent
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ]
})
export class AppModule { }
