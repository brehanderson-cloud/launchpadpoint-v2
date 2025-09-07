# LaunchpadPoint v2 - Career Intelligence Platform

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

LaunchpadPoint v2 is a React-based career intelligence platform that provides AI-powered resume building, job matching, career advice, and professional networking features. Built with Create React App, it uses modern React patterns with functional components, hooks, and context for state management.

## Working Effectively

### Bootstrap and Install Dependencies
- **REQUIRED FIRST STEP**: Install missing dependencies that are not in package.json but required for build:
  - `npm install lucide-react` - Required for UI icons used throughout the application
  - `npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event` - Required for tests to pass
- Standard dependency installation: `npm install` - Takes ~66 seconds, NEVER CANCEL. Set timeout to 120+ seconds.

### Build and Test
- **Build**: `npm run build` - Takes ~12 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
  - Creates optimized production build in `build/` folder
  - Build output: ~53.69 kB JS, ~6.01 kB CSS
  - Always succeeds if dependencies are installed correctly
- **Test**: `npm test -- --watchAll=false` - Takes ~2 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
  - Runs Jest test suite with React Testing Library
  - Single test validates main App component renders correctly
  - Tests pass consistently when dependencies are installed

### Development Server
- **Start**: `npm start` - Starts development server on http://localhost:3000
  - NEVER CANCEL - Takes ~30 seconds to fully start
  - Hot reload enabled for development
  - Set timeout to 90+ seconds for initial startup
  - Server runs indefinitely until manually stopped

## Validation Scenarios

**CRITICAL**: After making changes, ALWAYS test these complete user scenarios:

### Core Application Flow
1. **Dashboard Navigation**: Verify main dashboard loads with career intelligence score, market value, and job alerts
2. **Resume Builder**: Navigate to Resume tab, verify form inputs work, and preview updates dynamically
3. **Jobs Page**: Navigate to Jobs tab, verify job listings display with filtering and application buttons
4. **Navigation**: Test all navigation buttons (Dashboard, Resume, Jobs, Analytics, Network) switch content correctly

### Manual Testing Steps
- Start the development server: `npm start`
- Open http://localhost:3000 in browser
- Navigate through each main section (Dashboard → Resume → Jobs)
- Verify form inputs work in Resume Builder
- Confirm job listings display correctly with salary ranges and match percentages
- Test dark mode toggle functionality

## Required Dependencies and Exact Commands

### Node.js and npm
- Uses Node.js with npm (comes with Create React App)
- No specific Node.js version requirement - works with Node 16+
- Standard npm commands for React projects

### Exact Build Commands
```bash
# Install all dependencies (run these in sequence)
npm install
npm install lucide-react
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event

# Build and test
npm run build    # ~12 seconds - NEVER CANCEL
npm test -- --watchAll=false    # ~2 seconds - NEVER CANCEL

# Development
npm start    # ~30 seconds startup - NEVER CANCEL, runs indefinitely
```

### Build Timing Expectations
- **Dependency installation**: 66 seconds typical, allow 120+ seconds timeout - NEVER CANCEL
- **Build**: 12 seconds typical, allow 60+ seconds timeout
- **Tests**: 1-2 seconds typical, allow 30+ seconds timeout  
- **Dev server startup**: 30 seconds typical, allow 90+ seconds timeout

## Codebase Structure and Navigation

### Key Directories
- `src/` - All React source code (21 files total)
  - `components/` - Reusable UI components (Navigation, AIChatSidebar, ThemeToggle)
  - `pages/` - Main application pages (Dashboard, Resume Builder, Jobs, AI Assistant)
  - `contexts/` - React Context providers (UserContext, ResumeContext)
  - `utils/` - Utility functions (resumeAnalyzer.js)
  - `hooks/` - Custom React hooks (useLocalStorage.js)
- `public/` - Static assets and HTML files
- `build/` - Production build output (generated)

### Important Files to Know
- `src/App.js` - Main application component with routing logic
- `src/pages/ResumeBuilder.js` - Complex resume parsing and editing functionality
- `src/pages/DashboardPage.js` - Career intelligence dashboard with metrics
- `src/pages/JobsPage.js` - Job search and matching interface
- `src/components/Navigation.js` - Main navigation header
- `package.json` - Dependencies and scripts configuration

### Technology Stack
- **Frontend**: React 18.2.0 with functional components and hooks
- **Styling**: Tailwind CSS 3.3.0 with custom configuration
- **Icons**: Lucide React for consistent iconography
- **Testing**: Jest + React Testing Library
- **Build**: Create React App (react-scripts 5.0.1)

## Development Workflow

### Making Changes
- Always start development server for live testing: `npm start`
- Edit files in `src/` directory - changes auto-reload
- Test functionality manually after code changes
- Run tests before committing: `npm test -- --watchAll=false`
- Build for production to validate: `npm run build`

### Code Style and Patterns
- Uses functional React components with hooks
- Context providers for global state (user, resume data)
- Tailwind CSS for styling with custom color scheme
- Consistent emoji icons in navigation and UI
- ES6+ JavaScript with modern React patterns

### Key Components Relationships
- App.js → manages current page state and renders page components
- Navigation.js → handles page switching and user profile display
- DashboardPage.js → displays career metrics and job recommendations
- ResumeBuilder.js → complex form handling with live preview
- JobsPage.js → job listings with filtering and application features

## Common Tasks

### Adding New Features
- Create new page components in `src/pages/`
- Add navigation items in `src/components/Navigation.js`
- Update App.js routing logic for new pages
- Use existing contexts for shared state

### Styling Changes
- Edit Tailwind classes directly in JSX
- Custom colors defined in `tailwind.config.js`
- Responsive design using Tailwind breakpoints
- Dark mode support via 'dark:' prefixes

### Testing Changes
- Update `src/App.test.js` for main app functionality
- Test component rendering with React Testing Library
- Manual testing required for complex interactions

### Build and Deployment
- Production build: `npm run build` → creates `build/` folder
- Static files ready for deployment to any web server
- Build includes optimized, minified assets

## Troubleshooting

### Common Issues
- **Build fails with "Can't resolve 'lucide-react'"**: Run `npm install lucide-react`
- **Tests fail with testing library errors**: Install testing dependencies as shown above
- **Styles not loading**: Ensure Tailwind CSS is configured properly
- **Icons not displaying**: Verify lucide-react is installed and imported correctly

### Debug Steps
1. Ensure all dependencies are installed correctly
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
4. Check console for JavaScript errors in browser developer tools
5. Verify development server is running on correct port (3000)

Remember: ALWAYS run the complete validation scenarios after making changes to ensure the application works correctly end-to-end.