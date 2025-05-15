import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register.component").then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: "gallery",
    loadComponent: () =>
      import("./features/gallery/gallery/gallery.component").then(
        (m) => m.GalleryComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: "upload",
    loadComponent: () =>
      import("./features/gallery/upload/upload.component").then(
        (m) => m.UploadComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: "image/:id",
    loadComponent: () =>
      import("./features/gallery/image-detail/image-detail.component").then(
        (m) => m.ImageDetailComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./features/profile/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: "recover-password",
    loadComponent: () =>
      import(
        "./features/auth/recover-password/recover-password.component"
      ).then((m) => m.RecoverPasswordComponent),
  },
  {
    path: "terms-of-use",
    loadComponent: () =>
      import("./features/auth/legal/terms-of-use/terms-of-use.component").then(
        (m) => m.TermsOfUseComponent
      ),
  },
  {
    path: "privacy-policy",
    loadComponent: () =>
      import("./features/auth/legal/privacy-policy/privacy-policy.component").then(
        (m) => m.PrivacyPolicyComponent
      ),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
