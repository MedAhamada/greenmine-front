// Define core types for the application

export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled';

export type ProjectPhase = 'discovery' | 'design' | 'development' | 'maintenance';

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'devops' | 'infrastructure' | 'other';

export interface Employee {
  id: string;
  name: string;
  role: string;
  hourlyRate: number;
  skills: string[];
  availability: number; // hours per week
  avatar?: string;
}

export interface Assignment {
  id: string;
  employeeId: string;
  projectId: string;
  phaseId: string;
  startDate: string;
  endDate: string;
  hoursAllocated: number;
  hoursUsed: number;
}

export interface Phase {
  id: string;
  projectId: string;
  type: ProjectPhase;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  startDate: string;
  endDate: string;
  estimatedHours: number;
  actualHours: number;
  assignedEmployees: Assignment[];
  deliverables: string[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  category: ProjectCategory;
  startDate: string;
  endDate: string;
  projectManager: string;
  budget: number;
  expenses: number;
  phases: Phase[];
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  status?: ProjectStatus[];
  category?: ProjectCategory[];
  client?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  projectManager?: string;
  tags?: string[];
  search?: string;
}