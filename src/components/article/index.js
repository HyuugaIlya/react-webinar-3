import React, { memo } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import { numberFormat } from './../../utils';
import Preloader from '../common/preloader';

import './style.css';

function Article({
    article,
    onAdd,
    langArticle,
    lang,
    isFetching
}) {

    const cn = bem('Article');

    const {
        country,
        category,
        edition,
        price,
        buttonAdd
    } = langArticle;

    const callbacks = {
        onAdd: () => onAdd(article._id)
    };

    if (isFetching) {
        return <Preloader />
    };

    return (
        <div className={cn()}>
            <span className={cn() + '__description'}>
                {article.description}
            </span>
            <span className={cn() + '__country'}>
                {country}: <b>{article.madeIn?.title}</b>
            </span>
            <span className={cn() + '__category'}>
                {category}: <b>{article.category?.title}</b>
            </span>
            <span className={cn() + '__edition'}>
                {edition}: <b>{article.edition}</b>
            </span>
            <span className={cn() + '__price'}>
                <b>
                    {price}: {numberFormat(article.price, lang === 'ru'
                        ? 'ru-RU' : 'en-EN')} {lang === 'ru' ? '₽' : '$'}
                </b>
            </span>
            <button
                className={cn() + '__button'}
                onClick={callbacks.onAdd}
            >
                {buttonAdd}
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
    langArticle: PropTypes.shape({
        country: PropTypes.string,
        category: PropTypes.string,
        edition: PropTypes.string,
        price: PropTypes.string,
        buttonAdd: PropTypes.string
    }),
    lang: PropTypes.string,
    isFetching: PropTypes.bool
};

Article.defaultProps = {
    onAdd: (id) => { },
}

export default memo(Article);