import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Pagination from '../../src/components/Pagination/Pagintaion';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Pagination', () => {
  const defaultProps = {
    totalItems: 50,
    itemsPerPage: 10,
    currentPage: 1,
    handlePageChange: vi.fn(),
  };
  const handlePageChange = vi.fn();

  it('should render pagination buttons correctly', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        handlePageChange={handlePageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        handlePageChange={handlePageChange}
      />
    );

    expect(screen.getByText('<')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={5}
        handlePageChange={handlePageChange}
      />
    );

    expect(screen.getByText('>')).toBeDisabled();
  });

  it('should call handlePageChange with correct page number when page button is clicked', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        handlePageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('should call handlePageChange with correct page number when next button is clicked', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        handlePageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('>'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('should call handlePageChange with correct page number when previous button is clicked', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={2}
        handlePageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('<'));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('should update URL query parameter when page changes', () => {
    const TestComponent = () => {
      const navigate = useNavigate();
      const handlePageChange = (page: number) => {
        navigate(`?page=${page}`);
      };

      return (
        <Pagination {...defaultProps} handlePageChange={handlePageChange} />
      );
    };

    render(
      <MemoryRouter>
        <TestComponent />
      </MemoryRouter>
    );

    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);

    expect(mockNavigate).toHaveBeenCalledWith('?page=3');
  });
});
