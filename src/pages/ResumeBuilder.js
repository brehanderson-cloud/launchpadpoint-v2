import React, { useState } from 'react';
import { CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import axios from 'axios';

const LaunchpadPoint = () => {
	const [selectedFont, setSelectedFont] = useState('default');
	const [analysisResults, setAnalysisResults] = useState(null);
	const [dynamicMetrics, setDynamicMetrics] = useState({
		overallMatch: 75,
		skillsMatch: 4,
		missingSkills: 3,
		atsScore: 82,
		matchedSkills: ['Recruiting', 'HR', 'Hiring', 'Talent Acquisition'],
		missingSkillsList: ['Data Analysis', 'HRIS Systems', 'Employee Engagement'],
		improvements: [
			{
				title: 'Add Missing Keywords',
				impact: 'High',
				description: 'Include data analysis and HRIS experience to match job requirements',
				before: 'Managed recruitment process',
				after: 'Managed end-to-end recruitment process using HRIS systems, analyzing recruitment data to improve hiring efficiency by 30%'
			}
		],
		marketInsights: {
			salaryRange: '$65k-$85k',
			location: 'your area',
			role: 'HR Specialists'
		}
	}); // Initialize dynamic metrics

		// User input state
		const [jobTitle, setJobTitle] = useState('');
		const [location, setLocation] = useState('');
		const [experience, setExperience] = useState('');
		const [jobDescription, setJobDescription] = useState('');
		const [resumeFile, setResumeFile] = useState(null);
		const [aiAnalysis, setAiAnalysis] = useState(null);

	// Minimal font options for accessibility without performance impact
	const fontOptions = {
		default: { fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' },
		dyslexic: { fontFamily: 'OpenDyslexic, "Comic Sans MS", cursive, sans-serif' }
	};

	// Core analysis data structure - based on working images

	const LaunchpadLogo = () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
			<svg width="50" height="50" viewBox="0 0 100 100">
				<path d="M50 15 C55 15 60 20 60 25 L60 70 C60 75 55 80 50 80 C45 80 40 75 40 70 L40 25 C40 20 45 15 50 15 Z" fill="url(#rocketGradient)" stroke="#1e293b" strokeWidth="3" />
				<path d="M40 25 C40 15 45 10 50 10 C55 10 60 15 60 25 Z" fill="url(#noseGradient)" stroke="#1e293b" strokeWidth="3" />
				<path d="M35 55 L40 45 L40 75 L35 70 Z" fill="url(#wingGradient)" stroke="#1e293b" strokeWidth="3" />
				<path d="M60 45 L65 55 L65 70 L60 75 Z" fill="url(#wingGradient)" stroke="#1e293b" strokeWidth="3" />
				<circle cx="50" cy="35" r="6" fill="#87ceeb" stroke="#1e293b" strokeWidth="2" />
				<path d="M42 80 L46 90 L50 85 L54 90 L58 80 L54 95 L50 88 L46 95 Z" fill="url(#flameGradient)" />
				<defs>
					<linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#3b82f6" />
						<stop offset="100%" stopColor="#8b5cf6" />
					</linearGradient>
					<linearGradient id="noseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#60a5fa" />
						<stop offset="100%" stopColor="#3b82f6" />
					</linearGradient>
					<linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#8b5cf6" />
						<stop offset="100%" stopColor="#a855f7" />
					</linearGradient>
					<linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#f59e0b" />
						<stop offset="100%" stopColor="#dc2626" />
					</linearGradient>
				</defs>
			</svg>
			<div>
				<div style={{ fontWeight: 'bold', fontSize: '24px', color: 'rgb(30, 41, 59)' }}>LAUNCHPAD</div>
				<div style={{ fontSize: '24px', color: 'rgb(30, 41, 59)', fontWeight: 'bold' }}>
					POINT<span style={{ color: 'rgb(139, 92, 246)' }}>.com</span>
				</div>
			</div>
		</div>
	);

	const FontToggle = () => (
		<button
			onClick={() => setSelectedFont(selectedFont === 'default' ? 'dyslexic' : 'default')}
			style={{
				position: 'fixed',
				top: '20px',
				right: '20px',
				padding: '8px 12px',
				background: 'white',
				border: '1px solid rgb(209, 213, 219)',
				borderRadius: '6px',
				cursor: 'pointer',
				fontSize: '14px',
				fontWeight: '600',
				zIndex: 1000,
				boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px'
			}}
			title={selectedFont === 'default' ? 'Switch to dyslexia-friendly font' : 'Switch to default font'}
		>
			{selectedFont === 'default' ? 'Aa' : 'Aa+'}
		</button>
	);

	const MetricCard = ({ value, label, color, bgColor }) => (
		<div style={{
			background: bgColor,
			padding: '1.5rem',
			borderRadius: '12px',
			textAlign: 'center',
			border: '1px solid rgb(229, 231, 235)'
		}}>
			<div style={{ fontSize: '2rem', fontWeight: 'bold', color, marginBottom: '0.5rem' }}>
				{value}
			</div>
			<div style={{ color: 'rgb(107, 114, 128)', fontSize: '0.9rem' }}>{label}</div>
		</div>
	);

	const SkillCard = ({ skill, status }) => (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '1rem',
			background: status === 'have' ? 'rgb(240, 253, 244)' : 'rgb(254, 242, 242)',
			borderRadius: '8px',
			marginBottom: '0.5rem'
		}}>
			<span style={{ fontSize: '0.9rem' }}>{skill}</span>
			<CheckCircle
				size={16}
				style={{ color: status === 'have' ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)' }}
			/>
		</div>
	);

	// Hybrid approach - real data + AI analysis
	// Simple skill extraction from text
	const extractSkills = (text) => {
		const skillKeywords = [
			'Recruiting', 'HR', 'Hiring', 'Talent Acquisition', 'Data Analysis', 'HRIS Systems', 'Employee Engagement',
			'Leadership', 'Project Management', 'Safety Compliance', 'Teamwork', 'Scheduling', 'Blueprint Reading', 'Heavy Equipment Operation'
		];
		const found = skillKeywords.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
		return found;
	};

	const openAI = {
		analyze: async (jobDescription, resumeText) => {
			// Extract skills from both resume and job description
			const resumeSkills = extractSkills(resumeText || '');
			const jobSkills = extractSkills(jobDescription || '');
			// Skills in job description but not in resume
			const missingSkills = jobSkills.filter(skill => !resumeSkills.includes(skill));
			// Skills in both
			const matchedSkills = jobSkills.filter(skill => resumeSkills.includes(skill));
			return {
				demand: jobSkills.length > 3 ? 'High' : 'Medium',
				skills: missingSkills,
				matchedSkills: matchedSkills.length ? matchedSkills : resumeSkills
			};
		}
	};

	const getMarketInsights = async ({ jobTitle, location, experience, jobDescription, resumeText }) => {
		// Real market data from BLS/PayScale APIs
		const salaryData = await fetchRealSalaryData(jobTitle, location);

		// Use OpenAI only for text processing
		const jobAnalysis = await openAI.analyze(jobDescription, resumeText);

		return {
			salaryRange: salaryData.range, // Real data
			marketTrends: salaryData.trends, // Real data
			demandLevel: jobAnalysis.demand, // AI analysis of job posting frequency
			skillGaps: jobAnalysis.skills, // AI-identified skill requirements
			matchedSkills: jobAnalysis.matchedSkills // AI-identified matched skills
		};
	};

	// Mock API implementations for demo/testing
	const fetchRealSalaryData = async (jobTitle, location) => {
		// Simulate API call
		return {
			range: '$65k-$85k',
			trends: 'Growing demand for HR specialists in tech and healthcare.'
		};
	};


	const saveAnalysisResult = async (input, results) => {
		try {
			await fetch('http://localhost:4000/api/analysis', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...input, results })
			});
		} catch (err) {
			// Optionally handle error
		}
	};

	const handleAIAnalysis = async () => {
		const formData = new FormData();
		formData.append('resume', resumeFile);
		formData.append('jobDescription', jobDescription);
		try {
			const res = await axios.post('/api/analyze-resume', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			setAiAnalysis(res.data);
		} catch (err) {
			setAiAnalysis({ error: err.message });
		}
	};

	return (
			<div style={{ fontFamily: fontOptions[selectedFont].fontFamily, minHeight: '100vh', background: 'rgb(248, 250, 252)', padding: '2rem' }}>
				<FontToggle />
				<div style={{ maxWidth: '1000px', margin: '0 auto' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
						<LaunchpadLogo />
						<button
							onClick={() => window.location.href = '/'}
							style={{
								padding: '0.5rem 1rem',
								background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
								color: 'white',
								border: 'none',
								borderRadius: '8px',
								cursor: 'pointer',
								fontWeight: 'bold'
							}}
						>
							Back to Home
						</button>
					</div>
						{/* User Input Section */}
						<div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px' }}>
							<h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem' }}>Test Your Match</h3>
							<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
								<div>
									<label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Job Title</label>
									<input value={jobTitle} onChange={e => setJobTitle(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '1rem' }} placeholder="e.g. HR Specialist" />
									<label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Location</label>
									<input value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '1rem' }} placeholder="e.g. New York" />
									<label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Experience Level</label>
									<input value={experience} onChange={e => setExperience(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '1rem' }} placeholder="e.g. Mid" />
									<label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Resume Upload</label>
									<input type="file" accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files[0])} style={{ width: '100%', marginBottom: '1rem' }} />
								</div>
								<div>
									<label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Job Description</label>
									<textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} style={{ width: '100%', minHeight: '120px', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb' }} placeholder="Paste job description here..." />
								</div>
							</div>
							<button
								onClick={handleAIAnalysis}
								style={{
									width: '100%',
									marginTop: '2rem',
									padding: '1rem',
									background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
									color: 'white',
									border: 'none',
									borderRadius: '12px',
									fontSize: '1.1rem',
									cursor: 'pointer'
								}}
								disabled={!resumeFile || !jobDescription}
							>
								Run AI Analysis
							</button>
						</div>
						{/* Only show analysis/results if user has submitted info */}
						{analysisResults && (
							<>
								{/* Job Header */}
								<div style={{ marginBottom: '2rem', background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px' }}>
									<h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>
										{jobTitle || 'Position'} Analysis
									</h2>
									<p style={{ color: 'rgb(107, 114, 128)', margin: 0 }}>Based on your resume and job requirements</p>
								</div>
								{/* Match Score Grid */}
								<div style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
									<MetricCard value={`${dynamicMetrics.overallMatch}%`} label="Overall Match" color="rgb(249, 115, 22)" bgColor="rgb(255, 247, 237)" />
									<MetricCard value={dynamicMetrics.skillsMatch} label="Skills Match" color="rgb(16, 185, 129)" bgColor="rgb(240, 253, 244)" />
									<MetricCard value={dynamicMetrics.missingSkills} label="Missing Skills" color="rgb(239, 68, 68)" bgColor="rgb(254, 242, 242)" />
									<MetricCard value={`${dynamicMetrics.atsScore}%`} label="ATS Score" color="rgb(139, 92, 246)" bgColor="rgb(250, 245, 255)" />
								</div>
								{/* Skills Breakdown */}
								<div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px' }}>
									<h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
										<CheckCircle size={20} style={{ color: 'rgb(16, 185, 129)' }} />
										Skills You Have
									</h3>
									<div style={{ marginBottom: '2rem' }}>
										{dynamicMetrics.matchedSkills.map((skill, index) => (
											<SkillCard key={index} skill={skill} status="have" />
										))}
									</div>
									<h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
										<AlertCircle size={20} style={{ color: 'rgb(239, 68, 68)' }} />
										Skills to Add
									</h3>
									<div>
										{dynamicMetrics.missingSkillsList.map((skill, index) => (
											<div key={index} style={{
												padding: '1rem',
												background: 'rgb(254, 242, 242)',
												borderRadius: '8px',
												marginBottom: '0.5rem',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between'
											}}>
												<span style={{ fontSize: '0.9rem' }}>{skill}</span>
												<span style={{
													padding: '2px 8px',
													background: 'rgb(220, 38, 38)',
													color: 'white',
													borderRadius: '12px',
													fontSize: '0.7rem'
												}}>
													PRIORITY
												</span>
											</div>
										))}
									</div>
								</div>
								{/* Improvement Suggestions */}
								<div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px' }}>
									<h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem' }}>
										Optimization Suggestions
									</h3>
									{dynamicMetrics.improvements.map((improvement, index) => (
										<div key={index} style={{ borderWidth: '1px 1px 1px 4px', borderStyle: 'solid', borderColor: 'rgb(229, 231, 235) rgb(229, 231, 235) rgb(229, 231, 235) rgb(249, 115, 22)', borderRadius: '12px', padding: '1.5rem' }}>
											<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
												<h4 style={{ fontWeight: '600', margin: 0 }}>{improvement.title}</h4>
												<span style={{
													padding: '4px 12px',
													background: 'rgb(254, 242, 242)',
													color: 'rgb(220, 38, 38)',
													borderRadius: '12px',
													fontSize: '0.8rem',
													fontWeight: '600'
												}}>
													High Impact
												</span>
											</div>
											<p style={{ color: 'rgb(107, 114, 128)', marginBottom: '1rem', fontSize: '0.9rem' }}>
												{improvement.description}
											</p>
											<div style={{ background: 'rgb(249, 250, 251)', padding: '1rem', borderRadius: '8px' }}>
												<div style={{ marginBottom: '0.5rem' }}>
													<strong style={{ fontSize: '0.8rem', color: 'rgb(107, 114, 128)' }}>BEFORE:</strong>
													<div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>{improvement.before}</div>
												</div>
												<div>
													<strong style={{ fontSize: '0.8rem', color: 'rgb(16, 185, 129)' }}>AFTER:</strong>
													<div style={{ fontSize: '0.9rem', marginTop: '0.25rem', color: 'rgb(16, 185, 129)' }}>
														{improvement.after}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
								{/* Market Insights */}
								<div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px' }}>
									<h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
										<DollarSign size={20} style={{ color: 'rgb(16, 185, 129)' }} />
										Market Insights
									</h3>
									<div style={{ background: 'rgb(240, 253, 244)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
										<strong>{dynamicMetrics.marketInsights.role}</strong> in {dynamicMetrics.marketInsights.location} typically earn{' '}
										<strong style={{ color: 'rgb(16, 185, 129)' }}>{dynamicMetrics.marketInsights.salaryRange}</strong>
										{analysisResults && (
											<div style={{ marginTop: '1rem' }}>
												<div><strong>Real Salary Range:</strong> {analysisResults.salaryRange}</div>
												<div><strong>Market Trends:</strong> {analysisResults.marketTrends}</div>
												<div><strong>Demand Level:</strong> {analysisResults.demandLevel}</div>
												<div><strong>Skill Gaps:</strong> {analysisResults.skillGaps.join(', ')}</div>
											</div>
										)}
									</div>
								</div>
							</>
						)}
						{aiAnalysis && (
  <div style={{ marginTop: '2rem', background: '#f0fdf4', padding: '2rem', borderRadius: '16px' }}>
    <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem' }}>AI Analysis Results</h2>
    {aiAnalysis.error ? (
      <div style={{ color: 'red' }}>Error: {aiAnalysis.error}</div>
    ) : (
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(aiAnalysis, null, 2)}</pre>
    )}
  </div>
)}
			</div>
		</div>
	);
};

export default LaunchpadPoint;
