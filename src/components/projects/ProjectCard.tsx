import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Coins } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import { 
  Project, 
  Employee 
} from '../../types';
import { 
  formatDate, 
  calculateProjectCompletion, 
  calculateBudgetUtilization,
  getStatusColor,
  getPriorityColor
} from '../../utils';

interface ProjectCardProps {
  project: Project;
  employees: Employee[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, employees }) => {
  const completion = calculateProjectCompletion(project);
  const budgetUtilization = calculateBudgetUtilization(project);
  
  // Determine progress bar color based on budget utilization
  const getBudgetColor = () => {
    if (budgetUtilization > 100) return 'red';
    if (budgetUtilization > 90) return 'amber';
    return 'blue';
  };
  
  // Get project manager name
  const getProjectManagerName = () => {
    const manager = employees.find(emp => emp.id === project.projectManager);
    return manager ? manager.name : 'Unassigned';
  };
  
  // Count total staff assigned to the project (unique employees)
  const getStaffCount = () => {
    const uniqueEmployeeIds = new Set();
    project.phases.forEach(phase => {
      phase.assignedEmployees.forEach(assignment => {
        uniqueEmployeeIds.add(assignment.employeeId);
      });
    });
    return uniqueEmployeeIds.size;
  };

  return (
    <Card hoverable className="h-full">
      <CardBody className="pb-2">
        <div className="flex justify-between items-start mb-3">
          <Link to={`/projects/${project.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {project.name}
          </Link>
          <div className="flex space-x-2">
            <Badge 
              text={project.status}
              className={getStatusColor(project.status)}
              size="sm"
            />
            <Badge 
              text={project.priority}
              className={getPriorityColor(project.priority)}
              size="sm"
            />
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{project.description.substring(0, 80)}...</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Coins className="h-4 w-4 mr-2 text-gray-500" />
            <span>${project.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>{getStaffCount()} team members</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{project.phases.length} phases</span>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div>
            <ProgressBar 
              progress={completion} 
              label="Progress" 
              size="sm"
            />
          </div>
          <div>
            <ProgressBar 
              progress={budgetUtilization} 
              label="Budget" 
              size="sm"
              color={getBudgetColor()}
            />
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between items-center text-sm">
        <div className="text-gray-600">
          Client: <span className="font-medium">{project.client}</span>
        </div>
        <div className="text-gray-600">
          PM: <span className="font-medium">{getProjectManagerName()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;