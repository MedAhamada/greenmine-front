import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Coins, Users, Clock, Edit, Trash2, Check, X, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import PhaseCard from '../components/projects/PhaseCard';
import { useProjects } from '../contexts/ProjectContext';
import { 
  formatDate, 
  calculateBudgetUtilization, 
  calculateProjectCompletion,
  getStatusColor,
  getPriorityColor,
  getBudgetStatus
} from '../utils';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById, employees } = useProjects();
  const project = getProjectById(id || '');
  
  if (!project) {
    return (
      <Layout title="Project Not Found">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Project not found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }
  
  const completion = calculateProjectCompletion(project);
  const budgetUtilization = calculateBudgetUtilization(project);
  const budgetStatus = getBudgetStatus(project);
  
  // Get project manager
  const projectManager = employees.find(emp => emp.id === project.projectManager);
  
  // Count unique team members
  const getTeamCount = () => {
    const uniqueEmployeeIds = new Set();
    project.phases.forEach(phase => {
      phase.assignedEmployees.forEach(assignment => {
        uniqueEmployeeIds.add(assignment.employeeId);
      });
    });
    return uniqueEmployeeIds.size;
  };

  return (
    <Layout title={project.name}>
      <div className="mb-6 flex justify-between items-center">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        <Link 
          to={`/projects/${id}/horizontal`} 
          className="text-blue-600 hover:text-blue-800"
        >
          View Horizontal Layout
        </Link>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <Badge 
                  text={project.status}
                  className={getStatusColor(project.status)}
                />
                <Badge 
                  text={project.priority}
                  className={getPriorityColor(project.priority)}
                />
              </div>
              <p className="text-gray-600">{project.description}</p>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                <Edit size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Timeline</p>
                <p className="font-medium">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Coins className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium">${project.budget.toLocaleString()}</p>
                <p className={`text-sm ${budgetStatus.color}`}>
                  {budgetStatus.status} ({budgetUtilization}%)
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Team</p>
                <p className="font-medium">{getTeamCount()} team members</p>
                <p className="text-sm text-gray-500">PM: {projectManager?.name || 'Unassigned'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-medium">{completion}% Complete</p>
                <p className="text-sm text-gray-500">
                  {project.phases.filter(p => p.status === 'completed').length} of {project.phases.length} phases completed
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Client:</span>
              <span className="font-medium">{project.client}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge
                  key={index}
                  text={tag}
                  className="bg-gray-100 text-gray-800"
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Project Progress</h2>
              <span className="text-gray-500">{completion}% Complete</span>
            </CardHeader>
            <CardBody>
              <ProgressBar
                progress={completion}
                size="lg"
              />
              
              <div className="mt-8 space-y-6">
                {project.phases.map((phase, index) => (
                  <div key={phase.id} className="relative">
                    {index < project.phases.length - 1 && (
                      <div className="absolute left-4 top-9 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                    )}
                    <div className="flex items-start relative z-10">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-4 ${
                        phase.status === 'completed' 
                          ? 'bg-green-100 text-green-600' 
                          : phase.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-500'
                      }`}>
                        {phase.status === 'completed' ? (
                          <Check size={20} />
                        ) : phase.status === 'in-progress' ? (
                          <Clock size={20} />
                        ) : (
                          <X size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-gray-900">{phase.name}</h3>
                          <Badge
                            text={phase.status}
                            className={getStatusColor(phase.status)}
                            size="sm"
                          />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                        <div className="text-xs text-gray-500 mb-2">
                          {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                        </div>
                        <ProgressBar
                          progress={phase.status === 'completed' ? 100 : phase.status === 'not-started' ? 0 : 50}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Budget Overview</h2>
            </CardHeader>
            <CardBody>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Budget Utilization</span>
                  <span className={budgetStatus.color}>{budgetUtilization}%</span>
                </div>
                <ProgressBar
                  progress={budgetUtilization}
                  color={budgetUtilization > 90 ? 'red' : budgetUtilization > 70 ? 'amber' : 'blue'}
                  showPercentage={false}
                  size="md"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Budget</span>
                  <span className="font-medium">${project.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expenses</span>
                  <span className="font-medium">${project.expenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-600">Remaining</span>
                  <span className={`font-medium ${
                    project.budget - project.expenses < 0 ? 'text-red-600' : ''
                  }`}>
                    ${(project.budget - project.expenses).toLocaleString()}
                  </span>
                </div>
              </div>
              
              {budgetUtilization > 90 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Budget Alert</p>
                      <p className="text-xs text-red-600">
                        This project is at risk of exceeding its budget. Consider reviewing resource allocation.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Project Phases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.phases.map((phase) => (
            <PhaseCard 
              key={phase.id} 
              phase={phase} 
              employees={employees} 
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;