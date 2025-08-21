import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowRight, Lightbulb, Target, Handshake } from 'lucide-angular';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { DataService } from '../../services/data.service';
import { Project, ProjectCategory } from '../../models/project.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, HeroComponent, ProjectCardComponent],
  template: `
    <app-hero></app-hero>
    
    <!-- Featured Projects -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-description">Discover the most promising projects seeking investment</p>
        </div>
        
        <div class="projects-grid">
          <app-project-card 
            *ngFor="let project of featuredProjects" 
            [project]="project">
          </app-project-card>
        </div>
        
        <div class="section-footer">
          <a routerLink="/projects" class="btn btn-primary">
            View All Projects
            <lucide-icon [img]="arrowIcon"></lucide-icon>
          </a>
        </div>
      </div>
    </section>
    
    <!-- How It Works -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">How It Works</h2>
          <p class="section-description">Connect innovative minds with investment opportunities</p>
        </div>
        
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-icon">
              <lucide-icon [img]="lightbulbIcon"></lucide-icon>
            </div>
            <h3 class="step-title">Submit Your Idea</h3>
            <p class="step-description">Developers showcase their proof-of-concept projects, research ideas, and innovative solutions with detailed documentation.</p>
          </div>
          
          <div class="step-card">
            <div class="step-icon">
              <lucide-icon [img]="targetIcon"></lucide-icon>
            </div>
            <h3 class="step-title">Get Discovered</h3>
            <p class="step-description">Investors and directors browse projects, filter by categories, and discover promising opportunities that align with their interests.</p>
          </div>
          
          <div class="step-card">
            <div class="step-icon">
              <lucide-icon [img]="handshakeIcon"></lucide-icon>
            </div>
            <h3 class="step-title">Secure Funding</h3>
            <p class="step-description">Connect directly with potential investors, present your vision, and secure the funding needed to bring your project to life.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Categories -->
    <section class="categories-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Popular Categories</h2>
          <p class="section-description">Explore projects across different technology domains</p>
        </div>
        
        <div class="categories-grid">
          <div class="category-card" *ngFor="let category of categories.slice(0, 6)">
            <div class="category-content">
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-count">{{ category.count }} projects</p>
            </div>
            <div class="category-arrow">
              <lucide-icon [img]="arrowIcon"></lucide-icon>
            </div>
          </div>
        </div>
        
        <div class="section-footer">
          <a routerLink="/categories" class="btn btn-secondary">
            View All Categories
            <lucide-icon [img]="arrowIcon"></lucide-icon>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .featured-section,
    .categories-section {
      padding: 4rem 0;
      background: white;
    }

    .how-it-works {
      padding: 4rem 0;
      background: #f7fafc;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .section-description {
      font-size: 1.125rem;
      color: #718096;
      max-width: 600px;
      margin: 0 auto;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .step-card {
      text-align: center;
      padding: 2rem;
    }

    .step-icon {
      width: 4rem;
      height: 4rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      color: white;
    }

    .step-icon lucide-icon {
      width: 2rem;
      height: 2rem;
    }

    .step-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .step-description {
      color: #4a5568;
      line-height: 1.6;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .category-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .category-card:hover {
      border-color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    }

    .category-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.25rem;
    }

    .category-count {
      color: #718096;
      font-size: 0.875rem;
      margin: 0;
    }

    .category-arrow {
      color: #cbd5e0;
      transition: all 0.2s ease;
    }

    .category-card:hover .category-arrow {
      color: #667eea;
      transform: translateX(4px);
    }

    .section-footer {
      text-align: center;
    }

    @media (max-width: 768px) {
      .featured-section,
      .how-it-works,
      .categories-section {
        padding: 2rem 0;
      }

      .section-title {
        font-size: 2rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .steps-grid,
      .categories-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  categories: ProjectCategory[] = [];
  
  arrowIcon = ArrowRight;
  lightbulbIcon = Lightbulb;
  targetIcon = Target;
  handshakeIcon = Handshake;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getFeaturedProjects().subscribe(projects => {
      this.featuredProjects = projects;
    });

    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
