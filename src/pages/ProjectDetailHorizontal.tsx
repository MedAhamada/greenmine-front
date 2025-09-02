import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, FileText, CheckSquare, GitBranch, Users } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Badge from '../components/common/Badge';
import { useProjects } from '../contexts/ProjectContext';
import { getStatusColor } from '../utils';

interface TabConfig {
  [key: string]: {
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
  }[];
}

const ProjectDetailHorizontal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById } = useProjects();
  const project = getProjectById(id || '');
  
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);

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

  const phases = project.phases;
  const currentPhase = phases[currentPhaseIndex];

  const tabConfig: TabConfig = {
    discovery: [
      {
        label: 'To Do',
        icon: <CheckSquare className="w-5 h-5" />,
        content: (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-2">Tasks to Complete</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-amber-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Prepare project estimation
                </li>
                <li className="flex items-center text-amber-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Schedule client meeting
                </li>
                <li className="flex items-center text-amber-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Draft technical proposal
                </li>
                <li className="flex items-center text-amber-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Review requirements
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        label: 'Documents',
        icon: <FileText className="w-5 h-5" />,
        content: (
          <div className="space-y-4">
            <div className="border rounded-lg divide-y">
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Requirements Document</h4>
                      <p className="text-sm text-gray-500">Last modified: 2 days ago</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">Download</button>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Technical Specification</h4>
                      <p className="text-sm text-gray-500">Last modified: 1 week ago</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">Download</button>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    development: [
      {
        label: 'Project Insights',
        icon: <GitBranch className="w-5 h-5" />,
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardBody>
                  <h3 className="font-medium mb-2">Code Activity</h3>
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <p className="text-sm text-gray-500">Commits this week</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h3 className="font-medium mb-2">Pull Requests</h3>
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <p className="text-sm text-gray-500">Open PRs</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h3 className="font-medium mb-2">Issues</h3>
                  <div className="text-2xl font-bold text-amber-600">8</div>
                  <p className="text-sm text-gray-500">Active issues</p>
                </CardBody>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <h3 className="font-medium">Recent Activity</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <GitBranch className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">New pull request merged</p>
                      <p className="text-sm text-gray-500">Feature: Add user authentication</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Issue resolved</p>
                      <p className="text-sm text-gray-500">Fix: Mobile navigation bug</p>
                      <p className="text-xs text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ),
      },
      {
        label: 'Team',
        icon: <Users className="w-5 h-5" />,
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.phases[currentPhaseIndex].assignedEmployees.map((assignment) => (
                <Card key={assignment.id}>
                  <CardBody>
                    <div className="flex items-center">
                      <img
                        src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
                        alt="Team member"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <p className="text-sm text-gray-500">Developer</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Hours: {assignment.hoursUsed} / {assignment.hoursAllocated}</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        ),
      },
    ],
  };

  const currentTabs = tabConfig[currentPhase.type] || [];

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
          to={`/projects/${id}`} 
          className="text-blue-600 hover:text-blue-800"
        >
          View Classic Layout
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h1>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <Badge 
              text={project.status}
              className={getStatusColor(project.status)}
            />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              {phases.map((phase, index) => {
                const isActive = index === currentPhaseIndex;
                const isCompleted = phase.status === 'completed';
                const isDisabled = index > currentPhaseIndex;

                return (
                  <div
                    key={phase.id}
                    className={`flex-1 relative ${
                      index !== phases.length - 1 ? 'after:content-[""] after:absolute after:top-4 after:left-1/2 after:w-full after:h-0.5 after:bg-gray-200' : ''
                    }`}
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : isCompleted
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        } ${isDisabled ? 'opacity-50' : ''}`}
                      >
                        {isCompleted ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className={`mt-2 text-sm font-medium ${
                        isActive ? 'text-blue-600' : isDisabled ? 'text-gray-400' : 'text-gray-900'
                      }`}>
                        {phase.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="space-y-1">
            {currentTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                  currentTab === index
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="ml-3">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-9">
          <Card>
            <CardBody>
              {currentTabs[currentTab]?.content}
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex space-x-3">
        <button
          onClick={() => setCurrentPhaseIndex(prev => Math.max(0, prev - 1))}
          disabled={currentPhaseIndex === 0}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPhaseIndex(prev => Math.min(phases.length - 1, prev + 1))}
          disabled={currentPhaseIndex === phases.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default ProjectDetailHorizontal;