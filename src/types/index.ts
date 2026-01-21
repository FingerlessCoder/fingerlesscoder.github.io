export interface Project {
  name: string;
  description: string;
  github?: string;
  url?: string;
  tags: string[];
  category: 'web' | 'tooling' | 'library' | 'game';
  image: string;
  featured: boolean;
}

export interface NavigationItem {
  title: string;
  url: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
