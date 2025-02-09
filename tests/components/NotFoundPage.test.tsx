import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from '../../src/components/NotFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
