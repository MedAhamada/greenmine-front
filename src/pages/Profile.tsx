import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Building, Briefcase } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Badge from '../components/common/Badge';

const Profile: React.FC = () => {
  const [user] = useState({
    name: 'Emma Rodriguez',
    role: 'Project Manager',
    email: 'emma.rodriguez@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    department: 'Project Management',
    joinDate: '2023-01-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    skills: ['Project Management', 'Agile', 'Scrum', 'Team Leadership', 'Risk Management', 'Stakeholder Communication'],
    activeProjects: 3,
    completedProjects: 12,
    bio: 'Experienced project manager with a track record of delivering complex software projects on time and within budget. Passionate about agile methodologies and team development.',
  });

  return (
    <Layout title="Profile">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Card>
            <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
              <div className="absolute -bottom-12 left-6 flex items-end">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                  <button className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow-sm">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            
            <CardBody className="pt-16">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.role}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-3" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Building className="w-5 h-5 mr-3" />
                      <span>{user.department}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-5 h-5 mr-3" />
                      <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{user.activeProjects}</div>
                      <div className="text-sm text-gray-600">Active Projects</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{user.completedProjects}</div>
                      <div className="text-sm text-gray-600">Completed Projects</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <p className="text-gray-600">{user.bio}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      text={skill}
                      className="bg-blue-100 text-blue-800"
                      size="md"
                    />
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;