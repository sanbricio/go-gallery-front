import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Welcome to GoGallery</h1>
        <p>Your personal photo gallery in the cloud</p>

        <img
          src="/assets/images/gopher-camera.png"
          alt="Gopher with camera"
          class="gopher-hero"
        />

        <div class="cta-buttons">
          <a routerLink="/gallery" *ngIf="isLoggedIn" class="btn-primary"
            >My Gallery</a
          >
          <a routerLink="/login" *ngIf="!isLoggedIn" class="btn-primary"
            >Get Started</a
          >
          <a routerLink="/register" *ngIf="!isLoggedIn" class="btn-secondary"
            >Create Account</a
          >
        </div>
      </div>

      <div class="features-section">
        <h2>Why Choose GoGallery?</h2>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📁</div>
            <h3>Secure Storage</h3>
            <p>
              Your photos are securely stored in the cloud and accessible from
              anywhere.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Easy Organization</h3>
            <p>
              Organize and categorize your photos with custom naming and tags.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access your gallery on any device with our responsive design.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Private & Secure</h3>
            <p>Your photos are private and only accessible to you.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .hero-section {
        text-align: center;
        padding: 64px 24px;
        background: linear-gradient(
          135deg,
          var(--primary-light),
          var(--primary-dark)
        );
        color: white;
        border-radius: 8px;
        margin-bottom: 48px;
      }

      .hero-section h1 {
        font-size: 3rem;
        margin-bottom: 16px;
        animation: fadeInUp 0.8s ease-out;
      }

      .hero-section p {
        font-size: 1.5rem;
        margin-bottom: 32px;
        opacity: 0.9;
        animation: fadeInUp 0.8s ease-out 0.2s both;
      }

      .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 16px;
        animation: fadeInUp 0.8s ease-out 0.4s both;
      }

      .btn-primary,
      .btn-secondary {
        padding: 12px 32px;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        text-decoration: none;
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .btn-primary {
        background-color: white;
        color: var(--primary);
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .btn-secondary {
        background-color: transparent;
        color: white;
        border: 2px solid white;
      }

      .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .features-section {
        padding: 0 24px 64px;
      }

      .features-section h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 48px;
        color: var(--text-primary);
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 32px;
      }

      .feature-card {
        background-color: var(--card-bg);
        padding: 32px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        text-align: center;
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .feature-icon {
        font-size: 3rem;
        margin-bottom: 16px;
      }

      .feature-card h3 {
        color: var(--primary);
        margin-bottom: 8px;
      }

      .feature-card p {
        color: var(--text-secondary);
        line-height: 1.5;
      }

      .gopher-hero {
        max-width: 300px;
        width: 100%;
        margin: 24px auto;
        display: block;
        border-radius: 16px;

        animation: fadeIn 1s ease-out 0.3s both;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .hero-section h1 {
          font-size: 2rem;
        }

        .hero-section p {
          font-size: 1.25rem;
        }

        .cta-buttons {
          flex-direction: column;
          align-items: center;
        }

        .btn-primary,
        .btn-secondary {
          width: 100%;
          max-width: 300px;
          text-align: center;
        }
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private readonly authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
