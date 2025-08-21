import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ExternalLink, Github, Star, TrendingUp } from 'lucide-angular';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="project-card card">
      <div class="project-image">
        <img [src]="project.images[0]" [alt]="project.title" />
        <div class="project-status">
          <span class="status-badge" [class]="'status-' + project.status">{{ project.status }}</span>
        </div>
      </div>
      
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">{{ project.title }}</h3>
          <span class="project-category">{{ project.category }}</span>
        </div>
        
        <p class="project-description">{{ project.shortDescription }}</p>
        
        <div class="project-tech">
          <span class="tech-tag" *ngFor="let tech of project.techStack.slice(0, 3)">{{ tech }}</span>
          <span class="tech-more" *ngIf="project.techStack.length > 3">+{{ project.techStack.length - 3 }}</span>
        </div>
        
        <div class="project-funding">
          <div class="funding-info">
            <span class="funding-current">${{ (project.currentFunding / 1000).toFixed(0) }}K</span>
            <span class="funding-goal">of ${{ (project.fundingGoal / 1000).toFixed(0) }}K goal</span>
          </div>
          <div class="funding-progress">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="getFundingPercentage()"></div>
            </div>
            <span class="progress-text">{{ getFundingPercentage() }}%</span>
          </div>
        </div>
        
        <div class="project-footer">
          <div class="developer-info">
            <img [src]="project.developer.avatar" [alt]="project.developer.name" class="developer-avatar" />
            <div class="developer-details">
              <span class="developer-name">{{ project.developer.name }}</span>
              <span class="developer-title">{{ project.developer.title }}</span>
            </div>
          </div>
          
          <div class="project-actions">
            <a [href]="project.demoUrl" *ngIf="project.demoUrl" target="_blank" class="action-btn" title="View Demo">
              <lucide-icon [img]="externalIcon"></lucide-icon>
            </a>
            <a [href]="project.githubUrl" *ngIf="project.githubUrl" target="_blank" class="action-btn" title="View Code">
              <lucide-icon [img]="githubIcon"></lucide-icon>
            </a>
            <button class="action-btn action-btn-primary" title="Contact Developer">
              <lucide-icon [img]="starIcon"></lucide-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .project-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image img {
      transform: scale(1.05);
    }

    .project-status {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }

    .status-badge {
      background: rgba(255, 255, 255, 0.9);
      color: #2d3748;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-concept { background: rgba(99, 102, 241, 0.9); color: white; }
    .status-prototype { background: rgba(245, 158, 11, 0.9); color: white; }
    .status-mvp { background: rgba(34, 197, 94, 0.9); color: white; }
    .status-beta { background: rgba(168, 85, 247, 0.9); color: white; }

    .project-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .project-header {
      margin-bottom: 1rem;
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
    }

    .project-category {
      color: #667eea;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .project-description {
      color: #4a5568;
      line-height: 1.5;
      margin-bottom: 1rem;
      flex: 1;
    }

    .project-tech {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .tech-tag {
      background: #edf2f7;
      color: #4a5568;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .tech-more {
      background: #e2e8f0;
      color: #718096;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
    }

    .project-funding {
      background: #f7fafc;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .funding-info {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .funding-current {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
    }

    .funding-goal {
      color: #718096;
      font-size: 0.875rem;
    }

    .funding-progress {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .progress-bar {
      flex: 1;
      height: 0.5rem;
      background: #e2e8f0;
      border-radius: 0.25rem;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.75rem;
      font-weight: 600;
      color: #4a5568;
      min-width: 2.5rem;
    }

    .project-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .developer-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .developer-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
    }

    .developer-details {
      display: flex;
      flex-direction: column;
    }

    .developer-name {
      font-weight: 600;
      color: #2d3748;
      font-size: 0.875rem;
    }

    .developer-title {
      color: #718096;
      font-size: 0.75rem;
    }

    .project-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      background: white;
      color: #4a5568;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .action-btn:hover {
      border-color: #cbd5e0;
      transform: translateY(-1px);
    }

    .action-btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
    }

    .action-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
    }

    .action-btn lucide-icon {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class ProjectCardComponent {
  @Input() project!: Project;
  
  externalIcon = ExternalLink;
  githubIcon = Github;
  starIcon = Star;
  trendingIcon = TrendingUp;

  getFundingPercentage(): number {
    return Math.round((this.project.currentFunding / this.project.fundingGoal) * 100);
  }
}
