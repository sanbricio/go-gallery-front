import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <p class="copyright">© {{ currentYear }} GoGallery. All rights reserved.</p>
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy Policy</a>
            <a href="#" class="footer-link">Terms of Service</a>
            <a href="#" class="footer-link">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--primary);
      color: white;
      padding: 24px;
      margin-top: auto;
    }
    
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .copyright {
      margin: 0;
      opacity: 0.9;
    }
    
    .footer-links {
      display: flex;
      gap: 24px;
    }
    
    .footer-link {
      color: white;
      text-decoration: none;
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    
    .footer-link:hover {
      opacity: 1;
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
      
      .footer-links {
        flex-direction: column;
        gap: 12px;
      }
    }
  `]
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}