import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LaunchpadPoint application', () => {
  render(<App />);
  const appElement = screen.getByText(/LaunchpadPoint/i);
  expect(appElement).toBeInTheDocument();
});
