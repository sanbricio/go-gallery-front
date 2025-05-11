import { Component, OnInit, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-container">
        <a routerLink="/" class="logo">
          <img
            src="/assets/images/gopher-camera.png"
            alt="GoGallery logo"
            class="logo-image"
          />
          GoGallery
        </a>
        <nav class="nav-menu" [class.active]="menuOpen">
          <ul class="nav-list">
            <li class="nav-item">
              <a
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                class="nav-link"
                (click)="closeMenu()"
              >
                <img
                  src="assets/images/icons/home.svg"
                  alt="Home"
                  class="nav-icon"
                />
                Home
              </a>
            </li>

            <ng-container *ngIf="isLoggedIn">
              <li class="nav-item">
                <a
                  routerLink="/gallery"
                  routerLinkActive="active"
                  class="nav-link"
                  (click)="closeMenu()"
                >
                  <img
                    src="assets/images/icons/photo.svg"
                    alt="Gallery"
                    class="nav-icon"
                  />
                  Gallery
                </a>
              </li>
              <li class="nav-item">
                <a
                  routerLink="/upload"
                  routerLinkActive="active"
                  class="nav-link"
                  (click)="closeMenu()"
                >
                  <img
                    src="assets/images/icons/upload.svg"
                    alt="Upload"
                    class="nav-icon"
                  />
                  Upload
                </a>
              </li>
              <li class="nav-item">
                <a
                  routerLink="/profile"
                  routerLinkActive="active"
                  class="nav-link"
                  (click)="closeMenu()"
                >
                  <img
                    src="assets/images/icons/user.svg"
                    alt="Profile"
                    class="nav-icon"
                  />
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <button
                  (click)="logout(); closeMenu()"
                  class="nav-link logout-btn"
                >
                  <img
                    src="assets/images/icons/logout.svg"
                    alt="Logout"
                    class="nav-icon"
                  />
                  Logout
                </button>
              </li>
            </ng-container>

            <ng-container *ngIf="!isLoggedIn">
              <li class="nav-item">
                <a
                  routerLink="/login"
                  routerLinkActive="active"
                  class="nav-link"
                  (click)="closeMenu()"
                >
                  <img
                    src="assets/images/icons/login.svg"
                    alt="Login"
                    class="nav-icon"
                  />
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a
                  routerLink="/register"
                  routerLinkActive="active"
                  class="nav-link register-link"
                  (click)="closeMenu()"
                >
                  <img
                    src="assets/images/icons/register.svg"
                    alt="Register"
                    class="nav-icon"
                  />
                  Register
                </a>
              </li>
            </ng-container>
          </ul>
        </nav>

        <button
          class="menu-toggle"
          (click)="toggleMenu()"
          aria-label="Toggle menu"
          [attr.aria-expanded]="menuOpen"
        >
          <div class="hamburger" [class.active]="menuOpen">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        background-color: var(--primary);
        height: var(--header-height);
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }

      .header-container {
        max-width: 1200px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 var(--container-padding);
      }

      .logo {
        color: white;
        font-size: 24px;
        font-weight: 700;
        text-decoration: none;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .logo:hover {
        opacity: 0.9;
      }

      .logo-image {
        height: 32px;
        width: auto;
      }

      .nav-menu {
        height: 100%;
      }

      .nav-list {
        height: 100%;
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 16px;
      }

      .nav-link {
        color: white;
        text-decoration: none;
        font-weight: 500;
        padding: 8px 12px;
        border-radius: 4px;
        transition: background-color 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nav-icon {
        width: 18px;
        height: 18px;
        display: inline-block;
      }

      .nav-link:hover,
      .nav-link.active {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .register-link {
        color: white;
        background: transparent;
      }

      .register-link:hover,
      .register-link.active {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .logout-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: inherit;
        font-family: inherit;
        padding: 8px 12px;
        color: white;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .menu-toggle {
        display: none;
      }

      @media (max-width: 768px) {
        .header {
          height: var(--header-height-mobile);
        }

        .header-container {
          padding: 0 var(--container-padding-mobile);
        }

        .logo {
          font-size: 20px;
        }

        .logo-image {
          height: 28px;
        }

        .nav-icon {
          width: 24px;
          height: 24px;
        }

        .menu-toggle {
          display: block;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          z-index: 102;
        }

        .hamburger {
          width: 24px;
          height: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background-color: white;
          transition: all 0.3s;
        }

        .hamburger.active span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .nav-menu {
          position: fixed;
          top: var(--header-height-mobile);
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--primary);
          display: none;
          padding: 16px var(--container-padding-mobile);
          height: calc(100vh - var(--header-height-mobile));
          overflow-y: auto;
        }

        .nav-menu.active {
          display: block;
        }

        .nav-list {
          flex-direction: column;
          height: auto;
          align-items: stretch;
          gap: 8px;
        }

        .nav-item {
          width: 100%;
        }

        .nav-link {
          padding: 16px;
          width: 100%;
          font-size: 18px;
        }

        .register-link {
          margin-top: 8px;
        }
      }

      @supports (padding: max(0px)) {
        .header-container {
          padding-left: max(
            var(--container-padding-mobile),
            env(safe-area-inset-left)
          );
          padding-right: max(
            var(--container-padding-mobile),
            env(safe-area-inset-right)
          );
        }

        @media (max-width: 768px) {
          .nav-menu {
            padding-left: max(
              var(--container-padding-mobile),
              env(safe-area-inset-left)
            );
            padding-right: max(
              var(--container-padding-mobile),
              env(safe-area-inset-right)
            );
            padding-bottom: max(
              var(--container-padding-mobile),
              env(safe-area-inset-bottom)
            );
          }
        }
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  menuOpen = false;

  constructor(private readonly authService: AuthService) {
    effect(() => {
      this.authService.currentUser$.subscribe((user) => {
        this.isLoggedIn = !!user;
      });
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? "hidden" : "";
  }

  closeMenu(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      document.body.style.overflow = "";
    }
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
