import React, { useState } from 'react';
import { DollarSign, MapPin, Clock, Bookmark, Filter, SortAsc, Search, Building } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const JobsPage = () => {
  const { userData } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    remote: false,
    fullTime: true,
    contract: false
  });

  const jobListings = [
    { 
      id: 1,
      company: 'Google', 
      role: 'Senior Software Engineer', 
      match: 95, 
      salary: '$180k-220k', 
      location: 'Mountain View, CA', 
      posted: '2 hours ago', 
      remote: false,
      type: 'Full-time',
      description: 'Looking for an experienced software engineer to join our growing team. You\'ll work on scalable systems serving millions of users worldwide.',
      skills: ['React', 'Node.js', 'AWS', 'Docker', 'GraphQL', 'TypeScript']
    },
    { 
      id: 2,
      company: 'Meta', 
      role: 'Full Stack Engineer', 
      match: 92, 
      salary: '$170k-210k', 
      location: 'Menlo Park, CA', 
      posted: '4 hours ago', 
      remote: true,
      type: 'Full-time',
      description: 'Join our dynamic team building the next generation of social media platforms. Work with cutting-edge technologies in a fast-paced environment.',
      skills: ['React', 'Python', 'GraphQL', 'MySQL', 'Redis']
    },
    { 
      id: 3,
      company: 'Netflix', 
      role: 'Platform Engineer', 
      match: 88, 
      salary: '$190k-240k', 
      location: 'Los Gatos, CA', 
      posted: '1 day ago', 
      remote: false,
      type: 'Full-time',
      description: 'Help us build and maintain the platform that streams content to millions of users globally. Focus on scalability and performance optimization.',
      skills: ['Java', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes']
    },
    { 
      id: 4,
      company: 'Airbnb', 
      role: 'Technical Lead', 
      match: 85, 
      salary: '$175k-225k', 
      location: 'San Francisco, CA', 
      posted: '2 days ago', 
      remote: true,
      type: 'Full-time',
      description: 'Lead a team of engineers building the future of travel and hospitality. Strong leadership and technical skills required.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Microservices']
    },
    { 
      id: 5,
      company: 'Stripe', 
      role: 'Senior Engineer', 
      match: 82, 
      salary: '$165k-200k', 
      location: 'San Francisco, CA', 
      posted: '3 days ago', 
      remote: false,
      type: 'Full-time',
      description: 'Work on payment processing systems that handle billions of dollars in transactions. Focus on security and reliability.',
      skills: ['Ruby', 'Java', 'PostgreSQL', 'AWS', 'Security']
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRemote = filters.remote ? job.remote : true;
    const matchesFullTime = filters.fullTime ? job.type === 'Full-time' : true;
    
    return matchesSearch && matchesRemote && matchesFullTime;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <SortAsc className="w-4 h-4" />
              <span>Sort</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.remote}
              onChange={(e) => setFilters(prev => ({ ...prev, remote: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Remote Only</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.fullTime}
              onChange={(e) => setFilters(prev => ({ ...prev, fullTime: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Full-time</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Job Opportunities</h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredJobs.length} jobs found
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No jobs found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.role}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.match >= 90 ? 'bg-green-100 text-green-800' :
                        job.match >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {job.match}% match
                      </span>
                      {job.remote && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Remote
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <p className="text-lg font-medium text-blue-600 flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {job.company}
                      </p>
                      <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.posted}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    Save Job
                  </button>
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    Share
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Job Search Tips</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Customize your resume for each application
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Research company culture and values
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Practice common interview questions
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Network with current employees
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Follow up after applications
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Application Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Applied:</span>
                <span className="font-medium">{userData.applications}</span>
              </div>
              <div className="flex justify-between">
                <span>Interviews:</span>
                <span className="font-medium">{userData.interviews}</span>
              </div>
              <div className="flex justify-between">
                <span>Offers:</span>
                <span className="font-medium text-green-600">{userData.offers}</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-medium text-blue-600">
                  {userData.applications > 0 
                    ? `${Math.round((userData.offers / userData.applications) * 100)}%`
                    : '0%'
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Popular Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Python', 'AWS', 'TypeScript', 'Docker', 'Kubernetes', 'GraphQL'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
