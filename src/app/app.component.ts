import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main>
        <div class="main-content">
          <router-outlet></router-outlet>
        </div>
      </main>
      <app-footer></app-footer>
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      overflow-x: hidden;
    }
    
    main {
      flex: 1;
      background-color: var(--background);
    }
    
    .main-content {
      padding: var(--container-padding);
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    @media (max-width: 768px) {
      .main-content {
        padding: var(--container-padding-mobile);
      }
    }
    
    @supports(padding: max(0px)) {
      .main-content {
        padding-left: max(var(--container-padding-mobile), env(safe-area-inset-left));
        padding-right: max(var(--container-padding-mobile), env(safe-area-inset-right));
      }
    }
  `]
})
export class AppComponent {}