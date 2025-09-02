import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import Badge from '../common/Badge';
import Card, { CardBody, CardFooter } from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { Phase, Employee } from '../../types';
import { formatDate, calculatePhaseCompletion, getStatusColor } from '../../utils';

interface PhaseCardProps {
  phase: Phase;
  employees: Employee[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, employees }) => {
  const completion = calculatePhaseCompletion(phase);
  
  // Get assigned employee names
  const getAssignedEmployees = () => {
    return phase.assignedEmployees.map(assignment => {
      const employee = employees.find(emp => emp.id === assignment.employeeId);
      return employee ? employee.name : 'Unknown';
    });
  };
  
  // Format employee list for display
  const formatEmployees = () => {
    const empNames = getAssignedEmployees();
    if (empNames.length === 0) return 'No one assigned';
    if (empNames.length === 1) return empNames[0];
    if (empNames.length === 2) return `${empNames[0]} and ${empNames[1]}`;
    return `${empNames[0]} and ${empNames.length - 1} others`;
  };

  return (
    <Card className="h-full">
      <CardBody>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-gray-900">{phase.name}</h3>
          <Badge
            text={phase.status}
            className={getStatusColor(phase.status)}
            size="sm"
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formatDate(phase.startDate)} - {formatDate(phase.endDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{phase.actualHours} / {phase.estimatedHours} hrs</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 col-span-2">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formatEmployees()}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <ProgressBar 
            progress={completion} 
            label="Completion" 
            size="sm"
          />
        </div>
      </CardBody>
      
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {phase.deliverables.map((deliverable, index) => (
            <Badge
              key={index}
              text={deliverable}
              className="bg-gray-100 text-gray-800"
              size="sm"
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PhaseCard;