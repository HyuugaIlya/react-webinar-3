import React, {
    memo,
    useCallback
} from 'react';
import { useLocation } from 'react-router-dom';

import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useLanguage from '../../hooks/use-language';

import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import LangButton from '../../components/common/lang-button';

const Header = () => {
    const store = useStore();

    const location = useLocation();

    const select = useSelector(state => ({
        //Basket Data
        amount: state.basket.amount,
        sum: state.basket.sum,

        //Article Data
        title: state.article.item.title,

        //Lang Data
        language: state.lang.language
    }));

    const callbacks = {
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

        // Очищение страницы товара
        clearArticle: useCallback(() => store.actions.article.clearArticle(), [store]),

        //Смена языка
        onLang: useCallback((lang) => store.actions.lang.setLanguage(lang), [store])
    }

    //Получение данных для отрисовки в зависимости от выбранного языка
    const langMain = useLanguage('main');

    return <>
        <Head title={location.pathname.includes('/main')
            ? langMain.title
            : select.title}
        >
            <LangButton
                language={select.language}
                onLang={callbacks.onLang}
            />
        </Head>
        <BasketTool
            langMain={langMain}
            lang={select.language}
            clearArticle={callbacks.clearArticle}
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
        />
    </>
}

export default memo(Header);