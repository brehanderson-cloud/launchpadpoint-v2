const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing LaunchpadPoint AI API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', health.data.status);

    // Test 2: API Status
    console.log('\n2. Testing API status...');
    const status = await axios.get(`${BASE_URL}/api/status`);
    console.log('✅ API status:', status.data);

    // Test 3: Job Description Analysis
    console.log('\n3. Testing job description analysis...');
    const jobData = {
      jobDescription: `
        Software Engineer - Full Stack
        We are looking for a Senior Full Stack Developer with 5+ years of experience.
        
        Requirements:
        - Bachelor's degree in Computer Science
        - 5+ years experience with React, Node.js, JavaScript
        - Experience with databases (PostgreSQL, MongoDB)
        - Knowledge of AWS, Docker, Git
        - Strong problem-solving skills
        - Excellent communication abilities
        
        Salary: $90,000 - $120,000
        Location: San Francisco, CA (Remote friendly)
      `
    };
    
    const jobAnalysis = await axios.post(`${BASE_URL}/api/analyze/job`, jobData);
    console.log('✅ Job analysis completed');
    console.log('📊 Extracted requirements:', JSON.stringify(jobAnalysis.data.data.requirements, null, 2));

    // Test 4: Resume Creation
    console.log('\n4. Testing resume creation...');
    const resumeData = {
      personalInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA'
      },
      sections: {
        summary: 'Experienced full-stack developer with 6 years of experience...',
        experience: [
          {
            title: 'Senior Software Engineer',
            company: 'Tech Corp',
            startDate: '2020-01',
            endDate: '2024-01',
            responsibilities: ['Led development team', 'Built scalable applications']
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS']
      }
    };

    const resumeCreation = await axios.post(`${BASE_URL}/api/resume/create`, resumeData);
    console.log('✅ Resume created with ID:', resumeCreation.data.data.id);

    // Test 5: Qualification Matching
    console.log('\n5. Testing qualification matching...');
    const matchData = {
      resumeData: resumeCreation.data.data,
      jobData: jobAnalysis.data.data
    };

    const matching = await axios.post(`${BASE_URL}/api/analyze/match`, matchData);
    console.log('✅ Qualification matching completed');
    console.log('🎯 Match score:', matching.data.data.overall_match_score);

    console.log('\n🎉 All tests passed! Your LaunchpadPoint AI is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
