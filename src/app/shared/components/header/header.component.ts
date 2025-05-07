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
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Home</a>
            </li>
            
            <ng-container *ngIf="isLoggedIn">
              <li class="nav-item">
                <a routerLink="/gallery" routerLinkActive="active" class="nav-link">Gallery</a>
              </li>
              <li class="nav-item">
                <a routerLink="/upload" routerLinkActive="active" class="nav-link">Upload</a>
              </li>
              <li class="nav-item">
                <a routerLink="/profile" routerLinkActive="active" class="nav-link">Profile</a>
              </li>
              <li class="nav-item">
                <button (click)="logout()" class="nav-link logout-btn">Logout</button>
              </li>
            </ng-container>
            
            <ng-container *ngIf="!isLoggedIn">
              <li class="nav-item">
                <a routerLink="/login" routerLinkActive="active" class="nav-link">Login</a>
              </li>
              <li class="nav-item">
                <a routerLink="/register" routerLinkActive="active" class="nav-link register-link">Register</a>
              </li>
            </ng-container>
          </ul>
        </nav>
        
        <button class="menu-toggle" (click)="toggleMenu()" aria-label="Toggle menu">
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
      padding: 16px 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo {
      color: white;
      font-size: 24px;
      font-weight: 700;
      text-decoration: none;
      transition: opacity 0.3s;
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
    }
    
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
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
        top: 64px;
        left: 0;
        right: 0;
        background-color: var(--primary);
        padding: 16px;
        display: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .nav-menu.active {
        display: block;
      }
      
      .nav-list {
        flex-direction: column;
      }
      
      .nav-link {
        display: block;
        padding: 12px;
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
  }
  
  logout(): void {
    this.authService.logout().subscribe();
  }
}