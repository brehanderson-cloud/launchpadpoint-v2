import React from 'react';
import { DollarSign, MapPin, Clock, Bookmark, Filter, SortAsc } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const JobsPage = () => {
  const { userData } = useUser();

  const jobListings = [
    { company: 'Google', role: 'Senior Software Engineer', match: 95, salary: '$180k-220k', location: 'Mountain View, CA', posted: '2 hours ago', remote: false },
    { company: 'Meta', role: 'Full Stack Engineer', match: 92, salary: '$170k-210k', location: 'Menlo Park, CA', posted: '4 hours ago', remote: true },
    { company: 'Netflix', role: 'Platform Engineer', match: 88, salary: '$190k-240k', location: 'Los Gatos, CA', posted: '1 day ago', remote: false },
    { company: 'Airbnb', role: 'Technical Lead', match: 85, salary: '$175k-225k', location: 'San Francisco, CA', posted: '2 days ago', remote: true },
    { company: 'Stripe', role: 'Senior Engineer', match: 82, salary: '$165k-200k', location: 'San Francisco, CA', posted: '3 days ago', remote: false }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Job Opportunities</h2>
          <div className="flex space-x-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {jobListings.map((job, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
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
                    <p className="text-lg font-medium text-blue-600 mb-3">{job.company}</p>
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
                  Looking for an experienced software engineer to join our growing team. You'll work on scalable systems serving millions of users...
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'AWS', 'Docker', 'GraphQL'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Job Search Tips</h3>
              <ul className="text-sm space-y-2">
                <li>• Customize your resume for each application</li>
                <li>• Research company culture and values</li>
                <li>• Practice common interview questions</li>
                <li>• Network with current employees</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
