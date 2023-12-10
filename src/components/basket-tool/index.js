import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import {
  numberFormat,
  plural
} from "../../utils";

import './style.css';

function BasketTool({
  sum,
  amount,
  onOpen,
  lang,
  langNav
}) {

  const cn = bem('BasketTool');

  const {
    cartTitle,
    cartEmpty,
    buttonGo
  } = langNav;

  return <section className={cn()}>
    <span className={cn('label')}>{cartTitle}:</span>
    <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, lang === 'ru' ? {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        } : {
          one: 'item',
          other: 'items'
        }, lang === 'ru' ? 'ru-RU' : 'en-EN')} / ${numberFormat(sum, lang === 'ru' ? 'ru-RU' : 'en-EN')} 
            ${lang === 'ru' ? '₽' : '$'}`
        : `${cartEmpty}`
      }
    </span>
    <button
      onClick={onOpen}
      disabled={!amount}
    >
      {buttonGo}
    </button>
  </section>;
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  clearArticle: PropTypes.func,
  lang: PropTypes.string,
  langNav: PropTypes.shape({
    linkHome: PropTypes.string,
    cartTitle: PropTypes.string,
    cartEmpty: PropTypes.string,
    buttonGo: PropTypes.string,
    buttonAdd: PropTypes.string,
  })
};

BasketTool.defaultProps = {
  onOpen: () => { },
  clearArticle: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);