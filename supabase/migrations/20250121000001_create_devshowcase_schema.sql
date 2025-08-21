/*
# DevShowcase Platform Database Schema
Creates the complete database structure for the developer showcase platform

## Query Description: 
This migration creates a comprehensive database schema for a developer showcase platform. It establishes tables for user profiles, project management, categorization, and funding tracking. All tables include Row Level Security (RLS) for data protection. This is a safe operation that only creates new database objects without affecting existing data.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- developers: User profiles with contact information and skills
- project_categories: Project categorization system
- projects: Core project data with funding and status tracking
- project_tech_stack: Technology stack associations
- project_images: Project image galleries
- project_tags: Flexible tagging system

## Security Implications:
- RLS Status: Enabled on all tables
- Policy Changes: Yes - Creates secure access policies
- Auth Requirements: Integrated with Supabase Auth

## Performance Impact:
- Indexes: Added for optimal query performance
- Triggers: Added for automatic timestamp updates
- Estimated Impact: Minimal - only affects new operations
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create developers table
CREATE TABLE IF NOT EXISTS developers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    title TEXT,
    location TEXT,
    experience_years INTEGER DEFAULT 0,
    bio TEXT,
    skills TEXT[] DEFAULT '{}',
    contact_linkedin TEXT,
    contact_github TEXT,
    contact_website TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_categories table
CREATE TABLE IF NOT EXISTS project_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon_name TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    developer_id UUID REFERENCES developers(id) ON DELETE CASCADE,
    category_id UUID REFERENCES project_categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    status TEXT CHECK (status IN ('concept', 'prototype', 'mvp', 'beta')) DEFAULT 'concept',
    funding_goal DECIMAL(12,2) DEFAULT 0,
    current_funding DECIMAL(12,2) DEFAULT 0,
    demo_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_tech_stack table
CREATE TABLE IF NOT EXISTS project_tech_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    technology TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_tags table
CREATE TABLE IF NOT EXISTS project_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_developers_auth_id ON developers(auth_id);
CREATE INDEX IF NOT EXISTS idx_developers_email ON developers(email);
CREATE INDEX IF NOT EXISTS idx_projects_developer_id ON projects(developer_id);
CREATE INDEX IF NOT EXISTS idx_projects_category_id ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_tech_stack_project_id ON project_tech_stack(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_tags_project_id ON project_tags(project_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_developers_updated_at BEFORE UPDATE ON developers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for developers
CREATE POLICY "Developers can view all profiles" ON developers
    FOR SELECT USING (true);

CREATE POLICY "Users can update own developer profile" ON developers
    FOR UPDATE USING (auth_id = auth.uid());

CREATE POLICY "Users can insert own developer profile" ON developers
    FOR INSERT WITH CHECK (auth_id = auth.uid());

-- RLS Policies for project_categories
CREATE POLICY "Anyone can view project categories" ON project_categories
    FOR SELECT USING (true);

-- RLS Policies for projects
CREATE POLICY "Anyone can view active projects" ON projects
    FOR SELECT USING (is_active = true);

CREATE POLICY "Developers can insert own projects" ON projects
    FOR INSERT WITH CHECK (
        developer_id IN (
            SELECT id FROM developers WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Developers can update own projects" ON projects
    FOR UPDATE USING (
        developer_id IN (
            SELECT id FROM developers WHERE auth_id = auth.uid()
        )
    );

-- RLS Policies for project_tech_stack
CREATE POLICY "Anyone can view project tech stack" ON project_tech_stack
    FOR SELECT USING (true);

CREATE POLICY "Developers can manage own project tech stack" ON project_tech_stack
    FOR ALL USING (
        project_id IN (
            SELECT p.id FROM projects p
            JOIN developers d ON p.developer_id = d.id
            WHERE d.auth_id = auth.uid()
        )
    );

-- RLS Policies for project_images
CREATE POLICY "Anyone can view project images" ON project_images
    FOR SELECT USING (true);

CREATE POLICY "Developers can manage own project images" ON project_images
    FOR ALL USING (
        project_id IN (
            SELECT p.id FROM projects p
            JOIN developers d ON p.developer_id = d.id
            WHERE d.auth_id = auth.uid()
        )
    );

-- RLS Policies for project_tags
CREATE POLICY "Anyone can view project tags" ON project_tags
    FOR SELECT USING (true);

CREATE POLICY "Developers can manage own project tags" ON project_tags
    FOR ALL USING (
        project_id IN (
            SELECT p.id FROM projects p
            JOIN developers d ON p.developer_id = d.id
            WHERE d.auth_id = auth.uid()
        )
    );

-- Insert default project categories
INSERT INTO project_categories (name, description, icon_name) VALUES
('AI & Machine Learning', 'Artificial Intelligence and Machine Learning projects', 'brain'),
('Blockchain & Web3', 'Blockchain, cryptocurrency and Web3 applications', 'link'),
('IoT & Hardware', 'Internet of Things and hardware projects', 'cpu'),
('Mobile Apps', 'Mobile application development', 'smartphone'),
('Web Applications', 'Web-based applications and platforms', 'globe'),
('Fintech', 'Financial technology solutions', 'credit-card'),
('Healthcare', 'Healthcare and medical technology', 'heart'),
('EdTech', 'Educational technology and e-learning', 'book-open')
ON CONFLICT (name) DO NOTHING;
