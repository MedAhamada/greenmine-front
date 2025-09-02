import { Project, Employee, ProjectStatus, ProjectPhase, ProjectCategory } from '../types';

// Generate realistic mock data
export const employees: Employee[] = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    role: 'Project Manager',
    hourlyRate: 85,
    skills: ['management', 'agile', 'scrum', 'client relations'],
    availability: 40,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Senior Developer',
    hourlyRate: 75,
    skills: ['javascript', 'react', 'node.js', 'typescript'],
    availability: 40,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'UX/UI Designer',
    hourlyRate: 70,
    skills: ['figma', 'sketch', 'user research', 'prototyping'],
    availability: 30,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '4',
    name: 'Jamal Wilson',
    role: 'DevOps Engineer',
    hourlyRate: 80,
    skills: ['docker', 'kubernetes', 'CI/CD', 'aws'],
    availability: 40,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '5',
    name: 'Olivia Park',
    role: 'Business Analyst',
    hourlyRate: 65,
    skills: ['requirements gathering', 'documentation', 'user stories'],
    availability: 40,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Generate projects with phases and assignments
export const projects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    client: 'FashionRetail Inc.',
    description: 'Complete redesign of the existing e-commerce platform with improved UX and mobile experience.',
    status: 'active',
    category: 'web',
    startDate: '2025-01-15',
    endDate: '2025-06-30',
    projectManager: '1', // Emma Rodriguez
    budget: 120000,
    expenses: 65000,
    tags: ['e-commerce', 'redesign', 'responsive'],
    priority: 'high',
    createdAt: '2025-01-10',
    updatedAt: '2025-04-12',
    phases: [
      {
        id: '101',
        projectId: '1',
        type: 'discovery',
        name: 'Discovery Phase',
        description: 'Understand client requirements and prepare technical proposal.',
        status: 'completed',
        startDate: '2025-01-15',
        endDate: '2025-02-15',
        estimatedHours: 80,
        actualHours: 85,
        assignedEmployees: [
          {
            id: '1001',
            employeeId: '1', // Emma Rodriguez
            projectId: '1',
            phaseId: '101',
            startDate: '2025-01-15',
            endDate: '2025-02-15',
            hoursAllocated: 40,
            hoursUsed: 45,
          },
          {
            id: '1002',
            employeeId: '5', // Olivia Park
            projectId: '1',
            phaseId: '101',
            startDate: '2025-01-15',
            endDate: '2025-02-15',
            hoursAllocated: 40,
            hoursUsed: 40,
          }
        ],
        deliverables: ['Project Proposal', 'Requirements Document', 'Technical Specification'],
      },
      {
        id: '102',
        projectId: '1',
        type: 'design',
        name: 'UI/UX Design',
        description: 'Create comprehensive design system and user interface prototypes.',
        status: 'completed',
        startDate: '2025-02-16',
        endDate: '2025-03-30',
        estimatedHours: 120,
        actualHours: 130,
        assignedEmployees: [
          {
            id: '1003',
            employeeId: '3', // Sarah Johnson
            projectId: '1',
            phaseId: '102',
            startDate: '2025-02-16',
            endDate: '2025-03-30',
            hoursAllocated: 120,
            hoursUsed: 130,
          }
        ],
        deliverables: ['Design System', 'UI Components', 'Interactive Prototype'],
      },
      {
        id: '103',
        projectId: '1',
        type: 'development',
        name: 'Frontend Development',
        description: 'Implement responsive front-end based on approved designs.',
        status: 'in-progress',
        startDate: '2025-04-01',
        endDate: '2025-05-30',
        estimatedHours: 240,
        actualHours: 160,
        assignedEmployees: [
          {
            id: '1004',
            employeeId: '2', // Michael Chen
            projectId: '1',
            phaseId: '103',
            startDate: '2025-04-01',
            endDate: '2025-05-30',
            hoursAllocated: 240,
            hoursUsed: 160,
          }
        ],
        deliverables: ['Responsive Frontend Implementation', 'Integration with API', 'UAT Environment'],
      },
      {
        id: '104',
        projectId: '1',
        type: 'maintenance',
        name: 'Deployment & Initial Support',
        description: 'Deploy to production and provide initial support.',
        status: 'not-started',
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        estimatedHours: 80,
        actualHours: 0,
        assignedEmployees: [
          {
            id: '1005',
            employeeId: '4', // Jamal Wilson
            projectId: '1',
            phaseId: '104',
            startDate: '2025-06-01',
            endDate: '2025-06-30',
            hoursAllocated: 80,
            hoursUsed: 0,
          }
        ],
        deliverables: ['Production Deployment', 'Documentation', 'Knowledge Transfer'],
      }
    ]
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    client: 'SecureBank Ltd.',
    description: 'Develop a secure and user-friendly mobile banking application with advanced transaction capabilities.',
    status: 'active',
    category: 'mobile',
    startDate: '2025-02-01',
    endDate: '2025-08-15',
    projectManager: '1', // Emma Rodriguez
    budget: 180000,
    expenses: 90000,
    tags: ['banking', 'mobile', 'security'],
    priority: 'critical',
    createdAt: '2025-01-20',
    updatedAt: '2025-04-10',
    phases: [
      {
        id: '201',
        projectId: '2',
        type: 'discovery',
        name: 'Discovery & Requirements',
        description: 'Gather detailed requirements and create technical specifications.',
        status: 'completed',
        startDate: '2025-02-01',
        endDate: '2025-03-01',
        estimatedHours: 100,
        actualHours: 110,
        assignedEmployees: [
          {
            id: '2001',
            employeeId: '1', // Emma Rodriguez
            projectId: '2',
            phaseId: '201',
            startDate: '2025-02-01',
            endDate: '2025-03-01',
            hoursAllocated: 60,
            hoursUsed: 65,
          },
          {
            id: '2002',
            employeeId: '5', // Olivia Park
            projectId: '2',
            phaseId: '201',
            startDate: '2025-02-01',
            endDate: '2025-03-01',
            hoursAllocated: 40,
            hoursUsed: 45,
          }
        ],
        deliverables: ['Requirements Document', 'Security Specifications', 'Project Plan'],
      },
      {
        id: '202',
        projectId: '2',
        type: 'design',
        name: 'UX/UI Design',
        description: 'Design modern and intuitive user interfaces for the banking app.',
        status: 'completed',
        startDate: '2025-03-02',
        endDate: '2025-04-15',
        estimatedHours: 150,
        actualHours: 155,
        assignedEmployees: [
          {
            id: '2003',
            employeeId: '3', // Sarah Johnson
            projectId: '2',
            phaseId: '202',
            startDate: '2025-03-02',
            endDate: '2025-04-15',
            hoursAllocated: 150,
            hoursUsed: 155,
          }
        ],
        deliverables: ['UI Design System', 'Mobile App Screens', 'Interactive Prototypes'],
      },
      {
        id: '203',
        projectId: '2',
        type: 'development',
        name: 'App Development',
        description: 'Develop secure mobile application with all required functionalities.',
        status: 'in-progress',
        startDate: '2025-04-16',
        endDate: '2025-07-15',
        estimatedHours: 400,
        actualHours: 180,
        assignedEmployees: [
          {
            id: '2004',
            employeeId: '2', // Michael Chen
            projectId: '2',
            phaseId: '203',
            startDate: '2025-04-16',
            endDate: '2025-07-15',
            hoursAllocated: 300,
            hoursUsed: 140,
          },
          {
            id: '2005',
            employeeId: '4', // Jamal Wilson
            projectId: '2',
            phaseId: '203',
            startDate: '2025-05-01',
            endDate: '2025-07-15',
            hoursAllocated: 100,
            hoursUsed: 40,
          }
        ],
        deliverables: ['Mobile Application (iOS/Android)', 'Backend Integration', 'Security Implementation'],
      },
      {
        id: '204',
        projectId: '2',
        type: 'maintenance',
        name: 'Testing & Deployment',
        description: 'Comprehensive testing, deployment, and initial support.',
        status: 'not-started',
        startDate: '2025-07-16',
        endDate: '2025-08-15',
        estimatedHours: 120,
        actualHours: 0,
        assignedEmployees: [
          {
            id: '2006',
            employeeId: '4', // Jamal Wilson
            projectId: '2',
            phaseId: '204',
            startDate: '2025-07-16',
            endDate: '2025-08-15',
            hoursAllocated: 60,
            hoursUsed: 0,
          },
          {
            id: '2007',
            employeeId: '2', // Michael Chen
            projectId: '2',
            phaseId: '204',
            startDate: '2025-07-16',
            endDate: '2025-08-15',
            hoursAllocated: 60,
            hoursUsed: 0,
          }
        ],
        deliverables: ['Test Reports', 'App Store Deployment', 'Support Documentation'],
      }
    ]
  },
  {
    id: '3',
    name: 'DevOps Infrastructure Upgrade',
    client: 'TechCorp Global',
    description: 'Modernize the existing CI/CD pipeline and infrastructure to improve deployment efficiency.',
    status: 'on-hold',
    category: 'devops',
    startDate: '2025-03-01',
    endDate: '2025-05-30',
    projectManager: '1', // Emma Rodriguez
    budget: 90000,
    expenses: 30000,
    tags: ['devops', 'ci/cd', 'infrastructure'],
    priority: 'medium',
    createdAt: '2025-02-15',
    updatedAt: '2025-04-01',
    phases: [
      {
        id: '301',
        projectId: '3',
        type: 'discovery',
        name: 'Assessment & Planning',
        description: 'Evaluate current infrastructure and plan the upgrade process.',
        status: 'completed',
        startDate: '2025-03-01',
        endDate: '2025-03-15',
        estimatedHours: 60,
        actualHours: 65,
        assignedEmployees: [
          {
            id: '3001',
            employeeId: '4', // Jamal Wilson
            projectId: '3',
            phaseId: '301',
            startDate: '2025-03-01',
            endDate: '2025-03-15',
            hoursAllocated: 60,
            hoursUsed: 65,
          }
        ],
        deliverables: ['Current State Assessment', 'Upgrade Plan', 'Risk Analysis'],
      },
      {
        id: '302',
        projectId: '3',
        type: 'development',
        name: 'Infrastructure Implementation',
        description: 'Deploy and configure new infrastructure components.',
        status: 'in-progress',
        startDate: '2025-03-16',
        endDate: '2025-04-30',
        estimatedHours: 120,
        actualHours: 80,
        assignedEmployees: [
          {
            id: '3002',
            employeeId: '4', // Jamal Wilson
            projectId: '3',
            phaseId: '302',
            startDate: '2025-03-16',
            endDate: '2025-04-30',
            hoursAllocated: 120,
            hoursUsed: 80,
          }
        ],
        deliverables: ['CI/CD Pipeline Configuration', 'Container Orchestration Setup', 'Monitoring Implementation'],
      },
      {
        id: '303',
        projectId: '3',
        type: 'maintenance',
        name: 'Migration & Training',
        description: 'Migrate existing applications and train the team on new infrastructure.',
        status: 'not-started',
        startDate: '2025-05-01',
        endDate: '2025-05-30',
        estimatedHours: 100,
        actualHours: 0,
        assignedEmployees: [
          {
            id: '3003',
            employeeId: '4', // Jamal Wilson
            projectId: '3',
            phaseId: '303',
            startDate: '2025-05-01',
            endDate: '2025-05-30',
            hoursAllocated: 80,
            hoursUsed: 0,
          },
          {
            id: '3004',
            employeeId: '1', // Emma Rodriguez
            projectId: '3',
            phaseId: '303',
            startDate: '2025-05-15',
            endDate: '2025-05-30',
            hoursAllocated: 20,
            hoursUsed: 0,
          }
        ],
        deliverables: ['Migration Report', 'Training Materials', 'Handover Documentation'],
      }
    ]
  }
];