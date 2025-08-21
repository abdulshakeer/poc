import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Search } from 'lucide-angular';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { DataService } from '../../services/data.service';
import { Project, ProjectCategory } from '../../models/project.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProjectCardComponent],
  template: `
    <section class="projects-page">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">All Projects</h1>
          <p class="page-description">Discover innovative projects seeking investment and collaboration</p>
        </div>
        
        <div class="filters-section">
          <div class="search-bar">
            <lucide-icon [img]="searchIcon" class="search-icon"></lucide-icon>
            <input 
              type="text" 
              placeholder="Search projects by name, technology, or category..." 
              class="search-input"
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
            />
          </div>
          
          <div class="filter-controls">
            <div class="filter-group">
              <label class="filter-label">Category</label>
              <select class="filter-select" [(ngModel)]="selectedCategory" (change)="onFilterChange()">
                <option value="">All Categories</option>
                <option *ngFor="let category of categories" [value]="category.name">{{ category.name }}</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Status</label>
              <select class="filter-select" [(ngModel)]="selectedStatus" (change)="onFilterChange()">
                <option value="">All Status</option>
                <option value="concept">Concept</option>
                <option value="prototype">Prototype</option>
                <option value="mvp">MVP</option>
                <option value="beta">Beta</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Sort By</label>
              <select class="filter-select" [(ngModel)]="sortBy" (change)="onSortChange()">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="funding">Funding Progress</option>
                <option value="goal">Funding Goal</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="projects-grid">
          <app-project-card 
            *ngFor="let project of filteredProjects" 
            [project]="project">
          </app-project-card>
        </div>
        
        <div class="empty-state" *ngIf="filteredProjects.length === 0">
          <h3>No projects found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-page {
      padding: 2rem 0 4rem;
      min-height: 100vh;
      background: #f7fafc;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .page-description {
      font-size: 1.125rem;
      color: #718096;
      max-width: 600px;
      margin: 0 auto;
    }

    .filters-section {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .search-bar {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #a0aec0;
      width: 1.25rem;
      height: 1.25rem;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .filter-controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-label {
      font-weight: 600;
      color: #4a5568;
      font-size: 0.875rem;
    }

    .filter-select {
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      background: white;
      font-size: 0.875rem;
      transition: border-color 0.2s ease;
    }

    .filter-select:focus {
      outline: none;
      border-color: #667eea;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #718096;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #4a5568;
    }

    @media (max-width: 768px) {
      .projects-page {
        padding: 1rem 0 2rem;
      }

      .page-title {
        font-size: 2rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .filter-controls {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: ProjectCategory[] = [];
  
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  sortBy: string = 'newest';
  
  searchIcon = Search;
  filterIcon = Filter;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = [...projects];
      this.applySorting();
    });

    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applySorting();
  }

  private applyFilters(): void {
    let filtered = [...this.projects];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(project => project.category === this.selectedCategory);
    }

    // Apply status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(project => project.status === this.selectedStatus);
    }

    this.filteredProjects = filtered;
    this.applySorting();
  }

  private applySorting(): void {
    switch (this.sortBy) {
      case 'newest':
        this.filteredProjects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'oldest':
        this.filteredProjects.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'funding':
        this.filteredProjects.sort((a, b) => 
          (b.currentFunding / b.fundingGoal) - (a.currentFunding / a.fundingGoal)
        );
        break;
      case 'goal':
        this.filteredProjects.sort((a, b) => b.fundingGoal - a.fundingGoal);
        break;
    }
  }
}
