import React, {
    memo,
    useCallback
} from 'react';
import {
    useLocation
} from 'react-router-dom';

import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useLanguage from '../../hooks/use-language';

import Head from '../../components/head';
import LangButton from '../../components/common/lang-button';

const Header = () => {
    const store = useStore();

    const location = useLocation();

    const select = useSelector(state => ({
        //Article Data
        title: state.article.item.title,

        //Lang Data
        language: state.lang.language
    }));

    const callbacks = {
        //Смена языка
        onLang: useCallback((lang) => store.actions.lang.setLanguage(lang), [store])
    }

    //Получение данных для отрисовки в зависимости от выбранного языка
    const langHead = useLanguage('header');

    return (
        <Head title={location.pathname.includes('/main')
            ? langHead.title
            : select.title}
        >
            <LangButton
                language={select.language}
                onLang={callbacks.onLang}
            />
        </Head>
    );
}

export default memo(Header);