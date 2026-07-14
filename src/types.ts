export interface Project {
  id: string;
  title: string;
  stack: string[];
  summary: string;
  detail: string;
  githubUrl: string;
}

export interface InterestDomain {
  domain: string;
  status: 'Active' | 'Learning' | 'Exploring';
  details: string;
}

export interface Achievement {
  title: string;
  description: string;
  year?: string;
  authority?: string;
}

export interface FocusItem {
  learning: string[];
  building: string[];
  exploring: string[];
}
