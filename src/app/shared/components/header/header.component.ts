import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-container">
        <a routerLink="/" class="logo">
          GoGallery
        </a>
        
        <nav class="nav-menu" [class.active]="menuOpen">
          <ul class="nav-list">
            <li class="nav-item">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link" (click)="closeMenu()">Home</a>
            </li>
            
            <ng-container *ngIf="isLoggedIn">
              <li class="nav-item">
                <a routerLink="/gallery" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Gallery</a>
              </li>
              <li class="nav-item">
                <a routerLink="/upload" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Upload</a>
              </li>
              <li class="nav-item">
                <a routerLink="/profile" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Profile</a>
              </li>
              <li class="nav-item">
                <button (click)="logout(); closeMenu()" class="nav-link logout-btn">Logout</button>
              </li>
            </ng-container>
            
            <ng-container *ngIf="!isLoggedIn">
              <li class="nav-item">
                <a routerLink="/login" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Login</a>
              </li>
              <li class="nav-item">
                <a routerLink="/register" routerLinkActive="active" class="nav-link register-link" (click)="closeMenu()">Register</a>
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
  styles: [`
    .header {
      background-color: var(--primary);
      padding: 16px var(--container-padding);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    @media (max-width: 768px) {
      .header {
        padding: 12px var(--container-padding-mobile);
      }
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }
    
    .logo {
      color: white;
      font-size: 24px;
      font-weight: 700;
      text-decoration: none;
      transition: opacity 0.3s;
      z-index: 102;
    }
    
    .logo:hover {
      opacity: 0.9;
    }
    
    .nav-menu {
      display: flex;
    }
    
    .nav-list {
      display: flex;
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
      white-space: nowrap;
    }
    
    .nav-link:hover, .nav-link.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .register-link {
      background-color: white;
      color: var(--primary);
    }
    
    .register-link:hover, .register-link.active {
      background-color: rgba(255, 255, 255, 0.9);
    }
    
    .logout-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
      text-align: left;
    }
    
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      z-index: 102;
    }
    
    .hamburger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 18px;
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
    
    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }
      
      .nav-menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--primary);
        padding: 80px var(--container-padding-mobile) var(--container-padding-mobile);
        display: none;
        z-index: 101;
        overflow-y: auto;
      }
      
      .nav-menu.active {
        display: block;
      }
      
      .nav-list {
        flex-direction: column;
        gap: 8px;
      }
      
      .nav-item {
        width: 100%;
      }
      
      .nav-link {
        display: block;
        padding: 16px;
        width: 100%;
        text-align: center;
        font-size: 18px;
      }
      
      .register-link {
        margin-top: 8px;
      }
    }
    
    @supports(padding: max(0px)) {
      .header {
        padding-left: max(var(--container-padding-mobile), env(safe-area-inset-left));
        padding-right: max(var(--container-padding-mobile), env(safe-area-inset-right));
      }
      
      @media (max-width: 768px) {
        .nav-menu {
          padding-left: max(var(--container-padding-mobile), env(safe-area-inset-left));
          padding-right: max(var(--container-padding-mobile), env(safe-area-inset-right));
          padding-bottom: max(var(--container-padding-mobile), env(safe-area-inset-bottom));
        }
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  menuOpen = false;
  
  constructor(private authService: AuthService) {
    // Track auth state changes
    effect(() => {
      this.authService.currentUser$.subscribe(user => {
        this.isLoggedIn = !!user;
      });
    });
  }
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    
    // Prevent body scroll when menu is open
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  closeMenu(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }
  
  logout(): void {
    this.authService.logout().subscribe();
  }
}