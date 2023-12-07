import React, {
    memo,
    useEffect
} from 'react';
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import Article from '../../components/article';
import Preloader from '../../components/common/preloader';

function ArticlePage({
    article,
    setArticle,
    onAdd,
    isFetching,
    langArticle,
    lang
}) {

    const { id } = useParams();

    useEffect(() => {
        setArticle(id);
    }, [id]);

    if (isFetching) {
        return <Preloader />
    }

    return <Article
        lang={lang}
        langArticle={langArticle}
        article={article}
        onAdd={onAdd}
    />
};

ArticlePage.propTypes = {
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
        price: PropTypes.number,
    }).isRequired,
    setArticle: PropTypes.func,
    onAdd: PropTypes.func,
    langArticle: PropTypes.shape({
        country: PropTypes.string,
        category: PropTypes.string,
        edition: PropTypes.string,
        price: PropTypes.string,
        buttonAdd: PropTypes.string
    }),
    lang: PropTypes.string
};

ArticlePage.defaultProps = {
    setArticle: (id) => { },
    onAdd: (id) => { },
}

export default memo(ArticlePage);