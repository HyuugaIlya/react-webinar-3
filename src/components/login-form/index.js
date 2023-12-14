import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import ErrorsForm from '../form-comps/errors-form';
import InputForm from '../form-comps/input-form';

import './style.css';

function LoginForm({
    onAuth,
    errMessage,
    isFetching
}) {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        clearErrors,
        setError,
        reset
    } = useForm({
        mode: 'all'
    });

    useEffect(() => {
        setError('server', {
            type: 'custom',
            message: errMessage
        })
    }, [errMessage])

    const onSubmit = (data) => {
        onAuth(data);
        reset();
    }

    const clearServerErrors = () => clearErrors(['server']);

    return <form className='Form' onSubmit={handleSubmit(onSubmit)}>
        <h1>Вход</h1>
        <InputForm
            isFetching={isFetching}
            register={register}
            clearServerErrors={clearServerErrors}
            type={'text'}
            registerName={'login'}
            name={'Логин'}
        />
        <InputForm
            isFetching={isFetching}
            register={register}
            clearServerErrors={clearServerErrors}
            type={'password'}
            registerName={'password'}
            name={'Пароль'}
        />
        {errors.server?.message && <ErrorsForm message={errors.server.message} />}
        <div >
            <button disabled={!isValid}>Войти</button>
        </div>
    </form>
}

LoginForm.propTypes = {
    onAuth: PropTypes.func,
    isFetching: PropTypes.bool,
    errMessage: PropTypes.string
}

LoginForm.defaultProps = {
    onAuth: () => { },
}

export default LoginForm;