import About from '../pages/about';
import { render, screen } from '@testing-library/react';

test('title an description are here', async () => {
  render(<About />);
  const title = screen.getByRole('heading');
  expect(title.textContent).toMatch(/about us/);
  expect(screen.getByText(/lorem/i)).toBeInTheDocument();
});
