import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Project, Developer, ProjectCategory } from '../models/project.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projects: Project[] = [];
  private categories: ProjectCategory[] = [
    { id: '1', name: 'AI & Machine Learning', icon: 'brain', count: 0 },
    { id: '2', name: 'Blockchain & Web3', icon: 'link', count: 0 },
    { id: '3', name: 'IoT & Hardware', icon: 'cpu', count: 0 },
    { id: '4', name: 'Mobile Apps', icon: 'smartphone', count: 0 },
    { id: '5', name: 'Web Applications', icon: 'globe', count: 0 },
    { id: '6', name: 'Fintech', icon: 'credit-card', count: 0 },
    { id: '7', name: 'Healthcare', icon: 'heart', count: 0 },
    { id: '8', name: 'EdTech', icon: 'book-open', count: 0 }
  ];

  constructor() {
    this.generateMockData();
  }

  private generateMockData(): void {
    const techStacks = [
      ['React', 'Node.js', 'MongoDB'],
      ['Angular', 'TypeScript', 'PostgreSQL'],
      ['Vue.js', 'Python', 'Django'],
      ['React Native', 'Firebase', 'GraphQL'],
      ['Flutter', 'Dart', 'AWS'],
      ['Next.js', 'Prisma', 'Supabase'],
      ['Svelte', 'FastAPI', 'Redis'],
      ['Nuxt.js', 'Express', 'MySQL']
    ];

    const projectTitles = [
      'AI-Powered Code Review Assistant',
      'Decentralized Identity Management',
      'Smart Home Energy Optimizer',
      'Real-time Language Translator',
      'Blockchain Supply Chain Tracker',
      'Mental Health Monitoring App',
      'Automated Trading Algorithm',
      'Virtual Reality Learning Platform',
      'IoT-based Agricultural Monitor',
      'Predictive Maintenance System',
      'Social Impact Investment Platform',
      'Augmented Reality Shopping Assistant'
    ];

    for (let i = 0; i < 12; i++) {
      const category = this.categories[Math.floor(Math.random() * this.categories.length)];
      const tech = techStacks[Math.floor(Math.random() * techStacks.length)];
      
      const developer: Developer = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=400&fit=crop&crop=face`,
        title: faker.person.jobTitle(),
        location: `${faker.location.city()}, ${faker.location.country()}`,
        experience: faker.number.int({ min: 2, max: 15 }),
        skills: tech.concat(faker.helpers.arrayElements(['Docker', 'Kubernetes', 'AWS', 'Azure', 'Git', 'CI/CD'], 3)),
        bio: faker.lorem.paragraph(),
        contact: {
          email: faker.internet.email(),
          linkedin: faker.internet.url(),
          github: faker.internet.url(),
          website: faker.internet.url()
        }
      };

      const fundingGoal = faker.number.int({ min: 50000, max: 500000 });
      const currentFunding = faker.number.int({ min: 0, max: fundingGoal * 0.8 });

      const project: Project = {
        id: faker.string.uuid(),
        title: projectTitles[i] || faker.commerce.productName(),
        description: faker.lorem.paragraphs(3),
        shortDescription: faker.lorem.sentence(),
        category: category.name,
        techStack: tech,
        status: faker.helpers.arrayElement(['concept', 'prototype', 'mvp', 'beta']),
        fundingGoal,
        currentFunding,
        createdAt: faker.date.recent({ days: 30 }),
        developer,
        images: [
          `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=400&fit=crop`,
          `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=400&fit=crop`
        ],
        demoUrl: Math.random() > 0.5 ? faker.internet.url() : undefined,
        githubUrl: Math.random() > 0.3 ? faker.internet.url() : undefined,
        tags: faker.helpers.arrayElements(['innovative', 'scalable', 'disruptive', 'sustainable', 'ai-powered', 'user-friendly'], 3)
      };

      this.projects.push(project);
      category.count++;
    }
  }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getFeaturedProjects(): Observable<Project[]> {
    const featured = this.projects
      .filter(p => p.currentFunding / p.fundingGoal > 0.3)
      .slice(0, 3);
    return of(featured);
  }

  getProjectsByCategory(categoryName: string): Observable<Project[]> {
    const filtered = this.projects.filter(p => p.category === categoryName);
    return of(filtered);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }

  getCategories(): Observable<ProjectCategory[]> {
    return of(this.categories);
  }

  searchProjects(query: string): Observable<Project[]> {
    const filtered = this.projects.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filtered);
  }
}
