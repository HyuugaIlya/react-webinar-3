import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './style.css';

function InputForm({
    register,
    clearServerErrors,
    type,
    registerName,
    name,
    isFetching
}) {
    return (
        <section className='Form-input'>
            <span>{name}</span>
            <input {...register(registerName,
                {
                    required: 'This field is required'
                })}
                onFocus={clearServerErrors}
                type={type}
                disabled={isFetching}
            />
        </section>
    )
}

InputForm.propTypes = {
    isFetching: PropTypes.bool,
    register: PropTypes.func,
    clearServerErrors: PropTypes.func,
    type: PropTypes.string,
    registerName: PropTypes.string,
    name: PropTypes.string
}

InputForm.defaultProps = {
    register: () => { },
    clearServerErrors: () => { },
}

export default memo(InputForm);