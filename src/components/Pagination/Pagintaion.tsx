import React from 'react';

interface PagintaionProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}
const Pagintaion: React.FC<PagintaionProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  handlePageChange,
}: PagintaionProps) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'inactive' : ''}
      >
        {'<'}
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pages.length}
        className={
          currentPage === pages.length || pages.length === 0 ? 'inactive' : ''
        }
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagintaion;
