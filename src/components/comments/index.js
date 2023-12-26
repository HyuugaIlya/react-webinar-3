import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

function CommentArea({
    clear,
    parent,
    commentsActions
}) {
    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        mode: 'all'
    });

    const dispatch = useDispatch();
    const params = useParams();

    const onSubmit = (data) => {
        dispatch(commentsActions.add((parent
            ? parent
            : params.id), data.commentText, params.id));
        dispatch(commentsActions.load(params.id));
        reset();
    }

    const onClear = () => {
        clear(null);
        reset();
    }

    return <>
        <form
            className='Form'
            onSubmit={handleSubmit(onSubmit)}
        >
            <textarea
                {...register('commentText')}
                placeholder='Enter the text'
            ></textarea>
            <div>
                <button>
                    Отправить
                </button>
            </div>
        </form>
        {parent && <button onClick={onClear}>
            Отмена
        </button>}
    </>
}

// LoginForm.propTypes = {
//     onAuth: PropTypes.func,
//     isFetching: PropTypes.bool,
//     errMessage: PropTypes.string
// }

// LoginForm.defaultProps = {
//     onAuth: () => { },
// }

export default CommentArea;