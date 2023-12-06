import React, { memo, useState } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Pagination({ pagination, onLoad }) {

  const cn = bem('Pagination');

  const currentLimit = pagination.limit;
  const currentPage = pagination.currentPage;
  const currentSkip = (p) => {
    if (p === 0) {
      return p
    } else {
      return 10 * p
    }
  };

  const pagesCount = Math.ceil(pagination.count / pagination.limit);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  };

  const callbacks = {
    onLoad: (limit, skip, currentPage) => onLoad(limit, skip, currentPage),
    onFilter: (p) => {
      if (currentPage === pages[0] || currentPage === pages[1]) {
        return p >= 2 && p <= 3;
      } else if (currentPage === pages[pages.length - 1] || currentPage === pages[pages.length - 2]) {
        return p >= pages[pages.length - 3] && p <= pages[pages.length - 1];
      }
      return p >= currentPage - 1 && p <= currentPage + 1;
    }
  }

  return (
    <div className={cn()}>
      <span
        className={cn() + '__page-count' + (currentPage === pages[0] ? '_selected' : '')}
        onClick={() => callbacks.onLoad(currentLimit, 0, 1)}
      >
        {pages[0]}
      </span>
      {currentPage > 3 && <span className={cn() + '__ellipsis'}>...</span>}
      {pages
        .filter(p => callbacks.onFilter(p))
        .map((p) => {
          if (p !== pages[0] && p !== pages[pages.length - 1]) {
            return <span
              key={pages.indexOf(p)}
              className={cn() + '__page-count' + (currentPage === p ? '_selected' : '')}
              onClick={() => callbacks.onLoad(currentLimit, currentSkip(pages.indexOf(p)), p)}
            >
              {p}
            </span>
          }
        })}
      {currentPage < pagesCount - 2 && <span className={cn() + '__ellipsis'}>...</span>}
      <span
        className={cn() + '__page-count' + (currentPage === pages[pages.length - 1] ? '_selected' : '')}
        onClick={() => callbacks.onLoad(currentLimit, currentSkip(pages.indexOf(pages[pages.length - 1])), pages[pages.length - 1])}
      >
        {pages[pages.length - 1]}
      </span>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.shape({
    count: PropTypes.number,
    limit: PropTypes.number,
    skip: PropTypes.number,
    currentPage: PropTypes.number
  }).isRequired,
  onLoad: PropTypes.func,
};

Pagination.defaultProps = {
  onLoad: (limit, skip, currentPage) => { },
}

export default memo(Pagination);