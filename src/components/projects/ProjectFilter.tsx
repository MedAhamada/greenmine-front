import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { FilterOptions, ProjectStatus, ProjectCategory } from '../../types';

interface ProjectFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ onFilterChange, currentFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(currentFilters);
  
  const statusOptions: ProjectStatus[] = ['active', 'completed', 'on-hold', 'cancelled'];
  const categoryOptions: ProjectCategory[] = ['web', 'mobile', 'desktop', 'devops', 'infrastructure', 'other'];
  
  const handleStatusChange = (status: ProjectStatus) => {
    const newStatusFilters = localFilters.status || [];
    
    if (newStatusFilters.includes(status)) {
      setLocalFilters({
        ...localFilters,
        status: newStatusFilters.filter(s => s !== status)
      });
    } else {
      setLocalFilters({
        ...localFilters,
        status: [...newStatusFilters, status]
      });
    }
  };
  
  const handleCategoryChange = (category: ProjectCategory) => {
    const newCategoryFilters = localFilters.category || [];
    
    if (newCategoryFilters.includes(category)) {
      setLocalFilters({
        ...localFilters,
        category: newCategoryFilters.filter(c => c !== category)
      });
    } else {
      setLocalFilters({
        ...localFilters,
        category: [...newCategoryFilters, category]
      });
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters({
      ...localFilters,
      search: e.target.value
    });
  };
  
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    const emptyFilters: FilterOptions = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
    setIsOpen(false);
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.status && localFilters.status.length > 0) count++;
    if (localFilters.category && localFilters.category.length > 0) count++;
    if (localFilters.client) count++;
    if (localFilters.dateRange) count++;
    if (localFilters.projectManager) count++;
    if (localFilters.tags && localFilters.tags.length > 0) count++;
    if (localFilters.search) count++;
    return count;
  };

  return (
    <div className="relative">
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={localFilters.search || ''}
              onChange={handleSearchChange}
            />
            {localFilters.search && (
              <button
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setLocalFilters({ ...localFilters, search: '' });
                  onFilterChange({ ...localFilters, search: '' });
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        
        <button
          className={`ml-3 flex items-center px-4 py-2 rounded-md border ${
            getActiveFilterCount() > 0
              ? 'bg-blue-50 border-blue-300 text-blue-600'
              : 'border-gray-300 text-gray-700'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter size={18} className="mr-2" />
          <span>Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs">
              {getActiveFilterCount()}
            </span>
          )}
          <ChevronDown size={16} className="ml-2" />
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-full md:w-96 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Status</h3>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      localFilters.status?.includes(status)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      localFilters.category?.includes(category)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Date Range</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Start Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    value={localFilters.dateRange?.start || ''}
                    onChange={(e) => setLocalFilters({
                      ...localFilters,
                      dateRange: {
                        ...localFilters.dateRange || {},
                        start: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">End Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    value={localFilters.dateRange?.end || ''}
                    onChange={(e) => setLocalFilters({
                      ...localFilters,
                      dateRange: {
                        ...localFilters.dateRange || {},
                        end: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between">
              <button
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={handleResetFilters}
              >
                Reset all
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;