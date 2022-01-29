import { render, screen } from '@testing-library/react';
import App from './App';

test('renders help text', () => {
  render(<App />);
  const element = screen.getByText(/Enter a word and click submit to check whether it's in the Jamaican Creole dictionary./i);
  expect(element).toBeInTheDocument();
});
