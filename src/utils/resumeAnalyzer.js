<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LaunchpadPoint - Resume Builder</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            transition: all 0.3s ease;
        }
        
        body.dark-mode {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: #f0f0f0;
        }
        
        body.dyslexia-mode {
            font-family: 'Comic Sans MS', cursive;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 50;
            border-radius: 0 0 12px 12px;
            margin-bottom: 2rem;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: bold;
            font-size: 1.4rem;
        }
        
        .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #00A8FF 0%, #0078FF 50%, #7B68EE 100%);
            border-radius: 50% 50% 50% 0;
            position: relative;
            transform: rotate(-45deg);
            display: inline-block;
        }
        
        .logo-icon::before {
            content: '';
            position: absolute;
            top: 30%;
            left: 30%;
            width: 40%;
            height: 40%;
            background: #40E0D0;
            border-radius: 50%;
            opacity: 0.8;
        }
        
        .logo-icon::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 20%;
            width: 20%;
            height: 30%;
            background: linear-gradient(135deg, #7B68EE 0%, #9932CC 100%);
            border-radius: 0 0 50% 50%;
        }
        
        .header-controls {
            display: flex;
            gap: 10px;
        }
        
        .btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #00A8FF 0%, #0078FF 100%);
            color: white;
        }
        
        .btn-outline {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        
        .form-section {
            background: rgba(255, 255, 255, 0.9);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .dark-mode .form-section {
            background: rgba(30, 30, 40, 0.9);
        }
        
        .preview-section {
            background: rgba(255, 255, 255, 0.9);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 90px;
            max-height: calc(100vh - 120px);
            overflow-y: auto;
        }
        
        .dark-mode .preview-section {
            background: rgba(30, 30, 40, 0.9);
        }
        
        .section-title {
            font-size: 1.5rem;
            color: #4361ee;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e9ecef;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .dark-mode .section-title {
            color: #4cc9f0;
            border-bottom: 2px solid #444;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }
        
        .dark-mode label {
            color: #f0f0f0;
        }
        
        input, textarea, select {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s;
            background: white;
            color: #333;
        }
        
        .dark-mode input, 
        .dark-mode textarea, 
        .dark-mode select {
            background: #333;
            color: #f0f0f0;
            border: 1px solid #555;
        }
        
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #4361ee;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }
        
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            overflow-x: auto;
        }
        
        .tab {
            padding: 12px 20px;
            background: #e9ecef;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            white-space: nowrap;
        }
        
        .dark-mode .tab {
            background: #333;
        }
        
        .tab.active {
            background: #4361ee;
            color: white;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .resume-template {
            background: white;
            border: 1px solid #e9ecef;
            padding: 30px;
            min-height: 500px;
            color: #333;
        }
        
        .dark-mode .resume-template {
            background: #222;
            border: 1px solid #444;
            color: #f0f0f0;
        }
        
        .resume-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .resume-header h2 {
            font-size: 2.2rem;
            color: #4361ee;
            margin-bottom: 5px;
        }
        
        .dark-mode .resume-header h2 {
            color: #4cc9f0;
        }
        
        .resume-header p {
            color: #6c757d;
            font-size: 1.1rem;
        }
        
        .dark-mode .resume-header p {
            color: #aaa;
        }
        
        .resume-section {
            margin-bottom: 25px;
        }
        
        .resume-section h3 {
            color: #3a0ca3;
            padding-bottom: 5px;
            border-bottom: 2px solid #e9ecef;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .dark-mode .resume-section h3 {
            color: #7B68EE;
            border-bottom: 2px solid #444;
        }
        
        .experience-item, .education-item {
            margin-bottom: 20px;
        }
        
        .experience-item h4, .education-item h4 {
            color: #333;
            font-size: 1.1rem;
        }
        
        .dark-mode .experience-item h4, 
        .dark-mode .education-item h4 {
            color: #f0f0f0;
        }
        
        .experience-item .company, .education-item .institution {
            color: #4361ee;
            font-weight: 600;
        }
        
        .dark-mode .experience-item .company, 
        .dark-mode .education-item .institution {
            color: #4cc9f0;
        }
        
        .experience-item .date, .education-item .date {
            color: #6c757d;
            font-style: italic;
        }
        
        .dark-mode .experience-item .date, 
        .dark-mode .education-item .date {
            color: #aaa;
        }
        
        .skill-item {
            display: inline-block;
            background: #e9ecef;
            padding: 5px 15px;
            border-radius: 20px;
            margin: 0 10px 10px 0;
            color: #333;
        }
        
        .dark-mode .skill-item {
            background: #333;
            color: #f0f0f0;
        }
        
        .ai-analysis {
            margin-top: 20px;
            background: #eef7ff;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #4361ee;
        }
        
        .dark-mode .ai-analysis {
            background: #1a2a3a;
            border-left: 4px solid #4cc9f0;
        }
        
        .ai-analysis h3 {
            color: #4361ee;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .dark-mode .ai-analysis h3 {
            color: #4cc9f0;
        }
        
        .suggestion-item {
            padding: 10px;
            background: white;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .dark-mode .suggestion-item {
            background: #222;
        }
        
        .suggestion-item h4 {
            color: #333;
            margin-bottom: 5px;
        }
        
        .dark-mode .suggestion-item h4 {
            color: #f0f0f0;
        }
        
        .suggestion-item p {
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        .dark-mode .suggestion-item p {
            color: #aaa;
        }
        
        .score-circle {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: #4cc9f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.5rem;
            margin-right: 15px;
        }
        
        .ai-score {
            display: flex;
            align-items: center;
            background: #eef7ff;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .dark-mode .ai-score {
            background: #1a2a3a;
        }
        
        .score-text h4 {
            color: #4361ee;
            margin-bottom: 5px;
        }
        
        .dark-mode .score-text h4 {
            color: #4cc9f0;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 100;
            justify-content: center;
            align-items: center;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
        }
        
        .dark-mode .modal-content {
            background: #222;
            color: white;
        }
        
        .modal-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
        }
        
        @media (max-width: 900px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .preview-section {
                position: relative;
                top: 0;
            }
            
            .header-controls {
                flex-direction: column;
                gap: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <div class="logo-icon"></div>
                <span>LaunchpadPoint</span>
            </div>
            <div class="header-controls">
                <button class="btn btn-outline" id="dyslexia-toggle">
                    <i class="fas fa-font"></i> Dyslexia Font
                </button>
                <button class="btn btn-outline" id="dark-mode-toggle">
                    <i class="fas fa-moon"></i> Dark Mode
                </button>
                <button class="btn btn-primary" id="export-btn">
                    <i class="fas fa-download"></i> Export Resume
                </button>
            </div>
        </header>

        <div class="main-content">
            <div class="form-section">
                <h2 class="section-title"><i class="fas fa-user-edit"></i> Build Your Resume</h2>
                
                <div class="tabs">
                    <div class="tab active" data-tab="personal">Personal</div>
                    <div class="tab" data-tab="experience">Experience</div>
                    <div class="tab" data-tab="education">Education</div>
                    <div class="tab" data-tab="skills">Skills</div>
                    <div class="tab" data-tab="job">Job Match</div>
                </div>
                
                <div class="tab-content active" id="personal-tab">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" placeholder="John Doe" value="John Doe">
                    </div>
                    
                    <div class="form-group">
                        <label for="jobTitle">Professional Title</label>
                        <input type="text" id="jobTitle" placeholder="Software Engineer" value="Senior Software Engineer">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="john.doe@example.com" value="john.doe@example.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" placeholder="(123) 456-7890" value="(555) 123-4567">
                    </div>
                    
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" id="location" placeholder="San Francisco, CA" value="San Francisco, CA">
                    </div>
                    
                    <div class="form-group">
                        <label for="summary">Professional Summary</label>
                        <textarea id="summary" placeholder="Experienced software engineer with 5+ years of expertise in...">Experienced software engineer with 5+ years of expertise in developing scalable web applications and leading development teams. Strong problem-solving skills and passion for clean code architecture.</textarea>
                    </div>
                </div>
                
                <div class="tab-content" id="experience-tab">
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" id="company" placeholder="ABC Corporation" value="Tech Innovations Inc.">
                    </div>
                    
                    <div class="form-group">
                        <label for="position">Position</label>
                        <input type="text" id="position" placeholder="Senior Developer" value="Senior Software Engineer">
                    </div>
                    
                    <div class="form-group">
                        <label for="startDate">Start Date</label>
                        <input type="month" id="startDate" value="2020-01">
                    </div>
                    
                    <div class="form-group">
                        <label for="endDate">End Date</label>
                        <input type="month" id="endDate" value="2023-08">
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Description & Achievements</label>
                        <textarea id="description" placeholder="• Led a team of 5 developers...&#10;• Improved system performance by 40%...">• Led a team of 5 developers in creating a new SaaS product
• Improved system performance by 40% through optimization
• Implemented CI/CD pipeline reducing deployment time by 60%</textarea>
                    </div>
                    
                    <button class="btn btn-primary" id="add-experience">
                        <i class="fas fa-plus"></i> Add Another Experience
                    </button>
                </div>
                
                <div class="tab-content" id="education-tab">
                    <div class="form-group">
                        <label for="institution">Institution</label>
                        <input type="text" id="institution" placeholder="University of California" value="Stanford University">
                    </div>
                    
                    <div class="form-group">
                        <label for="degree">Degree</label>
                        <input type="text" id="degree" placeholder="Bachelor of Science in Computer Science" value="Master of Science in Computer Science">
                    </div>
                    
                    <div class="form-group">
                        <label for="graduationDate">Graduation Date</label>
                        <input type="month" id="graduationDate" value="2018-05">
                    </div>
                    
                    <div class="form-group">
                        <label for="gpa">GPA (Optional)</label>
                        <input type="text" id="gpa" placeholder="3.8/4.0" value="3.9/4.0">
                    </div>
                    
                    <div class="form-group">
                        <label for="achievements">Academic Achievements</label>
                        <textarea id="achievements" placeholder="• Dean's List for 4 semesters&#10;• President of Computer Science Club">• Graduated with honors
• Published research on machine learning algorithms
• President of Computer Science Club</textarea>
                    </div>
                    
                    <button class="btn btn-primary" id="add-education">
                        <i class="fas fa-plus"></i> Add Another Education
                    </button>
                </div>
                
                <div class="tab-content" id="skills-tab">
                    <div class="form-group">
                        <label for="skills">Skills (comma separated)</label>
                        <textarea id="skills" placeholder="JavaScript, React, Node.js, Python, SQL">JavaScript, React, Node.js, Python, SQL, AWS, Docker, Kubernetes, Team Leadership, Agile Methodologies</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="proficiency">Proficiency Level</label>
                        <select id="proficiency">
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced" selected>Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    
                    <button class="btn btn-primary" id="add-skill-category">
                        <i class="fas fa-plus"></i> Add Skill Category
                    </button>
                </div>
                
                <div class="tab-content" id="job-tab">
                    <div class="form-group">
                        <label for="job-description">Paste Job Description</label>
                        <textarea id="job-description" placeholder="Paste the job description you're applying for here...">We are looking for a Senior Software Engineer with 5+ years of experience in JavaScript, React, and Node.js. The ideal candidate will have experience leading teams and working with cloud technologies like AWS. Experience with DevOps practices and CI/CD pipelines is a plus.</textarea>
                    </div>
                    
                    <button class="btn btn-primary" id="analyze-btn" style="width: 100%;">
                        <i class="fas fa-magic"></i> Analyze with AI
                    </button>
                    
                    <div class="ai-analysis">
                        <h3><i class="fas fa-lightbulb"></i> AI Analysis Results</h3>
                        <div class="ai-score">
                            <div class="score-circle">82%</div>
                            <div class="score-text">
                                <h4>AI Resume Score</h4>
                                <p>Your resume is good but can be improved. <a href="#" id="show-suggestions">See suggestions</a></p>
                            </div>
                        </div>
                        
                        <div id="suggestions-box">
                            <div class="suggestion-item">
                                <h4>Add More Metrics</h4>
                                <p>Include more quantifiable achievements in your experience section. Use numbers to show impact.</p>
                            </div>
                            <div class="suggestion-item">
                                <h4>Tailor Skills</h4>
                                <p>Consider adding 'React Native' and 'GraphQL' which are commonly required for software engineering roles.</p>
                            </div>
                            <div class="suggestion-item">
                                <h4>Optimize Length</h4>
                                <p>Your resume is a bit lengthy. Try to keep it to one page if possible by removing less relevant older positions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="preview-section">
                <h2 class="section-title"><i class="fas fa-eye"></i> Live Preview</h2>
                
                <div class="resume-template" id="resume-preview">
                    <div class="resume-header">
                        <h2 id="preview-name">John Doe</h2>
                        <p id="preview-title">Senior Software Engineer</p>
                        <p id="preview-contact">john.doe@example.com • (555) 123-4567 • San Francisco, CA</p>
                    </div>
                    
                    <div class="resume-section">
                        <h3>Summary</h3>
                        <p id="preview-summary">Experienced software engineer with 5+ years of expertise in developing scalable web applications and leading development teams. Strong problem-solving skills and passion for clean code architecture.</p>
                    </div>
                    
                    <div class="resume-section">
                        <h3>Experience</h3>
                        <div class="experience-item">
                            <h4>Senior Software Engineer <span class="company">at Tech Innovations Inc.</span></h4>
                            <p class="date">January 2020 - August 2023</p>
                            <ul id="preview-experience">
                                <li>Led a team of 5 developers in creating a new SaaS product</li>
                                <li>Improved system performance by 40% through optimization</li>
                                <li>Implemented CI/CD pipeline reducing deployment time by 60%</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="resume-section">
                        <h3>Education</h3>
                        <div class="education-item">
                            <h4>Master of Science in Computer Science</h4>
                            <p class="institution">Stanford University</p>
                            <p class="date">Graduated: May 2018</p>
                            <p>GPA: 3.9/4.0</p>
                            <ul id="preview-education">
                                <li>Graduated with honors</li>
                                <li>Published research on machine learning algorithms</li>
                                <li>President of Computer Science Club</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="resume-section">
                        <h3>Skills</h3>
                        <div id="preview-skills">
                            <div class="skill-item">JavaScript</div>
                            <div class="skill-item">React</div>
                            <div class="skill-item">Node.js</div>
                            <div class="skill-item">Python</div>
                            <div class="skill-item">SQL</div>
                            <div class="skill-item">AWS</div>
                            <div class="skill-item">Docker</div>
                            <div class="skill-item">Kubernetes</div>
                            <div class="skill-item">Team Leadership</div>
                            <div class="skill-item">Agile Methodologies</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Free Trial Modal -->
    <div class="modal" id="trial-modal">
        <div class="modal-content">
            <h2><i class="fas fa-rocket"></i> Start Your Free Trial</h2>
            <p>Get 7 days of full access to all LaunchpadPoint features</p>
            <div class="form-group">
                <input type="email" placeholder="Enter your email" id="trial-email">
            </div>
            <div class="modal-buttons">
                <button class="btn btn-outline" id="cancel-trial">Cancel</button>
                <button class="btn btn-primary" id="start-trial">Start Free Trial</button>
            </div>
        </div>
    </div>

    <!-- AI Assistant Modal -->
    <div class="modal" id="ai-modal">
        <div class="modal-content">
            <h2><i class="fas fa-robot"></i> AI Resume Assistant</h2>
            <p>Our AI will analyze your resume and provide personalized suggestions</p>
            <div class="form-group">
                <textarea placeholder="Ask a question about your resume..." id="ai-question"></textarea>
            </div>
            <div class="modal-buttons">
                <button class="btn btn-outline" id="cancel-ai">Cancel</button>
                <button class="btn btn-primary" id="ask-ai">Ask AI</button>
            </div>
        </div>
    </div>

    <script>
        // Toggle dark mode
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            }
        });
        
        // Toggle dyslexia mode
        const dyslexiaToggle = document.getElementById('dyslexia-toggle');
        
        dyslexiaToggle.addEventListener('click', () => {
            body.classList.toggle('dyslexia-mode');
            if (body.classList.contains('dyslexia-mode')) {
                dyslexiaToggle.innerHTML = '<i class="fas fa-font"></i> Standard Font';
                dyslexiaToggle.style.background = 'rgba(64, 224, 208, 0.3)';
                dyslexiaToggle.style.borderColor = '#40E0D0';
            } else {
                dyslexiaToggle.innerHTML = '<i class="fas fa-font"></i> Dyslexia Font';
                dyslexiaToggle.style.background = 'rgba(255, 255, 255, 0.2)';
                dyslexiaToggle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        });
        
        // Tab functionality
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the corresponding tab content
                const tabName = tab.getAttribute('data-tab');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
        
        // Update preview as user types
        document.getElementById('fullName').addEventListener('input', function() {
            document.getElementById('preview-name').textContent = this.value || 'John Doe';
        });
        
        document.getElementById('jobTitle').addEventListener('input', function() {
            document.getElementById('preview-title').textContent = this.value || 'Software Engineer';
        });
        
        document.getElementById('email').addEventListener('input', updateContactPreview);
        document.getElementById('phone').addEventListener('input', updateContactPreview);
        document.getElementById('location').addEventListener('input', updateContactPreview);
        
        function updateContactPreview() {
            const email = document.getElementById('email').value || 'john.doe@example.com';
            const phone = document.getElementById('phone').value || '(555) 123-4567';
            const location = document.getElementById('location').value || 'San Francisco, CA';
            
            document.getElementById('preview-contact').textContent = `${email} • ${phone} • ${location}`;
        }
        
        document.getElementById('summary').addEventListener('input', function() {
            document.getElementById('preview-summary').textContent = this.value || 'Experienced software engineer with 5+ years of expertise in developing scalable web applications and leading development teams.';
        });
        
        document.getElementById('company').addEventListener('input', function() {
            document.querySelector('.experience-item .company').textContent = 'at ' + (this.value || 'Tech Innovations Inc.');
        });
        
        document.getElementById('position').addEventListener('input', function() {
            document.querySelector('.experience-item h4').innerHTML = this.value + ' <span class="company">at Tech Innovations Inc.</span>';
        });
        
        document.getElementById('description').addEventListener('input', function() {
            const items = this.value.split('\n');
            let html = '';
            items.forEach(item => {
                if (item.trim() !== '') {
                    html += `<li>${item.trim()}</li>`;
                }
            });
            document.getElementById('preview-experience').innerHTML = html || '<li>Led a team of 5 developers in creating a new SaaS product</li><li>Improved system performance by 40% through optimization</li><li>Implemented CI/CD pipeline reducing deployment time by 60%</li>';
        });
        
        document.getElementById('skills').addEventListener('input', function() {
            const skills = this.value.split(',').map(skill => skill.trim());
            let html = '';
            skills.forEach(skill => {
                if (skill !== '') {
                    html += `<div class="skill-item">${skill}</div>`;
                }
            });
            document.getElementById('preview-skills').innerHTML = html;
        });
        
        // Analyze button functionality
        document.getElementById('analyze-btn').addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            this.disabled = true;
            
            // Simulate AI analysis
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-magic"></i> Analyze with AI';
                this.disabled = false;
                
                // Show suggestions
                document.getElementById('suggestions-box').style.display = 'block';
                
                // Update score slightly
                document.querySelector('.score-circle').textContent = '86%';
                document.querySelector('.score-text p').textContent = 'Your resume has improved! Keep refining to reach 90%+';
            }, 2000);
        });
        
        // Export button functionality
        document.getElementById('export-btn').addEventListener('click', function() {
            // In a real app, this would generate a PDF
            alert('Resume exported successfully! In a real application, this would download a PDF or Word document.');
        });
        
        // Free trial modal
        document.getElementById('add-experience').addEventListener('click', function() {
            document.getElementById('trial-modal').style.display = 'flex';
        });
        
        document.getElementById('add-education').addEventListener('click', function() {
            document.getElementById('trial-modal').style.display = 'flex';
        });
        
        document.getElementById('add-skill-category').addEventListener('click', function() {
            document.getElementById('trial-modal').style.display = 'flex';
        });
        
        document.getElementById('cancel-trial').addEventListener('click', function() {
            document.getElementById('trial-modal').style.display = 'none';
        });
        
        document.getElementById('start-trial').addEventListener('click', function() {
            const email = document.getElementById('trial-email').value;
            if (email && email.includes('@')) {
                alert(`Free trial started for ${email}! Check your email for confirmation.`);
                document.getElementById('trial-modal').style.display = 'none';
            } else {
                alert('Please enter a valid email address.');
            }
        });
        
        // AI Assistant modal
        document.getElementById('show-suggestions').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('ai-modal').style.display = 'flex';
        });
        
        document.getElementById('cancel-ai').addEventListener('click', function() {
            document.getElementById('ai-modal').style.display = 'none';
        });
        
        document.getElementById('ask-ai').addEventListener('click', function() {
            const question = document.getElementById('ai-question').value;
            if (question) {
                alert(`AI Assistant: Thanks for your question! In the full version, our AI would provide detailed feedback on: "${question}"`);
                document.getElementById('ai-modal').style.display = 'none';
            } else {
                alert('Please ask a question about your resume.');
            }
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
        
        // Initialize
        updateContactPreview();
    </script>
</body>
</html>
