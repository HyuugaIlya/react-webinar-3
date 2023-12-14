import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './style.css';

function ErrorsForm({ message }) {
    return (
        <section className='Errors'>
            <span>
                {message}
            </span>
        </section>
    )
}

ErrorsForm.propTypes = {
    message: PropTypes.string,
}

ErrorsForm.defaultProps = {
    message: ''
}

export default memo(ErrorsForm);