import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import './style.css';

function LoginForm({ onAuth, isAuth, errMessage }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        clearErrors,
        setError,
        reset
    } = useForm({
        mode: 'all'
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/profile');
        }
        setError('server', {
            type: 'custom',
            message: errMessage
        })
    }, [isAuth])

    const onSubmit = (data) => {
        onAuth(data);
        reset();
    }

    const clearServerErrors = () => clearErrors(['server']);

    return <form
        className='Form'
        onSubmit={handleSubmit(onSubmit)}
    >
        <h1>Вход</h1>
        <section className='Form-input'>
            <span>Логин</span>
            <input {...register('login',
                {
                    required: 'This field is required'
                })}
                onFocus={clearServerErrors}
            />
        </section>
        <div>
            {errors?.email && (
                <span>{errors?.email.message || 'Error!'}</span>
            )}
        </div>
        <section className='Form-input'>
            <span>Пароль</span>
            <input {...register('password',
                {
                    required: 'This field is required'
                })}
                onFocus={clearServerErrors}
                type={'password'}
            />
        </section>
        {errors.server?.message && <section className='Errors'>
            <span>
                {errors.server.message}
            </span>
        </section>}
        <div >
            <button disabled={!isValid}>Войти</button>
        </div>
    </form>
}

export default LoginForm;