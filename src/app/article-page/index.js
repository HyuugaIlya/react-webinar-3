import React, {
    memo,
    useCallback,
    useEffect
} from 'react';
import { useParams } from 'react-router-dom';

import useSelector from "../../hooks/use-selector";
import useLanguage from '../../hooks/use-language';
import useStore from '../../hooks/use-store';

import Article from '../../components/article';

function ArticlePage() {

    const store = useStore();

    const select = useSelector(state => ({
        //Article Data
        article: state.article.item,
        isArticleFetching: state.article.isFetching,

        //Lang Data
        language: state.lang.language
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

        // Добавление товара на страницу товара
        setArticle: useCallback((id) => store.actions.article.setArticle(id), [store]),
    }

    const { id } = useParams();

    useEffect(() => {
        callbacks.setArticle(id);
    }, [id]);

    //Получение данных для отрисовки в зависимости от выбранного языка
    const langArticle = useLanguage('article');

    return <Article
        isFetching={select.isArticleFetching}
        lang={select.language}
        langArticle={langArticle}
        article={select.article}
        onAdd={callbacks.addToBasket}
    />;
};

export default memo(ArticlePage);