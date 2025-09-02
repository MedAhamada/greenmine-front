import { Project, Phase, Assignment, Employee, FilterOptions } from '../types';

// Calculate the budget utilization percentage
export const calculateBudgetUtilization = (project: Project): number => {
  return Math.round((project.expenses / project.budget) * 100);
};

// Calculate budget status with color indicator
export const getBudgetStatus = (project: Project): { status: string; color: string } => {
  const utilization = calculateBudgetUtilization(project);
  
  if (utilization > 100) return { status: 'Over Budget', color: 'text-red-600' };
  if (utilization > 90) return { status: 'At Risk', color: 'text-amber-500' };
  if (utilization > 70) return { status: 'On Track', color: 'text-blue-600' };
  return { status: 'Under Budget', color: 'text-green-600' };
};

// Calculate phase completion percentage
export const calculatePhaseCompletion = (phase: Phase): number => {
  if (phase.status === 'completed') return 100;
  if (phase.status === 'not-started') return 0;
  
  // For in-progress phases, calculate based on hours used vs estimated
  const completion = Math.round((phase.actualHours / phase.estimatedHours) * 100);
  return Math.min(completion, 99); // Cap at 99% until explicitly marked as completed
};

// Calculate overall project completion
export const calculateProjectCompletion = (project: Project): number => {
  if (project.phases.length === 0) return 0;
  
  const totalWeight = project.phases.reduce((sum, phase) => sum + phase.estimatedHours, 0);
  if (totalWeight === 0) return 0;
  
  const weightedCompletion = project.phases.reduce((sum, phase) => {
    const phaseCompletion = calculatePhaseCompletion(phase);
    const weight = phase.estimatedHours / totalWeight;
    return sum + (phaseCompletion * weight);
  }, 0);
  
  return Math.round(weightedCompletion);
};

// Format date to localized string
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate days remaining until project/phase end
export const calculateDaysRemaining = (endDate: string): number => {
  const end = new Date(endDate);
  const today = new Date();
  
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(diffDays, 0); // Don't return negative days
};

// Apply filters to projects
export const filterProjects = (projects: Project[], filters: FilterOptions): Project[] => {
  return projects.filter(project => {
    // Filter by status
    if (filters.status && filters.status.length > 0 && !filters.status.includes(project.status)) {
      return false;
    }
    
    // Filter by category
    if (filters.category && filters.category.length > 0 && !filters.category.includes(project.category)) {
      return false;
    }
    
    // Filter by client
    if (filters.client && project.client.toLowerCase() !== filters.client.toLowerCase()) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange) {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
      const filterStartDate = new Date(filters.dateRange.start);
      const filterEndDate = new Date(filters.dateRange.end);
      
      if (startDate > filterEndDate || endDate < filterStartDate) {
        return false;
      }
    }
    
    // Filter by project manager
    if (filters.projectManager && project.projectManager !== filters.projectManager) {
      return false;
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => project.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }
    
    // Filter by search term (looks in name, description, client)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = project.name.toLowerCase().includes(searchLower);
      const matchesDescription = project.description.toLowerCase().includes(searchLower);
      const matchesClient = project.client.toLowerCase().includes(searchLower);
      
      if (!matchesName && !matchesDescription && !matchesClient) {
        return false;
      }
    }
    
    return true;
  });
};

// Find employee by ID
export const findEmployeeById = (employees: Employee[], id: string): Employee | undefined => {
  return employees.find(employee => employee.id === id);
};

// Calculate staffing cost for a phase
export const calculatePhaseCost = (phase: Phase, employees: Employee[]): number => {
  return phase.assignedEmployees.reduce((total, assignment) => {
    const employee = findEmployeeById(employees, assignment.employeeId);
    if (!employee) return total;
    
    return total + (assignment.hoursUsed * employee.hourlyRate);
  }, 0);
};

// Get project status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'on-hold':
      return 'bg-amber-100 text-amber-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'in-progress':
      return 'bg-indigo-100 text-indigo-800';
    case 'not-started':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get priority color
export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'low':
      return 'bg-blue-100 text-blue-800';
    case 'medium':
      return 'bg-green-100 text-green-800';
    case 'high':
      return 'bg-amber-100 text-amber-800';
    case 'critical':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};