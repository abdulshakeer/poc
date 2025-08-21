import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, TrendingUp, Users, Zap } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Where <span class="text-gradient">Innovation</span><br>
              Meets <span class="text-gradient">Investment</span>
            </h1>
            <p class="hero-description">
              Connect talented developers with visionary investors. Showcase your proof-of-concept projects, 
              research ideas, and innovative solutions to secure funding and bring your vision to life.
            </p>
            <div class="hero-actions">
              <a routerLink="/projects" class="btn btn-primary">
                <lucide-icon [img]="trendingIcon"></lucide-icon>
                Explore Projects
              </a>
              <a href="#" class="btn btn-secondary">
                <lucide-icon [img]="zapIcon"></lucide-icon>
                Submit Your Project
              </a>
            </div>
          </div>
          
          <div class="hero-stats">
            <div class="stat-card">
              <div class="stat-icon">
                <lucide-icon [img]="trendingIcon"></lucide-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">150+</h3>
                <p class="stat-label">Active Projects</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">
                <lucide-icon [img]="usersIcon"></lucide-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">500+</h3>
                <p class="stat-label">Developers</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">
                <lucide-icon [img]="zapIcon"></lucide-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">$2M+</h3>
                <p class="stat-label">Funded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 0 6rem;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
      max-width: 600px;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 4rem;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 800px;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
    }

    .stat-icon {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.75rem;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon lucide-icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }

    .stat-label {
      margin: 0;
      opacity: 0.8;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 3rem 0 4rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-description {
        font-size: 1.1rem;
      }

      .hero-actions {
        flex-direction: column;
        align-items: flex-start;
      }

      .hero-stats {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `]
})
export class HeroComponent {
  trendingIcon = TrendingUp;
  usersIcon = Users;
  zapIcon = Zap;
}
