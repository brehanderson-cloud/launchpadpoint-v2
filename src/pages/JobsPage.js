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
