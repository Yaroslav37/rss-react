import React from 'react';
import classNames from 'classnames';

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
        disabled={currentPage === 1 || currentPage > pages.length}
        className={classNames('pagination-button', {
          inactive: currentPage === 1 || currentPage > pages.length,
        })}
      >
        {'<'}
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={classNames('pagination-button', {
              active: currentPage === page,
            })}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pages.length}
        className={classNames('pagination-button', {
          inactive: currentPage === pages.length || pages.length === 0,
        })}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagintaion;
