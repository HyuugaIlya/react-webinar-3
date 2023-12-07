import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";

import './style.css';

function BasketTotal({
  sum,
  lang,
  total
}) {

  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{total}:</span>
      <span className={cn('cell')}>
        {numberFormat(sum, lang === 'ru' ? 'ru-RU' : 'en-EN')} {lang === 'ru' ? '₽' : '$'}
      </span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.string,
  total: PropTypes.string
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);