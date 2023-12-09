import React, { memo } from 'react'
import PropTypes from 'prop-types';

function LangButton({
    language,
    onLang
}) {
    return (
        <button onClick={() => {
            onLang(language === 'ru' ? 'en' : 'ru')
        }}>
            {language === 'ru' ? 'EN' : 'RU'}
        </button>
    )
}

LangButton.propTypes = {
    language: PropTypes.string.isRequired,
    onLang: PropTypes.func
};

LangButton.defaultProps = {
    onLang: () => { }
};

export default memo(LangButton);