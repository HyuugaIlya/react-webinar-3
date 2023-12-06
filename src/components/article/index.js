import React, { memo } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import { numberFormat } from './../../utils';

import './style.css';

function Article({ article, onAdd }) {

    const cn = bem('Article');

    const callbacks = {
        onAdd: () => onAdd(article._id)
    };

    return (
        <div className={cn()}>
            <span className={cn() + '__description'}>
                {article.description}
            </span>
            <span className={cn() + '__country'}>
                Страна производитель: <b>{article.madeIn?.title}</b>
            </span>
            <span className={cn() + '__category'}>
                Категория: <b>{article.category?.title}</b>
            </span>
            <span className={cn() + '__edition'}>
                Год выпуска: <b>{article.edition}</b>
            </span>
            <span className={cn() + '__price'}>
                <b>Цена: {numberFormat(article.price)} ₽</b>
            </span>
            <button
                className={cn() + '__button'}
                onClick={callbacks.onAdd}
            >
                Добавить
            </button>
        </div>
    );
};


Article.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        country: PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            code: PropTypes.string,
            title: PropTypes.string
        }),
        category: PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string
        }),
        edition: PropTypes.number,
        description: PropTypes.string,
        price: PropTypes.number
    }).isRequired,
    onAdd: PropTypes.func,
};

Article.defaultProps = {
    onAdd: (id) => { },
}

export default memo(Article);