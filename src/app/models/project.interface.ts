export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  techStack: string[];
  status: 'concept' | 'prototype' | 'mvp' | 'beta';
  fundingGoal: number;
  currentFunding: number;
  createdAt: Date;
  developer: Developer;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
}

export interface Developer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  experience: number;
  skills: string[];
  bio: string;
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface ProjectCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}
