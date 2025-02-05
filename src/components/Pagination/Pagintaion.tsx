import React from 'react';

interface PagintaionProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
const Pagintaion: React.FC<PagintaionProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PagintaionProps) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'inactive' : ''}
      >
        {'<'}
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages.length}
        className={currentPage === pages.length ? 'inactive' : ''}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagintaion;
