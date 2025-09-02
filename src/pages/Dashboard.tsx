import React from 'react';
import { BarChart3, Briefcase, Users, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import Badge from '../components/common/Badge';
import { useProjects } from '../contexts/ProjectContext';
import { calculateBudgetUtilization, calculateProjectCompletion, getStatusColor } from '../utils';

const Dashboard: React.FC = () => {
  const { projects, employees } = useProjects();
  
  // Calculate dashboard metrics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const onHoldProjects = projects.filter(p => p.status === 'on-hold').length;
  
  // Budget metrics
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalExpenses = projects.reduce((sum, p) => sum + p.expenses, 0);
  const budgetUtilization = (totalExpenses / totalBudget) * 100;
  
  // Project at risk (over 90% budget utilization)
  const projectsAtRisk = projects.filter(p => 
    calculateBudgetUtilization(p) > 90 && p.status === 'active'
  );

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Projects</p>
              <h3 className="text-2xl font-bold">{activeProjects}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Projects</p>
              <h3 className="text-2xl font-bold">{completedProjects}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">On Hold Projects</p>
              <h3 className="text-2xl font-bold">{onHoldProjects}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Team Members</p>
              <h3 className="text-2xl font-bold">{employees.length}</h3>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Budget Overview</h2>
          </CardHeader>
          <CardBody>
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Total Budget Utilization</span>
                <span className="text-sm font-medium text-gray-700">
                  ${totalExpenses.toLocaleString()} / ${totalBudget.toLocaleString()}
                </span>
              </div>
              <ProgressBar
                progress={Math.round(budgetUtilization)}
                color={budgetUtilization > 90 ? 'red' : 'blue'}
                showPercentage={false}
                size="md"
              />
            </div>
            
            <h3 className="text-md font-medium text-gray-900 mb-3">Project Budget Status</h3>
            <div className="space-y-4">
              {projects.slice(0, 5).map(project => (
                <div key={project.id} className="flex items-center">
                  <div className="w-32 md:w-40 truncate text-sm font-medium">{project.name}</div>
                  <div className="flex-1 mx-3">
                    <ProgressBar
                      progress={calculateBudgetUtilization(project)}
                      color={calculateBudgetUtilization(project) > 90 ? 'red' : 'blue'}
                      showPercentage={false}
                      size="sm"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    ${project.expenses.toLocaleString()} / ${project.budget.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Projects at Risk</h2>
            {projectsAtRisk.length > 0 && (
              <div className="bg-red-100 p-1 rounded">
                <AlertTriangle size={18} className="text-red-600" />
              </div>
            )}
          </CardHeader>
          <CardBody>
            {projectsAtRisk.length > 0 ? (
              <div className="space-y-4">
                {projectsAtRisk.map(project => (
                  <div key={project.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">{project.name}</h3>
                      <Badge
                        text={`${calculateBudgetUtilization(project)}%`}
                        className="bg-red-100 text-red-800"
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Budget: ${project.budget.toLocaleString()}</p>
                    <ProgressBar
                      progress={calculateBudgetUtilization(project)}
                      color="red"
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <TrendingUp size={24} className="text-green-600" />
                </div>
                <p className="text-gray-600">No projects at risk currently</p>
                <p className="text-sm text-gray-500 mt-1">All projects are under budget</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Project Status</h2>
            <div className="text-sm text-gray-500">{projects.length} total projects</div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map(project => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{project.client}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <Badge
                          text={project.status}
                          className={getStatusColor(project.status)}
                          size="sm"
                        />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="w-32 md:w-48">
                          <ProgressBar
                            progress={calculateProjectCompletion(project)}
                            showPercentage={false}
                            size="sm"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${project.expenses.toLocaleString()} / ${project.budget.toLocaleString()}
                        </div>
                        <div className="w-24 md:w-32 mt-1">
                          <ProgressBar
                            progress={calculateBudgetUtilization(project)}
                            showPercentage={false}
                            size="sm"
                            color={calculateBudgetUtilization(project) > 90 ? 'red' : 'blue'}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;