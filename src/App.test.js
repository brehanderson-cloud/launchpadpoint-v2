import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LaunchpadPoint app', () => {
  render(<App />);
  const titleElement = screen.getByText(/LaunchpadPoint/i);
  expect(titleElement).toBeInTheDocument();
});
