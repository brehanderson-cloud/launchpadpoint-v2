# LaunchpadPoint Career Intelligence Platform

LaunchpadPoint is a React-based career intelligence platform that provides AI-powered resume building, job matching, and career advancement tools. The application helps professionals optimize their careers with data-driven insights and intelligent recommendations.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Initial Setup and Dependencies
- Install Node.js (v16+ recommended): The application requires Node.js to run React and npm scripts
- Clone the repository and navigate to the project directory
- **CRITICAL**: Install ALL required dependencies:
  ```bash
  npm install
  npm install lucide-react @testing-library/jest-dom @testing-library/react @testing-library/user-event
  ```
- **Dependency Installation Time**: ~50 seconds. NEVER CANCEL. Set timeout to 120+ seconds.

### Build Process
- Production build: `npm run build` -- takes ~12 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- The build creates optimized files in the `build/` directory
- Build artifacts are ~54KB gzipped for the main bundle

### Development Server
- Start development server: `npm start`
- **Server Startup Time**: ~30 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Access application at: http://localhost:3000
- Hot reload is enabled - changes auto-refresh the browser
- Development server uses webpack dev server with Create React App defaults

### Testing
- Run tests: `npm test -- --watchAll=false` for CI mode
- **Test Execution Time**: ~2 seconds. Set timeout to 30+ seconds.
- Interactive test mode: `npm test` (watches for file changes)
- Tests use Jest and React Testing Library
- Default test verifies the LaunchpadPoint title renders correctly

## Application Structure

### Core Technology Stack
- **Frontend Framework**: React 18.2.0 with functional components and hooks
- **Styling**: Tailwind CSS 3.3.0 with custom configuration
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **State Management**: React Context API (UserContext, ResumeContext)
- **Routing**: Client-side navigation via state management (no React Router)

### Key Directories and Files
```
/src
├── components/          # Reusable UI components
│   ├── Navigation.js    # Main navigation bar
│   ├── ThemeToggle.js   # Dark/light mode toggle
│   └── AIChatSidebar.js # AI assistant sidebar
├── contexts/            # React Context providers
│   ├── UserContext.js   # User state management
│   └── ResumeContext.js # Resume data management
├── hooks/               # Custom React hooks
│   └── useLocalStorage.js # Local storage persistence
├── pages/               # Main application pages
│   ├── DashboardPage.js        # Career intelligence dashboard
│   ├── BuilderPage.js          # Resume builder interface
│   ├── JobsPage.js             # Job search and listings
│   ├── ResumeBuilder.js        # Advanced resume builder
│   ├── AdvancedAICareerAssistant.js # AI career guidance
│   └── NextGenCareerPlatform.js     # Future platform features
├── utils/               # Utility functions
│   └── resumeAnalyzer.js # Resume parsing and analysis
├── App.js              # Main application component
├── App.css             # Global styles
└── index.js            # Application entry point

/public
├── index.html          # Main HTML template
├── manifest.json       # PWA manifest
├── ai-assistant.html   # Static AI assistant page
└── resume-builder.html # Static resume builder page
```

### Configuration Files
- `package.json`: Dependencies, scripts, and project metadata
- `tailwind.config.js`: Tailwind CSS configuration with custom colors
- `postcss.config.js`: PostCSS configuration for Tailwind
- `.gitignore`: Git ignore patterns for node_modules, build artifacts

## Validation Scenarios

### CRITICAL: Manual Testing Requirements
After making ANY changes to the application, ALWAYS execute these validation scenarios:

#### 1. Dashboard Functionality Test
- Start development server: `npm start`
- Navigate to http://localhost:3000
- Verify dashboard loads with career intelligence score (should show "87")
- Check that all metrics display: Skills (92%), Market (89%), Complete (78%)
- Verify job alerts section shows job listings with match percentages
- Test navigation between dashboard sections

#### 2. Resume Builder Test
- Click "Resume" in navigation
- Verify resume builder interface loads
- Test form fields: Full Name, Professional Title, Email, Phone
- Verify live preview updates as you type
- Check ATS score displays (should show "87% ATS Score")
- Test export functionality (should trigger browser print dialog)
- Validate that all form tabs work: Personal, Experience, Education, Skills

#### 3. Jobs Page Test
- Click "Jobs" in navigation
- Verify job listings load with proper formatting
- Check that job cards show: title, company, salary, location, match percentage
- Test that "Apply" buttons are functional
- Verify filter and sort buttons are present and clickable

#### 4. Theme Toggle Test
- Click the theme toggle button (🌙) in navigation
- Verify dark mode toggles properly
- Check that colors and styling adapt correctly

#### 5. Navigation Test
- Test all navigation buttons: Dashboard, Resume, Jobs, Analytics, Network
- Verify active state highlighting works correctly
- Check that user profile information displays in top right

### Build Validation
- Always run `npm run build` after changes
- Verify build completes without errors
- Check that build size remains reasonable (~54KB main bundle)
- Test production build with `npm install -g serve && serve -s build`

### Test Validation
- Run `npm test -- --watchAll=false` after changes
- Ensure all tests pass
- If adding new components, add corresponding tests

## Performance and Timing Expectations

### NEVER CANCEL Commands - Critical Timeouts
- **npm install**: 50+ seconds (especially on first install)
- **npm run build**: 12+ seconds (set timeout to 60+ seconds minimum)
- **npm start**: 30+ seconds for full startup (set timeout to 60+ seconds minimum)
- **npm test**: 2+ seconds (set timeout to 30+ seconds minimum)

### Expected Build Artifacts
- Main JS bundle: ~53.69 kB gzipped
- Main CSS bundle: ~6.01 kB gzipped
- Chunk files: Additional ~1.77 kB for code splitting

## Common Development Tasks

### Adding New Components
- Create component files in `/src/components/`
- Import Lucide React icons as needed: `import { IconName } from 'lucide-react'`
- Use Tailwind CSS classes for styling
- Follow existing component patterns for consistency

### State Management
- Use React Context for application-wide state
- Local state with `useState` for component-specific data
- Use `useLocalStorage` hook for data persistence

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow existing color scheme: indigo/purple gradients for primary UI
- Maintain responsive design patterns
- Use dark mode compatible classes

### Icon Usage
- Import required icons from 'lucide-react'
- Common icons: Upload, FileText, Download, Eye, Edit3, User, Briefcase
- Maintain consistent icon sizes (typically 16px or 20px)

## Troubleshooting Common Issues

### Missing Dependencies Error
If build fails with "Cannot resolve 'lucide-react'" or similar:
```bash
npm install lucide-react @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

### Test Failures
- Default CRA test looks for "learn react" text - this has been updated to look for "LaunchpadPoint"
- If tests fail, verify testing libraries are installed
- Check that components render without throwing errors

### Build Optimization
- Build times should remain under 15 seconds for normal changes
- If build times increase significantly, check for circular dependencies
- Large bundle size increases may indicate missing tree shaking

### Development Server Issues
- If hot reload stops working, restart with `npm start`
- Port 3000 conflicts: CRA will automatically suggest alternative ports
- Network access: Server also runs on network IP for testing on other devices

## AI and Features Overview

The LaunchpadPoint platform includes several intelligent features:

### Resume Analysis
- AI-powered resume parsing and optimization
- ATS (Applicant Tracking System) compatibility scoring
- Job match percentage calculations
- Content quality assessment

### Career Intelligence
- Real-time market insights and salary tracking
- Skill trend analysis and recommendations
- Personalized career advancement planning
- Professional network integration

### Job Matching
- Intelligent job recommendation engine
- Company culture and value alignment
- Skill gap analysis and learning recommendations
- Application tracking and success metrics

## Important Development Notes

### Do NOT Modify These Files Without Good Reason
- `package.json` scripts section (standard CRA commands)
- `src/index.js` (React entry point)
- `public/index.html` (main template)
- `src/App.test.js` (working test configuration)

### Always Test These Features After Changes
- Navigation between all pages
- Form input and real-time preview updates
- Theme switching functionality
- Responsive design on different screen sizes
- All interactive buttons and links

### Git and Version Control
- Build artifacts in `/build` are ignored (in .gitignore)
- `node_modules` directory is ignored
- Always test builds before committing
- Package-lock.json should be committed for dependency consistency

Remember: This is a sophisticated career platform with real-time features and AI integration. Always validate that your changes maintain the professional, polished user experience that users expect from a career intelligence platform.