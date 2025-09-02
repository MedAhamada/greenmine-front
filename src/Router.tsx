import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import ProjectDetailHorizontal from './pages/ProjectDetailHorizontal';
import NewProject from './pages/NewProject';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { ProjectProvider } from './contexts/ProjectContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/projects/new',
    element: <NewProject />,
  },
  {
    path: '/projects/:id',
    element: <ProjectDetail />,
  },
  {
    path: '/projects/:id/horizontal',
    element: <ProjectDetailHorizontal />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

const Router: React.FC = () => {
  return (
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  );
};

export default Router;