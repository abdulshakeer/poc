import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './app/components/navigation/navigation.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ProjectsComponent } from './app/pages/projects/projects.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'categories', redirectTo: '/projects' },
  { path: 'about', redirectTo: '/' },
  { path: '**', redirectTo: '/' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  template: `
    <div class="app-container">
      <app-navigation></app-navigation>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3 class="footer-title">DevShowcase</h3>
              <p class="footer-description">Connecting innovative developers with visionary investors</p>
            </div>
            <div class="footer-section">
              <h4 class="footer-heading">Platform</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">Browse Projects</a></li>
                <li><a href="#" class="footer-link">Submit Project</a></li>
                <li><a href="#" class="footer-link">Become Investor</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4 class="footer-heading">Support</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">Help Center</a></li>
                <li><a href="#" class="footer-link">Contact Us</a></li>
                <li><a href="#" class="footer-link">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 DevShowcase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
    }

    .app-footer {
      background: #2d3748;
      color: white;
      padding: 3rem 0 1rem;
      margin-top: auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #667eea;
    }

    .footer-description {
      color: #a0aec0;
      line-height: 1.6;
    }

    .footer-heading {
      font-weight: 600;
      margin-bottom: 1rem;
      color: white;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 0.5rem;
    }

    .footer-link {
      color: #a0aec0;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-link:hover {
      color: #667eea;
    }

    .footer-bottom {
      border-top: 1px solid #4a5568;
      padding-top: 1rem;
      text-align: center;
      color: #a0aec0;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});
