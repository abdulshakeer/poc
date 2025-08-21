import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Search, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav class="nav-container">
      <div class="container">
        <div class="nav-content">
          <div class="nav-brand">
            <a routerLink="/" class="brand-link">
              <span class="brand-text">Dev</span><span class="brand-accent">Showcase</span>
            </a>
          </div>

          <div class="nav-links" [class.nav-links-open]="isMenuOpen">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Home</a>
            <a routerLink="/projects" routerLinkActive="active" class="nav-link">Projects</a>
            <a routerLink="/categories" routerLinkActive="active" class="nav-link">Categories</a>
            <a routerLink="/about" routerLinkActive="active" class="nav-link">About</a>
          </div>

          <div class="nav-actions">
            <div class="search-container">
              <lucide-icon [img]="searchIcon" class="search-icon"></lucide-icon>
              <input type="text" placeholder="Search projects..." class="search-input" />
            </div>
            <a href="#" class="btn btn-primary">Submit Project</a>
          </div>

          <button class="mobile-menu-btn" (click)="toggleMenu()">
            <lucide-icon [img]="isMenuOpen ? closeIcon : menuIcon"></lucide-icon>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-container {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }

    .brand-link {
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .brand-text {
      color: #2d3748;
    }

    .brand-accent {
      color: #667eea;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-link {
      text-decoration: none;
      color: #4a5568;
      font-weight: 500;
      transition: color 0.2s ease;
      padding: 0.5rem 0;
      position: relative;
    }

    .nav-link:hover,
    .nav-link.active {
      color: #667eea;
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      right: 0;
      height: 2px;
      background: #667eea;
      border-radius: 1px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .search-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      color: #a0aec0;
      width: 1rem;
      height: 1rem;
    }

    .search-input {
      padding: 0.5rem 0.75rem 0.5rem 2.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      background: white;
      font-size: 0.875rem;
      width: 200px;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      width: 250px;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      color: #4a5568;
      padding: 0.5rem;
    }

    @media (max-width: 768px) {
      .nav-links {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid #e2e8f0;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .nav-links-open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-actions {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }
    }
  `]
})
export class NavigationComponent {
  searchIcon = Search;
  menuIcon = Menu;
  closeIcon = X;
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
